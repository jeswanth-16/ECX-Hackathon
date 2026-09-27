import type { EventConfig, ThemeCategory, PrizeItem, TimelineEvent, RuleCategory, FAQItem } from '../types';

export const eventConfig: EventConfig = {
  name: "ECX HACKATHON 2026",
  shortName: "ECXH '26",
  edition: "2026 Edition",
  department: "Department of Electronics and Computer Engineering",
  departmentShort: "ECX",
  college: "Knowledge Institute of Technology",
  collegeShort: "KIOT",
  tagline: "Build • Innovate • Transform",
  description: "A platform for curious minds, creative thinkers and problem solvers to build innovative real-world solutions using Electronics, Computing and emerging technologies.",
  date: "To Be Announced", // Configurable: e.g. "To Be Announced" or "October 24-25, 2026"
  targetCountdownDate: null, // Set to ISO string e.g. "2026-11-10T09:00:00" when date finalized, null for TBA
  venue: "KIOT Campus",
  venueFull: "Knowledge Institute of Technology Campus, NH-544, Kakapalayam, Salem, Tamil Nadu 637504",
  teamSize: {
    min: 2,
    max: 4,
  },
  registrationDeadline: "To Be Announced",
  registrationFee: "Free Registration (Details announced by organizers)",
  allowTeamEditing: true,
  contact: {
    coordinatorName: "Event Coordinator",
    department: "Department of Electronics and Computer Engineering",
    email: "ecx.hackathon@kiot.ac.in (To Be Announced)",
    phone: "+91 98765 XXXXX (To Be Announced)",
    address: "KIOT Campus, Salem - Kochi Highway, Kakapalayam, Salem, Tamil Nadu 637504",
  },
  socials: {
    linkedin: "https://www.linkedin.com/school/knowledge-institute-of-technology",
    instagram: "https://www.instagram.com/kiot_salem",
    twitter: "https://twitter.com/kiot_salem",
    github: "https://github.com/ecx-kiot",
  },
};

export const eventThemes: ThemeCategory[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    slug: "ai-ml",
    tag: "AI & ML",
    iconName: "BrainCircuit",
    description: "Build cutting-edge generative AI, computer vision, autonomous agents, and predictive machine intelligence systems for real-world impact.",
    sampleProblems: [
      "Edge-AI vision processing for industrial safety",
      "Multilingual healthcare diagnostic triage agents",
      "Adaptive predictive maintenance in smart grids",
      "Automated document summarization & compliance auditing"
    ]
  },
  {
    id: "iot-embedded",
    title: "IoT & Embedded Systems",
    slug: "iot",
    tag: "IoT",
    iconName: "Cpu",
    description: "Merge hardware with software: smart sensor networks, microcontroller automation, edge computing, robotics, and industrial telemetry.",
    sampleProblems: [
      "Low-power LoRaWAN environmental air/water telemetry",
      "Smart agriculture micro-irrigation with soil neural sensors",
      "Wearable vital monitoring device for high-risk workers",
      "Autonomous warehouse robotic swarm navigation"
    ]
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Platforms",
    slug: "web-mobile",
    tag: "Web & Mobile",
    iconName: "Globe",
    description: "Architect high-performance distributed web apps, PWA offline solutions, native cross-platform mobile utilities, and developer productivity tools.",
    sampleProblems: [
      "Hyper-local emergency response coordination app",
      "Accessible voice-first citizen services portal",
      "Decentralized peer-to-peer micro-learning platform",
      "High-throughput offline-first logistics tracker"
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Privacy",
    slug: "cybersecurity",
    tag: "Cybersecurity",
    iconName: "ShieldAlert",
    description: "Fortify digital perimeters with zero-trust architectures, automated vulnerability heuristics, privacy-preserving cryptography, and threat intelligence.",
    sampleProblems: [
      "Zero-trust credential stuffing detection engine",
      "Autonomous honeypot threat telemetry for cloud VPCs",
      "Privacy-preserving federated clinical data validation",
      "Phishing anomaly classification browser extension"
    ]
  },
  {
    id: "healthcare-tech",
    title: "Healthcare Technology",
    slug: "other",
    tag: "Healthcare",
    iconName: "HeartPulse",
    description: "Innovate medical diagnostics, patient monitoring, bio-signal telemetry, assistive technologies for disability, and telemedicine infrastructure.",
    sampleProblems: [
      "Non-invasive remote cardiac arrhythmia screener",
      "Smart tactile navigation gear for visually impaired",
      "Drug interaction cross-checking API engine",
      "Hospital ICU bed telemetry & oxygen allocation manager"
    ]
  },
  {
    id: "smart-campus",
    title: "Smart Campus & Automation",
    slug: "other",
    tag: "Campus",
    iconName: "School",
    description: "Transform university life with automated attendance, energy conservation, smart laboratory booking, and student safety monitoring.",
    sampleProblems: [
      "Computer vision lab equipment safety enforcement",
      "Smart campus energy optimization via occupancy sensors",
      "Digital student verification and event credentialing",
      "Autonomous cafeteria food waste reduction monitor"
    ]
  },
  {
    id: "sustainable-tech",
    title: "Sustainable Technology & Green Energy",
    slug: "other",
    tag: "CleanTech",
    iconName: "Leaf",
    description: "Engineer eco-friendly solutions for renewable energy optimization, carbon footprint tracking, circular economy recycling, and clean mobility.",
    sampleProblems: [
      "Solar rooftop yield prediction and dust alert system",
      "EV smart charging grid balancer for institutional campuses",
      "Automated electronic e-waste classification and recycling bot",
      "Hyperlocal carbon emission offset ledger"
    ]
  },
  {
    id: "open-innovation",
    title: "Open Innovation",
    slug: "other",
    tag: "Open Track",
    iconName: "Sparkles",
    description: "Have a revolutionary idea that defies standard boundaries? Build groundbreaking multidisciplinary technology that solves significant societal challenges.",
    sampleProblems: [
      "FinTech accessibility for unbanked micro-entrepreneurs",
      "Disaster management real-time UAV rescue network",
      "AR/VR immersive STEM education laboratory simulator",
      "Cross-domain hardware-software synthesis projects"
    ]
  }
];

