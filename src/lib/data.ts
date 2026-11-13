export const LINKS = {
  github: "https://github.com/karthi-1451",
  linkedin: "https://www.linkedin.com/in/karthi-pattabiraman-13ab17363/",
  instagram: "https://www.instagram.com/its_not_karthi/",
  email: "karthipattabiraman@gmail.com",
  phone: "+91 9442693282",
  location: "Hosur, Tamil Nadu, India",
  resume: "/resume/resume.html",
  certificatesTechnical: "/certificates/technical.html",
  certificatesNonTechnical: "/certificates/non-technical.html",
};

export const ROLES = [
  "Electronics & Communication Engineering Student",
  "Second Year B.Tech Student",
  "Embedded Systems Enthusiast",
  "Web Developer",
  "Problem Solver",
  "Future Robotics Engineer",
  "Technology Explorer",
];

export const PERSONAL: [string, string][] = [
  ["Name", "P Karthi"],
  ["Degree", "Bachelor of Technology"],
  ["Branch", "Electronics & Communication Engineering"],
  ["University", "SRM Institute of Science and Technology"],
  ["Year", "Second Year"],
  ["Batch", "2025 – 2029"],
  ["Location", "Hosur, Tamil Nadu, India"],
  ["Languages", "Tamil · English · German (Basic)"],
];

export const STATS = [
  { label: "Semester 1 SGPA", value: 9.33 },
  { label: "Semester 2 SGPA", value: 9.52 },
  { label: "Average SGPA", value: 9.44 },
];

export const EDUCATION = [
  {
    period: "Until 2025",
    place: "Sri Chaitanya School",
    board: "CBSE",
    rows: [
      ["Class 10", "77.2%"],
      ["Class 12", "79.6%"],
    ],
  },
  {
    period: "2025 – 2029",
    place: "SRM Institute of Science and Technology",
    board: "Bachelor of Technology",
    rows: [
      ["Branch", "Electronics & Communication Engineering"],
      ["Status", "Second Year Student"],
    ],
  },
];

export const SKILLS = [
  { title: "Programming", items: ["C", "Python", "HTML", "CSS", "JavaScript"] },
  {
    title: "Electronics",
    items: [
      "Embedded Systems",
      "PCB Designing",
      "Circuit Design",
      "Arduino",
      "ESP32",
      "Sensors",
      "IoT",
    ],
  },
  {
    title: "Web Development",
    items: ["Responsive Design", "Modern UI", "Frontend Development"],
  },
  {
    title: "Software & Tools",
    items: ["VS Code", "Git", "GitHub", "EasyEDA", "Figma (Basic)"],
  },
  {
    title: "AI Tools",
    items: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Google AI Studio",
      "NotebookLM",
      "Lovable",
    ],
  },
];

export const PROJECTS = [
  {
    id: "cric-connect",
    title: "CRIC CONNECT",
    status: "Ongoing",
    image: "/images/project1.jpg",
    overview:
      "A location-based cricket networking platform that helps players discover nearby teams, create their own teams, organize matches and communicate efficiently.",
    problem:
      "Finding local cricket teams is fragmented today — it mostly depends on WhatsApp groups or personal contacts.",
    solution:
      "A dedicated platform that connects players and teams through location-aware discovery and structured team management.",
    contribution: [
      "Designed the complete application concept",
      "Created the frontend interface",
      "Designed the user flow",
      "Planned authentication",
      "Created responsive layouts",
      "Implemented multiple web pages",
      "Built reusable UI components",
      "Designed the future database structure",
    ],
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js (planned)",
      "MongoDB (planned)",
    ],
    features: [
      "Location Based Team Discovery",
      "Phone Number Login",
      "Google Login",
      "Create Team",
      "Join Team",
      "Captain Dashboard",
      "Player Profiles",
      "Team Statistics",
      "Winning Percentage",
      "Group Chat",
      "Customer Support Chat",
      "Responsive Design",
    ],
    demo: null as string | null,
    repo: null as string | null,
  },
  {
    id: "phone-detector",
    title: "Phone Detector PCB",
    status: "Completed Academic Project",
    image: "/images/project2.jpg",
    overview:
      "A compact electronic circuit capable of detecting nearby mobile phone RF activity and notifying the user through a buzzer.",
    problem:
      "Mobile phones can interfere with sensitive environments, but nearby activity is difficult to detect without dedicated equipment.",
    solution:
      "A PCB-based detector that senses RF emissions from mobile devices and triggers an audible alert.",
    contribution: [
      "Designed the complete circuit",
      "Performed component selection",
      "Created the PCB schematic",
      "Worked with EasyEDA",
      "Studied signal amplification",
      "Integrated the timer circuit",
      "Designed a compact layout",
    ],
    tech: [
      "EasyEDA",
      "CA3130",
      "LM358",
      "555 Timer",
      "PCB Design",
      "Electronic Components",
    ],
    features: [
      "RF Signal Detection",
      "Operational Amplifier",
      "Comparator Circuit",
      "555 Timer Delay",
      "Buzzer Alert",
      "Compact PCB Layout",
      "Low Power Design",
    ],
    demo: null as string | null,
    repo: null as string | null,
  },
];

export const LANGUAGES = [
  { name: "Tamil", level: "Mother Tongue", pct: 100 },
  { name: "English", level: "Professional Working Proficiency", pct: 85 },
  { name: "German", level: "Basic", pct: 30 },
];

export const INTERESTS = [
  "Electronics",
  "Embedded Systems",
  "PCB Designing",
  "AI",
  "Robotics",
  "IoT",
  "Automation",
  "Programming",
  "Web Development",
  "Cricket",
  "Technology",
  "Cars",
  "Long Drives",
  "Gaming",
  "Problem Solving",
];
