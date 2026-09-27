import type { Registration } from '../types';

export const initialMockRegistrations: Registration[] = [
  {
    id: "ECXH-2026-0012",
    teamName: "NeuroCircuit Innovators",
    leaderName: "Karthik Subramanian",
    email: "karthik.s@kiot.ac.in",
    phone: "9876543210",
    collegeName: "Knowledge Institute of Technology",
    department: "Electronics and Computer Engineering",
    domain: "IoT & Embedded Systems",
    ideaTitle: "Ultra Low-power LoRa Edge Nodes for Precision Micro-Irrigation",
    ideaDescription: "A self-sustaining agricultural IoT network utilizing RISC-V microcontrollers, custom soil moisture impedance spectroscopy, and LoRaWAN long-range telemetry to optimize water usage in drought-prone farmland.",
    status: "Confirmed",
    createdAt: "2026-09-20T10:14:00Z",
    agreedToRules: true,
    members: [
      {
        id: "mem-1",
        name: "Karthik Subramanian",
        regNo: "731622106042",
        email: "karthik.s@kiot.ac.in",
        phone: "9876543210",
        isLeader: true
      },
      {
        id: "mem-2",
        name: "Divya Prakash",
        regNo: "731622106028",
        email: "divya.p@kiot.ac.in",
        phone: "9876543211",
        isLeader: false
      },
      {
        id: "mem-3",
        name: "Rohan Varma",
        regNo: "731622106085",
        email: "rohan.v@kiot.ac.in",
        phone: "9876543212",
        isLeader: false
      }
    ]
  },
  {
    id: "ECXH-2026-0018",
    teamName: "Visionary Sentinel",
    leaderName: "Aishwarya Ramesh",
    email: "aishwarya.r@psgtech.ac.in",
    phone: "9845123456",
    collegeName: "PSG College of Technology",
    department: "Computer Science and Engineering",
    domain: "AI & Machine Learning",
    ideaTitle: "Edge-AI Autonomous Hazard Classification for Industrial Workspaces",
    ideaDescription: "Lightweight computer vision model deployed on NVIDIA Jetson or Raspberry Pi 5 to detect PPE non-compliance, equipment overheating via thermal streams, and hazardous posture alerts in factory lines.",
    status: "Confirmed",
    createdAt: "2026-09-21T14:32:00Z",
    agreedToRules: true,
    members: [
      {
        id: "mem-4",
        name: "Aishwarya Ramesh",
        regNo: "22BCS014",
        email: "aishwarya.r@psgtech.ac.in",
        phone: "9845123456",
        isLeader: true
      },
      {
        id: "mem-5",
        name: "Meera Krishnan",
        regNo: "22BCS052",
        email: "meera.k@psgtech.ac.in",
        phone: "9845123457",
        isLeader: false
      },
      {
        id: "mem-6",
        name: "Siddharth Nair",
        regNo: "22BCS089",
        email: "siddharth.n@psgtech.ac.in",
        phone: "9845123458",
        isLeader: false
      },
      {
        id: "mem-7",
        name: "Ananya Iyer",
        regNo: "22BCS104",
        email: "ananya.i@psgtech.ac.in",
        phone: "9845123459",
        isLeader: false
      }
    ]
  },
  {
    id: "ECXH-2026-0025",
    teamName: "CipherShield Ops",
    leaderName: "Mohammed Farhan",
    email: "farhan.m@gct.ac.in",
    phone: "9789123450",
    collegeName: "Government College of Technology, Coimbatore",
    department: "Information Technology",
    domain: "Cybersecurity & Privacy",
    ideaTitle: "Automated Ephemeral Honeypots & Threat Telemetry Graph",
    ideaDescription: "Spinning dynamic Docker micro-honeypots simulating vulnerable IoT MQTT and HTTP protocols, intercepting malicious probes, and mapping adversarial reconnaissance vectors onto a graph intelligence feed.",
    status: "Pending",
    createdAt: "2026-09-22T09:45:00Z",
    agreedToRules: true,
    members: [
      {
        id: "mem-8",
        name: "Mohammed Farhan",
        regNo: "22IT033",
        email: "farhan.m@gct.ac.in",
        phone: "9789123450",
        isLeader: true
      },
      {
        id: "mem-9",
        name: "Tariq Jamil",
        regNo: "22IT078",
        email: "tariq.j@gct.ac.in",
        phone: "9789123451",
        isLeader: false
      }
    ]
  },
  {
    id: "ECXH-2026-0031",
    teamName: "BioPulse Diagnostics",
    leaderName: "Sneha Balakrishnan",
    email: "sneha.b@cit.edu.in",
    phone: "9940123789",
    collegeName: "Coimbatore Institute of Technology",
    department: "Biomedical & Electronics",
    domain: "Healthcare Technology",
    ideaTitle: "Non-Invasive Continuous Photoplethysmography Arrhythmia Screener",
    ideaDescription: "A low-cost wearable sensory glove that measures multi-wavelength optical blood pulse absorption, running tinyML on an ESP32-S3 to detect cardiac irregularities with haptic warning signals.",
    status: "Confirmed",
    createdAt: "2026-09-23T11:20:00Z",
    agreedToRules: true,
    members: [
      {
        id: "mem-10",
        name: "Sneha Balakrishnan",
        regNo: "71762205018",
        email: "sneha.b@cit.edu.in",
        phone: "9940123789",
        isLeader: true
      },
      {
        id: "mem-11",
        name: "Harish Soundar",
        regNo: "71762205044",
        email: "harish.s@cit.edu.in",
        phone: "9940123790",
        isLeader: false
      },
      {
        id: "mem-12",
        name: "Pooja Sundaram",
        regNo: "71762205062",
        email: "pooja.s@cit.edu.in",
        phone: "9940123791",
        isLeader: false
      }
    ]
  },
  {
    id: "ECXH-2026-0039",
    teamName: "EcoVolt Grid",
    leaderName: "Vigneshwaran P",
    email: "vicky.p@kiot.ac.in",
    phone: "9600123456",
    collegeName: "Knowledge Institute of Technology",
    department: "Electrical and Electronics Engineering",
    domain: "Sustainable Technology & Green Energy",
    ideaTitle: "Decentralized Microgrid Peer-to-Peer Energy Balancing Relay",
    ideaDescription: "A smart solid-state bidirectional relay module with real-time current transducer sensing to manage solar rooftop battery redistribution across campus buildings during peak demand.",
    status: "Pending",
    createdAt: "2026-09-24T16:15:00Z",
    agreedToRules: true,
    members: [
      {
        id: "mem-13",
        name: "Vigneshwaran P",
        regNo: "731622105088",
        email: "vicky.p@kiot.ac.in",
        phone: "9600123456",
        isLeader: true
      },
      {
        id: "mem-14",
        name: "Kavitha Murugesan",
        regNo: "731622105041",
        email: "kavitha.m@kiot.ac.in",
        phone: "9600123457",
        isLeader: false
      }
    ]
  },
  {
    id: "ECXH-2026-0044",
    teamName: "CampusSphere AI",
    leaderName: "Gokul Raj",
    email: "gokul.r@srmist.edu.in",
    phone: "9840987654",
    collegeName: "SRM Institute of Science and Technology",
    department: "Electronics and Communication Engineering",
    domain: "Smart Campus & Automation",
    ideaTitle: "Autonomous Lab Equipment Verification & Safety Compliance Rig",
    ideaDescription: "Ultra-wideband indoor localization sensors coupled with optical barcode tracking to prevent laboratory equipment misplacement and enforce bench safety procedures.",
    status: "Pending",
    createdAt: "2026-09-25T13:00:00Z",
    agreedToRules: true,
    members: [
      {
        id: "mem-15",
        name: "Gokul Raj",
        regNo: "RA2211003010",
        email: "gokul.r@srmist.edu.in",
        phone: "9840987654",
        isLeader: true
      },
      {
        id: "mem-16",
        name: "Deepak Chandran",
        regNo: "RA2211003012",
        email: "deepak.c@srmist.edu.in",
        phone: "9840987655",
        isLeader: false
      },
      {
        id: "mem-17",
        name: "Shreya Venkat",
        regNo: "RA2211003024",
        email: "shreya.v@srmist.edu.in",
        phone: "9840987656",
        isLeader: false
      }
    ]
  }
];
