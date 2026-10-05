import type { EventConfig, ChallengeRound, TimelineEvent, FAQItem } from '../types';

/**
 * =====================================================================
 * REGISTRATION CONFIGURATION
 * =====================================================================
 * Official EDGECRAFT 2026 Google Form registration URL.
 * When clicking "Register Now" or visiting /register, participants
 * are routed directly to this form in a new tab.
 */
export const REGISTRATION_FORM_URL: string = 'https://forms.gle/G1CMSfwKxzj2oahY8';

export const eventConfig: EventConfig = {
  name: "EDGECRAFT 2026",
  shortName: "EDGECRAFT",
  eventType: "8-HOUR HACKATHON",
  tagline: "Think • Build • Innovate",
  taglineSub: "Turning Ideas into Real Solutions",
  organizer: "Knowledge Institute of Technology, Salem",
  department: "Department of Electronics and Computer Engineering",
  departmentShort: "ECX",
  college: "Knowledge Institute of Technology, Salem",
  collegeShort: "KIOT",
  date: "October 23, 2026 (Friday)",
  day: "Friday",
  time: "7:00 AM – 5:00 PM",
  venue: "KIOT Campus",
  venueFull: "Knowledge Institute of Technology Campus, NH-544, Kakapalayam, Salem, Tamil Nadu 637504",
  registrationDeadline: "October 20, 2026",
  registrationFee: "₹250 per team",
  registrationFeeNote: "One payment is required per team, regardless of team size.",
  registrationFormUrl: REGISTRATION_FORM_URL,
  description: "EDGECRAFT 2026 is an 8-hour hackathon organized by the Department of Electronics and Computer Engineering at Knowledge Institute of Technology, Salem.",
  targetCountdownDate: "2026-10-23T07:00:00",
  coordinators: {
    faculty: [
      {
        role: "Faculty Coordinator",
        name: "Ms.O.Vivedhini",
        phone: "+91 99443 22900",
        phoneTel: "tel:+919944322900",
      },
    ],
    students: [
      {
        role: "Student Coordinator",
        name: "Surya A",
        phone: "+91 861010 4355",
        phoneTel: "tel:+918610104355",
      },
      {
        role: "Student Coordinator",
        name: "Santhoshini S",
        phone: "+91 63837 85532",
        phoneTel: "tel:+916383785532",
      },
    ],
  },
  socials: {
    linkedin: "https://www.linkedin.com/school/knowledge-institute-of-technology",
    instagram: "https://www.instagram.com/kiot_salem",
    twitter: "https://twitter.com/kiot_salem",
    github: "https://github.com/kiot",
  },
};

export const challengeRounds: ChallengeRound[] = [
  {
    number: "01",
    name: "REVERSE",
    description: "Analyze an unfamiliar embedded/IoT system using sensor logs, a block diagram, and known limitations, then identify a limitation or improvement opportunity.",
    flow: ["ANALYZE", "CRITIQUE", "IMPROVE"],
    flowString: "ANALYZE → CRITIQUE → IMPROVE",
  },
  {
    number: "02",
    name: "REBUILD",
    description: "Design and build an improved sense-compute-actuate prototype on your own platform.",
    flow: ["DESIGN", "BUILD", "TEST"],
    flowString: "DESIGN → BUILD → TEST",
  },
  {
    number: "03",
    name: "RECONFIGURE",
    description: "Defend how the existing design can be adapted to a new mission under a strict budget/component cap.",
    importantNote: "No rebuilding — theoretical defense only.",
    flow: ["PRESENT", "DEFEND", "WIN"],
    flowString: "PRESENT → DEFEND → WIN",
  },
];