export const prizeData: PrizeItem[] = [
  {
    id: "prize-1",
    rank: "1st Prize",
    title: "Grand Champion",
    amountPlaceholder: "₹XX,XXX",
    description: "Awarded to the overall most outstanding hardware/software innovation with exceptional technical merit and real-world viability.",
    isPopular: true,
    color: "gold",
    perks: [
      "Winner Trophy & Certificates of Excellence",
      "Direct incubation & mentorship opportunity",
      "Tech gadget goodies & organizer merchandise",
      "Featured spotlight across ECX KIOT media"
    ]
  },
  {
    id: "prize-2",
    rank: "2nd Prize",
    title: "First Runner-Up",
    amountPlaceholder: "₹XX,XXX",
    description: "Recognizing outstanding design execution, technical robustness, and impactful problem-solving capability.",
    color: "silver",
    perks: [
      "Runner-up Trophy & Merit Certificates",
      "Hardware dev boards / specialized tech kits",
      "Project incubation advisory session",
      "Priority access to departmental tech events"
    ]
  },
  {
    id: "prize-3",
    rank: "3rd Prize",
    title: "Second Runner-Up",
    amountPlaceholder: "₹XX,XXX",
    description: "Honoring strong engineering execution, collaborative teamwork, and functional prototype completion.",
    color: "bronze",
    perks: [
      "Trophy & Certificates of Merit",
      "Specialized tech accessories & swags",
      "Certificate of Engineering Innovation",
      "Mentorship and project showcase support"
    ]
  },
  {
    id: "prize-special-1",
    rank: "Special Award",
    title: "Best Hardware / Embedded Prototype",
    amountPlaceholder: "₹XX,XXX",
    description: "Dedicated to the team that demonstrates the most sophisticated hardware circuits, microcontroller design, or IoT implementation.",
    color: "special",
    perks: [
      "Hardware Excellence Trophy & Certificates",
      "Component kit sponsorship / specialized toolkit",
      "Lab facility access for project scaling"
    ]
  },
  {
    id: "prize-special-2",
    rank: "Special Award",
    title: "Best All-Women Engineering Team",
    amountPlaceholder: "₹XX,XXX",
    description: "Celebrating and empowering women in engineering and technology who deliver impactful, groundbreaking solutions.",
    color: "special",
    perks: [
      "Women in Tech Trophy & Special Mementos",
      "Industry women leader mentorship program",
      "Certificates of Special Distinction"
    ]
  },
  {
    id: "prize-special-3",
    rank: "Special Award",
    title: "Best First-Year / Junior Innovators",
    amountPlaceholder: "₹XX,XXX",
    description: "Special recognition for fresh engineering talent demonstrating exceptional curiosity, coding grit, and enthusiasm.",
    color: "special",
    perks: [
      "Emerging Innovator Medals & Certificates",
      "Hands-on electronics workshop access",
      "Dedicated senior faculty mentorship"
    ]
  }
];

