/* ===== API ===== */
var API = window.location.origin;

/* ===== AUTH STATE ===== */
var isAuthenticated = false;
var currentUser = null;

/* ===== CAMP DATA ===== */
var CAMPS = [
  // === IVY LEAGUE ===
  { id:"harvard", school:"Harvard", campName:"Andrew Aurich Football Camp", league:"ivy", lat:42.3770, lng:-71.1167, dates:"June 25, 29 & July 8, 12, 13, 2025", cost:"$150", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Andrew Aurich", location:"Harvard Athletics, Boston, MA", registrationUrl:"https://andrewaurichfootball.totalcamps.com/", notes:"Multiple one-day sessions. Specialists welcome at early sessions. Run by Harvard Football coaching staff." },
  { id:"yale", school:"Yale", campName:"Eli Football Camps", league:"ivy", lat:41.3112, lng:-72.9600, dates:"June 22, 2025 (multiple dates)", cost:"$170", eligibility:"Ages 13-19", type:"Prospect Camp", coach:"Sean McGowan", location:"Yale Bowl, New Haven, CT", registrationUrl:"https://www.elifootballcamps.com", notes:"One-day camp. Position development and skill improvement. Multiple dates in June/July." },
  { id:"princeton", school:"Princeton", campName:"Tiger Football Camp", league:"ivy", lat:40.3440, lng:-74.6514, dates:"June 14, 27 & July 5, 11, 18, 2026", cost:"$130", eligibility:"Grades 9-12", type:"Skills/Prospect Camp", coach:"Bob Surace", location:"Natale Field, Princeton, NJ", registrationUrl:"https://info.abcsportscamps.com/tiger-football-camp", notes:"Position-specific instruction and competition led by Princeton staff. Contact: TigerFootballCamp@gmail.com" },
  { id:"penn", school:"Penn", campName:"Penn Football Camps", league:"ivy", lat:39.9502, lng:-75.1932, dates:"July 13, 2026 (multiple dates)", cost:"$155", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Rick Santos", location:"Franklin Field, Philadelphia, PA", registrationUrl:"https://www.pennfootballcamp.com/shop/EVENT", notes:"One-day evaluation camps. Open to all. Multiple sessions available throughout summer." },
  { id:"columbia", school:"Columbia", campName:"Jon Poppe Football Camps", league:"ivy", lat:40.8075, lng:-73.9626, dates:"Summer 2026 (dates TBD)", cost:"$155", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Jon Poppe", location:"Wien Stadium, New York, NY", registrationUrl:"https://jonpoppefootball.totalcamps.com/", notes:"1-on-1 coaching, competition, and testing in front of college coaches." },
  { id:"cornell", school:"Cornell", campName:"Specialist Camp", league:"ivy", lat:42.4534, lng:-76.4735, dates:"June 28, 2025", cost:"$75", eligibility:"HS Specialists (K/P/LS)", type:"Specialist Camp", coach:"Dan Swanstrom", location:"Schoellkopf Field, Ithaca, NY", registrationUrl:"http://www.danswanstromfootballcamps.com", notes:"Specialist-only camp for kickers, punters, and long snappers. Check site for 2026 dates." },
  { id:"dartmouth", school:"Dartmouth", campName:"Sammy McCorkle Football Camps", league:"ivy", lat:43.7044, lng:-72.2887, dates:"July 10, 2026", cost:"$163", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Sammy McCorkle", location:"Dartmouth College, Hanover, NH", registrationUrl:"https://www.sammymccorklefootballcamps.com", notes:"One-day camps with position-specific skills training. DII/DIII programs also attend. Specialist camp also available." },
  { id:"brown", school:"Brown", campName:"James Perry Football Camps", league:"ivy", lat:41.8268, lng:-71.4025, dates:"June 22, 2026", cost:"$100", eligibility:"Grades 9-12", type:"Skills Camp", coach:"James Perry", location:"235 Hope Street, Providence, RI", registrationUrl:"https://brownfootball.totalcamps.com/shop/product/565976/679562", notes:"Evening 'Under the Lights' sessions. Contact: football@brown.edu (401-863-3843)." },

  // === NESCAC ===
  { id:"williams", school:"Williams", campName:"Purple & Gold Football Camps", league:"nescac", lat:42.7130, lng:-73.2037, dates:"July 18, 2026", cost:"$105", eligibility:"Grades 10-12", type:"Prospect/Skills Camp", coach:"Mark Raymond", location:"Weston Field, Williamstown, MA", registrationUrl:"https://www.purpleandgoldfootballcamps.com/one-day-camps.cfm", notes:"Fundamentals instruction with recruiting presentation by Williams coaching staff." },
  { id:"amherst", school:"Amherst", campName:"Amherst Football Prospect Camps", league:"nescac", lat:42.3709, lng:-72.5168, dates:"Summer 2025 (dates TBA)", cost:"TBA", eligibility:"HS Prospects", type:"Prospect Camp", coach:"E.J. Mills", location:"Pratt Field, Amherst, MA", registrationUrl:"https://amherstfootball.totalcamps.com/", notes:"Check TotalCamps site and @AmherstFB on social media for 2025 date announcements." },
  { id:"middlebury", school:"Middlebury", campName:"Middlebury Prospect Camp", league:"nescac", lat:44.0153, lng:-73.1773, dates:"July 26, 2025", cost:"Contact camps@middlebury.edu", eligibility:"HS Prospects", type:"Prospect Camp", coach:"Doug Mandigo", location:"Middlebury College, Middlebury, VT", registrationUrl:"https://middleburycollegefootballcamps.totalcamps.com/", notes:"Contact St. Clair Ryan (saryan@middlebury.edu, 802-443-5250) for details." },
  { id:"tufts", school:"Tufts", campName:"No Official Camp (Third-Party Nearby)", league:"nescac", lat:42.4075, lng:-71.1190, dates:"N/A", cost:"N/A", eligibility:"N/A", type:"No Official Camp", coach:"Jay Civetti", location:"Tufts University, Medford, MA", registrationUrl:"", notes:"No official Tufts football camp found. New England Elite Clinic (third-party) held at Tufts: June 25-26, 2026 ($395, grades 8-12)." },
  { id:"bowdoin", school:"Bowdoin", campName:"Polar Bear One-Day Clinic", league:"nescac", lat:43.9074, lng:-69.9653, dates:"April 13, 2025", cost:"$126", eligibility:"Grades 10-12", type:"Prospect/Skills Camp", coach:"B.J. Hammer", location:"Whittier Field, Brunswick, ME", registrationUrl:"https://www.polarbearfootballcamps.com/one-day-camps.cfm", notes:"Non-contact clinic with testing and positional work. Check site for summer dates." },
  { id:"bates", school:"Bates", campName:"Bobcat Football Clinic", league:"nescac", lat:44.1053, lng:-70.2028, dates:"July 20, 2025 (1-4 PM)", cost:"$65", eligibility:"Grades 9-12", type:"Prospect/Skills Camp", coach:"Matt Coyne", location:"Garcelon Field, Lewiston, ME", registrationUrl:"https://register.ryzer.com/camp.cfm?id=301928", notes:"Includes position drills, college practice observation, scrimmage, and campus tour." },
  { id:"colby", school:"Colby", campName:"Mules One-Day Elite Football Camp", league:"nescac", lat:44.5639, lng:-69.6628, dates:"July (date TBD)", cost:"$80", eligibility:"Grades 10-12", type:"Elite Prospect Camp", coach:"Jack Cosgrove", location:"Harold Alfond Athletic Center, Waterville, ME", registrationUrl:"", notes:"Non-contact evaluations. Check colbyathletics.com for updated 2025 dates." },
  { id:"wesleyan", school:"Wesleyan", campName:"Red and Black Football Camp", league:"mega", lat:41.5565, lng:-72.6558, dates:"Apr 12 & Jun 29, 2026", cost:"~$160/session", eligibility:"Grades 10-12", type:"Academic Mega Camp", coach:"Dan DiCenzo", location:"Citrin Field, Middletown, CT", registrationUrl:"https://wesleyanfootballcamps.ryzerevents.com", notes:"50+ college coaches from NESCAC, Ivy League, and Patriot League attend. Low-contact, position-specific drills and 1-on-1s. Limited spots." },
  { id:"hamilton", school:"Hamilton", campName:"Continental Football Camps", league:"nescac", lat:43.0526, lng:-75.4013, dates:"Summer (dates TBA)", cost:"TBA", eligibility:"Ages 15-18", type:"Prospect Camp", coach:"Dave Murray", location:"Steuben Field, Clinton, NY", registrationUrl:"https://www.continentalfootballcamp.com", notes:"Check athletics.hamilton.edu for spring/summer 2026 announcements. Contact dmurray@hamilton.edu." },
  { id:"trinity", school:"Trinity (CT)", campName:"Bantam Football Camp", league:"nescac", lat:41.7472, lng:-72.6906, dates:"Summer (dates TBA)", cost:"TBA", eligibility:"HS Prospects", type:"Prospect Camp", coach:"Jeff Devanney", location:"Trinity College, Hartford, CT", registrationUrl:"", notes:"Trinity College (Hartford, CT) — NESCAC school. Check bantamsports.com for camp announcements." },

  // === PATRIOT LEAGUE ===
  { id:"lehigh", school:"Lehigh", campName:"Brown and White Football Camps", league:"patriot", lat:40.6084, lng:-75.3785, dates:"July 11-12, 2025 (4-8 PM)", cost:"$107 online / $160 walk-up", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Kevin Cahill", location:"Whitehead Practice Field, Bethlehem, PA", registrationUrl:"https://www.brownandwhitefootballcamp.com/prospect-camps.cfm", notes:"Led by Lehigh Football staff. Sibling discount $25 off. Walk-ups welcome." },
  { id:"lafayette", school:"Lafayette", campName:"Lafayette Football Prospect Camp", league:"patriot", lat:40.6978, lng:-75.2153, dates:"June 18, 2026 (+ July 14)", cost:"$75 / $80 walk-up", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"John Troxell", location:"826 West Pierce St, Easton, PA", registrationUrl:"https://lafayettefootballcamps.totalcamps.com/shop", notes:"Two prospect camps plus a specialist camp (July 14). Contact: Tyler Noll nollt@lafayette.edu." },
  { id:"bucknell", school:"Bucknell", campName:"Summer Prospect Camps", league:"patriot", lat:40.9537, lng:-76.8837, dates:"June 18, July 11, July 18, 2025", cost:"$75 pre-register / $100 walk-up", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Jeff Behrman", location:"Christy Mathewson Memorial Stadium, Lewisburg, PA", registrationUrl:"https://www.totalcamps.com/BUCKNELLFOOTBALL", notes:"Three camps: Big Man Camp (June 18), Prospect Camps (July 11 & 18). 6:15-9:00 PM sessions." },
  { id:"colgate", school:"Colgate", campName:"Colgate Football Prospect Camps", league:"patriot", lat:42.8183, lng:-75.5396, dates:"Summer 2025 (dates TBA)", cost:"TBA", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Curt Fitzpatrick", location:"Andy Kerr Stadium, Hamilton, NY", registrationUrl:"https://colgatefootball.totalcamps.com/Content/26926", notes:"Hosted on TotalCamps platform. Check site for date announcements." },
  { id:"holycross", school:"Holy Cross", campName:"Holy Cross Football Clinics", league:"patriot", lat:42.2368, lng:-71.8095, dates:"Summer 2025 (dates TBA)", cost:"TBA", eligibility:"Juniors & Seniors", type:"Prospect Showcase", coach:"Dan Curran", location:"Luth Athletic Complex, Worcester, MA", registrationUrl:"https://holycrossfootballclinics.totalcamps.com", notes:"Prospect showcases and skills clinics. Summer showcases typically in July." },
  { id:"georgetown", school:"Georgetown", campName:"Georgetown Prospect Camps", league:"patriot", lat:38.9076, lng:-77.0723, dates:"June 8, July 11-12, July 18, 2025", cost:"~$100 (specialists)", eligibility:"HS Players", type:"Prospect Camp", coach:"Rob Sgarlata", location:"Cooper Field, Washington, D.C.", registrationUrl:"https://guhoyas.com/news/2025/1/30/georgetown-football-releases-2025-prospect-camp-dates", notes:"Multiple sessions: Prospect camps, 7-on-7 (June 7), Big Man OL/DL (June 7), Specialist K/P/LS (July 18 evening). Contact: jwe10@georgetown.edu." },
  { id:"fordham", school:"Fordham", campName:"Joe Conlin Prospect Football Camp", league:"patriot", lat:40.8599, lng:-73.8863, dates:"June 11, 2025", cost:"$75 ($38 specialists)", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Joe Conlin", location:"Jack Coffey Field, Bronx, NY", registrationUrl:"https://www.joeconlinfootballcamps.com/summer-camps.cfm", notes:"Specialist discount: $38 for K/P/LS. Helmets recommended (BYO). Check site for 2026 dates." },

  // === ACADEMIC MEGA CAMPS ===
  { id:"ne-elite", school:"New England Elite", campName:"NE Elite Football Clinic", league:"mega", lat:42.4075, lng:-71.1190, dates:"June 25-26, 2026", cost:"$395", eligibility:"Grades 8-12", type:"Academic Mega Camp", coach:"Multi-School Staff", location:"Tufts University, Medford, MA", registrationUrl:"https://newenglandelitefootballclinic.com/clinic/", notes:"Two-day multi-school mega camp hosted at Tufts. Ivy, NESCAC, Patriot, and DIII coaches attend. Academic recruiting focus. Run by Pete Colombo." },
  { id:"marist-mega", school:"Marist Exposure Camp", campName:"Marist Exposure Camp", league:"mega", lat:41.7284, lng:-73.9316, dates:"June 1, 2025", cost:"$175", eligibility:"Grades 9-12", type:"Academic Mega Camp", coach:"Multi-School Staff", location:"Marist College, Poughkeepsie, NY", registrationUrl:"https://maristexposurecamp.com", notes:"40+ college coaching staffs in attendance. Exposure combine format — testing, position drills, and 1-on-1s. Check site for 2026 dates." },
  { id:"miami-oh-mega", school:"Miami (OH) Academic", campName:"Academic Mega Camp", league:"mega", lat:39.5050, lng:-84.7324, dates:"June 11-12, 2026", cost:"$150 (late: $200)", eligibility:"3.0+ GPA, Grades 9-12", type:"Academic Mega Camp", coach:"Chuck Martin", location:"Miami University, Oxford, OH", registrationUrl:"https://miamiuniversityfootballcamps.totalcamps.com", notes:"Two-day academic mega camp. 3.0+ GPA required. FBS, FCS, DIII programs present. Overnight housing available at extra cost." },
  { id:"fordham-mega", school:"Fordham Mega Camp", campName:"Fordham Mega Camp", league:"mega", lat:40.8599, lng:-73.8863, dates:"June 4, 2026", cost:"$75 ($38 specialists)", eligibility:"Grades 9-12", type:"Academic Mega Camp", coach:"Joe Conlin", location:"Jack Coffey Field, Bronx, NY", registrationUrl:"https://www.joeconlinfootballcamps.com/mega-camp.cfm", notes:"Multi-school mega camp at Fordham. Specialist discount: $38 for K/P/LS. Patriot, Ivy, and NEC coaches attend." },
  { id:"uconn-mega", school:"UConn Mega Camp", campName:"UConn Mega Camp", league:"mega", lat:41.8077, lng:-72.2540, dates:"May 31 & June 1, 2025", cost:"$45", eligibility:"Grades 9-12", type:"Academic Mega Camp", coach:"Jim Mora Jr.", location:"UConn, Storrs, CT", registrationUrl:"https://jimmorafootball.totalcamps.com", notes:"Large multi-school mega camp hosted at UConn. Very affordable. FBS, FCS, and DIII coaches attend. Check site for 2026 dates." },
  { id:"catholic-mega", school:"Best on Best Mega", campName:"Best on Best Mega Camp", league:"mega", lat:38.9373, lng:-76.9987, dates:"June 1, 2025", cost:"TBD", eligibility:"Grades 9-12", type:"Academic Mega Camp", coach:"Coach Gutman", location:"Catholic University, Washington, DC", registrationUrl:"https://eventcreate.com/coachgutmegacamp2025", notes:"Academic mega camp at Catholic University. D.C. area. Multiple coaching staffs attend. Check site for 2026 dates." },
  { id:"cfb-prospects", school:"CFB Prospects", campName:"College Football Prospects Camp", league:"mega", lat:41.7540, lng:-72.7120, dates:"May 4, 2025", cost:"$199-$349", eligibility:"Grades 9-12", type:"Academic Mega Camp", coach:"Multi-School Staff", location:"Kingswood Oxford, West Hartford, CT", registrationUrl:"https://collegefootballprospects.com/west-hartford-ct.cfm", notes:"Regional multi-school combine. Testing, position drills, film review. Ivy, NESCAC, and Patriot coaches on-site. Check site for 2026." },
  { id:"hotbed-tour", school:"Football Hotbed", campName:"Ivy Tour", league:"mega", lat:42.3770, lng:-71.1167, dates:"July 6-10, 2026", cost:"TBD", eligibility:"3.8+ GPA, Grades 10-12", type:"Academic Mega Camp", coach:"Multi-School Staff", location:"Multi-School NE Tour", registrationUrl:"https://footballhotbed.com", notes:"Week-long Ivy League campus tour. Visit multiple Ivy campuses with coaching staff interactions. 3.8+ GPA required. Highly selective." },
  { id:"first-goal-ne", school:"First & Goal NE", campName:"Northeast Showcase", league:"mega", lat:41.3112, lng:-72.9280, dates:"May 17, 2026", cost:"TBD", eligibility:"Grades 9-12", type:"Academic Mega Camp", coach:"Multi-School Staff", location:"TBD (Northeast)", registrationUrl:"https://firstandgoalsportscamps.com/northeast-showcase/", notes:"Regional mega showcase. High-academic programs from Ivy, NESCAC, and Patriot League attend. Check site for location and registration." },
  { id:"empire-elite", school:"Empire Elite (Union)", campName:"Empire Elite Camp", league:"mega", lat:42.8168, lng:-73.9283, dates:"June 7, 2026", cost:"TBD", eligibility:"Grades 9-12", type:"Academic Mega Camp", coach:"Jon Drach / NE Elite Staff", location:"Frank Bailey Stadium, Union College, Schenectady, NY", registrationUrl:"https://www.unioncollegefb.com", notes:"Powered by New England Elite. DI through high-academic DIII coaches attend. Hosted at Union College (Liberty League). Register via Ryzer platform." },

  // === D3 HIGH-ACADEMIC ===
  { id:"pomona-pitzer", school:"Pomona-Pitzer", campName:"Sagehen Football Summer Camp", league:"d3", lat:34.0870, lng:-117.7250, dates:"July 27, 2025 (Jul 26, 2026)", cost:"$80", eligibility:"HS Prospects", type:"Prospect Camp", coach:"John Walsh", location:"Merritt Field, Pomona College, Claremont, CA", registrationUrl:"https://sagehens.com/sports/2023/8/10/2025-sagehen-football-summer-camp.aspx", notes:"Helmets only. Positional drills, competitive periods, campus tours, recruiting info session. SCIAC D3." },
  { id:"cms", school:"Claremont-Mudd-Scripps", campName:"Stags Football Camp", league:"d3", lat:34.1120, lng:-117.6940, dates:"July 18, 2025", cost:"Contact for details", eligibility:"HS Prospects", type:"Prospect Camp", coach:"Kyle Sweeney", location:"Zinda Field, Claremont, CA", registrationUrl:"https://cmsstagfootballcamps.totalcamps.com", notes:"Official CMS Stags camp. Grouped by age/ability. Run by CMS coaching staff and players. SCIAC D3." },
  { id:"kenyon", school:"Kenyon", campName:"No Official Camp", league:"d3", lat:40.3756, lng:-82.3965, dates:"N/A", cost:"N/A", eligibility:"N/A", type:"No Official Camp", coach:"Ian Good", location:"McBride Field, Gambier, OH", registrationUrl:"", notes:"No official summer camp found. Coaches attend external events. Contact football staff for visit opportunities. NCAC D3." },
  { id:"washu", school:"WashU", campName:"WashU Football Prospect Camp", league:"d3", lat:38.6488, lng:-90.3108, dates:"June 21 & July 26, 2026", cost:"$110", eligibility:"Soph/Jr/Sr", type:"Prospect Camp", coach:"Aaron Keen", location:"Francis Olympic Field, St. Louis, MO", registrationUrl:"https://washubears.com/sports/2022/6/6/summer-camps-football-Prospect-Football-Camp.aspx", notes:"All positions. Includes facility/campus tours, lunch, recruiting info. Contact: Jeff Fisher fisherjeffry@wustl.edu. UAA D3." },
  { id:"uchicago", school:"Chicago", campName:"Football Prospect Camp", league:"d3", lat:41.7915, lng:-87.6019, dates:"July 17, 2026", cost:"$75", eligibility:"HS Prospects", type:"Prospect Camp", coach:"Craig Knoche", location:"Ratner Center, 5530 S. Ellis, Chicago, IL", registrationUrl:"https://universityofchicagofootball.totalcamps.com/shop/EVENT", notes:"One-day prospect camp. Skill instruction, competitive drills, optional campus tour, admissions talk. UAA D3." },
  { id:"carnegie-mellon", school:"Carnegie Mellon", campName:"Nike Football Skills Camp at CMU", league:"d3", lat:40.4433, lng:-79.9435, dates:"July 27-30, 2026", cost:"TBD (register for details)", eligibility:"Ages 8-14", type:"Skills Camp (Third-Party)", coach:"Ryan Larsen", location:"Gesling Stadium, Pittsburgh, PA", registrationUrl:"https://www.ussportscamps.com/football/nike-1/nike-skills-football-camp-carnegie-mellon-university", notes:"Third-party Nike camp directed by CMU head coach. Non-contact skills, day camp format. No official CMU prospect camp found. PAC D3." },
  { id:"johns-hopkins", school:"Johns Hopkins", campName:"No Official Camp", league:"d3", lat:39.3299, lng:-76.6205, dates:"N/A", cost:"N/A", eligibility:"N/A", type:"No Official Camp", coach:"Dan Wodicka", location:"Homewood Field, Baltimore, MD", registrationUrl:"", notes:"No official prospect camp announced for 2025/2026. Coaches attend external camps for evaluation. Contact staff for visit info. Centennial D3." },
  { id:"grinnell", school:"Grinnell", campName:"No Official Camp", league:"d3", lat:41.7434, lng:-92.7230, dates:"N/A", cost:"N/A", eligibility:"N/A", type:"No Official Camp", coach:"Brent Barnes", location:"Rosenbloom Field, Grinnell, IA", registrationUrl:"", notes:"No official camp found. Midwest Elite Football Clinic (third-party) sometimes held at Grinnell. Contact staff for visit info. MWC D3." }
];


/* ===== STATE ===== */
var activeLeagues = new Set(["ivy", "nescac", "patriot", "mega", "d3"]);
var searchQuery = "";
var selectedCampId = null;
var map = null;
var markers = {};

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", function() {
  initTheme();
  initMap();
  initFilters();
  initSearch();
  renderKPIs();
  renderCamps();
  placeMarkers();
  handleStripeReturn();
  checkAuth();
  if (window.lucide) { lucide.createIcons(); }
});


/* ===== AUTH ===== */
function checkAuth() {
  fetch(API + "/api/auth/me")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.authenticated) {
        setAuthenticated(true, data.user);
      } else {
        setAuthenticated(false, null);
      }
    })
    .catch(function() {
      setAuthenticated(false, null);
    });
}

function setAuthenticated(auth, user) {
  isAuthenticated = auth;
  currentUser = user;

  var dashboard = document.getElementById("teaserDashboard");
  var paywallOverlay = document.getElementById("paywallOverlay");
  var landing = document.getElementById("landingPage");
  var authBtn = document.getElementById("headerAuthBtn");

  if (auth) {
    // Move dashboard out of the landing page wrapper to become top-level
    if (dashboard.parentElement !== document.body) {
      document.body.insertBefore(dashboard, document.body.firstChild);
    }

    dashboard.classList.remove("teaser-mode");
    dashboard.classList.add("authenticated");
    paywallOverlay.classList.add("hidden");

    // Hide landing page entirely
    landing.style.display = "none";

    // Make dashboard fill the viewport
    dashboard.style.position = "fixed";
    dashboard.style.inset = "0";
    dashboard.style.height = "100vh";
    dashboard.style.width = "100vw";
    dashboard.style.zIndex = "900";
    dashboard.style.borderRadius = "0";
    dashboard.style.overflow = "hidden";

    // Update header button to show user info
    if (authBtn) {
      authBtn.outerHTML = '<div class="user-info"><span class="user-email">' + escapeHtml(user.email) + '</span><button class="btn-logout" onclick="handleLogout()">Log out</button></div>';
    }

    // Resize map after layout settles
    if (map) {
      setTimeout(function() {
        map.invalidateSize();
        placeMarkers();
      }, 300);
    }
  } else {
    dashboard.classList.add("teaser-mode");
    dashboard.classList.remove("authenticated");
    paywallOverlay.classList.remove("hidden");
    landing.style.display = "";
    dashboard.style.position = "";
    dashboard.style.inset = "";
    dashboard.style.height = "";
    dashboard.style.width = "";
    dashboard.style.zIndex = "";
    dashboard.style.overflow = "";
  }
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ===== MODALS ===== */
function showModal(type) {
  closeModal();
  var backdrop = document.getElementById("modalBackdrop");
  backdrop.classList.add("visible");

  if (type === "pricing") {
    document.getElementById("pricingModal").classList.add("visible");
  } else if (type === "login") {
    document.getElementById("loginModal").classList.add("visible");
  }
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("visible");
  document.getElementById("pricingModal").classList.remove("visible");
  document.getElementById("loginModal").classList.remove("visible");
  // Clear errors
  var pe = document.getElementById("pricingError");
  var le = document.getElementById("loginError");
  if (pe) { pe.textContent = ""; }
  if (le) { le.textContent = ""; }
}

function switchModal(type) {
  closeModal();
  setTimeout(function() { showModal(type); }, 100);
}

/* ===== PAYMENT / REGISTER ===== */
function handlePayment() {
  var email = document.getElementById("payEmail").value.trim();
  var password = document.getElementById("payPassword").value;
  var errorEl = document.getElementById("pricingError");
  var btnText = document.getElementById("payBtnText");
  var btnLoading = document.getElementById("payBtnLoading");
  var btn = document.getElementById("payBtn");

  errorEl.textContent = "";

  if (!email || !email.includes("@")) {
    errorEl.textContent = "Please enter a valid email address.";
    return;
  }
  if (password.length < 8) {
    errorEl.textContent = "Password must be at least 8 characters.";
    return;
  }

  btn.disabled = true;
  btnText.style.display = "none";
  btnLoading.style.display = "inline";

  // Create Stripe Checkout session and redirect
  fetch(API + "/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password })
  })
    .then(function(res) {
      if (!res.ok) { return res.json().then(function(d) { throw new Error(d.detail || "Something went wrong"); }); }
      return res.json();
    })
    .then(function(data) {
      // Redirect to Stripe's hosted checkout page
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    })
    .catch(function(err) {
      errorEl.textContent = err.message;
      btn.disabled = false;
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
    });
}

/* Handle return from Stripe Checkout */
function handleStripeReturn() {
  var params = new URLSearchParams(window.location.search);
  var sessionId = params.get("session_id");
  var email = params.get("email");
  var pw = params.get("pw");

  if (sessionId && email && pw) {
    // Clean the URL
    window.history.replaceState({}, document.title, window.location.pathname);

    // Complete registration with verified Stripe session
    fetch(API + "/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pw, stripe_session_id: sessionId })
    })
      .then(function(res) {
        if (!res.ok) { return res.json().then(function(d) { throw new Error(d.detail || "Registration failed"); }); }
        return res.json();
      })
      .then(function(data) {
        setAuthenticated(true, data.user);
      })
      .catch(function(err) {
        // If registration fails (e.g. email exists), show login
        alert("Payment successful! " + err.message);
      });
  }
}

/* ===== LOGIN ===== */
function handleLogin() {
  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value;
  var errorEl = document.getElementById("loginError");
  var btnText = document.getElementById("loginBtnText");
  var btnLoading = document.getElementById("loginBtnLoading");
  var btn = document.getElementById("loginBtn");

  errorEl.textContent = "";

  if (!email || !email.includes("@")) {
    errorEl.textContent = "Please enter a valid email address.";
    return;
  }
  if (!password) {
    errorEl.textContent = "Please enter your password.";
    return;
  }

  btn.disabled = true;
  btnText.style.display = "none";
  btnLoading.style.display = "inline";

  fetch(API + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password })
  })
    .then(function(res) {
      if (!res.ok) { return res.json().then(function(d) { throw new Error(d.detail || "Login failed"); }); }
      return res.json();
    })
    .then(function(data) {
      closeModal();
      setAuthenticated(true, data.user);
    })
    .catch(function(err) {
      errorEl.textContent = err.message;
    })
    .finally(function() {
      btn.disabled = false;
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
    });
}

