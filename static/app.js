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

  // === NEW FBS & FCS CONFERENCES ===
  { id:"indiana", school:"Indiana", campName:"1-Day Elite Prospect Camp | June 4th", league:"big10", lat:39.1804, lng:-86.5267, dates:"Thursday, June 4, 2026 (3:00 PM - 4:45 PM)", cost:"$85 pre-registration ($80 + $5 fees); $100 walk-up", eligibility:"9th - 12th grade & Post Grad/JUCO players (9th - College Junior as of Fall 2026)", type:"Elite Prospect", coach:"Curt Cignetti", location:"Bloomington, IN", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=326803", notes:"One-day showcase with position-specific instruction, group drills, and 1-on-1 competitions by IU staff and players. OL/DL bring pads/helmets. Specialists register separately. Operated by Curt Cignetti Football Camps LLC (separate from IU). Location: Memorial Stadium area. Parking: Orange Lot." },
  { id:"wisconsin", school:"Wisconsin", campName:"All Position Showcase Camps", league:"big10", lat:43.07, lng:-89.4128, dates:"June 8, 10, 15, 17 2025 (one-day sessions)", cost:"$80 per camper", eligibility:"Entering grades 9-12 Fall 2025", type:"Prospect / All Position Showcase", coach:"Luke Fickell", location:"Madison, WI", registrationUrl:"https://uwcamps.com/registerLaunch.aspx", notes:"One-day camps at McClain Indoor Turf Facility (Camp Randall area). No housing/meals provided. Half-padded for OL/DL (helmets only others); bring own equipment. Instructed by Wisconsin coaching staff & players. T-shirt/water bottle included. 2026 dates pending." },
  { id:"michigan", school:"Michigan", campName:"Prospect Camp 1 & 2", league:"big10", lat:42.2658, lng:-83.7486, dates:"June 2 and June 4, 2025", cost:"$42.10 ($40 + $2.10 fee)", eligibility:"Entering grades 9th-12th", type:"prospect", coach:"Kyle Whittingham", location:"Ann Arbor, MI", registrationUrl:"https://register.ryzer.com/camp.cfm?id=301357", notes:"2-hour camps (4-6 PM); require helmet, cleats, athletic shoes, mouthguard, water; T-shirt provided; check-in at Oosterbaan Fieldhouse; parking Lot SC-7; contact edunston@umich.edu. No 2026 camps found." },
  { id:"penn-state", school:"Penn State", campName:"Penn State Elite Showcase", league:"big10", lat:40.8122, lng:-77.8558, dates:"June 1, June 8, June 18 2025 (1:30-5:15 p.m.)", cost:"$50 per camp", eligibility:"Entering grades 9 and up next fall", type:"prospect", coach:"James Franklin", location:"University Park, PA", registrationUrl:"https://gopsusports.com/football-camps", notes:"No-pad, no-helmet one-day camps with position-specific instruction and competition drills for skill players serious about college football. Under direction of entire Penn State football staff. Complete participant form online two weeks prior; registration links on page (e.g., Register buttons next to dates)." },
  { id:"maryland", school:"Maryland", campName:"Prospect Technique Camp 1", league:"big10", lat:38.9907, lng:-76.9488, dates:"June 7, 2026", cost:"$84.50 ($75 + fees)", eligibility:"9th-12th grade (fall 2026), college transfers in NCAA Transfer Portal (current UMD players excluded)", type:"prospect", coach:"Mike Locksley", location:"College Park, MD", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=325785", notes:"Two sessions: AM (8am-12pm) and PM (1pm-5pm). Focuses on speed/agility testing, positional skills, competitions. Led by University of Maryland football staff with guest college coaches. One-day technique/prospect camp at Jones-Hill House." },
  { id:"northwestern", school:"Northwestern", campName:"David Braun One Day High School Camp", league:"big10", lat:42.0601, lng:-87.6742, dates:"June 9 (year not specified, listed as Fall 2026 entering grades)", cost:"$109.20 ($99 + fees)", eligibility:"Entering grades 9th-12th (Fall 2026), all positions except kickers/punters/snappers", type:"One Day High School Camp (skills/development)", coach:"David Braun", location:"Evanston, IL", registrationUrl:"https://register.ryzer.com/camp.cfm?id=323080", notes:"Held at Walter Athletics Center. Instructed by Northwestern coaches only. Smaller group setting for development. Cleats required; linemen need helmet/pads (rentals available). Group discounts available." },
  { id:"rutgers", school:"Rutgers", campName:"2026 Rutgers Football Camps", league:"big10", lat:40.5138, lng:-74.4653, dates:"TBD (page created Feb 14, 2026; camps typically summer)", cost:"Not listed", eligibility:"Not listed", type:"Prospect (official university camps for football recruits)", coach:"Greg Schiano", location:"Piscataway, New Jersey", registrationUrl:"https://scarletknights.com/sports/2026/2/14/2026-rutgers-football-camps", notes:"Official page exists but lacks specific details on dates/cost/eligibility as of March 2026; contact footballcamp@scarletknights.com or 732-445-6200. Likely prospect-oriented based on prior years (e.g., 2024 had Chop Elite Camps)." },
  { id:"nebraska", school:"Nebraska", campName:"Matt Rhule Football Camp #2", league:"big10", lat:40.8205, lng:-96.7056, dates:"June 7, 2025, 1:00pm - 6:00pm", cost:"$53", eligibility:"9th grade - Jr. College", type:"skills", coach:"Matt Rhule", location:"Lincoln, NE", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=327270", notes:"Non-contact skills teaching camp focused on fundamentals for positions. Held at Hawks Championship Center. What to bring: cleats, shoulder pads, helmet, workout clothes. Operated by Coach Rhule Football Camps LLC." },
  { id:"ucla", school:"UCLA", campName:"2026 UCLA Football Camps", league:"big10", lat:34.1614, lng:-118.1676, dates:"Summer 2026 (dates coming soon)", cost:"Not listed", eligibility:"Open to any and all entrants meeting the age and/or grade requirements", type:"Prospect/Summer Football Camps", coach:"Bob Chesney", location:"Los Angeles, CA", registrationUrl:"https://uclabruins.com/sports/2013/4/17/208268004", notes:"Official school-run camps; details for summer 2026 to be posted soon on site. No specific prospect camp dates available yet. Past camps have included elite and youth sessions." },
  { id:"usc", school:"USC", campName:"2026 Trojan Specialist Academy", league:"big10", lat:34.0224, lng:-118.2851, dates:"June 14, 2026; 10AM-3PM PST", cost:"$185", eligibility:"Entering grades 9-12 & college transfers/seniors as of Fall 2026", type:"specialist", coach:"Lincoln Riley", location:"Los Angeles, CA", registrationUrl:"https://register.ryzer.com/camp.cfm?id=318678", notes:"Official school-run camp focused on placekicking, punting, long snapping skills for experienced athletes. Non-contact, competitive component, led by USC staff including Special Teams Coordinator Ryan Dougherty. Held on USC campus practice fields. No general prospect camp found for 2025/2026; this is the high school/college-level offering." },
  { id:"ohio-state", school:"Ohio State", campName:"Football One Day Camps", league:"big10", lat:40.0017, lng:-83.0196, dates:"June 5, 9, 10, 12, 17, 2025 (all at capacity)", cost:"$40 per session", eligibility:"Entering 9th grade and up in fall 2025", type:"skills / prospect (one-day position-specific camps)", coach:"Ryan Day", location:"Columbus, OH", registrationUrl:"https://ohiostatebuckeyes.com/sports/campsclinics", notes:"Coached by current Ohio State coaches; bring own helmet/equipment; lunch & t-shirt included; non-refundable; day camp only; camps reached capacity for 2025. No dedicated 'prospect camp' named, but these one-day camps for HS ages used for recruiting evaluations per reports. No 2026 dates available yet." },
  { id:"oregon", school:"Oregon", campName:"Elite Prospect Camp", league:"big10", lat:44.0582, lng:-123.0659, dates:"TBD June 2026 (registration open on official site)", cost:"Not listed (register via Ryzer)", eligibility:"Entering grades 9-12 fall 2025; open to all limited by number/age/grade/gender", type:"prospect, elite", coach:"Dan Lanning", location:"Eugene, OR", registrationUrl:"https://www.oregonfootballcamps.com/elite-prospect-camp.cfm", notes:"Camps led by Oregon coaching staff at Autzen Stadium/Moshofsky Center. On-field sessions, agility, position drills. No helmet needed. Day-of registration at Moshofsky Center with waivers. 2026 camps include Elite Sports Camp (6/3), Specialists/Skills/OL/DL (6/17), 7v7 (6/18) but exact prospect dates not yet detailed. Email fboffice@uoregon.edu for info." },
  { id:"iowa", school:"Iowa", campName:"Iowa Elite Skills Camp", league:"big10", lat:41.6588, lng:-91.5508, dates:"May 31, June 11, June 18 2026 (multiple sessions)", cost:"$65 per session", eligibility:"Incoming 2026 HS freshmen-seniors (grades 9-12) or college eligible", type:"Elite skills/prospect", coach:"Kirk Ferentz", location:"Iowa City, IA", registrationUrl:"https://iowafootball.totalcamps.com/shop", notes:"Taught by Iowa football coaching staff; skill positions (QB, RB, TE, WR, LB, DB); held at Hansen Football Performance Center practice fields; no separate 'prospect camp' but open to rising seniors/grads for evaluation" },
  { id:"illinois", school:"Illinois", campName:"Rising Illini (All Positions)", league:"big10", lat:40.0988, lng:-88.2361, dates:"June 8, 2026", cost:"Not listed (registration coming soon)", eligibility:"Entering 9th-11th grade Fall 2026", type:"Prospect", coach:"Bret Bielema", location:"Champaign, IL", registrationUrl:"https://illinoisfootballcamps.totalcamps.com/", notes:"Open to any and all entrants (limited by number, age, grade, gender). Held at Memorial Stadium / Smith Football Center per facilities page. No cost or detailed format available yet; early announcement for 2026 season prospects." },
  { id:"purdue", school:"Purdue", campName:"Purdue Football Prospect Camp", league:"big10", lat:40.4348, lng:-86.9133, dates:"June 3, 8, 11 2025 (additional dates June 7,14,17,20 2026)", cost:"$53 ($50 + $3 fee)", eligibility:"Entering grades 9th-12th (2026 camps: 9th-College Senior)", type:"prospect", coach:"Barry Odom", location:"West Lafayette, IN", registrationUrl:"https://www.purduefootballcamps.com/prospect-camps.cfm", notes:"One-day camps with registration/testing then camp session (2-3 hours). Held at Ross-Ade Stadium. Open to any/all entrants limited by age/grade/etc. Operated by Football Camps LLC, separate from Purdue University (no university liability)." },
  { id:"michigan-state", school:"Michigan State", campName:"High School One Day Camp | FTB52026", league:"big10", lat:42.7284, lng:-84.4804, dates:"June 16, 2026", cost:"$54 ($50 + $4 fees)", eligibility:"Grades 9-12", type:"Prospect / One Day (skills positions: WR/RB/QB/TE/LB/SAF/OL/DE/DT/CB)", coach:"Pat Fitzgerald", location:"East Lansing, MI", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=327560", notes:"Held at MSU facilities (Williams Indoor FB Facility, Duffy Daugherty Fields); Check-in 7:30am, camp 8am-1pm; Led by Spartans coaching staff; Open to any/all entrants limited by number/age/grade/gender. Multiple similar prospect camps in June 2026 (e.g., Showcase on 6/13)." },
  { id:"washington", school:"Washington", campName:"2026 Cougar Elite Football Camp", league:"big10", lat:47.6507, lng:-122.3015, dates:"May 31, 2026 (1-5 PM); June 21, 2026 (1-5 PM)", cost:"Not listed on shop page", eligibility:"Entering 9th-12th grade (2027-2030 HS grads)", type:"Elite / Prospect (all-skill positions & lineman, non-specialist, instructional)", coach:"Kirby Moore", location:"Pullman, WA", registrationUrl:"https://wsufootballcamps.totalcamps.com/shop", notes:"Official school-run camp at Cougar Football Complex/Gesa Field. Registration open. Deadlines and refund policies apply." },
  { id:"minnesota", school:"Minnesota", campName:"PJ Fleck Row The Boat Football Camps - Monday Night Football Camp I", league:"big10", lat:44.9764, lng:-93.2247, dates:"June 2, 2025", cost:"$74", eligibility:"9th grade to college senior", type:"prospect", coach:"PJ Fleck", location:"Minneapolis, MN", registrationUrl:"https://register.ryzer.com/camp.cfm?id=298110", notes:"Position-specific drills, evaluation by Big Ten coaching staff, facility tour at Larson Football Performance Center. OL/DL bring own helmet/shoulder pads. T-shirt included. Similar Camp II on June 16." },
  { id:"texas-tech", school:"Texas Tech", campName:"Mini Camp 1 | 9th-12th Grade (Fall 2025) & Junior College Prospects", league:"big12", lat:33.5906, lng:-101.8496, dates:"June 1, 2025, 12:00pm - 5:00pm", cost:"$44 ($40 + $4 Fee)", eligibility:"9th-12th Grade (Fall 2025), JUCO & College Prospects", type:"Prospect / Mini Camp (non-contact, all positions)", coach:"Joey McGuire", location:"Lubbock, Texas", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=293200", notes:"Coached by Texas Tech staff including Coach McGuire; technique and fundamentals focus; T-shirt included; held at Sports Performance Center, Football Training Facility, Jones AT&T Stadium. Contact: quintin.jordan@ttu.edu" },
  { id:"kansas-state", school:"Kansas State", campName:"K-State Football Elite Camps", league:"big12", lat:39.2014, lng:-96.5946, dates:"June 5, 12, 15, 19 2025 (1-5pm each)", cost:"$63.50 ($60 + $3.50 fee), includes shirt & meal", eligibility:"Entering grades 9-12 fall 2025 (2026 class), post-grads", type:"Elite/Prospect (all offensive/defensive positions)", coach:"Collin Klein", location:"Manhattan, KS", registrationUrl:"https://www.kstatefootballcamps.com/elite-camps.cfm", notes:"Instructed by K-State coaches & players; FCS/D2 coaches attend. Format: check-in/testing, individuals, 1on1s, video. At Bill Snyder Stadium/Shamrock Facility. Helmets/pads optional (rentals avail). Showers provided. Full details" },
  { id:"oklahoma-state", school:"Oklahoma State", campName:"Cowboy Football Mini Camps", league:"big12", lat:36.1267, lng:-97.0669, dates:"June 1, 2025 (AM/PM sessions); June 15, 2025 (AM/PM sessions)", cost:"$54", eligibility:"Grades 9-12 (as of Fall 2025)", type:"prospect", coach:"Eric Morris", location:"Stillwater, OK", registrationUrl:"https://mikegundycowboyfootballcamps.ryzerevents.com", notes:"One-day mini camps with on-field workouts, individual instruction, and 1-on-1 competition by OSU staff and guest coaches. Includes t-shirt. Run by Oklahoma State football program despite legacy naming." },
  { id:"ucf", school:"UCF", campName:"Prospect Camps (I, II, III)", league:"big12", lat:28.6024, lng:-81.2001, dates:"June 4, 9, 11 (year unspecified, likely past; no 2025/2026 dates announced)", cost:"$50 (T-shirt included, no pads needed)", eligibility:"Rising 9th grade and older", type:"prospect", coach:"Scott Frost", location:"Orlando, FL", registrationUrl:"https://www.ucffootballcamps.com/", notes:"Official site shows no upcoming events for 2025/2026 as of March 2026. Camps led by Knights coaching staff on UCF campus. Parents/guardians/coaches encouraged to stay. 3-hour sessions." },
  { id:"west-virginia", school:"West Virginia", campName:"Prospect Camp", league:"big12", lat:39.65, lng:-79.9559, dates:"June 20, 2026", cost:"Not listed (register at official site)", eligibility:"Open to all entrants (limited by number, age, grade); typically rising juniors/seniors for prospect camps", type:"prospect", coach:"Rich Rodriguez", location:"Morgantown, WV", registrationUrl:"https://wvusports.com/feature/footballcamps", notes:"One-day prospect camp listed on official 2026 summer camps schedule poster shared on social media (Instagram/Facebook). Multiple camps including Team Camp (June 6?), 7-on-7 (June 17?), Big Man Camp (June ?), Prospect Camp (June 20). Exact times/costs not extractable from available sources; official page currently lacks detailed 2025/2026 info but registration directed there. No specific 2025 prospect camp details found beyond youth camps." },
  { id:"utah", school:"Utah", campName:"Elite Camp", league:"big12", lat:40.76, lng:-111.8488, dates:"June 3, 2026", cost:"$162.50", eligibility:"Rising 9th-12th grade, Junior College, Post-Graduate with NCAA eligibility", type:"Elite / Prospect", coach:"Morgan Scalley", location:"Salt Lake City, UT", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=327067", notes:"Non-padded, non-contact camp with position-specific instruction, drills, group sessions, competitive periods for evaluation. Check-in 4-5 PM, camp 5-8 PM at Eccles Football Center Field. Includes t-shirt. Open to all limited by number/age/grade. Specialists should register for separate camp on June 4." },
  { id:"houston", school:"Houston", campName:"Check School Website", league:"big12", lat:29.7221, lng:-95.3429, dates:"None listed", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Willie Fritz", location:"Houston, TX", registrationUrl:"", notes:"Official athletics camps pages (uhcougars.com camps, houstonathleticscamps.com) do not list any football prospect, skills, or elite camps for 2025 or 2026. No school-run prospect camps identified on uhcougars.com or related sites. Third-party camps exist but task specifies official school-run only." },
  { id:"byu", school:"BYU", campName:"High School Football Camp", league:"big12", lat:40.2574, lng:-111.6545, dates:"June 1-3, 2026; June 8-10, 2026", cost:"$399 (day camp); $595 (with housing)", eligibility:"Boys entering grades 9-12", type:"skills/prospect", coach:"Kalani Sitake", location:"Provo, UT", registrationUrl:"https://www.byusportscamps.com/high-school-football-camp", notes:"Instruction from BYU coaching staff; fundamentals, individual drills, selective contact drills, group/team scrimmages. Skill players no pads; linemen some pads (bring own helmet/pads). Meals provided based on housing. Registration opens Jan 22, 2026 at 9am MT. No dedicated 'prospect' camp found; this is the official high school camp for rising prospects." },
  { id:"colorado", school:"Colorado", campName:"Elite Camp", league:"big12", lat:40.0094, lng:-105.2669, dates:"June 4, 2026", cost:"$100", eligibility:"Current high school students grades 9th-12th", type:"elite / prospect", coach:"Deion Sanders", location:"Boulder, CO", registrationUrl:"https://buffs.me/fbcamps", notes:"Half-day camp 10am-1pm at UC Health Champions Center; beginner to advanced; includes T-shirt, water/Gatorade; no walk-ups; sells out quickly. Individual camp (not team). Official school-run." },
  { id:"iowa-state", school:"Iowa State", campName:"Prospect Camps", league:"big12", lat:42.014, lng:-93.6358, dates:"June 2, 4, 11, 21 2026 (1-day camps; exact times TBD)", cost:"$90 (includes T-shirt; $95 walk-up)", eligibility:"Entering 9th grade and up (fall 2026)", type:"Prospect (half-padded)", coach:"Jimmy Rogers", location:"Ames, IA", registrationUrl:"https://www.iowastatefootballcamps.com", notes:"Camps led by Iowa State coaching staff & players at Bergstrom Football Complex. Fundamentals, position instruction, competition. Helmets/shoulder pads required. Online reg closes 48hrs prior." },
  { id:"kansas", school:"Kansas", campName:"2025 Elite Camps", league:"big12", lat:38.9583, lng:-95.2505, dates:"June 1, 4, 18 2025", cost:"$60 walk-up (online ~$53)", eligibility:"9th - JUCO (Fall 2025)", type:"Elite / Prospect (position-specific instruction)", coach:"Lance Leipold", location:"Lawrence, KS", registrationUrl:"https://www.kufootballcamps.com/elite-camps.cfm", notes:"One-day camps 6-9pm; position groups; OL/DL/TE need pads/helmet; physical required (within 1 year); no lodging/meals; Kansas Football Coaching Staff leads. No 2026 dates found." },
  { id:"cincinnati", school:"Cincinnati", campName:"Elite Prospect Camps", league:"big12", lat:39.1312, lng:-84.5157, dates:"May 31, June 2, June 16, June 18 2026 (multiple 2.5-3hr sessions)", cost:"$55", eligibility:"Entering grades 9-12 (Fall 2026); also JUCO 2nd year, college transfers with permission", type:"prospect", coach:"Scott Satterfield", location:"Cincinnati, OH", registrationUrl:"https://www.ucfbcamps.com/", notes:"One-day camps at Nippert Stadium with 90min individual drills, 30min combine testing, 30min group work. All positions except specialists. Instruction by UC coaches/staff. Also listed on ACTIVEkids and gobearcats.com camps page." },
  { id:"arizona", school:"Arizona", campName:"Individual Camp | June 1st", league:"big12", lat:32.2319, lng:-110.9501, dates:"June 1, 2026 (12:00pm - 3:00pm)", cost:"$75", eligibility:"11th - 12th Grade (Fall 2026)", type:"Individual/Skills/Prospect", coach:"Brent Brennan", location:"Tucson, AZ", registrationUrl:"https://register.ryzer.com/camp.cfm?id=323584", notes:"Closest match to prospect camp for rising juniors/seniors. Features drills and 1-on-1s. Note: Camps are branded under head coach but explicitly \\'not owned, operated, or controlled by the University of Arizona.\\' Held at UA facilities. No 2025 camps found; no strictly official university-run prospect camps identified." },
  { id:"baylor", school:"Baylor", campName:"Baylor Football Camps", league:"big12", lat:31.5585, lng:-97.115, dates:"2026 dates not yet announced (2025 registration opened April 2025 per Facebook)", cost:"Not available", eligibility:"Not available (past camps typically grades 9-12 for prospects)", type:"Prospect", coach:"Dave Aranda", location:"Waco, TX", registrationUrl:"https://baylorbears.com/feature/footballcamps", notes:"No official 2025/2026 prospect camp details found as of March 2026. Check back summer 2026. Camp director: Jeff Grigus. 2025 high school camps announced Feb 2025 Facebook. Focus on school-run; youth/rec camps excluded." },
  { id:"tcu", school:"TCU", campName:"DFW Showcase Camp", league:"big12", lat:32.7098, lng:-97.363, dates:"2026 (specific dates TBD)", cost:"Not listed", eligibility:"Rising 9th grade and up", type:"prospect / showcase", coach:"Sonny Dykes", location:"Fort Worth, TX", registrationUrl:"https://sonnydykesfootballcamps.totalcamps.com/shop", notes:"Premier camp for offensive/defensive skill positions and linemen with college coaches from 100+ colleges attending. 2025 high school camp June 6-7. No costs/dates fully listed yet. Official site: sonnydykesfootballcamps.totalcamps.com. Youth/specialist/middle school camps also available. Non-contact for lower levels." },
  { id:"arizona-state", school:"Arizona State", campName:"Sun Devil Specialist Camp", league:"big12", lat:33.4255, lng:-111.9326, dates:"June 12, 2025", cost:"$100", eligibility:"Grades 9-12 (specialists: kickers, punters, long snappers)", type:"specialist", coach:"Kenny Dillingham", location:"Tempe, AZ", registrationUrl:"https://arizonastatefootballcamps.totalcamps.com", notes:"Official school-run specialist skills camp. No general prospect, elite, or skills camps for 2025/2026 found on official sites as of March 2026; camps typically announced spring/summer. Youth camp listed for 2026 ($75, grades 1-8). Location assumed at Mountain America Stadium/Tempe campus." },
  { id:"florida", school:"Florida", campName:"Florida Gators Football Prospect Camp", league:"sec", lat:29.65, lng:-82.3486, dates:"June 1, 7, 15 2026", cost:"$40 (includes instruction, hydration, compression shirt; no meals)", eligibility:"Boys ages 13-22; High School, JUCO, Transfer prospects (transfers need active portal record)", type:"Prospect", coach:"Jon Sumrall", location:"Gainesville, FL", registrationUrl:"https://floridagators.com/sports/2026/2/26/football-camps", notes:"Instructional training and competition with UF team drills, run by coaching staff. Bring helmet and cleats. Physician statement or recent physical required, email to FootballCamps@gators.ufl.edu by Friday before camp. Registration closes Friday before each session. Itinerary emailed closer to date. No specific registration link listed; use Register buttons on site." },
  { id:"missouri", school:"Missouri", campName:"2025 HS Mizzou Elite Camp 1", league:"sec", lat:38.9358, lng:-92.3335, dates:"June 5, 2025; 1:30pm - 5:00pm Central (check-in 1:00-1:30pm)", cost:"$44 ($40 + $4 fee), includes camp shirt", eligibility:"Entering grades 9th-12th fall 2025 or 2024/2025 HS graduates", type:"Elite / Prospect", coach:"Eli Drinkwitz", location:"Columbia, MO", registrationUrl:"https://register.ryzer.com/camp.cfm?id=294559", notes:"One-day camp with agility work and individual drills led by Mizzou coaches & players. At Faurot Field/Memorial Stadium & Stephens Indoor Facility. Rain: indoor. Parents can attend (bring chair). No helmets or overnight lodging." },
  { id:"lsu", school:"LSU", campName:"LSU Elite Camp", league:"sec", lat:30.4122, lng:-91.1838, dates:"June 5 and 11, 2026 [LSU Sports]", cost:"Not listed (contact camps@lsu.edu)", eligibility:"Entering grades 9-12 [LSU Sports]", type:"Elite/Prospect", coach:"Lane Kiffin [LSU Sports]", location:"Baton Rouge, LA", registrationUrl:"https://lsusports.net/footballcamps/", notes:"Skill-teaching camp with instruction from head coach and staff. All positions except specialists (kickers/punters/LS). Open to any/all participants limited by capacity. Pro-rated options available. Part of Geaux Tigers Camps series. [LSU Sports]" },
  { id:"alabama", school:"Alabama", campName:"Check School Website", league:"sec", lat:33.2084, lng:-87.5503, dates:"None listed for 2025 or 2026", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Kalen DeBoer", location:"Tuscaloosa, Alabama", registrationUrl:"https://www.alabamafootballcamp.com", notes:"Official site states 'Currently there are no upcoming events. Check back soon!' as of March 2026. Youth camp listed for prior year (June, ages 8-13). Focus on school-run prospect camps yielded no results for 2025/2026." },
  { id:"mississippi-state", school:"Mississippi State", campName:"Elite Camp", league:"sec", lat:33.4559, lng:-88.7934, dates:"June 7, 2025; 10AM-1PM", cost:"$43", eligibility:"Entering 9th grade and up", type:"elite / prospect", coach:"Jeff Lebby", location:"Starkville, MS", registrationUrl:"https://register.ryzer.com/camp.cfm?id=297969", notes:"One-day camp with drills 11AM-1PM after check-in; includes T-shirt, lunch, instruction from MSU coaching staff; NCAA compliant open to all; no refunds. Location: Leo Seal/Palmeiro Center. Bring tennis shoes and cleats." },
  { id:"ole-miss", school:"Ole Miss", campName:"Friday Night Lights Camp", league:"sec", lat:34.3615, lng:-89.5345, dates:"06/19/2026 (additional dates 05/31, 06/03, 06/10, 06/17/2026)", cost:"$43 (similar camps); past listings $53", eligibility:"9th - College Junior (Fall 2026); rising HS, JC prospects, transfer portal players", type:"Prospect / Instructional (position-specific drills with Ole Miss staff)", coach:"Pete Golding", location:"Oxford, MS", registrationUrl:"https://football.olemisssportscamps.com", notes:"Short afternoon sessions (2:55-5pm) at Manning Center; open to prospects per NCAA rules; no dedicated 'prospect' or elite camp labeled, but HS-level instructional camps target recruiting ages; all upcoming camps 2026, no 2025 events listed. Contact: rebelfootballcamp@olemiss.edu" },
  { id:"georgia", school:"Georgia", campName:"Kirby Smart Football Camp", league:"sec", lat:33.948, lng:-83.3733, dates:"2025/2026 dates TBA (past Youth Camp: June 4-6, 2024)", cost:"$625 overnight / $525 commuter (2024 Youth example)", eligibility:"Open to all; e.g., Youth: ages 8-14/rising 8th grade (NCAA: no free/reduced for 9th+ prospects)", type:"Skills/prospect (non-contact; youth, high school, specialist)", coach:"Kirby Smart", location:"Athens, GA", registrationUrl:"https://georgiadogs.com/feature/kirby-smart-football-camp", notes:"Non-contact simulating Bulldogs practices; hands-on position skills; facility tour/games. No 2025/2026 info yet; check back summer. Sites outdated. Findings saved to georgia_bulldogs_camp_findings.md" },
  { id:"kentucky", school:"Kentucky", campName:"2025 Kentucky Football Camps (Prospect details TBA)", league:"sec", lat:38.022, lng:-84.5053, dates:"TBA - Announced May 2025 via Facebook 'Save the dates'; check ukfbcamp.com (updates expected)", cost:"Not available", eligibility:"Not available (typically rising 9th grade+ for prospect camps)", type:"Prospect (official school-run summer camps; HS Camp mentioned)", coach:"Will Stein", location:"Lexington, KY", registrationUrl:"http://www.ukfbcamp.com", notes:"No detailed 2025/2026 prospect camp info available as of March 2026; official site empty. Facebook posts direct to site. Contact: ukfootballcamps@uky.edu. 2026 dates expected Feb 2026 per UK Athletics. New coach hired Dec 2025." },
  { id:"texas", school:"Texas", campName:"Steve Sarkisian Skills Camp", league:"sec", lat:30.2837, lng:-97.7325, dates:"June 10, 2026 and June 17, 2026", cost:"$40", eligibility:"Entering 9th-12th grade (2026-27 school year)", type:"Skills / Prospect (fast-paced, highly competitive for advanced players to compete and measure ability)", coach:"Steve Sarkisian", location:"Austin, TX", registrationUrl:"https://texaslonghorns.com/sports/2024/2/21/football-camp", notes:"Targeted positions: QB, WR, TE, RB, LB, CB, SAF (linemen to Big Man Camp). Registration opens March 1, 2026 at 8AM. Instruction from Texas coaching staff. Non-contact elements; times TBD. Contact: longhornsfootballcamp@athletics.utexas.edu" },
  { id:"auburn", school:"Auburn", campName:"One Day Elite Camp I", league:"sec", lat:32.6033, lng:-85.4903, dates:"May 31, 2026", cost:"$54 (includes camp shirt)", eligibility:"Entering grades 9-12 Fall 2026, eligible JC prospects, transfers in NCAA portal", type:"Elite / Prospect", coach:"Alex Golesh", location:"Auburn, AL", registrationUrl:"https://register.ryzer.com/camp.cfm?id=321476", notes:"One-day camp with check-in 3:30pm, session 5-7pm. Agility work, individual drills with Auburn coaches, competitive drills (some contact). No kicking/punting/snapping. No helmets required, camp shirt included. No meals. Rain or shine at Auburn practice fields / indoor facility. Not affiliated with Auburn University but held on campus with Auburn staff. Official Camps Site" },
  { id:"oklahoma", school:"Oklahoma", campName:"Check School Website", league:"sec", lat:35.2058, lng:-97.4422, dates:"TBD — Check Website", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Brent Venables", location:"Norman, OK", registrationUrl:"", notes:"Official Brent Venables Football Camps site lists 2026 Youth Camps (3rd-8th grade, 2-day fundamentals at Everest Indoor/Stadium, Norman OK) and High School Camps (9th-12th grade, position-specific sessions at Everest Indoor). No explicit 'prospect', 'elite', or specialist prospect camps listed. Youth camps not matching prospect focus (high school recruiting). No 2025 camps found. Site: brentvenablesfootballcamps.com/shop. University camps page links to coaches' sites but no specific prospect info: soonersports.com camps page." },
  { id:"tennessee", school:"Tennessee", campName:"High School Camp", league:"sec", lat:35.9544, lng:-83.9252, dates:"Camp #1: May 31; Camp #2: June 7 (likely 2026; no upcoming events listed)", cost:"$43 ($40 + $3 fee)", eligibility:"Grades 9th & above (NCAA transfers must be in portal; current UT students ineligible)", type:"Prospect (position-specific for HS prospects)", coach:"Josh Heupel", location:"Knoxville, TN", registrationUrl:"https://www.tennesseefootballcamp.com/high-school-camp.cfm", notes:"AM session 9am-12pm; includes t-shirt; cleats/tennis shoes; walk-up cash registration if available; no refunds; at Anderson Training Center" },
  { id:"south-carolina", school:"South Carolina", campName:"High School Football Camp", league:"sec", lat:34.0127, lng:-80.9799, dates:"Multiple one-day sessions in June 2026 (e.g., June 2, 4, 10, 15); similar for 2025", cost:"$50 per session (includes instruction, lunch, t-shirt)", eligibility:"Rising 9th-12th graders (entering 9th-12th grade Fall 2026)", type:"skills", coach:"Shane Beamer", location:"Columbia, SC", registrationUrl:"https://shanebeamerfootballcamp.totalcamps.com/shop", notes:"One-day instructional camps (5:30-8 PM) at Jerri and Steve Spurrier Indoor Practice Facility; all positions; no pads/helmets needed; staff instruction; not explicitly evaluation/prospect but for high school athletes. OL/DL and specialists have separate sessions." },
  { id:"arkansas", school:"Arkansas", campName:"Prospect Camp I", league:"sec", lat:36.0679, lng:-94.1789, dates:"June 7, 2026; Registration by June 6, 2026", cost:"$58 ($50 + $8 fees; sales tax at checkout)", eligibility:"Grades 9th-12th and post-graduates; all skills/experience levels; open to any/all entrants (limited by #, age, grade, gender)", type:"Prospect", coach:"Ryan Silverfield", location:"Fayetteville, AR", registrationUrl:"https://register.ryzer.com/camp.cfm?id=326519", notes:"One-day non-padded camp (1:30pm-4:15pm) at Fred Smith Center with Razorback staff instruction, position drills, combine testing. Bring cleats/tennis shoes (no helmet). No refunds. Park lot 208. 2025 season complete; camps return June 2026. Official site: arkansasrazorbackfootballcamps.com" },
  { id:"texas-a-m", school:"Texas A&M", campName:"Texas A&M Football Camps (Elite Prospect Camps)", league:"sec", lat:30.6046, lng:-96.3399, dates:"Multiple sessions in June 2026 (e.g., June 5, 7, 12, 14, 19, 20 per social media announcements); specific dates not detailed on official site", cost:"Not listed", eligibility:"Entering grades 9-12 (typical for prospect camps)", type:"Prospect/Elite", coach:"Mike Elko", location:"College Station, TX", registrationUrl:"https://12thman.com/footballcamp", notes:"Registration announced open as of March 5, 2026 via official X/FB/IG (AggieFootball X post). Official site has general info (all-day instructional camps at Kyle Field, open to any/all entrants per NCAA rules) but no specific 2025/2026 session details yet. Check back for updates. No youth/specialist camps match prospect criteria." },
  { id:"vanderbilt", school:"Vanderbilt", campName:"Clark Lea Prospect Camps / Elite Prospect Camps", league:"sec", lat:36.1445, lng:-86.8062, dates:"Multiple dates in June 2026 (e.g., June 5, 7, 12, 14, 19, 20); example session June 20", cost:"$60 (incl. fees)", eligibility:"Rising grades 9-12 (classes 2029-2026)", type:"prospect, elite", coach:"Clark Lea", location:"Nashville, TN", registrationUrl:"https://www.active.com/nashville-tn/football/football-camps/clark-lea-elite-prospect-camp-v-helmets-required-2026", notes:"One-day sessions with testing circuits, position-specific drills, 1-on-1s. Helmets required for some. Official listings on ACTIVE under Vanderbilt University Football. Check vucommodores.com for full schedule." },
  { id:"smu", school:"SMU", campName:"6th Annual Dallas Showcase", league:"acc", lat:32.8407, lng:-96.7831, dates:"May 31 - June 1, 2026 (Sessions: May 31 2PM & 6PM; June 1 2PM & 6PM)", cost:"$59 pre-register ($50 + fees); $74 walk-up", eligibility:"9th - College Senior (Fall 2026); open to all per NCAA, limited by capacity", type:"Prospect showcase (offense/defense only, no specialists)", coach:"Rhett Lashlee", location:"Dallas, TX", registrationUrl:"https://www.coachlashleecamps.com/dallas-showcase.cfm", notes:"One-day sessions at SMU Indoor (6024 Bishop Blvd); run by SMU coaches; no refunds unless doctor's note" },
  { id:"clemson", school:"Clemson", campName:"Dabo Swinney Football Camp", league:"acc", lat:34.6786, lng:-82.8439, dates:"TBA for 2025/2026 (High School Prospect Camps noted June 3 & 4, 2025 in third-party listings)", cost:"TBA ($100 for similar past prospect camps)", eligibility:"TBA (typically rising high school freshmen-seniors for prospect camps)", type:"Prospect", coach:"Dabo Swinney", location:"Clemson, SC", registrationUrl:"https://clemsontigers.com/daboswinneyfootballcamp/", notes:"Official school-run camp directed by head coach. Dates not yet published as of March 2026; camp page password-protected. Kickspot lists Clemson High School Prospect Camps on June 3 & 4, 2025 for $100, specialists welcome, likely part of Dabo Swinney Football Camp series." },
  { id:"stanford", school:"Stanford", campName:"Stanford West Coast Showcase Camp", league:"acc", lat:37.4346, lng:-122.1609, dates:"June 16, 2025 (8:00 AM - 12:30 PM)", cost:"$75", eligibility:"Classes of 2026, 2027, 2028, 2029 (rising seniors through freshmen); all positions except specialists", type:"Prospect / Showcase", coach:"Tavita Pritchard", location:"Stanford, CA", registrationUrl:"https://stanfordfootballcamps.totalcamps.com/Content/71719", notes:"All-positions showcase excluding specialists; guest programs attend; helmet required (rentals available); limited spots due to construction; instruction and skill development; jersey provided" },
  { id:"virginia-tech", school:"Virginia Tech", campName:"Elite Showcase Camps", league:"acc", lat:37.2205, lng:-80.418, dates:"May 31, June 7, June 21 2026", cost:"$50", eligibility:"Entering grades 9 and up", type:"Elite prospect showcase", coach:"James Franklin", location:"Blacksburg, VA", registrationUrl:"https://virginiatechfootball.totalcamps.com/", notes:"Position-specific (QB/RB/WR/TE/OGC/OT/DT/DE/LB/S/CB) one-day elite showcases for high school prospects. Multiple dates available. Official school-run camps via TotalCamps platform." },
  { id:"north-carolina", school:"North Carolina", campName:"Tar Heel One-Day Camps", league:"acc", lat:35.905, lng:-79.0469, dates:"May 31, 2026; June 7, 2026 (entering 9th-12th Fall 2026)", cost:"Specialists: $63; main camp cost not listed on pages", eligibility:"Entering grades 9th-12th (Fall 2026)", type:"One-Day Prospect Camp (with separate specialist sessions for kickers/punters/deep snappers)", coach:"Bill Belichick", location:"Chapel Hill, NC", registrationUrl:"https://www.billbelichickfootballcamps.com/tar-heel-one-day-camps.cfm", notes:"Day camps only (no overnight); registration 12-2PM main, 9-10AM specialists; held at Eddie Smith Practice Facility; open to all limited by availability; coaches from other colleges may observe; parking at Rams Head Deck extra cost." },
  { id:"pittsburgh", school:"Pittsburgh", campName:"Pitt Elite - One Day Camp", league:"acc", lat:40.4436, lng:-79.9581, dates:"Camp #1: Sunday, May 31st, 2026; Camp #2: Sunday, June 14th, 2026", cost:"$75 pre-registration, $90 day-of, $55 groups of 10+", eligibility:"Athletes entering grades 9th-12th as of Fall 2026", type:"Elite / Prospect", coach:"Pat Narduzzi", location:"Pittsburgh, PA", registrationUrl:"https://www.pittfootballcamps.com/elite-camp.cfm", notes:"One-day instructional camp covering all phases of the game, led by Pat Narduzzi Football Camp Staff. 10am-2:30pm. Bring helmet, cleats, etc. Non-refundable. Open to all, limited by availability. Location: UPMC Rooney Sports Performance Complex." },
  { id:"boston-college", school:"Boston College", campName:"Bill O'Brien Football Camps & Clinics", league:"acc", lat:42.3355, lng:-71.1685, dates:"Summer 2026 (specific dates available on site)", cost:"Not listed", eligibility:"Grades 9-12", type:"Prospect (one-day non-contact)", coach:"Bill O'Brien", location:"Chestnut Hill, MA", registrationUrl:"https://bostoncollegefootball.totalcamps.com", notes:"Official school-run camps offering one-day non-contact sessions with coaching and competitive drills in an intense atmosphere; no 2025 camps listed; open to any and all entrants limited by age/grade" },
  { id:"nc-state", school:"NC State", campName:"Dave Doeren Football Camps - HS 1-Day Prospect Camps", league:"acc", lat:35.7856, lng:-78.6675, dates:"May 31, June 7, June 11, June 14 2026 (multiple 3-4 hour sessions)", cost:"$75 per session", eligibility:"Entering 9-12th grade Fall 2026, post-grads <20, select JUCO/transfers", type:"Prospect / High School 1-Day", coach:"Dave Doeren", location:"Raleigh, NC", registrationUrl:"https://davedoerenfootballcamps.totalcamps.com/shop", notes:"Multiple one-day camps with combine drills first hour; for 2026 recruiting prospects; location NC State Football Complex; Camps LLC neither owned nor operated by NC State University per disclaimer, but run by head coach." },
  { id:"california", school:"California", campName:"Cal Football Prospect Camps", league:"acc", lat:37.8716, lng:-122.2508, dates:"2025: Multiple sessions June 5, 8 (x3), 21; 2026: June 7 (Best of the Best), June 14 (Specialists/All), June 20 (Elite Mega)", cost:"$85-$100", eligibility:"Rising 9th-12th graders", type:"Prospect (skills, lineman, specialists, elite)", coach:"Tosh Lupoi (hired Dec 2025)", location:"Berkeley, CA", registrationUrl:"https://www.ussportscamps.com/football/cal-football-camps", notes:"Non-contact day camps run by Cal coaching staff at Memorial Stadium; evaluation format for college prospects; priority list for 2026 updates; multiple position-specific sessions" },
  { id:"virginia", school:"Virginia", campName:"Tony Elliott Football Camp", league:"acc", lat:38.0316, lng:-78.5108, dates:"June 2025 (exact dates TBA; registration open)", cost:"Not listed (group discounts available; ~$70 based on 2024)", eligibility:"All ages; rising HS prospects, transfer portal/JUCO athletes welcome", type:"Skills / Prospect", coach:"Tony Elliott", location:"Charlottesville, VA", registrationUrl:"https://tonyelliottfootballcamp.totalcamps.com", notes:"Official head coach camp run by UVa staff; focuses on fundamentals; no walk-ups; rain or shine; t-shirt included; multiple sessions likely similar to 2024 (5 one-day camps in June)" },
  { id:"wake-forest", school:"Wake Forest", campName:"Jake Dickert Football Camps (Elite Camps, Specialists Camp)", league:"acc", lat:36.1343, lng:-80.2793, dates:"Not yet announced for 2025 or 2026 (registration site active, camps forthcoming)", cost:"Not listed (camp fees non-refundable; optional insurance $10)", eligibility:"High school and position-specific (not learn-to-play); specialists encouraged for Specialists Camp", type:"Elite, Prospect, Specialist (non-contact)", coach:"Jake Dickert", location:"Winston-Salem, NC", registrationUrl:"https://www.jakedickertfootballcamps.com", notes:"No walk-up registration; online only, position-specific registration required (no switching day-of). Non-contact, no helmets/pads needed. Held at stadium. Contact wfufb@wfu.edu for registration changes. No specific dates found in March 2026 searches." },
  { id:"syracuse", school:"Syracuse", campName:"2026 FRANchise Elite Prospect Camp", league:"acc", lat:43.0362, lng:-76.1365, dates:"June 7, 2026 (12PM-4:30PM)", cost:"$60", eligibility:"Entering grades 9-12, CEGEP, prep school, junior college (high school male student-athletes)", type:"Elite Prospect Camp", coach:"Fran Brown", location:"Syracuse, NY", registrationUrl:"https://franchisecusecamps.totalcamps.com/shop/product/571916", notes:"One-day camp with individual instruction and direct interaction with Syracuse coaching staff. Position-specific for all positions except specialists (separate specialist camp). Check-in 12-2PM, camp 2-4:30PM. Campers must bring helmet. Location: Clifford Ensley Athletic Center." },
  { id:"florida-state", school:"Florida State", campName:"Mike Norvell Football Camps (Prospect/Elite)", league:"acc", lat:30.4382, lng:-84.3104, dates:"2025 registration open; specific dates TBD (typically June; Elite Camp held early June 2025)", cost:"TBD (past camps $25-$200)", eligibility:"Open to all entrants limited by number, age, grade level, gender; no free/reduced admission for 9th grade+ prospects per NCAA", type:"Prospect, Elite, Skills, Specialist", coach:"Mike Norvell", location:"Tallahassee, FL", registrationUrl:"https://www.coachnorvellcamps.com", notes:"No specific 2025/2026 dates, costs, or eligibility details published yet (checked March 2026). Annual elite/prospect camps held June. No overnight camps summer 2026. Contact: (850) 645-9561 or fsufootballcamps@fsu.edu for updates. Flyer image saved: tool_calls/save_image/fsu-football-camps-2025-flyer_mmkpvk7v.jpg. Findings saved: fsu-football-camp-findings.md" },
  { id:"miami", school:"Miami", campName:"Prospect Camp Technique and Fundamentals", league:"acc", lat:25.7483, lng:-80.3732, dates:"2026 (dates TBA; registration open for 2026-27 school year)", cost:"Not listed", eligibility:"Rising 9th-12th graders (Grades 9-12 for 2026-27), JUCO, transfers; open to any and all", type:"Prospect / skills (non-contact technique and fundamentals)", coach:"Mario Cristobal", location:"Coral Gables, FL", registrationUrl:"https://mariocristobalfootballcamps.totalcamps.com/shop", notes:"Helmets required; includes camp shirt; led by University of Miami staff. No specific dates or prices listed yet; other camps like Summer ID Camps also prospect-oriented." },
  { id:"louisville", school:"Louisville", campName:"2025 Let's Play Football Camps", league:"acc", lat:38.2176, lng:-85.7585, dates:"First session June 4, 2025 (5-8pm); additional sessions TBA", cost:"TBA", eligibility:"High school athletes (elite camps)", type:"Prospect / Elite", coach:"Jeff Brohm", location:"Louisville, KY", registrationUrl:"https://www.louisvillefootballcamps.com", notes:"Official university-run camps at Howard Schnellenberger Football Complex. Registration open as of April 2025 per social media. Specific details for other sessions not yet listed; no 2026 info found. Walk-ups accepted." },
  { id:"duke", school:"Duke", campName:"Prospect Camp", league:"acc", lat:36.0014, lng:-78.9437, dates:"June 11, 2026 (6/11/26)", cost:"$70", eligibility:"Grades 9-12", type:"prospect", coach:"Manny Diaz", location:"Durham, NC", registrationUrl:"https://dukefootballcamps.totalcamps.com/shop/product/572191", notes:"One-day evening session (7:00 PM - 9:00 PM). Check-in 5:30 AM (likely typo, possibly PM), pick-up 9:30 PM. Requires health form and minors agreement upload. No refunds without doctor's note. Camps site; Manny Diaz camps open to all." },
  { id:"georgia-tech", school:"Georgia Tech", campName:"High School Prospect Camp", league:"acc", lat:33.7723, lng:-84.3928, dates:"June 4, 2026", cost:"$50", eligibility:"Entering grades 9-12 Fall 2026, all skill levels", type:"prospect", coach:"Brent Key", location:"Atlanta, GA", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=322288", notes:"12:00-4:00pm: registration, testing, instructional sessions, position drills, competition at Brock Family Indoor and Rose Bowl. Bring cleats/sneakers/snacks. Parking info emailed prior." },
  { id:"louisiana-monroe", school:"Louisiana Monroe", campName:"Bryant Vincent Prospect Camps", league:"sunbelt", lat:32.529, lng:-92.0693, dates:"June 5, 12, 19, 2025", cost:"Not listed", eligibility:"9th Grade - College Seniors", type:"Prospect", coach:"Bryant Vincent", location:"Monroe, LA", registrationUrl:"https://www.bryantvincentfootballcamps.com/", notes:"Official school-run camps led by ULM coaching staff at Malone Stadium. Multiple one-day sessions. 2026 dates not yet available (site shows no upcoming events). Youth camp also offered June 18, 2025 for 1st-8th grades." },
  { id:"texas-state", school:"Texas State", campName:"Coach Kinne Football Camps - Prospect Camp", league:"sunbelt", lat:29.8887, lng:-97.9384, dates:"June 15th and June 20th, 2026 (multiple sessions)", cost:"$70 ($60 + $10 fees)", eligibility:"9th-12th grade (Fall 2026), JUCO, college prospects", type:"prospect", coach:"G.J. Kinne", location:"San Marcos, TX", registrationUrl:"https://www.coachkinnefootballcamps.com/", notes:"Non-contact camp focusing on technique and fundamentals. Held at Bobcat Stadium. Check-in at Gate 6 Bus Bay. Cleats only required. Max 300 campers per session. Open to all limited by capacity. Specialist Camp also available June 10th for 8th-12th graders, $70." },
  { id:"georgia-state", school:"Georgia State", campName:"Prospect Camp | June 4th", league:"sunbelt", lat:33.7407, lng:-84.3929, dates:"June 4, 2025 (Session 1: 9am-12pm; Session 2: 1pm-4pm)", cost:"$40 per session", eligibility:"Class of 2023-2029 (9th grade - JUCO), all positions", type:"prospect", coach:"Dell McGee", location:"Atlanta, GA", registrationUrl:"https://register.ryzer.com/camp.cfm?id=292220", notes:"Held at Center Parc Stadium. Helmets required; bring water bottle (QBs bring ball). Park in Green Lot, enter Gate 7. Operated by GSU coaches in personal capacity; university provides facilities only. Open to any/all entrants limited by number/age/grade/gender. No other 2025/2026 camps currently listed." },
  { id:"appalachian-state", school:"Appalachian State", campName:"Dowell Loggains Football Camps - One Day Elite Camps", league:"sunbelt", lat:36.2131, lng:-81.6747, dates:"Multiple dates in June 2026 (e.g., June 6, 13, 20)", cost:"$60 (plus fees; $10 group discount for 20+)", eligibility:"Graduated HS seniors, 2-year college prospects (unsigned), 4-year transfers in portal; entering grades 9th-College Senior Fall 2026; position-specific options", type:"Elite / Prospect", coach:"Dowell Loggains", location:"Boone, NC", registrationUrl:"https://www.dowellloggainsfootballcamps.com/", notes:"One-day camps led by App State coaches at Kidd Brewer Stadium; no meals/lodging; parents welcome in stands; contact baxterem@appstate.edu or jonesnr3@appstate.edu. 2025 camps may have occurred (June/July), homepage now shows 2026 events." },
  { id:"coastal-carolina", school:"Coastal Carolina", campName:"CCU Football Camps", league:"sunbelt", lat:33.795, lng:-79.0134, dates:"No 2025/2026 dates announced", cost:"Not listed", eligibility:"Not listed", type:"Prospect/Skills (official university camps)", coach:"Ryan Beard", location:"Conway, SC", registrationUrl:"https://www.coastalfbcamps.com", notes:"Official site active but no specific camp details for 2025/2026 as of March 2026; check back for updates. Previously under Tim Beck." },
  { id:"southern-miss", school:"Southern Miss", campName:"Individual Camp | June 5th", league:"sunbelt", lat:31.3296, lng:-89.3297, dates:"June 5, 2026 (1:30 PM - 4:00 PM)", cost:"$49 ($40 + $9 fees)", eligibility:"9th - 12th grades", type:"Individual / Prospect (skills & drills, speed testing, 1-on-1s)", coach:"Blake Anderson", location:"Hattiesburg, MS", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=329331", notes:"Held at M-Club of Duff Athletic Complex / M.M. Roberts Stadium. Cleats and shorts only; camp shirt provided. No pads/helmets needed. Open to all, led by Golden Eagles staff. Multiple similar individual camps in June 2026 ($49 each). 2025 showcase mega camp also available but lower cost/exposure focus." },
  { id:"georgia-southern", school:"Georgia Southern", campName:"2026 Elite Camp", league:"sunbelt", lat:32.4224, lng:-81.7835, dates:"June 20, 2026", cost:"$50 online / $60 walk-up", eligibility:"Entering grades 9-12 fall 2026, NCAA Transfer Portal players, JUCO players", type:"Elite / Prospect", coach:"Clay Helton", location:"Statesboro, GA", registrationUrl:"https://georgiasouthernfootballcamps.totalcamps.com/shop/product/577624", notes:"Position-specific training (all positions) with agility, individual drills, 1-on-1s. Check-in 8-9 AM, camp 9:15 AM-1 PM at Anthony P. Tippins Training Facility. No helmets/pads needed. Official school-run camp via TotalCamps platform." },
  { id:"james-madison", school:"James Madison", campName:"Elite Camp", league:"sunbelt", lat:38.4371, lng:-78.872, dates:"June 17, 2025", cost:"Not listed (similar camps ~$85)", eligibility:"Open to any and all participants (grades 9-12 implied)", type:"elite / prospect", coach:"Bob Chesney", location:"Harrisonburg, VA", registrationUrl:"https://register.ryzer.com/camp.cfm?id=301050", notes:"Highly competitive camp with position drills, testing (40yd dash etc.), 1-on-1s at Bridgeforth Stadium. Helmets required. Part of 2025 summer camps series (also June 7,13). No 2026 dates found. Incoming head coach Billy Napier for 2026 season." },
  { id:"south-alabama", school:"South Alabama", campName:"OL/DL Prospect Camp", league:"sunbelt", lat:30.6963, lng:-88.1764, dates:"June 16, 2026 (9:30 AM - 12:00 PM)", cost:"$39 ($30 + $9 fees)", eligibility:"Entering grades 9-12 and Freshman-Sophomore JUCO in Fall 2025", type:"prospect (position-specific OL/DL)", coach:"Major Applewhite", location:"Mobile, AL", registrationUrl:"https://register.ryzer.com/camp.cfm?id=324383", notes:"Check-in 8:30 AM at South Alabama Football Offices (591 Joseph R. Gottfried Dr.). Includes agility, individual drills, 1v1s with coaches. Bring helmet, cleats, shorts, t-shirt. Limit 300 participants. Part of Major Applewhite Football Camps series; other dates/camps like 7v7 on June 17 may be available." },
  { id:"arkansas-state", school:"Arkansas State", campName:"Butch Jones Prospect Camp (multiple sessions: I-IV)", league:"sunbelt", lat:35.8412, lng:-90.6847, dates:"June 8, 14, 16, 21 2025 (12-2:30pm, check-in 11am)", cost:"$50", eligibility:"Entering grades 9-12 (fall 2025), JC transfers, NCAA transfer portal", type:"prospect", coach:"Butch Jones", location:"Jonesboro, AR", registrationUrl:"https://arkansasstatefootballcamps.totalcamps.com", notes:"Individual skill/prospect camps held at Centennial Bank Stadium/practice facilities. Open to all per NCAA rules, limited by number/age/grade. No 2026 dates announced as of March 2026." },
  { id:"louisiana", school:"Louisiana", campName:"Ragin' Cajuns Football Prospect Camps", league:"sunbelt", lat:30.2109, lng:-92.0198, dates:"Multiple sessions June 6-21, 2026 (Saturdays/Sundays), 3-5 PM", cost:"$40", eligibility:"9th-12th grade & approved NCAA Prospective Student-Athletes", type:"prospect", coach:"Michael Desormeaux", location:"Lafayette, LA", registrationUrl:"https://www.activekids.com/lafayette-la/performing-arts/camp/ragin-cajuns-football-prospect-camps-2026", notes:"Football helmets and cleats required. Indoor if rain. Check-in 1-2:30 PM (pre-reg or onsite after Wed 3 PM prior), practice 3-4:58 PM. Registration includes measurements/40s for recruiting data. Official university event at Mosing Athletic Performance Center, 202 Reinhardt Drive." },
  { id:"old-dominion", school:"Old Dominion", campName:"Check School Website", league:"sunbelt", lat:36.8847, lng:-76.3061, dates:"None listed", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Ricky Rahne", location:"Norfolk, VA", registrationUrl:"https://odusports.com/camps", notes:"Official athletics camps page lists a football section but no active camps, dates, or registration for 2025/2026 prospect camps as of March 2026. Page includes 'Summer Camp Interest Form' for notifications on future camps. No third-party or coach-run prospect camps confirmed as official school-run." },
  { id:"fiu", school:"FIU", campName:"Willie Simmons Elite Football Camps", league:"cusa", lat:25.7563, lng:-80.3743, dates:"No events currently available for 2025 or 2026", cost:"Not listed (pricing excludes processing fees)", eligibility:"Football players of all ages and skill levels", type:"Elite", coach:"Willie Simmons", location:"Miami, FL", registrationUrl:"https://info.abcsportscamps.com/fiufootball", notes:"Official school-affiliated camp site via ABC Sports Camps at Pitbull Stadium. No specific 2025/2026 dates announced as of March 2026. Contact [email protected] for updates. Instructional and informational format. No prospect camps found on official athletics site fiusports.com." },
  { id:"liberty", school:"Liberty", campName:"Jamey Chadwell Prospect Camp", league:"cusa", lat:37.3526, lng:-79.1728, dates:"June 7, 12, 14, 20 2026 (multiple one-day Prospect Camps); June 8, 13, 15, 20 2025", cost:"Not listed (registration open at official site)", eligibility:"Grades 9-12 / up to age 18", type:"prospect", coach:"Jamey Chadwell", location:"Lynchburg, VA", registrationUrl:"https://libertyfootballcamps.com", notes:"One-day camps (e.g., 1-5pm); official school-run by Liberty Flames football staff; similar dates for 2025 (June 8 etc.) announced; also Specialist, OL/DL, Kids camps available. 2026 camp director: Devon Doyle ddoyle19@liberty.edu" },
  { id:"new-mexico-state", school:"New Mexico State", campName:"Elite Prospect Camp", league:"cusa", lat:32.2803, lng:-106.7472, dates:"June 15, 2025", cost:"$50", eligibility:"High school prospects (2025-2028 classes), specialists welcome", type:"elite prospect", coach:"Tony Sanchez", location:"Las Cruces, NM", registrationUrl:"", notes:"One-day camp at Aggie Memorial Stadium; 9 AM check-in; invitation-based for NM prospects but open registration per specialist listings; official school-run camp promoted on social media in May 2025; no 2026 dates found as of March 2026 (camps typically announced spring/summer)." },
  { id:"middle-tennessee", school:"Middle Tennessee", campName:"2025 Friday Night Lights Camp", league:"cusa", lat:35.8467, lng:-86.3614, dates:"June 20, 2025; 4:30pm - 8:30pm", cost:"$65", eligibility:"Rising 9th Grade - College Senior (HS Freshmen-Seniors, JUCO, NCAA transfers)", type:"Prospect", coach:"Derek Mason", location:"Murfreesboro, TN", registrationUrl:"https://register.ryzer.com/camp.cfm?id=297667", notes:"Position-specific instruction under lights at Floyd Stadium; Coach Mason present entire camp; no pads required; t-shirt provided; non-refundable. Official MTSU camp." },
  { id:"jacksonville-state", school:"Jacksonville State", campName:"Prospect Camp", league:"cusa", lat:33.82, lng:-85.7642, dates:"June 2, 2025", cost:"$54 ($44 early bird by June 1)", eligibility:"Entering 9th-12th grade + Transfers/JUCO", type:"prospect", coach:"Charles Kelly", location:"Jacksonville, AL", registrationUrl:"https://www.charleskellyfootballcamps.com/prospect-camp.cfm", notes:"One-day camp (12:15pm-3:50pm). Check-in Stephenson Hall, JSU campus. Open to all, limited by availability. Main camps page shows no events (possibly not updated); 2026 camp teased on social media." },
  { id:"sam-houston", school:"Sam Houston", campName:"Kat Attack Football Prospect Camp", league:"cusa", lat:30.7148, lng:-95.5505, dates:"June 18-21, 2026 (multiple sessions)", cost:"$59 ($50 + $9 fees, includes T-shirt)", eligibility:"9th - 12th Grade as of Fall 2026", type:"Prospect", coach:"Phil Longo", location:"Huntsville, TX", registrationUrl:"https://www.katattackfootball.com", notes:"Official university-hosted camps on Ryzer platform. Sessions 9am-12pm. Multiple consecutive days available. No 2025 prospect camps found; 2026 upcoming." },
  { id:"louisiana-tech", school:"Louisiana Tech", campName:"Sonny Cumbie Football Camps - Elite Camp I", league:"cusa", lat:32.5293, lng:-92.6499, dates:"June 14, 2025", cost:"$50 + processing fee", eligibility:"Entering grades 9th-12th (Fall 2025)", type:"Elite / Prospect (position-specific: OL/DL/TE/RB/LB/Specialists morning; QB/WR/CB/S night skills)", coach:"Sonny Cumbie", location:"Ruston, LA", registrationUrl:"https://www.sonnycumbiefootballcamps.com", notes:"Held at Joe Aillet Stadium. Official school-run camps led by LA Tech staff. Site currently shows no upcoming events (as of Mar 2026), check back for 2026 updates. Youth camp June 9-10 2025 for K-8th also exists. Additional Elite Camp II June 19, 2025 per specialist lists." },
  { id:"kennesaw-state", school:"Kennesaw State", campName:"2026 Big Mack Mega Camp", league:"cusa", lat:34.0379, lng:-84.581, dates:"June 2nd & 4th, 2026 (per social media)", cost:"Not listed on site", eligibility:"High school prospects (assumed)", type:"Prospect/Skills (multi-position, college coach exposure)", coach:"Jerry Mack", location:"Kennesaw, GA", registrationUrl:"https://kennesawstatefootball.totalcamps.com/shop", notes:"Main prospect camp led by head coach; individual/group drills, no helmets; exact cost/eligibility/dates sparse on site, promoted for college exposure. OL/DL specialist camp June 9 at The Perch, rising 9-12th graders." },
  { id:"western-kentucky", school:"Western Kentucky", campName:"Prospect Camps", league:"cusa", lat:36.9814, lng:-86.444, dates:"June 7 and June 21, 2026 (1:00-4:00pm)", cost:"$59 ($50 + $9 fees)", eligibility:"Entering 9th grade and up (Fall 2026)", type:"prospect", coach:"Tyson Helton", location:"Bowling Green, KY", registrationUrl:"https://www.wkufootballcamps.com/prospect-camps.cfm", notes:"Check-in 12:00pm at WKU Football Office, Houchens Smith Stadium Gate 1, 1605 Avenue of Champions. No helmets or pads required (per similar camps). Open to any/all entrants limited by age/grade. Half-day format." },
  { id:"utep", school:"UTEP", campName:"Sun City Showcase", league:"cusa", lat:31.77, lng:-106.505, dates:"June 20, 2026", cost:"$50 preregistered / $60 walk-up", eligibility:"Grades 9-12 (Fall 2026)", type:"Showcase (prospect)", coach:"Scotty Walden", location:"El Paso, TX", registrationUrl:"https://utepfootballcamps.com", notes:"1-day camp at Sun Bowl, no refunds, part of UTEP football camps series including Elite and Specialist on June 19, 2026. Focus on reps; showcase format for prospects." },
  { id:"utsa", school:"UTSA", campName:"UTSA Football Prospect Camps", league:"american", lat:29.5849, lng:-98.6181, dates:"June 4, June 11, June 18, 2026 at 5:00 PM", cost:"$70 per camper (includes T-shirt)", eligibility:"9th-12th grade (Fall 2026), JUCO prospects, college transfer portal", type:"Prospect", coach:"Jeff Traylor", location:"San Antonio, TX", registrationUrl:"https://www.utsafootballcamps.com", notes:"Non-contact camps focusing on technique/fundamentals, agility testing, position-specific drills, 1-on-1 competitions. Held at Roadrunner Athletics Center of Excellence (RACE) Practice Fields on UTSA Main Campus. Capped at 300 campers per session. Open to any/all entrants limited by number/age/grade/gender. Each camper needs health insurance. Multiple sessions available." },
  { id:"navy", school:"Navy", campName:"Football - Prospect Camp", league:"american", lat:38.9844, lng:-76.4842, dates:"Fri, Jun 19, 2026 at 3:00pm", cost:"Not listed", eligibility:"Rising 9th-12th Grade", type:"prospect", coach:"Brian Newberry", location:"Annapolis, MD", registrationUrl:"https://navysports.evenue.net/list/SC-FB", notes:"Official school-run prospect camp for high school prospects. Day camp. Additional Specialist Camp on same day at 12:00pm for rising 9th-12th. See site for cost and full details. 2025 camps also exist per PDFs." },
  { id:"memphis", school:"Memphis", campName:"Tiger Football Camps", league:"american", lat:35.1206, lng:-89.9384, dates:"2025 and 2026 dates not yet announced", cost:"Not listed (open to any/all entrants)", eligibility:"Open to any and all entrants, limited by number, age, grade level, and/or gender", type:"Prospect camps (fundamentals and techniques)", coach:"Charles Huff", location:"Memphis, TN", registrationUrl:"https://tigerfootballcamps.totalcamps.com/", notes:"All camps at Billy J Murphy Athletic Complex. Check-in 1 hour prior. 2025 Mega Camp announced on social media but details unavailable; registration may open summer 2026 for upcoming camps." },
  { id:"north-texas", school:"North Texas", campName:"Check School Website", league:"american", lat:33.2105, lng:-97.1491, dates:"None found (OL/DL Trench Camp June 8, 2025)", cost:"TBD", eligibility:"Grades 9-12", type:"N/A (position-specific camps available, e.g. OL/DL)", coach:"Neal Brown", location:"Denton, TX", registrationUrl:"https://www.ericmorrisfootballcamps.com;", notes:"Extensive search of official athletics site (meangreensports.com), Ryzer, and web found no general prospect camps for 2025/2026. Position camps like OL/DL Trench Camp June 8 2025 ($49, grades 9-12, Ryzer) and Kids Camp June 16-17 2025 exist. Third-party camps (e.g. Dallas Cowboys-themed) not official." },
  { id:"charlotte", school:"Charlotte", campName:"Summer Prospect Camp", league:"american", lat:35.3075, lng:-80.733, dates:"Summer 2026 (likely June 9, 2026; exact date not listed publicly)", cost:"Not listed publicly", eligibility:"Entering 9th-12th grade Fall 2026, Junior College players, NCAA transfer portal prospects", type:"Prospect (all positions)", coach:"Tim Albin", location:"Charlotte, NC", registrationUrl:"https://charlottefootball.totalcamps.com/shop", notes:"Non-padded camp at Jerry Richardson Stadium, Gate 3 check-in 4:30 PM. NCAA compliant, online pre-registration. Multiple specialized prospect camps also available (skills, big man, specialist). No 2025 camps found." },
  { id:"tulane", school:"Tulane", campName:"Tulane Football Prospect Camps", league:"american", lat:29.9419, lng:-90.1205, dates:"Multiple sessions in June 2025: June 4, 8, 11, 18 (12-2pm); Specialists June 5", cost:"$50 per session", eligibility:"9th-12th grade and college transfers", type:"Prospect (general and specialist)", coach:"Jon Sumrall", location:"New Orleans, LA", registrationUrl:"https://tulanefootballcamps.totalcamps.com", notes:"One-day camps at Yulman Stadium/Wilson Center. No 2026 dates found yet. Contact: recruitingtulane@gmail.com. Official school-run via totalcamps platform." },
  { id:"uab", school:"UAB", campName:"Fire Breathers Prospect Camp", league:"american", lat:33.5024, lng:-86.8096, dates:"June 14, 2025", cost:"Not listed", eligibility:"Not listed (likely rising high school juniors/seniors for prospect camp)", type:"prospect", coach:"Alex Mortensen", location:"Birmingham, AL", registrationUrl:"https://uabsports.com/sports/2023/4/20/2023-uab-summer-camps", notes:"Part of Fire Breathers Football Camps series. No specific cost, eligibility, or direct registration link found on official pages. Multiple camps including Mega Camp (June 7), Specialist (June 11). 2026 camps announced on social media (e.g., Prospect Camps June 2 & 4) but no full details available yet." },
  { id:"fau", school:"FAU", campName:"Elite Skills Camp 2", league:"american", lat:26.3724, lng:-80.1006, dates:"June 3, 2026", cost:"$50 (includes camp T-shirt)", eligibility:"High school students entering grades 9th-12th (Fall 2026); QBs, WRs, RBs, TEs, LBs, DBs, OL, DL", type:"elite skills", coach:"Zach Kittley", location:"Boca Raton, FL", registrationUrl:"https://register.ryzer.com/camp.cfm?sport=1&id=328078", notes:"Official FAU coaching staff led; position-specific drills, agility work, on-field sessions. No explicit prospect camp found; this is skills-focused for rising HS upperclassmen. Check-in 12:45 PM, camp starts 2:00 PM at Schmidt Family Complex. Bring tennis shoes, cleats, shorts, shirt." },
  { id:"south-florida", school:"South Florida", campName:"Come To The Bay Football Camps", league:"american", lat:28.0617, lng:-82.4132, dates:"No 2025 or 2026 dates announced", cost:"Not listed", eligibility:"Not specified (historically grades 9-12)", type:"Skills and fundamentals (no prospect camps found)", coach:"Brian Hartline", location:"Tampa, FL", registrationUrl:"https://www.cometothebaycamps.com", notes:"Official site indicates 2025 registration open but no specific camps listed for purchase as of March 2026. Focuses on basic fundamentals coached by USF staff. No prospect, elite, or specialist camps identified for 2025/2026." },
  { id:"temple", school:"Temple", campName:"Check School Website", league:"american", lat:39.9802, lng:-75.1488, dates:"TBD — Check Website", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"K.C. Keeler", location:"N/A, N/A", registrationUrl:"", notes:"Temple promotes Diamond Elite Football Camps (third-party, not school-run) on social media for 2025 (e.g., Big Man/Skill/Specialist camps June 11,14,18 per poster) and 2026. No evidence of official Temple prospect, elite, or skills camps listed on athletics site or elsewhere. Focus was official school-run camps per task." },
  { id:"army", school:"Army", campName:"Check School Website", league:"american", lat:41.3915, lng:-73.9576, dates:"No camps scheduled; TotalCamps site states 'we will not host a camp in 2026'; no 2025 listings on official sites", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Jeff Monken", location:"West Point, NY", registrationUrl:"https://armyfootball.totalcamps.com", notes:"Official sports camps site (Army Sports Camps) lists no football camps. Third-party sites like Kickspot mention a 1-Day Football Camp on June 7, 2025 ($50, open to 2026/2027 specialists), but focus is on school-run camps. Contact: odiaarmysportscamps@westpoint.edu" },
  { id:"east-carolina", school:"East Carolina", campName:"One-Day Camp", league:"american", lat:35.6045, lng:-77.366, dates:"June 14, 2026 (10:00am - 2:00pm)", cost:"$58 ($50 + $8 fees); $60 walk-up", eligibility:"9th - 12th grade & junior college athletes", type:"prospect", coach:"Blake Harrell", location:"Greenville, NC", registrationUrl:"https://www.blakeharrellfootballcampsllc.com/one-day-camp.cfm", notes:"Fundamentals of all positions, one-on-one and group drills, testing at check-in. Held on ECU athletic campus, led by ECU Pirates coaching staff. According to NCAA rules open to any and all." },
  { id:"rice", school:"Rice", campName:"2025 Elite Prospect Camps", league:"american", lat:29.7163, lng:-95.4099, dates:"Session I: June 5, 2025 (6-8:30pm); Session II: June 13, 2025 (9-10:30am specialists, SOLD OUT); Session III: June 18, 2025 (6-8:30pm, SOLD OUT)", cost:"Not listed on site ($60 suggested from search snippet)", eligibility:"High school students (grades 9-12); open to all entrants limited by number, age, grade, gender", type:"Elite Prospect (evaluation camp with skill development, position-specific; coached by Rice staff)", coach:"Scott Abell", location:"Houston, TX", registrationUrl:"https://www.ricefootballcamps.com/2025-elite-prospect-camps/", notes:"Held at Rice Stadium/Robert L. Waltrip Training Center/Brian Patterson Sports Performance Center. Non-refundable fee. Parents can watch from stands. No 2026 camps found yet. Sessions II & III sold out. Specialists portion only in Session II." },
  { id:"tulsa", school:"Tulsa", campName:"Prospect Camp", league:"american", lat:36.1519, lng:-95.9463, dates:"June 14, 2025 (12:00PM - 3:30PM) and June 19, 2025 (12:00PM - 3:30PM)", cost:"$50", eligibility:"Rising 9th-12th grade and college transfers/seniors", type:"prospect", coach:"Tre Lamb", location:"Tulsa, OK", registrationUrl:"https://register.ryzer.com/camp.cfm?id=297355", notes:"Official school-run camps via Tre Lamb Football Camps at University of Tulsa campus, coached by TU staff. Non-padded, no helmet needed. Equipment: cleats, water bottle. Open to all (limited by number/age/grade/gender). Main site trelambfootballcamps.com currently shows no upcoming events." },
  { id:"colorado-state", school:"Colorado State", campName:"Check School Website", league:"mwc", lat:40.5747, lng:-105.0845, dates:"None listed (camps page shows no upcoming events)", cost:"TBD", eligibility:"Grades 9-12", type:"N/A (only youth camps listed, not prospect)", coach:"Jim Mora", location:"Fort Collins, CO", registrationUrl:"https://www.csuramfootballcamps.com", notes:"Official site shows no upcoming prospect, elite, skills, or specialist camps as of March 2026. Only youth camps for 2025 (June 2-4) and 2026 (June 1) found, targeted at ages 8-13, not high school prospects. Check back later for updates." },
  { id:"boise-state", school:"Boise State", campName:"Check School Website", league:"mwc", lat:43.6032, lng:-116.197, dates:"TBD — Check Website", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Spencer Danielson", location:"Boise, Idaho", registrationUrl:"https://boisestatefootball.totalcamps.com", notes:"Official camps site shows no 2025 or 2026 camps listed as of March 2026. Past camps (e.g., 2024) included Youth (June 3-5), Specialist (June 9), Team (June 10-12). Check back later for updates. Contact footballcamps@boisestate.edu for inquiries." },
  { id:"san-jose-state", school:"San Jose State", campName:"South Bay Showcase", league:"mwc", lat:37.32, lng:-121.9097, dates:"June 13-14, 2025", cost:"$85 (one day online), $135 (both days online), $100 (walk-up one day)", eligibility:"High school rising seniors (2026), juniors (2027), sophomores (2028), freshmen (2029); excluding specialists", type:"prospect", coach:"Ken Niumatalolo", location:"San Jose, CA", registrationUrl:"https://sanjosestatefootballcamps.totalcamps.com/Content/39245", notes:"Prospect showcase with instruction, skill development, testing, competition in front of SJSU coaches; non-padded; 8:30AM-12PM; online registration closed, walk-ups accepted; at CEFCU Stadium & practice fields. No 2026 dates available yet." },
  { id:"utah-state", school:"Utah State", campName:"Check School Website", league:"mwc", lat:41.752, lng:-111.8133, dates:"TBD — Check Website", cost:"TBD", eligibility:"Not available", type:"Prospect Camp", coach:"Bronco Mendenhall", location:"Logan, Utah", registrationUrl:"https://utahstateaggies.evenue.net/list/FBC", notes:"Extensive searches across web, official athletics sites (utahstateaggies.com), and youth programs page yielded no specific details for 2025/2026 prospect camps. Past camps used eVenue; current page not found. Camps typically held in Logan, UT, led by USU coaches. Fall camp and youth clinics mentioned for 2025, but no prospect camps. 2026 camps may not be announced yet (current date March 2026)." },
  { id:"fresno-state", school:"Fresno State", campName:"Friday Night Lights Prospect Camp", league:"mwc", lat:36.8124, lng:-119.7542, dates:"June 19, 2026", cost:"$64", eligibility:"9th - College Senior", type:"prospect", coach:"Matt Entz", location:"Fresno, CA", registrationUrl:"https://www.fresnostatefootballcamps.com", notes:"One-day prospect camp led by Fresno State coaching staff; non-contact; position-specific instruction and competition; held at Valley Children's Stadium." },
  { id:"san-diego-state", school:"San Diego State", campName:"2026 Mega Camp", league:"mwc", lat:32.7748, lng:-117.0724, dates:"June 3, 2026 (multiple sessions throughout the day)", cost:"$100", eligibility:"Rising 9th-12th grade (Fall 2026)", type:"prospect skills (position-specific Mega Camp)", coach:"Sean Lewis", location:"San Diego, CA", registrationUrl:"https://aztecfootballcamps.totalcamps.com/shop", notes:"Position-specific sessions for Bigs (OL/DL padded), Mids (RB/FB/TE/LB + young QBs), Skills (WR/DB + young QBs), Specialists (K/P/LS). Example: PM Session 6 \\'Mids\\' 5:45-8:20pm. Official school-run camps via TotalCamps platform. No 2025 prospect camps found with full details." },
  { id:"hawaii", school:"Hawaii", campName:"Rainbow Warrior Football Camp", league:"mwc", lat:21.2969, lng:-157.8171, dates:"No 2025 or 2026 dates announced", cost:"Not listed", eligibility:"Open to any and all (restricted by number, age, grade level, and/or gender)", type:"Football camp (type unspecified; no prospect camp found)", coach:"Timmy Chang", location:"Honolulu, HI", registrationUrl:"https://hawaiiathleticscamps.com", notes:"No specific prospect, skills, or elite camps for 2025/2026 found on official sites. General football camp registration available. Camps include 6% processing fee + $35 cancellation fee. Contact camp director for disability accommodations." },
  { id:"air-force", school:"Air Force", campName:"1-Day Thunder Football Camp", league:"mwc", lat:38.9969, lng:-104.8615, dates:"June TBD, 2026 (registration opens mid-May 2026)", cost:"$50", eligibility:"Rising juniors/seniors (graduation years 2027/2028)", type:"Prospect (instructional one-day, non-contact)", coach:"Troy Calhoun", location:"Air Force Academy, CO", registrationUrl:"https://goairforcefalcons.com/sports/2018/6/21/camps-saturday-night-thunder-html", notes:"Non-padded, non-contact camp led by Air Force coaching staff at Falcon Athletic Center. Equipment: cleats/mouthpiece only. Tentative schedule: 9am-11am. Also prospect camps via falconfootball.totalcamps.com (details TBD)." },
  { id:"wyoming", school:"Wyoming", campName:"High School Prospect Camp #1", league:"mwc", lat:41.3143, lng:-105.5742, dates:"June 13, 2026", cost:"$75", eligibility:"High school prospects", type:"prospect", coach:"Jay Sawvel", location:"Laramie, WY", registrationUrl:"https://wyomingfootballcamps.totalcamps.com", notes:"Half-padded evaluation camp by Wyoming coaching staff. Provide own gear or rent for $20. Likely at War Memorial Stadium / High Altitude Performance Center." },
  { id:"new-mexico", school:"New Mexico", campName:"Lobos Prospect Camps", league:"mwc", lat:35.0778, lng:-106.6197, dates:"May 31 and June 12, 2026", cost:"Not specified", eligibility:"High school prospects", type:"prospect", coach:"Jason Eck", location:"Albuquerque, NM", registrationUrl:"https://coacheckfootballcamps.totalcamps.com", notes:"Padded camps (bring helmet and shoulder pads); compete in front of coaching staff. Announced on official social media UNM Lobo FB Facebook and Instagram. Specific details like cost not available on public pages; registration via totalcamps site used by UNM coaches." },
  { id:"nevada", school:"Nevada", campName:"High School Prospect Camp OL & DL", league:"mwc", lat:39.5452, lng:-119.8143, dates:"TBD 2026 (dates not yet published)", cost:"$75 + processing fee", eligibility:"Rising high school freshman to senior", type:"prospect (position-specific OL/DL)", coach:"Jeff Choate", location:"Reno, NV", registrationUrl:"https://www.nevadafootballcamps.com/shop", notes:"Official school-run one-day prospect camp at Mackay Stadium for evaluation by coaching staff. Bring helmet & shoulder pads. Check-in 9-10am, camp ~10am-12:30pm. Similar camp for skill positions (QB/RB/WR/TE/LB/DB). Youth camps scheduled June 16-17, 2026." },
  { id:"unlv", school:"UNLV", campName:"2026 UNLV Elite Prospect Camp 1", league:"mwc", lat:36.1097, lng:-115.1505, dates:"June 4, 2026, 4:00 PM - 7:30 PM", cost:"$70", eligibility:"Rising 9th-12th grades, JUCOs & transfers", type:"Elite Prospect", coach:"Dan Mullen", location:"Las Vegas, NV", registrationUrl:"https://danmullenfootballcamps.totalcamps.com/shop/product/585614", notes:"Non-contact camp with combine and individual drills; skill instruction by UNLV coaching staff. Official UNLV Rebels camp (#BEaREBEL branding). No 2025 camps found; this is the primary 2026 prospect camp identified." },
  { id:"monmouth", school:"Monmouth", campName:"Elite Prospect Camp", league:"caa", lat:40.2773, lng:-74.0044, dates:"Multiple sessions in June 2026 (e.g., June 7, 11, 14)", cost:"$70 per session", eligibility:"9th-12th grade entering Fall 2026 (rising HS freshmen-seniors)", type:"Elite Prospect", coach:"Jeff Gallo", location:"West Long Branch, NJ", registrationUrl:"https://footballcamps.monmouthhawks.com", notes:"One-day camps focused on position development and skill improvement, staffed by Hawks coaching staff (e.g., Dir. Brian Gabriel). Held on MU campus at Kessler Field. Official school-run via Ryzer. Additional 2025 camps: Specialist (6/26/25), Youth (7/7-10/25)." },
  { id:"hampton", school:"Hampton", campName:"2025 Coach Trent Boykin Hampton Football Camps - Elite Prospect Camps", league:"caa", lat:37.0226, lng:-76.3377, dates:"July 9-10, 2025 (Camp 1: July 9; Camp 2: July 10)", cost:"Not listed on official site (contact delbert.tyler@hamptonu.edu for details)", eligibility:"Entering grades 9-12", type:"Elite Prospect", coach:"Trenton Boykin", location:"Hampton, VA", registrationUrl:"https://hamptonuniversityfootball.totalcamps.com", notes:"Focuses on fundamental skills development for high school players (beginning to advanced). One-day camps. No 2026 info found. Separate Tidewater Showcase Mega Camp (June 7-8, 2025) is partnership, not primary school-run." },
  { id:"albany", school:"Albany", campName:"Check School Website", league:"caa", lat:42.6859, lng:-73.8262, dates:"None found for 2025 or 2026", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Tom Perkovich", location:"Albany, NY", registrationUrl:"", notes:"No official school-run prospect camps for 2025 or 2026 found after extensive search of official athletics site ualbanysports.com, TotalCamps site greatdanesfootball.totalcamps.com (no events listed), and general web. Camps page on athletics site is outdated (2015) and notes camps not administered by athletics dept. General summer camps mentioned but no football specifics. Current as of March 2026 (camps likely announced later in year)." },
  { id:"north-carolina-a-t", school:"North Carolina A&T", campName:"Shawn Gibbs Football Camp", league:"caa", lat:36.0726, lng:-79.7727, dates:"June 7, 2025 and July 12, 2025", cost:"Not specified", eligibility:"Rising 9th-12th graders, current college players, transfers", type:"Prospect / skills", coach:"Shawn Gibbs", location:"Greensboro, NC", registrationUrl:"https://shawngibbsfootballcamp.totalcamps.com/", notes:"One-day instructional camps at Truist Stadium with position drills, agility, 1-on-1s. Check-in 8:30 AM. Eligibility also includes post-grads and JUCO from other sources." },
  { id:"delaware", school:"Delaware", campName:"2025 Delaware Football Camps", league:"caa", lat:39.678, lng:-75.7506, dates:"June 11, 2025 (general); June 22, 2025 (specialists)", cost:"$75 early / $85 walk-up", eligibility:"Athletes entering 9th grade or higher Fall 2025", type:"Prospect / skills (non-contact, 1-day sessions)", coach:"Ryan Carty", location:"Newark, DE", registrationUrl:"https://www.delawarefootballcamp.com/delaware-football-camps.cfm", notes:"Led by UD football staff but independently operated by Delaware Football Camps LLC (not university-sponsored). No helmets needed. T-shirt provided. Contact: delawarefootballcamps@gmail.com. Food/beverage cash only. Limited spots." },
  { id:"campbell", school:"Campbell", campName:"Check School Website", league:"caa", lat:35.4176, lng:-78.7347, dates:"None found for 2025/2026", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Braxton Harris", location:"Buies Creek, NC", registrationUrl:"https://braxtonharrisfootballcamps.totalcamps.com", notes:"Official camps site currently shows no upcoming camps listed for 2025 or 2026. Past camps include 'Camel Prospect' for high school students (e.g., 2023). Check back or contact mridings@campbell.edu for updates. Spring 2026 practices announced but not prospect camps. gocamels.com/football" },
  { id:"stony-brook", school:"Stony Brook", campName:"2025 Coach Cosh Football Camps", league:"caa", lat:40.9138, lng:-73.1185, dates:"Summer 2025 (exact dates TBA)", cost:"Not specified", eligibility:"Not specified", type:"Prospect", coach:"Billy Cosh", location:"Stony Brook, NY", registrationUrl:"https://bit.ly/4h4rqiM", notes:"Official school-run camps announced March 2025 via X/Twitter by @StonyBrookFB at LaValle Stadium. Specific details like dates, cost, grades not available on athletics site; registration link from official announcement. Not administered directly by university athletics per general policy, but coach-named and promoted officially." },
  { id:"maine", school:"Maine", campName:"Prospect Camp", league:"caa", lat:44.9001, lng:-68.6719, dates:"June 22, 2025", cost:"$55", eligibility:"Grades 9-12", type:"prospect", coach:"Jordan Stevens", location:"Orono, ME", registrationUrl:"https://www.blackbearelitecamps.com", notes:"One-day camp focused on skill development, position drills, and competition; designed for recruited athletes with D2/D3 coaches attending; no helmet required; bring cleats and water bottle. Also available: Black Bear Elite Camp on 06/19/2026 for 9th-12th grades (fall 2026)." },
  { id:"villanova", school:"Villanova", campName:"Villanova Football Prospect Camp", league:"caa", lat:40.0366, lng:-75.3449, dates:"Specialist Prospect Camp: July 26, 2025; General 2026 Prospect Camps: TBA (registration opening soon)", cost:"$60 (specialist; general TBA)", eligibility:"Open to all (NCAA); limited by number/age/grade/gender; historically grades 10-12", type:"Prospect (general & specialist)", coach:"Mark Ferrante", location:"Villanova, PA", registrationUrl:"https://villanovafootballcamps.totalcamps.com", notes:"No equipment needed except cleats/sneakers. Check-in rolling at Talley Athletic Center. Registration for 2026 general camps opens soon; specialist sign-up available now. Full findings: villanova-football-camp-findings.md" },
  { id:"rhode-island", school:"Rhode Island", campName:"2026 Elite Showcase (Prospect Camp)", league:"caa", lat:41.4857, lng:-71.527, dates:"June 4, 11, 18, 25 2026 (four sessions)", cost:"Price not listed on pages (register via totalcamps shop)", eligibility:"Rising 9th-12th graders (entering grades 9-12 Fall 2026), all positions", type:"prospect / elite showcase", coach:"Jim Fleming", location:"Kingston, RI", registrationUrl:"https://rhodeislandfootball.totalcamps.com/shop", notes:"Held at Meade Stadium (field turf); 4-7pm each session after 3-4pm check-in; URI staff & players run drills (skills, 1v1, etc.); New England college coaches attend; bring workout gear/cleats (no helmet); hydration provided; first-come first-served; no 2025 camps found." },
  { id:"elon", school:"Elon", campName:"Prospect Camp", league:"caa", lat:36.105, lng:-79.4975, dates:"July 11, 2026", cost:"Not listed (contact for details)", eligibility:"Not specified (typically HS prospects)", type:"prospect", coach:"Tony Trisciani", location:"Elon, NC", registrationUrl:"https://www.totalcamps.com/ELONFOOTBALLCAMPS", notes:"Official school-run one-day prospect camp at Rhodes Stadium. Registration opens March 10; contact Dan Baranik dbaranik@elon.edu. 2025 camps were June 19, July 10 & 12 (already passed)." },
  { id:"richmond", school:"Richmond", campName:"Richmond Spiders Football Camps", league:"caa", lat:37.5737, lng:-77.5403, dates:"Not announced for 2025/2026 (as of March 2026)", cost:"Not listed", eligibility:"Open to any and all entrants limited by age, grade level, and/or gender", type:"Skills (non-padded, includes specialists); no specific prospect camp identified", coach:"Russ Huesman", location:"Richmond, VA", registrationUrl:"https://richmondspidersfootballcamps.totalcamps.com", notes:"Non-padded camp, no helmets required. Includes kickers, punters, snappers. Address: 365 College Road, Richmond, VA 23173. Specific 2025/2026 dates/costs not yet available on official site; camps typically announced spring/summer." },
  { id:"towson", school:"Towson", campName:"Check School Website", league:"caa", lat:39.3943, lng:-76.6091, dates:"No 2025/2026 prospect camps announced", cost:"TBD", eligibility:"Grades 9-12", type:"Prospect Camp", coach:"Pete Shinnick", location:"Towson, MD", registrationUrl:"https://shinnickfootballcamps.totalcamps.com", notes:"No official school-run prospect, skills, or elite camps for 2025/2026 located after extensive search of athletics site, TotalCamps/Ryzer, social media, and directories. Specialist camp July 13, 2025 ($60) exists but not prospect/general. Camps may be TBA post-season. Contact: mauricebanks@towson.edu. Old 2014 prospect camp example: grades 9-12, $50-60. Full research saved to towson_tigers_camp_research.md" },
  { id:"william---mary", school:"William & Mary", campName:"Mike London Football Camps - One Day Prospect Camp", league:"caa", lat:37.2712, lng:-76.7145, dates:"2026: June 7, 15, 18", cost:"$65", eligibility:"Not specified (open to any and all participants per NCAA rules)", type:"prospect", coach:"Mike London", location:"Williamsburg, VA", registrationUrl:"https://mikelondonfootballcamps.totalcamps.com/", notes:"One Day camps at WISC Sports Complex (5700 Warhill Trail, Williamsburg, VA 23188). June 7: 12:30-3:30pm; June 15/18: 6:15-8:15pm. 2025 camps announced via official social media but dates/details no longer available online. Specialists welcome at prospect camps per third-party listings (e.g., June 7,16,17 2025 at $65)." },
  { id:"new-hampshire", school:"New Hampshire", campName:"Football 1-Day Camps", league:"caa", lat:43.1348, lng:-70.9227, dates:"July 11, 2025 (1-4pm); July 30, 2025 (5-8pm, full)", cost:"$50 per session", eligibility:"Entering grades 9-PG (high school and post-grad prospects)", type:"prospect (non-contact)", coach:"Sean Goldrich", location:"Durham, NH", registrationUrl:"https://www.unh.edu/youthprograms/course/football-1-day-camps", notes:"Coached by UNH staff and DII/DIII coaches; bring own gear; open to all per NCAA rules. Session 2 full." },
  { id:"marshall", school:"Marshall", campName:"Tony Gibson Prospect Camp", league:"sunbelt", lat:38.4238, lng:-82.4282, dates:"June 4th, 5th, 11th, 12th (likely 2025)", cost:"$64", eligibility:"Grades 9th-12th & JUCO", type:"Prospect", coach:"Tony Gibson", location:"Huntington, WV", registrationUrl:"https://www.tonygibsonfootballcamps.com/tony-gibson-prospect-camp.cfm", notes:"Includes combine school (40yd dash, jumps, shuttle, etc.); helmet recommended; group discounts via tonygibsonfootballcamps@gmail.com; at Joan C. Edwards Stadium. Promoted by official Marshall Football social media for 2025. No 2026 dates found." },
  { id:"troy", school:"Troy", campName:"2026 Mega Prospect Camp I", league:"sunbelt", lat:31.7986, lng:-85.9699, dates:"June 2026 (exact date TBD)", cost:"$50 registration / $60 walk-up", eligibility:"Ages 12-22", type:"Prospect", coach:"Gerad Parker", location:"Troy, AL", registrationUrl:"https://geradparkerfootballcamps.totalcamps.com/shop/EVENT", notes:"Non-position specific prospect evaluation and instruction by Troy staff at Veterans Memorial Stadium. Multiple sessions throughout day. Official head coach-run camps via totalcamps platform. Similar camps: Mega Prospect Camp II (6/12/26), Last Chance Prospect Camp, OL-DL Camps. No 2025 prospect camps found; youth camps exist but not prospect-focused." }
];


/* ===== STATE ===== */
var activeLeagues = new Set(["ivy", "nescac", "patriot", "mega", "d3", "big10", "big12", "sec", "acc", "sunbelt", "cusa", "american", "mwc", "caa"]);
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
  checkAuth();
  if (window.lucide) { lucide.createIcons(); }
});


/* ===== AUTH ===== */
function checkAuth() {
  fetch(API + "/api/auth/me", { credentials: "same-origin" })
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
    credentials: "same-origin",
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
    credentials: "same-origin",
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
  fetch(API + "/api/auth/logout", { method: "POST", credentials: "same-origin" })
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
  map = L.map("map", { center: [39.5, -98.0], zoom: 4, zoomControl: true, attributionControl: true });
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
  var map = {
    ivy: "I", nescac: "N", patriot: "P", mega: "M", d3: "A",
    big10: "B", big12: "12", sec: "S", acc: "AC", sunbelt: "SB",
    cusa: "C", american: "AA", mwc: "MW", caa: "CA"
  };
  return map[league] || "?";
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
  var counts = {};
  var leagues = ["ivy","nescac","patriot","mega","d3","big10","big12","sec","acc","sunbelt","cusa","american","mwc","caa"];
  var labels = {ivy:"Ivy",nescac:"NESCAC",patriot:"Patriot",mega:"Mega",d3:"D3 Acad",big10:"Big Ten",big12:"Big 12",sec:"SEC",acc:"ACC",sunbelt:"Sun Belt",cusa:"C-USA",american:"AAC",mwc:"MW",caa:"CAA"};
  leagues.forEach(function(l) { counts[l] = 0; });
  filtered.forEach(function(c) { if (counts[c.league] !== undefined) counts[c.league]++; });

  var html = '<div class="kpi-item"><span class="kpi-value">' + filtered.length + '</span>Camps</div>';
  leagues.forEach(function(l) {
    if (counts[l] > 0) {
      html += '<div class="kpi-item"><span class="kpi-value">' + counts[l] + '</span>' + labels[l] + '</div>';
    }
  });
  document.getElementById("kpiStrip").innerHTML = html;
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

  var leagueOrder = { ivy: 0, nescac: 1, patriot: 2, mega: 3, d3: 4, big10: 5, big12: 6, sec: 7, acc: 8, sunbelt: 9, cusa: 10, american: 11, mwc: 12, caa: 13 };
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