export const timelineData: TimelineEvent[] = [
  {
    id: "step-1",
    title: "Registrations Open",
    date: "Date: To Be Announced",
    description: "Online portal opens for team registrations across all colleges and universities. Select problem domain and submit team roster.",
    status: "current",
    badge: "Current Stage"
  },
  {
    id: "step-2",
    title: "Registration Deadline",
    date: "Date: To Be Announced",
    description: "Final deadline for online registrations. Portal locks team submissions and begins internal review.",
    status: "upcoming"
  },
  {
    id: "step-3",
    title: "Team Shortlist & Confirmation",
    date: "Date: To Be Announced",
    description: "Shortlisted teams receive official confirmation passes and verification codes via email and the portal.",
    status: "upcoming"
  },
  {
    id: "step-4",
    title: "Hackathon Begins & Opening Ceremony",
    date: "Date: To Be Announced",
    description: "Reporting at KIOT Campus, badge pickup, keynote address by industry leaders, and official problem briefing.",
    status: "upcoming"
  },
  {
    id: "step-5",
    title: "Project Development & Mentorship",
    date: "Date: To Be Announced",
    description: "Non-stop engineering sprint with regular milestone reviews, technical guidance from ECX faculty and industry experts.",
    status: "upcoming"
  },
  {
    id: "step-6",
    title: "Final Code & Prototype Submission",
    date: "Date: To Be Announced",
    description: "Teams freeze code, commit GitHub repositories, prepare live hardware demos, and submit project documentation.",
    status: "upcoming"
  },
  {
    id: "step-7",
    title: "Jury Evaluation & Pitching",
    date: "Date: To Be Announced",
    description: "Live demonstration before the evaluation panel, code review, architectural interrogation, and Q&A.",
    status: "upcoming"
  },
  {
    id: "step-8",
    title: "Valedictory & Results Declaration",
    date: "Date: To Be Announced",
    description: "Grand closing ceremony, distribution of trophies, certificates, prize announcements, and networking session.",
    status: "upcoming"
  }
];

