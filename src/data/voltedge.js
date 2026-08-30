export const meta = {
  team: "VoltEdge",
  id: "007",
  tagline: "Driven by Volts, Defined by Vision",
  event: "National Robotics League 2025",
  season: "Battle of Charges",
  venue: "IIT Bombay",
  dates: "4 Oct — 7 Dec 2025",
  championship: "6—7 December 2025",
  location: "Bhatkal",
  org: "The Innovation Story / IIT Bombay / Param Capital",
  site: "nrl.theinnovationstory.com",
  school: "Ali Public Pre-University College",
  award: "Community Champions Award",
  article: "https://english.fikrokhabar.com/team-voltedge-from-ali-public-pu-college-wins-community-champions-award-at-national-robotics-league-2025/",
  linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7499864515564425216/",
};

export const members = [
  { id: 1, name: "Abdullah Saami Sada", role: "Documentation & Programming", detail: "Built the entire portfolio, structured communication, supported software setup. Ensured documentation reflected work from day one.", abbr: "AS" },
  { id: 2, name: "Mohiddin Ahmed Motiya", role: "Human Player & Brand Manager", detail: "Human-robot coordination on field. Off field: branding, identity, visual communication to school and online audiences.", abbr: "MA" },
  { id: 3, name: "Omer Ruknuddin", role: "Lead Programmer & Primary Driver", detail: "Software architecture, controller mapping, movement logic, performance tuning. Bridges code with real-time arena decisions.", abbr: "OR" },
  { id: 4, name: "Mohammed Zaid Fareed", role: "Electronics Lead", detail: "Wiring, circuit stability, power routing, sensor integration, electronic safety checks. The electrical backbone under stress.", abbr: "MZ" },
  { id: 5, name: "Ahmed Irfan Akrami", role: "Mechanical Lead", detail: "Chassis alignment, arm and gripper assembly, torque balancing, wheel fitting. Precision that holds stability across testing cycles.", abbr: "AI" },
  { id: 6, name: "Shamveel Bukhari Khateeb", role: "Driver Strategist & Visual Head", detail: "On-field guidance for Omer; off-field video, documentation footage, and storytelling for VoltEdge and NRL.", abbr: "SB" },
];

export const mentor = {
  name: "Nuhail Damudi",
  role: "Mentor",
  detail: "Opened the door to robotics. Guides with clarity, patience, and engineering discipline. VoltEdge evolved from curious beginners into a focused, confident national team under his guidance.",
};

