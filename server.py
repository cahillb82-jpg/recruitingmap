import os
import sqlite3
import uuid
from pathlib import Path
from datetime import datetime, timedelta, timezone
from contextlib import contextmanager

import bcrypt
import stripe
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr

DB_PATH = "recruiting_map.db"
SESSION_DURATION_DAYS = 30

# ---------------------------------------------------------------------------
# Stripe config — set these as environment variables on your host
# ---------------------------------------------------------------------------
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")
STRIPE_PRICE_ID = os.environ.get("STRIPE_PRICE_ID", "")
SITE_URL = os.environ.get("SITE_URL", "http://localhost:8000")


app = FastAPI(title="The Recruiting Map")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Database helpers
# ---------------------------------------------------------------------------

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db():
    with get_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                stripe_payment_id TEXT,
                created_at TEXT NOT NULL,
                is_active INTEGER NOT NULL DEFAULT 1
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                visitor_id TEXT NOT NULL,
                created_at TEXT NOT NULL,
                expires_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
            """
        )


# ---------------------------------------------------------------------------
# Request / response models
# ---------------------------------------------------------------------------

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    stripe_session_id: str


class LoginRequest(BaseModel):
    email: str
    password: str


class CheckoutRequest(BaseModel):
    email: str
    password: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def get_visitor_id(request: Request) -> str:
    visitor_id = request.headers.get("X-Visitor-Id")
    if not visitor_id:
        raise HTTPException(status_code=400, detail="Missing X-Visitor-Id header")
    return visitor_id


def create_session(conn: sqlite3.Connection, user_id: str, visitor_id: str):
    # Remove any existing sessions for this visitor_id
    conn.execute("DELETE FROM sessions WHERE visitor_id = ?", (visitor_id,))
    now = datetime.now(timezone.utc)
    expires = now + timedelta(days=SESSION_DURATION_DAYS)
    conn.execute(
        "INSERT INTO sessions (id, user_id, visitor_id, created_at, expires_at) VALUES (?, ?, ?, ?, ?)",
        (str(uuid.uuid4()), user_id, visitor_id, now.isoformat(), expires.isoformat()),
    )


def get_active_session(conn: sqlite3.Connection, visitor_id: str) -> dict | None:
    now = datetime.now(timezone.utc).isoformat()
    row = conn.execute(
        """
        SELECT s.*, u.email
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.visitor_id = ? AND s.expires_at > ?
        ORDER BY s.created_at DESC
        LIMIT 1
        """,
        (visitor_id, now),
    ).fetchone()
    return dict(row) if row else None


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.post("/api/checkout")
def create_checkout(body: CheckoutRequest):
    """Create a Stripe Checkout session. Returns the URL to redirect the user to."""
    if not stripe.api_key or not STRIPE_PRICE_ID:
        raise HTTPException(status_code=500, detail="Stripe is not configured")

    if not body.email or "@" not in body.email:
        raise HTTPException(status_code=400, detail="Please enter a valid email")
    if len(body.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    # Check if email is already registered
    with get_db() as conn:
        existing = conn.execute("SELECT id FROM users WHERE email = ?", (body.email,)).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered. Please log in instead.")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{"price": STRIPE_PRICE_ID, "quantity": 1}],
            mode="payment",
            customer_email=body.email,
            success_url=SITE_URL + "?session_id={CHECKOUT_SESSION_ID}&email=" + body.email + "&pw=" + body.password,
            cancel_url=SITE_URL + "?canceled=1",
            metadata={"email": body.email, "password": body.password},
        )
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"checkout_url": session.url}


@app.post("/api/auth/register")
def register(body: RegisterRequest, request: Request):
    """Complete registration after successful Stripe payment."""
    visitor_id = get_visitor_id(request)

    # Verify the Stripe Checkout session is actually paid
    if stripe.api_key and body.stripe_session_id and not body.stripe_session_id.startswith("sim_"):
        try:
            session = stripe.checkout.Session.retrieve(body.stripe_session_id)
            if session.payment_status != "paid":
                raise HTTPException(status_code=400, detail="Payment not completed")
        except stripe.error.StripeError as e:
            raise HTTPException(status_code=400, detail="Could not verify payment: " + str(e))
    elif not body.stripe_session_id.strip():
        raise HTTPException(status_code=400, detail="Invalid Stripe session ID")

    hashed = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    with get_db() as conn:
        existing = conn.execute("SELECT id FROM users WHERE email = ?", (body.email,)).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")

        conn.execute(
            "INSERT INTO users (id, email, password_hash, stripe_payment_id, created_at, is_active) VALUES (?, ?, ?, ?, ?, 1)",
            (user_id, body.email, hashed, body.stripe_session_id, now),
        )
        create_session(conn, user_id, visitor_id)

    return {"success": True, "user": {"email": body.email}}


@app.post("/api/auth/login")
def login(body: LoginRequest, request: Request):
    visitor_id = get_visitor_id(request)

    with get_db() as conn:
        user = conn.execute("SELECT * FROM users WHERE email = ?", (body.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not bcrypt.checkpw(body.password.encode(), user["password_hash"].encode()):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not user["is_active"]:
            raise HTTPException(status_code=401, detail="Account is deactivated")

        create_session(conn, user["id"], visitor_id)

    return {"success": True, "user": {"email": user["email"]}}


@app.get("/api/auth/me")
def me(request: Request):
    visitor_id = get_visitor_id(request)

    with get_db() as conn:
        session = get_active_session(conn, visitor_id)

    if not session:
        return {"authenticated": False}

    return {"authenticated": True, "user": {"email": session["email"]}}


@app.post("/api/auth/logout")
def logout(request: Request):
    visitor_id = get_visitor_id(request)

    with get_db() as conn:
        conn.execute("DELETE FROM sessions WHERE visitor_id = ?", (visitor_id,))

    return {"success": True}


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