export const rulesData: RuleCategory[] = [
  {
    id: "general",
    title: "General Rules",
    icon: "BookOpen",
    rules: [
      "ECX Hackathon is open to undergraduate and postgraduate engineering and polytechnic students from recognized institutions.",
      "All participants must carry a valid physical College Identity Card along with their official Registration Digital Pass.",
      "The hackathon organizers reserve the right to verify the enrollment status of all participants with their respective institutions.",
      "Decisions made by the organizing committee and the judging panel regarding event administration, schedules, and scores are final and binding.",
      "Participants are expected to maintain professional demeanor, decorum, and safety standards while on the KIOT campus."
    ]
  },
  {
    id: "team",
    title: "Team Guidelines",
    icon: "Users",
    rules: [
      `Each team must strictly comprise between ${eventConfig.teamSize.min} and ${eventConfig.teamSize.max} members.`,
      "One member must be designated as the Team Leader, who will act as the single point of contact for all official notifications.",
      "Inter-departmental and inter-year teams within an institution are actively encouraged.",
      "Cross-college teams are permitted, provided all members present valid IDs from their respective colleges.",
      "A student cannot register as part of more than one team in the hackathon.",
      "Changes to team composition after the registration deadline require prior written approval from the event coordinator."
    ]
  },
  {
    id: "technical",
    title: "Technical Guidelines",
    icon: "Code2",
    rules: [
      "All projects must be conceived, developed, and demonstrated within the framework of the chosen problem domain.",
      "Use of open-source frameworks, public libraries, pre-trained public AI models, and standard development boards is permitted.",
      "Pre-existing closed commercial solutions or submitting a completely pre-built project developed before the hackathon is strictly prohibited.",
      "All source code must be hosted on an accessible Git repository (GitHub / GitLab) created for the event.",
      "Hardware projects must demonstrate safe electrical practices. Participants requiring high-power equipment must notify organizers in advance."
    ]
  },
  {
    id: "conduct",
    title: "Code of Conduct & Originality",
    icon: "ShieldCheck",
    rules: [
      "Zero tolerance for plagiarism: Any team found copying existing commercial products or fellow participants' code will be disqualified immediately.",
      "Harassment, discrimination, or offensive behavior of any form will result in immediate campus eviction and institutional reporting.",
      "Respect intellectual property rights. Respect open-source licenses for all third-party libraries leveraged.",
      "Respect campus property, laboratory workstations, test equipment, and venue facilities."
    ]
  },
  {
    id: "submission",
    title: "Submission Guidelines",
    icon: "UploadCloud",
    rules: [
      "Submissions must include: working prototype demo, GitHub repository link, clear README with setup instructions, and architecture presentation.",
      "For embedded/hardware tracks, a live working hardware demonstration at the designated evaluation booth is mandatory.",
      "Teams failing to submit code and demo slides before the stipulated countdown deadline will not be eligible for jury evaluation.",
      "Presentation pitch is limited to 5 minutes of demo followed by 3 minutes of technical Q&A with the jury."
    ]
  },
  {
    id: "judging",
    title: "Judging Criteria",
    icon: "Award",
    rules: [
      "Innovation & Originality (25%): Novelty of the approach and uniqueness in solving the chosen problem statement.",
      "Technical Complexity & Architecture (25%): Quality of code, hardware integration, robustness, and architectural soundness.",
      "Practical Feasibility & Impact (20%): Real-world applicability, commercial viability, scalability, and target beneficiary impact.",
      "Completeness of Working Prototype (20%): Degree of functional readiness shown during the live demonstration.",
      "Pitch & Presentation (10%): Clarity of communication, team synergy, and articulate responses during jury questions."
    ]
  },
  {
    id: "notes",
    title: "Important Notes & Facilities",
    icon: "Info",
    rules: [
      "High-speed campus Wi-Fi connectivity and power extension sockets will be provided at every hackathon bay.",
      "Participants are required to bring their own laptops, chargers, hardware components, microcontrollers, and specialized sensors.",
      "Standard food, refreshments, and night lab working zones will be arranged by KIOT for confirmed participants.",
      "For outstation participants, accommodation guidance will be shared along with the confirmation digital pass.",
      "In case of any medical emergencies, the KIOT campus health center and first-aid volunteers will be active 24/7."
    ]
  }
];

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "Who can participate in ECX Hackathon 2026?",
    answer: "Undergraduate and postgraduate students pursuing B.E., B.Tech, M.E., M.Tech, MCA, B.Sc/M.Sc (CS/IT/Electronics), or Polytechnic diploma courses from any AICTE/UGC approved institution are welcome to participate."
  },
  {
    id: "faq-2",
    category: "Team & Registration",
    question: "What is the team size requirement?",
    answer: `Teams must have a minimum of ${eventConfig.teamSize.min} and a maximum of ${eventConfig.teamSize.max} members. Cross-departmental and cross-year teams are highly encouraged!`
  },
  {
    id: "faq-3",
    category: "Team & Registration",
    question: "Is there any registration fee?",
    answer: "Registration details will be announced by the organizers. The platform is completely free to submit your initial registration and project idea."
  },
  {
    id: "faq-4",
    category: "Technical",
    question: "What technologies and tools can we use?",
    answer: "You are free to use any modern programming languages (Python, C/C++, Rust, JavaScript, TypeScript, Go), frameworks (React, Flutter, Node.js, FastAPI, TensorFlow, PyTorch), microcontrollers (ESP32, STM32, Arduino, Raspberry Pi, FPGA), or cloud platforms."
  },
  {
    id: "faq-5",
    category: "Team & Registration",
    question: "Can I participate individually without a team?",
    answer: `No, individual participation is not allowed. The minimum team size is ${eventConfig.teamSize.min} members to encourage collaborative engineering and multidisciplinary problem-solving.`
  },
  {
    id: "faq-6",
    category: "General",
    question: "When will registrations close?",
    answer: "The registration deadline will be announced on this website and via official KIOT ECX announcements. We encourage teams to register early to secure priority review."
  },
  {
    id: "faq-7",
    category: "Team & Registration",
    question: "How will our team receive confirmation?",
    answer: "Upon completing the online registration form, you will receive an instant Digital Event Pass with a unique Registration ID and QR Code. Shortlisted teams will also receive official confirmation emails with reporting instructions."
  },
  {
    id: "faq-8",
    category: "Prizes & Logistics",
    question: "What are the prize amounts?",
    answer: "Prize amounts are currently listed as placeholders (₹XX,XXX) and will be officially unveiled with sponsor partner announcements. Generous cash awards, trophies, maker kits, and incubation certificates will be awarded to top teams."
  },
  {
    id: "faq-9",
    category: "Prizes & Logistics",
    question: "Will accommodation and food be provided?",
    answer: "Yes, meals, snacks, midnight coffee, high-speed Wi-Fi, and work facilities will be provided at the KIOT campus during the hackathon. Guidance for outstation participant lodging will be shared prior to the event."
  },
  {
    id: "faq-10",
    category: "General",
    question: "Who can I contact for queries or assistance?",
    answer: "You can reach out to the Department of Electronics and Computer Engineering event coordinators via the contact details provided in the footer or email the department helpdesk."
  }
];