export const chapters = [
  {
    id: "spark",
    num: "01",
    kicker: "The First Spark",
    title: "It began with\ncuriosity.",
    body: [
      "4 October. Five days before midterms. Omer reached out to Abdullah with the details of the National Robotics League. Within minutes, the idea took shape. No robot, no workspace, no plan — only curiosity.",
      "By 9 October, a day before exams, VoltEdge registered as Team 007. When the BaseBot kit arrived in Bhatkal on 20 October, the spark turned into commitment.",
      "What followed was six days of continuous building. Those six days shaped our identity: a team that learns fast, adapts fast, and moves forward no matter how busy life gets.",
    ],
  },
  {
    id: "build",
    num: "02",
    kicker: "The Build",
    title: "Six days.\nOne machine.",
    body: [
      "From 22 to 27 October, each evening after college became a build session. Irfan handled mechanical alignments. Zaid routed wiring. Omer tested movements. Abdullah documented. Shamveel captured. Mohiddin coordinated.",
      "No task was ever done alone. Mechanical and electronics worked side by side. Programmers tested motor response as soon as components were installed.",
      "By 27 October, the BaseBot was fully assembled and operational. Acrylic plates, motors, screws, spacers, sensors — scattered parts became a machine.",
    ],
  },
  {
    id: "edgebot",
    num: "03",
    kicker: "EdgeBot",
    title: "From BaseBot\nto EdgeBot.",
    body: [
      "The BaseBot we received was a foundation. EdgeBot was the team's identity wrapped around it — a custom 3D-printed monster-truck shell, rear aero wing, under-chassis downlights, and a full sensor suite.",
      "Inside: gyroscope for turning accuracy, ultrasonic for obstacle detection, line-following sensors for autonomous path tracking. Every modification was a decision the team made together.",
      "The robot was evidence of teamwork, not the protagonist of the story.",
    ],
    differences: [
      { from: "BaseBot open structure", to: "Monster-truck 3D shell, closed, rigid" },
      { from: "No wing", to: "Rear aero wing — stabilizes acceleration" },
      { from: "No sensing", to: "Gyro + ultrasonic + line array" },
    ],
  },
  {
    id: "autonomy",
    num: "04",
    kicker: "Autonomy",
    title: "The robot had\nzero autonomy.\nWe built it.",
    body: [
      "The BaseBot arrived completely manual. No sensors, no logic, no pathway to run on its own. For the Autonomous Skill Challenge, everything had to be built from scratch.",
      "We acquired a 5-sensor IR line array, gyroscope, and ultrasonic distance sensor. Calibration took dozens of attempts — tape tests, drift fixes, threshold adjustments. Guidance from Danish Gawai Sir over several days helped transform raw data into usable decisions.",
      "By the end, the robot followed tape, held direction, slowed precisely near charges — responding not just to code, but to environment.",
    ],
  },
  {
    id: "arena",
    num: "05",
    kicker: "The Arena",
    title: "IIT Bombay.\nBattle of Charges.",
    body: [
      "6—7 December 2025. IIT Bombay. 600+ students. 100+ teams. 65+ schools. One national arena.",
      "VoltEdge — Ali Public Pre-University College, Bhatkal — stood as the only team representing their town on the national stage.",
      "Battle of Charges: 2 minutes 30 seconds per match, 7–10 minute cycles. Robots retrieve a CHARGE from the Source Zone, score it in the Drop Zone. Precision over speed. Shortest path wins.",
      "At the booth: EdgeBot, a drone prototype, and the Transparent Glass Safety System poster — all on display for judges and teams from across India.",
    ],
    award: {
      title: "Community Champions Award",
      body: "Recognized for building a robotics culture in Bhatkal — school workshops, kits distributed, STEM awareness, and inspiring the next generation.",
    },
    stats: [
      { label: "Students", value: "600+" },
      { label: "Teams", value: "100+" },
      { label: "Schools", value: "65+" },
      { label: "Match", value: "2:30" },
    ],
  },
  {
    id: "outreach",
    num: "06",
    kicker: "Beyond the Arena",
    title: "They weren't just\nbuilding a robot.\nThey were building\na culture.",
    body: [
      "6 November at Ali Public School: nearly forty students experienced robotics for the first time. Same day NRL announced the Team Reveal challenge.",
      "15 November: launched a hands-on Basic Robotics Course — components, sensing, wiring, simple movement logic. Kits distributed so every participant could build with their own hands.",
      "Students asked how to participate next year. The course continues toward science exhibition robots and future NRL entries.",
      "For many in Bhatkal, NRL became the first introduction to alive, creative, achievable engineering. Seeing a real local team on the way to IIT Bombay made STEM feel accessible.",
    ],
    metrics: [
      { label: "Students", value: "40+" },
      { label: "Course", value: "Launched" },
      { label: "Kits", value: "Distributed" },
    ],
  },
  {
    id: "branding",
    num: "07",
    kicker: "Identity",
    title: "We needed to\nlook like a team.",
    body: [
      "Volt = power, energy, electronics. Edge = precision, competitiveness, sharpness of design. Colors with intent: gold — ambition, yellow — innovation, black — clean, sharp, modern foundation.",
      "Logo never altered. Every Instagram post, reveal video, portfolio cover followed dark backgrounds with golden accents. Apparel: official jersey and jacket in black-and-gold.",
      "Social became a parallel arena. One month: 68,385 views, 13,603 accounts reached, 85.3% non-followers. Authenticity wins.",
      "The robot represented VoltEdge on the field. The identity represented VoltEdge everywhere else.",
    ],
  },
  {
    id: "journey",
    num: "08",
    kicker: "The Journey",
    title: "Built moment\nby moment.",
    body: [
      "Every advancement had to fit into a month overflowing with academic deadlines, council responsibilities, robotics commitments, daily student life.",
      "Then the worst happened. The night before departure — servo jittered and died. While trying to fix it, the voltage regulator overheated and blew up, taking the ESP32 and the entire Hexa Command Hub with it. The robot was dead. They stayed all night. They went to school at 5 AM looking for parts. Nothing. They left for Bombay with a robot that wouldn't move. At the hotel, they ordered a replacement Hub from the NRL organizers. It arrived. They rebuilt it. Two days later, they competed.",
    ],
    timeline: [
      { date: "4 Oct", title: "The First Spark", desc: "Omer shares NRL with Abdullah. No robot, no plan — only curiosity." },
      { date: "9 Oct", title: "Registration", desc: "VoltEdge registered as Team ID 007. Belief over preparation." },
      { date: "20 Oct", title: "Kit Arrives", desc: "BaseBot box opens in Bhatkal." },
      { date: "22—27 Oct", title: "The Build", desc: "Six evenings. BaseBot assembled." },
      { date: "6 Nov", title: "Workshop", desc: "40 students at Ali Public School." },
      { date: "7 Nov", title: "Reveal", desc: "Team Reveal shot morning of tour departure." },
      { date: "15—25 Nov", title: "Autonomy", desc: "Sensor integration. Tape tests. Drift fixes." },
      { date: "30 Nov", title: "Portfolio", desc: "This document — every test, screenshot, decision." },
      { date: "3 Dec", title: "The Night Before", desc: "Servo dies. Voltage regulator blows. ESP32 gone. Hexa Command Hub dead. All-night fix attempt. School at 5 AM for parts. Nothing works. Robot is dead." },
      { date: "4 Dec", title: "Leaving Broken", desc: "Packed and left for Bombay with a robot that wouldn't move. No parts available in Bhatkal." },
      { date: "5 Dec", title: "The lifeline", desc: "Ordered Hexa Command Hub from NRL organizers. Package arrived at the hotel. Started fixing." },
      { date: "6—7 Dec", title: "IIT Bombay", desc: "The arena where every late evening comes together." },
    ],
    closing: "These challenges did not interrupt our journey. They defined it. Follow us: @teamvoltedge",
  },
];

export const stats = {
  views: "68,385",
  reach: "13,603",
  nonFollower: "85.3%",
  profileGrowth: "+969.9%",
  topReel: "20,000+",
  pages: 60,
  buildDays: 6,
  workshopStudents: "40+",
  championship: "6—7 Dec 2025, IIT Bombay",
  season: "Battle of Charges",
  matchDuration: "2:30",
  students: "600+",
  teams: "100+",
  schools: "65+",
  distinction: "Only team from Bhatkal",
  award: "Community Champions",
};

export const nrl = {
  season: "Battle of Charges",
  element: "CHARGE",
  source: "Source Zone",
  drop: "Drop Zone",
  station: "Charge Station",
  matchDuration: "2 minutes 30 seconds",
  cycleWindow: "7–10 minute cycles",
  manual: "NRL Game Manual V2.0",
  site: "nrl.theinnovationstory.com",
};

export default chapters;