export const timelineData: TimelineEvent[] = [
  {
    id: "step-1",
    title: "Registrations Open",
    timeOrDate: "Portal Live",
    description: "Online registration opens for student teams ahead of the official deadline.",
    status: "current",
    badge: "Active Stage",
  },
  {
    id: "step-2",
    title: "Registration Deadline",
    timeOrDate: "October 20, 2026",
    description: "Final deadline to submit team registrations via the official registration portal.",
    status: "upcoming",
    badge: "Strict Deadline",
  },
  {
    id: "step-quiz",
    title: "Online Pre-Screening Quiz",
    timeOrDate: "21st",
    description: "Registered teams will participate in an online pre-screening quiz on the 21st for initial screening and shortlisting before the main hackathon.",
    status: "upcoming",
    badge: "Initial Screening",
  },
  {
    id: "step-3",
    title: "Reporting & Hackathon Kick-off",
    timeOrDate: "October 23, 2026 • 7:00 AM",
    description: "Participant reporting, lab orientation, and event briefing at KIOT Campus.",
    status: "upcoming",
  },
  {
    id: "step-4",
    title: "Round 1 — REVERSE",
    timeOrDate: "Hackathon Sprint",
    description: "Analyze an unfamiliar embedded/IoT system using sensor logs, a block diagram, and known limitations, then identify a limitation or improvement opportunity.",
    status: "upcoming",
    roundTag: "ANALYZE → CRITIQUE → IMPROVE",
  },
  {
    id: "step-5",
    title: "Round 2 — REBUILD",
    timeOrDate: "Hackathon Sprint",
    description: "Design and build an improved sense-compute-actuate prototype on your own platform.",
    status: "upcoming",
    roundTag: "DESIGN → BUILD → TEST",
  },
  {
    id: "step-6",
    title: "Round 3 — RECONFIGURE",
    timeOrDate: "Hackathon Sprint",
    description: "Defend how the existing design can be adapted to a new mission under a strict budget/component cap (no rebuilding — theoretical defense only).",
    status: "upcoming",
    roundTag: "PRESENT → DEFEND → WIN",
  },
  {
    id: "step-7",
    title: "Valedictory & Closing",
    timeOrDate: "October 23, 2026 • 5:00 PM",
    description: "Closing ceremony, final evaluation review, and conclusion of the 8-hour hackathon.",
    status: "upcoming",
  },
];

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is EDGECRAFT 2026?",
    answer: "EDGECRAFT 2026 is an 8-hour hackathon organized by the Department of Electronics and Computer Engineering at Knowledge Institute of Technology, Salem. It challenges participants across embedded systems, IoT architectures, and hardware innovation.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "When and where is EDGECRAFT 2026 happening?",
    answer: "The hackathon will be held on Friday, October 23, 2026, from 7:00 AM to 5:00 PM at the KIOT Campus, Knowledge Institute of Technology, Salem.",
    category: "General",
  },
  {
    id: "faq-3",
    question: "When is the registration deadline?",
    answer: "The registration deadline is October 20, 2026. Teams must submit their registration prior to this date.",
    category: "Registration",
  },
  {
    id: "faq-4",
    question: "What are the three rounds of the hackathon?",
    answer: "The hackathon consists of three progressive rounds: Round 1 (REVERSE: Analyze → Critique → Improve), Round 2 (REBUILD: Design → Build → Test), and Round 3 (RECONFIGURE: Present → Defend → Win, theoretical defense under budget/component cap).",
    category: "Challenge",
  },
  {
    id: "faq-5",
    question: "How do I register for the event and what is the fee?",
    answer: "Registrations are collected via our official Google Form. The registration fee is ₹250 per team (one payment is required per team, regardless of team size). Click any 'Register Now' button across the website to open the registration form in a new tab.",
    category: "Registration",
  },
  {
    id: "faq-6",
    question: "Who can I contact regarding EDGECRAFT 2026?",
    answer: "You can contact Faculty Coordinator Ms.O.Vivedhini (+91 99443 22900), or Student Coordinators Surya A (+91 861010 4355) and Santhoshini S (+91 63837 85532) from the Department of Electronics and Computer Engineering, Knowledge Institute of Technology, Salem.",
    category: "Coordinators",
  },
  {
    id: "faq-quiz",
    question: "What is the Online Pre-Screening Quiz?",
    answer: "Registered teams will participate in an online pre-screening quiz on the 21st for initial screening and shortlisting before the main hackathon.",
    category: "General",
  },
];