/* ===== LOGOUT ===== */
function handleLogout() {
  fetch(API + "/api/auth/logout", { method: "POST" })
    .then(function() {
      window.location.reload();
    })
    .catch(function() {
      window.location.reload();
    });
}


/* ===== THEME ===== */
function initTheme() {
  var toggles = document.querySelectorAll("[data-theme-toggle]");
  var root = document.documentElement;
  var dark = matchMedia("(prefers-color-scheme:dark)").matches;
  var theme = dark ? "dark" : "light";
  root.setAttribute("data-theme", theme);
  toggles.forEach(function(t) { updateToggleIcon(t, theme); });

  toggles.forEach(function(toggle) {
    toggle.addEventListener("click", function() {
      theme = theme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", theme);
      toggles.forEach(function(t) { updateToggleIcon(t, theme); });
      if (map) {
        map.eachLayer(function(layer) { if (layer._url) { map.removeLayer(layer); } });
        addTileLayer(theme);
      }
    });
  });
}

function updateToggleIcon(btn, theme) {
  btn.innerHTML = theme === "dark"
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  btn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
}


/* ===== MAP ===== */
function initMap() {
  map = L.map("map", { center: [41.5, -73.5], zoom: 7, zoomControl: true, attributionControl: true });
  var theme = document.documentElement.getAttribute("data-theme") || "light";
  addTileLayer(theme);
}

