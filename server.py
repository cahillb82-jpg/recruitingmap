import os
import uuid
from pathlib import Path
from datetime import datetime, timedelta, timezone
from contextlib import contextmanager

import bcrypt
import stripe
import psycopg2
import psycopg2.extras
from fastapi import FastAPI, Request, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from pydantic import BaseModel, EmailStr

SESSION_DURATION_DAYS = 30
COOKIE_NAME = "trm_session"

# ---------------------------------------------------------------------------
# Config from environment variables
# ---------------------------------------------------------------------------
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")
STRIPE_PRICE_ID = os.environ.get("STRIPE_PRICE_ID", "")
SITE_URL = os.environ.get("SITE_URL", "http://localhost:8000")
DATABASE_URL = os.environ.get("DATABASE_URL", "")


app = FastAPI(title="The Recruiting Map")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Database helpers (PostgreSQL)
# ---------------------------------------------------------------------------

@contextmanager
def get_db():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    with get_db() as conn:
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                stripe_payment_id TEXT,
                created_at TEXT NOT NULL,
                is_active BOOLEAN NOT NULL DEFAULT TRUE
            )
            """
        )
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id),
                created_at TEXT NOT NULL,
                expires_at TEXT NOT NULL
            )
            """
        )
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS pending_registrations (
                stripe_session_id TEXT PRIMARY KEY,
                email TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()


# ---------------------------------------------------------------------------
# Request / response models
# ---------------------------------------------------------------------------

class LoginRequest(BaseModel):
    email: str
    password: str


class CheckoutRequest(BaseModel):
    email: str
    password: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def get_session_id(request: Request) -> str | None:
    return request.cookies.get(COOKIE_NAME)


def create_session(conn, user_id: str) -> str:
    session_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    expires = now + timedelta(days=SESSION_DURATION_DAYS)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (%s, %s, %s, %s)",
        (session_id, user_id, now.isoformat(), expires.isoformat()),
    )
    return session_id


def set_session_cookie(response: Response, session_id: str):
    response.set_cookie(
        key=COOKIE_NAME,
        value=session_id,
        max_age=SESSION_DURATION_DAYS * 86400,
        httponly=True,
        secure=True,
        samesite="lax",
    )


def get_active_session(conn, session_id: str) -> dict | None:
    if not session_id:
        return None
    now = datetime.now(timezone.utc).isoformat()
    cur = conn.cursor()
    cur.execute(
        """
        SELECT s.*, u.email
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.id = %s AND s.expires_at > %s
        LIMIT 1
        """,
        (session_id, now),
    )
    return cur.fetchone()


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.post("/api/checkout")
def create_checkout(body: CheckoutRequest):
    """Create a Stripe Checkout session. Stores email+password temporarily."""
    if not stripe.api_key or not STRIPE_PRICE_ID:
        raise HTTPException(status_code=500, detail="Stripe is not configured")

    if not body.email or "@" not in body.email:
        raise HTTPException(status_code=400, detail="Please enter a valid email")
    if len(body.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    # Check if email is already registered
    with get_db() as conn:
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s", (body.email,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered. Please log in instead.")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{"price": STRIPE_PRICE_ID, "quantity": 1}],
            mode="payment",
            customer_email=body.email,
            success_url=SITE_URL + "/api/payment-complete?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=SITE_URL + "?canceled=1",
        )
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Store email + hashed password temporarily, keyed by Stripe session ID
    hashed = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    with get_db() as conn:
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO pending_registrations (stripe_session_id, email, password_hash, created_at)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (stripe_session_id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash
            """,
            (session.id, body.email, hashed, datetime.now(timezone.utc).isoformat()),
        )

    return {"checkout_url": session.url}


@app.get("/api/payment-complete")
def payment_complete(session_id: str):
    """Called by Stripe redirect after successful payment. Creates account + logs in."""
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe is not configured")

    # Verify payment with Stripe
    try:
        checkout_session = stripe.checkout.Session.retrieve(session_id)
        if checkout_session.payment_status != "paid":
            return RedirectResponse(url=SITE_URL + "?error=payment_failed")
    except stripe.error.StripeError:
        return RedirectResponse(url=SITE_URL + "?error=payment_failed")

    # Look up the pending registration
    with get_db() as conn:
        cur = conn.cursor()
        cur.execute(
            "SELECT * FROM pending_registrations WHERE stripe_session_id = %s",
            (session_id,),
        )
        pending = cur.fetchone()

        if not pending:
            return RedirectResponse(url=SITE_URL + "?error=registration_not_found")

        email = pending["email"]
        password_hash = pending["password_hash"]

        # Check if user already exists (e.g. double-click)
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        existing = cur.fetchone()

        if existing:
            user_id = existing["id"]
        else:
            user_id = str(uuid.uuid4())
            now = datetime.now(timezone.utc).isoformat()
            cur.execute(
                "INSERT INTO users (id, email, password_hash, stripe_payment_id, created_at, is_active) VALUES (%s, %s, %s, %s, %s, TRUE)",
                (user_id, email, password_hash, session_id, now),
            )

        # Create login session
        login_session_id = create_session(conn, user_id)

        # Clean up pending registration
        cur.execute("DELETE FROM pending_registrations WHERE stripe_session_id = %s", (session_id,))

    # Redirect to site with session cookie set
    response = RedirectResponse(url=SITE_URL, status_code=303)
    set_session_cookie(response, login_session_id)
    return response


@app.post("/api/auth/login")
def login(body: LoginRequest):
    with get_db() as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE email = %s", (body.email,))
        user = cur.fetchone()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not bcrypt.checkpw(body.password.encode(), user["password_hash"].encode()):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not user["is_active"]:
            raise HTTPException(status_code=401, detail="Account is deactivated")

        session_id = create_session(conn, user["id"])

    response = Response(
        content='{"success": true, "user": {"email": "' + user["email"] + '"}}',
        media_type="application/json",
    )
    set_session_cookie(response, session_id)
    return response


@app.get("/api/auth/me")
def me(request: Request):
    session_id = get_session_id(request)

    with get_db() as conn:
        session = get_active_session(conn, session_id)

    if not session:
        return {"authenticated": False}

    return {"authenticated": True, "user": {"email": session["email"]}}


@app.post("/api/auth/logout")
def logout(request: Request):
    session_id = get_session_id(request)

    if session_id:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("DELETE FROM sessions WHERE id = %s", (session_id,))

    response = Response(content='{"success": true}', media_type="application/json")
    response.delete_cookie(COOKIE_NAME)
    return response


# ---------------------------------------------------------------------------
# Static files + catch-all (serve the frontend)
# ---------------------------------------------------------------------------

STATIC_DIR = Path(__file__).parent / "static"

if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

@app.get("/{full_path:path}")
def serve_frontend(full_path: str):
    """Serve frontend files. API routes are matched first by FastAPI."""
    file_path = STATIC_DIR / full_path if full_path else None
    if file_path and file_path.exists() and file_path.is_file():
        return FileResponse(str(file_path))
    return FileResponse(str(STATIC_DIR / "index.html"))


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

@app.on_event("startup")
def on_startup():
    init_db()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
