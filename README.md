# ECX HACKATHON 2026 — Official Registration Platform

> **Department of Electronics and Computer Engineering (ECX)**  
> **Knowledge Institute of Technology (KIOT), Salem, Tamil Nadu**  
> *Tagline: Build • Innovate • Transform*

A production-quality, mobile-first hackathon registration platform built with React, Vite, TypeScript, Tailwind CSS, React Router, and Lucide React icons.

---

## ⚡ Key Highlights

- **100% Free Registration Platform**: Strictly zero payment integrations, zero gateways, and zero payment processing. Free entry for student engineering teams.
- **Centralized Event Configuration (`src/data/eventConfig.ts`)**: Edit dates, venues, team limits, problem tracks, prizes, rules, FAQs, and contact coordinates in one place.
- **Electric Dark Navy Aesthetic**: Deep navy background (`#030712`, `#07111F`), electric blue (`#1677FF`) & purple (`#7C3AED`) gradients, glassmorphism cards, and SVG/CSS-based processor circuit visuals (zero copyrighted stock images).
- **Mobile-First Experience**: Fixed bottom navigation bar (`Home`, `Themes`, `Register`, `My Team`, `More`), 44px+ touch targets, single-column responsive forms, and horizontal overflow protection for screen widths from 320px up to 1440px.
- **Live Dynamic Pass & QR Generator**: Instant digital credential pass with unique Registration ID (e.g. `ECXH-2026-0042`), verifiable QR code, and print/PDF support.
- Full Participant & Admin Portals:
  - `/my-team`: Access participant's own Official Digital Event Pass, live status (`Confirmed`, `Pending`, `Rejected`), team roster, and idea editor.
  - `/team/:registrationId`: Privacy-safe public verification portal for event check-in scans.
  - `/admin/login` & `/admin/dashboard`: Secure admin access with Firebase Auth allowlist check, real-time Firestore listeners, status change confirmation dialogs, and real one-click CSV export (`ECX_Hackathon_2026_Registrations.csv`).

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── AbstractTechVisual.tsx  # CSS/SVG glowing microprocessor & circuit artwork
│   ├── Countdown.tsx           # Countdown (displays 'EVENT DATE TO BE ANNOUNCED' if TBA)
│   ├── DigitalPass.tsx         # Digital hackathon credential ticket with QR & print
│   ├── EventStats.tsx          # Quick stat cards (Date, Venue, Team Size, Entry)
│   ├── FAQ.tsx                 # Searchable & filterable FAQ accordion
│   ├── Footer.tsx              # University branding, links, contact placeholders
│   ├── Hero.tsx                # Hero section with Dept branding & CTA
│   ├── MobileBottomNav.tsx     # Fixed 5-tab mobile bottom bar + More sheet
│   ├── Navbar.tsx              # Sticky desktop header + mobile hamburger + contact modal
│   ├── PrizeCard.tsx           # Podium & special category prize cards
│   ├── QRCard.tsx              # Canvas-based QR code generation using 'qrcode'
│   ├── RegistrationForm.tsx    # Multi-section registration form with Firestore sync
│   ├── SectionHeader.tsx       # Reusable section header with electric gradients
│   ├── TeamMemberForm.tsx      # Dynamic team member roster input card
│   ├── ThemeCard.tsx           # Problem track cards with 'Explore Problems' modal
│   ├── Timeline.tsx            # Vertical responsive milestone timeline
│   └── ValueProps.tsx          # 4 quick value cards with hover animations
│
├── pages/
│   ├── Home.tsx                # Landing page with all teaser sections & CTAs
│   ├── About.tsx               # About Hackathon, Why Participate, What to Build
│   ├── Themes.tsx              # Filterable problem domains (AI, IoT, Web, Cyber, etc.)
│   ├── Prizes.tsx              # Prize cards with configurable placeholder markings
│   ├── TimelinePage.tsx        # Vertical chronological event schedule
│   ├── Rules.tsx               # 7 interactive accordion categories & anti-plagiarism policy
│   ├── FAQPage.tsx             # Help center & FAQ with organizer inquiry cards
│   ├── Register.tsx            # Multi-section registration page
│   ├── RegistrationSuccess.tsx # Digital event pass confirmation + celebratory confetti
│   ├── MyTeam.tsx              # Participant status dashboard & team editor
│   ├── PublicTeamVerification.tsx # Public-safe QR check-in verification portal (/team/:id)
│   ├── AdminLogin.tsx          # Firebase Auth admin sign-in with role allowlist check
│   ├── AdminDashboard.tsx      # Real-time Firestore admin stats, approvals, CSV export
│   └── NotFound.tsx            # Branded 404 page ("Looks like this route took a wrong turn.")
│
├── lib/
│   └── firebase.ts             # Firebase app, Firestore, & Auth initialization with env validation
│
├── services/
│   ├── authService.ts          # Admin authentication & Firestore admin role verification
│   └── registrationService.ts  # Atomic registration creation, duplicate checks & real-time sync
│
├── data/
│   ├── eventConfig.ts          # Central configuration for all event parameters
│   └── mockRegistrations.ts    # Seed mock candidate registrations
│
├── utils/
│   ├── exportCsv.ts            # Browser CSV file exporter for registrations
│   └── storage.ts              # LocalStorage fallback manager with CRUD operations
│
├── types/
│   └── index.ts                # TypeScript interfaces for all data structures
│
├── App.tsx                     # React Router layout, routes & scroll-to-top
├── main.tsx                    # React 19 root bootstrap
├── index.css                   # Tailwind base, utilities, and print styles
└── firestore.rules             # Production Cloud Firestore Security Rules
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Firebase credentials (see [Firebase Setup Guide](#-firebase-setup-guide) below).

> [!NOTE]
> If Firebase credentials are not provided or incomplete, the application will automatically run in **Local Fallback Mode** using browser `localStorage` and seed mock data. Both registration and admin inspection remain fully functional.

### 3. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5173/`.

### 4. Code Quality & Build
```bash
# Run oxlint (0 errors, 0 warnings)
npm run lint

# Compile TypeScript and build production bundle
npm run build
```

---

## 🔥 Firebase Setup Guide

Follow these steps to connect your own Firebase project:

### Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it (e.g. `ecx-hackathon-kiot`).
3. Add a **Web App** (`</>`) to the project and copy the `firebaseConfig` object values.

### Step 2: Set Environment Variables
In your local `.env` file, populate:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_PUBLIC_BASE_URL=https://ecx-hackathon-2026.web.app
```

### Step 3: Enable Firebase Authentication
1. In Firebase Console, go to **Build > Authentication > Sign-in method**.
2. Enable **Email/Password** provider (email link not required).
3. Create your first admin account under the **Users** tab (e.g., `admin@kiot.ac.in` with a secure password). Copy the generated user's **User UID**.

### Step 4: Enable Cloud Firestore
1. In Firebase Console, go to **Build > Firestore Database**.
2. Click **Create database**, choose your preferred region (e.g. `asia-south1`), and select **Start in production mode**.
3. Create the collections:
   - `registrations`: Stores team submissions (auto-populated by registration flow).
   - `counters`: Contains a single document `registrations` with `{ current: 44 }` for atomic sequential IDs (`ECXH-2026-0045`, etc.).
   - `admins`: Contains authorized administrator accounts.

### Step 5: Grant Admin Privileges
1. In the `admins` collection, add a document with the **Document ID** equal to your Admin's Firebase Auth **UID**:
   ```json
   Document ID: <COPIED_AUTH_UID>
   {
     "email": "admin@kiot.ac.in",
     "role": "admin",
     "createdAt": "2026-09-26T12:00:00.000Z"
   }
   ```
2. Any user logging into `/admin/login` whose UID does not exist in `admins` with `role: "admin"` is immediately rejected.

### Step 6: Deploy Firestore Security Rules
A hardened `firestore.rules` file is included at the project root.
Deploy with the Firebase CLI:
```bash
firebase deploy --only firestore:rules
```
Or copy the contents of `firestore.rules` directly into the Firebase Console **Firestore > Rules** tab and click **Publish**.

#### Security Rules Highlights:
- **`counters/registrations`**: Allow reading current counter and incrementing by 1 during transactions.
- **`registrations/{id}`**: 
  - `create`: Anyone can create a team submission if schema validation passes (status must default to `'pending'`, team name and email must not be empty).
  - `read`: Public verification read allowed for event credential check-ins; full read and write restricted to verified admins in `admins/{uid}`.
- **`admins/{uid}`**: Only verified admins can read or manage admin accounts.

---

## 🛠️ How to Customize Event Details

Open `src/data/eventConfig.ts` to edit:
- **Event Name & Tagline**: Change `name`, `tagline`, `edition`
- **College & Department**: Change `department`, `college`, `venueFull`
- **Event Date**: Set `date` (e.g. `"October 24-25, 2026"`) and set `targetCountdownDate` (e.g. `"2026-10-24T09:00:00"`). When `targetCountdownDate: null`, the countdown automatically displays:
  > **EVENT DATE TO BE ANNOUNCED**
- **Team Size**: Edit `min` and `max` limits (default: 2 to 4)
- **Problem Domains**: Add or edit problem tracks in `eventThemes`
- **Prizes**: Edit cash placeholders in `prizeData`
- **Contact Details**: Update coordinator name, department email, and phone in `contact`

---

## 🔐 Admin Dashboard Access

- Navigate to `/admin/login` (or `/admin/dashboard`)
- When Firebase is configured: Enter your authorized Firebase Admin credentials.
- When in Local Fallback mode: Click **"1-Click Dev Preview Sign-In"** or enter any coordinator credentials.
- Features included:
  - Real-time updates via Firestore listeners
  - Confirmation modals before approving or rejecting teams
  - Live search by team name, ID, leader, college
  - Filters by problem domain and registration status
  - 1-click real CSV export (`ECX_Hackathon_2026_Registrations.csv`)
  - Team roster inspection with member detail cards