function addTileLayer(theme) {
  var url = theme === "dark"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  L.tileLayer(url, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">CARTO</a>',
    maxZoom: 19
  }).addTo(map);
}

function placeMarkers() {
  Object.values(markers).forEach(function(m) { map.removeLayer(m); });
  markers = {};
  var filtered = getFilteredCamps();
  var bounds = [];

  filtered.forEach(function(camp) {
    var icon = L.divIcon({
      className: "custom-marker-wrapper",
      html: '<div class="custom-marker ' + camp.league + (camp.id === selectedCampId ? " active" : "") + '">' + getLeagueInitial(camp.league) + "</div>",
      iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -20]
    });
    var marker = L.marker([camp.lat, camp.lng], { icon: icon });
    marker.on("click", function() { selectCamp(camp.id); });
    marker.addTo(map);
    markers[camp.id] = marker;
    bounds.push([camp.lat, camp.lng]);
  });

  if (bounds.length > 0) { map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 }); }
}

function getLeagueInitial(league) {
  switch (league) {
    case "ivy": return "I";
    case "nescac": return "N";
    case "patriot": return "P";
    case "mega": return "M";
    case "d3": return "A";
    default: return "?";
  }
}


/* ===== FILTERS ===== */
function initFilters() {
  document.querySelectorAll(".league-chip").forEach(function(chip) {
    chip.addEventListener("click", function() {
      var league = this.getAttribute("data-league");
      if (activeLeagues.has(league)) {
        if (activeLeagues.size > 1) { activeLeagues.delete(league); this.classList.add("inactive"); }
      } else {
        activeLeagues.add(league); this.classList.remove("inactive");
      }
      renderCamps(); placeMarkers(); renderKPIs();
    });
  });
}


