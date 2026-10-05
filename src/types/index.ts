export interface ChallengeRound {
  number: string;
  name: string;
  description: string;
  flow: string[];
  flowString: string;
  importantNote?: string;
}

export interface CoordinatorInfo {
  role: string;
  name: string;
  phone?: string;
  phoneTel?: string;
  email?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  timeOrDate: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  badge?: string;
  roundTag?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface EventConfig {
  name: string;
  shortName: string;
  eventType: string;
  tagline: string;
  taglineSub: string;
  organizer: string;
  department: string;
  departmentShort: string;
  college: string;
  collegeShort: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  venueFull: string;
  registrationDeadline: string;
  registrationFee?: string;
  registrationFeeNote?: string;
  registrationFormUrl: string;
  description: string;
  targetCountdownDate: string;
  coordinators: {
    faculty: CoordinatorInfo[];
    students: CoordinatorInfo[];
  };
  socials: {
    linkedin: string;
    instagram: string;
    twitter: string;
    github: string;
  };
}

export * from './admin';
