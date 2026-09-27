export type TeamStatus = 'pending' | 'confirmed' | 'rejected' | 'Pending' | 'Confirmed' | 'Rejected';
export type RegistrationStatus = TeamStatus;

export interface TeamMember {
  id?: string;
  name: string;
  regNo?: string; // Form compatibility
  registrationNumber?: string; // Firestore field
  email: string;
  phone: string;
  isLeader?: boolean;
}

export interface Registration {
  id: string; // e.g., ECXH-2026-0042
  registrationId?: string;
  teamName: string;
  teamNameNormalized?: string;
  leaderName: string;
  email: string;
  phone: string;
  collegeName: string;
  department: string;
  members: TeamMember[];
  domain: string;
  problemDomain?: string;
  ideaTitle: string;
  ideaDescription: string;
  status: TeamStatus;
  createdAt: string; // ISO date string
  updatedAt?: string;
  agreedToRules: boolean;
  emailStatus?: 'pending' | 'sent' | 'failed';
  emailSentAt?: string;
  emailError?: string;
}

export interface FirestoreRegistration {
  id: string; // Firestore document ID
  registrationId: string; // e.g. "ECXH-2026-0042"
  teamName: string;
  teamNameNormalized: string;
  teamLeader: {
    name: string;
    email: string;
    phone: string;
    registrationNumber?: string;
  };
  leaderEmailNormalized: string;
  collegeName: string;
  department: string;
  members: Array<{
    name: string;
    email: string;
    phone: string;
    registrationNumber?: string;
  }>;
  problemDomain: string;
  ideaTitle: string;
  ideaDescription: string;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt: any;
  updatedAt: any;
  agreedToRules: boolean;
  emailStatus?: 'pending' | 'sent' | 'failed';
  emailSentAt?: any;
  emailError?: string;
}

export interface PublicTeamVerification {
  registrationId: string;
  teamName: string;
  collegeName: string;
  problemDomain: string;
  teamSize: number;
  status: 'pending' | 'confirmed' | 'rejected';
  createdAt?: string;
}

export interface AdminUser {
  uid: string;
  email: string | null;
  role: 'admin';
}

export interface ThemeCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
  tag: string;
  sampleProblems: string[];
}

export interface PrizeItem {
  id: string;
  rank: string;
  title: string;
  amountPlaceholder: string;
  description: string;
  perks: string[];
  isPopular?: boolean;
  color: 'gold' | 'silver' | 'bronze' | 'special';
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  badge?: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  icon: string;
  rules: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Team & Registration' | 'Technical' | 'Prizes & Logistics';
}

export interface EventConfig {
  name: string;
  shortName: string;
  edition: string;
  department: string;
  departmentShort: string;
  college: string;
  collegeShort: string;
  tagline: string;
  description: string;
  date: string;
  targetCountdownDate: string | null;
  venue: string;
  venueFull: string;
  teamSize: {
    min: number;
    max: number;
  };
  registrationDeadline: string;
  registrationFee: string;
  allowTeamEditing: boolean;
  contact: {
    coordinatorName: string;
    department: string;
    email: string;
    phone: string;
    address: string;
  };
  socials: {
    linkedin: string;
    instagram: string;
    twitter: string;
    github: string;
  };
}
