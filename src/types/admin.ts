export type TeamStatus = 'pending' | 'approved' | 'rejected';

export interface TeamLeader {
  name: string;
  email: string;
  phone: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  email: string;
  phone: string;
  college?: string;
  department?: string;
  year?: string;
}

export interface Team {
  teamId: string;
  teamName: string;
  teamLeader: TeamLeader;
  // Convenience accessors for backwards compatibility
  teamLeaderName?: string;
  leaderEmail?: string;
  leaderPhone?: string;

  college: string;
  department: string;
  year: string;
  status: TeamStatus;
  domain?: string;
  problemStatement?: string;
  registrationDate: string;
  members: TeamMember[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export type CreateTeamInput = Omit<Team, 'createdAt' | 'updatedAt' | 'createdBy'>;
export type UpdateTeamInput = Partial<Omit<Team, 'teamId'>>;

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin';
  active: boolean;
  name?: string;
  authenticatedAt: string;
}

export interface DashboardMetrics {
  totalTeams: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}