/* ===== SEARCH ===== */
function initSearch() {
  var input = document.getElementById("searchInput");
  input.addEventListener("input", function() {
    searchQuery = this.value.toLowerCase().trim();
    renderCamps(); placeMarkers(); renderKPIs();
  });
}


/* ===== FILTERING ===== */
function getFilteredCamps() {
  return CAMPS.filter(function(camp) {
    if (!activeLeagues.has(camp.league)) { return false; }
    if (searchQuery) {
      var haystack = (camp.school + " " + camp.campName + " " + camp.location + " " + camp.coach + " " + camp.type).toLowerCase();
      if (!haystack.includes(searchQuery)) { return false; }
    }
    return true;
  });
}


/* ===== KPIs ===== */
function renderKPIs() {
  var filtered = getFilteredCamps();
  var ivyCount = filtered.filter(function(c) { return c.league === "ivy"; }).length;
  var nescacCount = filtered.filter(function(c) { return c.league === "nescac"; }).length;
  var patriotCount = filtered.filter(function(c) { return c.league === "patriot"; }).length;
  var megaCount = filtered.filter(function(c) { return c.league === "mega"; }).length;
  var d3Count = filtered.filter(function(c) { return c.league === "d3"; }).length;

  document.getElementById("kpiStrip").innerHTML =
    '<div class="kpi-item"><span class="kpi-value">' + filtered.length + '</span>Camps</div>' +
    '<div class="kpi-item"><span class="kpi-value">' + ivyCount + '</span>Ivy</div>' +
    '<div class="kpi-item"><span class="kpi-value">' + nescacCount + '</span>NESCAC</div>' +
    '<div class="kpi-item"><span class="kpi-value">' + patriotCount + '</span>Patriot</div>' +
    '<div class="kpi-item"><span class="kpi-value">' + megaCount + '</span>Mega</div>' +
    '<div class="kpi-item"><span class="kpi-value">' + d3Count + '</span>D3 Acad</div>';
}


