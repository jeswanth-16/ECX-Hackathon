# EDGECRAFT 2026 — Official Event Platform

> **Department of Electronics and Computer Engineering**  
> **Knowledge Institute of Technology (KIOT), Salem, Tamil Nadu**  
> *Tagline: Think • Build • Innovate — Turning Ideas into Real Solutions*

A production-quality, responsive engineering hackathon web platform built with React, Vite, TypeScript, Tailwind CSS, and Lucide React icons.

---

## ⚡ Event Identity

- **Event Name**: EDGECRAFT 2026
- **Event Type**: 8-Hour Hackathon
- **Date**: October 23, 2026 (Friday)
- **Time**: 7:00 AM – 5:00 PM
- **Venue**: KIOT Campus, Knowledge Institute of Technology, Salem
- **Registration Deadline**: October 20, 2026
- **Organizer**: Department of Electronics and Computer Engineering, Knowledge Institute of Technology, Salem

---

## 🛠️ The Three-Round Gauntlet

EDGECRAFT 2026 features a progressive 3-stage challenge:

1. **ROUND 1 — REVERSE**
   - *Description*: Analyze an unfamiliar embedded/IoT system using sensor logs, a block diagram, and known limitations, then identify a limitation or improvement opportunity.
   - *Core Flow*: `ANALYZE → CRITIQUE → IMPROVE`

2. **ROUND 2 — REBUILD**
   - *Description*: Design and build an improved sense-compute-actuate prototype on your own platform.
   - *Core Flow*: `DESIGN → BUILD → TEST`

3. **ROUND 3 — RECONFIGURE**
   - *Description*: Defend how the existing design can be adapted to a new mission under a strict budget/component cap.
   - *Important*: No rebuilding — theoretical defense only.
   - *Core Flow*: `PRESENT → DEFEND → WIN`

Progression: `REVERSE ↓ REBUILD ↓ RECONFIGURE`

---

## 👥 Event Leadership & Coordinators

- **Faculty Coordinator**: Vividhini O
- **Student Coordinators**: Surya A, Sarthoshini S
- **Department**: Department of Electronics and Computer Engineering
- **Institution**: Knowledge Institute of Technology, Salem

---

## 📋 Google Form Registration Setup

The registration workflow is decoupled and designed for Google Forms:

1. Open `src/data/eventConfig.ts`.
2. Locate the isolated constant:
   ```typescript
   export const REGISTRATION_FORM_URL: string = '';
   ```
3. **When empty (`''`)**:
   Clicking any "Register Now" button safely displays an informative modal:
   *"Registration form will be available soon."*
   along with the deadline (October 20, 2026), event date, and venue details.
4. **When populated (e.g. `'https://forms.gle/...'`)**:
   Clicking "Register Now" directly opens the Google Form in a new browser tab.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build & Linting

```bash
npm run lint
npm run build
```

---

## 📁 Clean Architecture

```
src/
├── components/
│   ├── AbstractTechVisual.tsx  # Monochrome circuit board & IC die artwork
│   ├── ChallengeSection.tsx    # Three-round challenge cards & progression
│   ├── CoordinatorsSection.tsx # Official faculty and student coordinators
│   ├── Countdown.tsx           # Live countdown to Oct 23, 2026, 7:00 AM
│   ├── EventStats.tsx          # Key event parameters (Date, Time, Venue, Deadline)
│   ├── FAQ.tsx                 # Searchable FAQ component
│   ├── Footer.tsx              # Event info, coordinators, and navigation
│   ├── Hero.tsx                # Hero section with bold engineering aesthetic
│   ├── MobileBottomNav.tsx     # Mobile bottom navigation bar
│   ├── Navbar.tsx              # Desktop header & mobile navigation drawer
│   ├── SectionHeader.tsx       # Reusable technical section header
│   └── Timeline.tsx            # 8-hour hackathon schedule roadmap
│
├── context/
│   ├── RegistrationContext.tsx     # Registration Provider & fallback modal
│   ├── RegistrationContextType.ts # Context typing
│   └── useRegistration.ts         # Hook for triggering registration action
│
├── data/
│   └── eventConfig.ts          # Central source of truth & REGISTRATION_FORM_URL
│
├── pages/
│   ├── Home.tsx                # Complete landing page
│   ├── About.tsx               # About EDGECRAFT 2026
│   ├── Themes.tsx              # Three-round challenge page
│   ├── TimelinePage.tsx        # Event schedule page
│   ├── Rules.tsx               # Official parameters & challenge guidelines
│   ├── FAQPage.tsx             # Questions & support page
│   ├── Register.tsx            # Dedicated registration landing page
│   └── NotFound.tsx            # 404 page
│
├── types/
│   └── index.ts                # TypeScript interfaces
│
├── App.tsx                     # Routing & layout setup
├── main.tsx                    # React root entry point
└── index.css                   # Tailwind styles & technical grid patterns
```