/* ===== CAMP LIST ===== */
function renderCamps() {
  var filtered = getFilteredCamps();
  var list = document.getElementById("campList");
  var countEl = document.getElementById("campCount");

  countEl.textContent = filtered.length + " camp" + (filtered.length !== 1 ? "s" : "") + " shown";

  if (filtered.length === 0) {
    list.innerHTML = '<div class="no-results">No camps match your filters. Try broadening your search.</div>';
    return;
  }

  var leagueOrder = { ivy: 0, nescac: 1, patriot: 2, mega: 3, d3: 4 };
  filtered.sort(function(a, b) {
    if (leagueOrder[a.league] !== leagueOrder[b.league]) { return leagueOrder[a.league] - leagueOrder[b.league]; }
    return a.school.localeCompare(b.school);
  });

  list.innerHTML = filtered.map(function(camp) {
    var hasUrl = camp.registrationUrl && camp.registrationUrl.length > 0;
    return '<div class="camp-card' + (camp.id === selectedCampId ? " active" : "") + '" data-camp-id="' + camp.id + '">' +
      '<div class="camp-card-header">' +
        '<span class="camp-school">' + camp.school + '</span>' +
        '<span class="camp-league-badge ' + camp.league + '">' + camp.league.toUpperCase() + '</span>' +
      '</div>' +
      '<div class="camp-name">' + camp.campName + '</div>' +
      '<div class="camp-meta">' +
        (camp.dates !== "N/A" ? '<div class="camp-meta-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' + camp.dates + '</div>' : '') +
        (camp.cost !== "N/A" && camp.cost !== "TBA" ? '<div class="camp-meta-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><span class="camp-cost">' + camp.cost + '</span></div>' : '') +
        '<div class="camp-meta-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' + camp.eligibility + '</div>' +
      '</div>' +
      '<div class="camp-card-actions">' +
        (hasUrl
          ? '<a href="' + camp.registrationUrl + '" class="btn-register" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Register</a>'
          : '<span class="btn-register disabled">Dates TBA</span>') +
      '</div>' +
    '</div>';
  }).join("");

  list.querySelectorAll(".camp-card").forEach(function(card) {
    card.addEventListener("click", function(e) {
      if (e.target.closest(".btn-register")) { return; }
      selectCamp(this.getAttribute("data-camp-id"));
    });
  });
}


/* ===== SELECT CAMP ===== */
function selectCamp(campId) {
  // If not authenticated and clicking on a camp, show paywall
  if (!isAuthenticated) {
    showModal("pricing");
    return;
  }

  selectedCampId = campId;
  var camp = CAMPS.find(function(c) { return c.id === campId; });
  if (!camp) { return; }

  document.querySelectorAll(".camp-card").forEach(function(c) {
    c.classList.toggle("active", c.getAttribute("data-camp-id") === campId);
  });

  Object.entries(markers).forEach(function(entry) {
    var el = entry[1].getElement();
    if (el) {
      var inner = el.querySelector(".custom-marker");
      if (inner) { inner.classList.toggle("active", entry[0] === campId); }
    }
  });

  map.flyTo([camp.lat, camp.lng], 10, { duration: 0.8 });
  showDetailPanel(camp);

  var card = document.querySelector('.camp-card[data-camp-id="' + campId + '"]');
  if (card) { card.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
}


/* ===== DETAIL PANEL ===== */
function showDetailPanel(camp) {
  var panel = document.getElementById("detailPanel");
  var hasUrl = camp.registrationUrl && camp.registrationUrl.length > 0;

  panel.innerHTML =
    '<div class="detail-header">' +
      '<div>' +
        '<div class="detail-school-name">' + camp.school + ' <span class="camp-league-badge ' + camp.league + '">' + camp.league.toUpperCase() + '</span></div>' +
        '<div class="detail-camp-name">' + camp.campName + '</div>' +
      '</div>' +
      '<button class="detail-close" id="detailClose" aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    '</div>' +
    '<div class="detail-body">' +
      '<div class="detail-info-grid">' +
        '<div class="detail-info-item"><span class="detail-label">Dates</span><span class="detail-value">' + camp.dates + '</span></div>' +
        '<div class="detail-info-item"><span class="detail-label">Cost</span><span class="detail-value">' + camp.cost + '</span></div>' +
        '<div class="detail-info-item"><span class="detail-label">Eligibility</span><span class="detail-value">' + camp.eligibility + '</span></div>' +
        '<div class="detail-info-item"><span class="detail-label">Type</span><span class="detail-value">' + camp.type + '</span></div>' +
        '<div class="detail-info-item"><span class="detail-label">Head Coach</span><span class="detail-value">' + camp.coach + '</span></div>' +
        '<div class="detail-info-item"><span class="detail-label">Location</span><span class="detail-value">' + camp.location + '</span></div>' +
      '</div>' +
      (camp.notes ? '<div class="detail-notes">' + camp.notes + '</div>' : '') +
      (hasUrl
        ? '<a href="' + camp.registrationUrl + '" class="detail-register-btn" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Register for Camp</a>'
        : '<span class="detail-register-btn" style="background:var(--color-border);color:var(--color-text-faint);pointer-events:none;">Registration Coming Soon</span>') +
    '</div>';

  panel.classList.add("visible");

  document.getElementById("detailClose").addEventListener("click", function() {
    panel.classList.remove("visible");
    selectedCampId = null;
    document.querySelectorAll(".camp-card").forEach(function(c) { c.classList.remove("active"); });
    Object.values(markers).forEach(function(m) {
      var el = m.getElement();
      if (el) {
        var inner = el.querySelector(".custom-marker");
        if (inner) { inner.classList.remove("active"); }
      }
    });
  });
}
