import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  runTransaction,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import type { 
  Team, 
  CreateTeamInput, 
  UpdateTeamInput, 
  DashboardMetrics 
} from '../types/admin';

/**
 * Converts Firestore document snapshot data into a standardized client-side Team model.
 * Gracefully handles nested teamLeader object, server timestamps, and legacy aliases.
 */
function mapDocToTeam(docId: string, data: Record<string, any>): Team {
  const leaderName = data.teamLeader?.name || data.teamLeaderName || '';
  const leaderEmail = data.teamLeader?.email || data.leaderEmail || '';
  const leaderPhone = data.teamLeader?.phone || data.leaderPhone || '';

  const formatTimestamp = (val: any): string => {
    if (!val) return new Date().toISOString();
    if (val instanceof Timestamp) return val.toDate().toISOString();
    if (typeof val?.toDate === 'function') return val.toDate().toISOString();
    if (typeof val === 'string') return val;
    return new Date().toISOString();
  };

  const registrationDate = data.registrationDate
    ? formatTimestamp(data.registrationDate)
    : formatTimestamp(data.createdAt);

  return {
    teamId: data.teamId || docId,
    teamName: data.teamName || '',
    domain: data.domain || '',
    problemStatement: data.problemStatement || '',
    teamLeader: {
      name: leaderName,
      email: leaderEmail,
      phone: leaderPhone,
    },
    // Convenience aliases for existing components
    teamLeaderName: leaderName,
    leaderEmail: leaderEmail,
    leaderPhone: leaderPhone,
    college: data.college || '',
    department: data.department || '',
    year: data.year || '',
    status: (data.status as Team['status']) || 'pending',
    registrationDate,
    members: Array.isArray(data.members) ? data.members : [],
    notes: data.notes || '',
    createdAt: data.createdAt ? formatTimestamp(data.createdAt) : undefined,
    updatedAt: data.updatedAt ? formatTimestamp(data.updatedAt) : undefined,
    createdBy: data.createdBy || '',
  };
}

export class TeamRepository {
  private getDb() {
    if (!db) {
      throw new Error('Firestore is not configured. Please verify your Firebase environment variables.');
    }
    return db;
  }

  /**
   * Generates the next unique, sequential Team ID (e.g. EDGC26-001)
   * using a monotonic Firestore counter to ensure deleted IDs are never reused.
   */
  public async getNextTeamId(): Promise<string> {
    const firestore = this.getDb();
    const counterRef = doc(firestore, 'counters', 'teams');

    try {
      const nextId = await runTransaction(firestore, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let nextSeq = 1;

        if (counterDoc.exists()) {
          const currentSeq = counterDoc.data().currentSeq;
          if (typeof currentSeq === 'number') {
            nextSeq = currentSeq + 1;
          }
        }

        const candidateId = `EDGC26-${String(nextSeq).padStart(3, '0')}`;
        return candidateId;
      });

      return nextId;
    } catch (err) {
      console.error('Failed to query next team ID from counter:', err);
      // Fallback: query existing teams count + 1 with timestamp salt
      return `EDGC26-${String(Date.now()).slice(-3)}`;
    }
  }

  /**
   * Checks if a Team ID is currently unique in Firestore
   */
  public async isTeamIdUnique(teamId: string): Promise<boolean> {
    const existing = await this.getTeam(teamId.trim().toUpperCase());
    return existing === null;
  }

  /**
   * Retrieves all teams from Firestore
   */
  public async getTeams(): Promise<Team[]> {
    const firestore = this.getDb();
    const teamsCollection = collection(firestore, 'teams');

    try {
      const snapshot = await getDocs(teamsCollection);
      const teams = snapshot.docs.map((docSnap) => mapDocToTeam(docSnap.id, docSnap.data()));

      // Sort newest to oldest client-side
      teams.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.registrationDate).getTime();
        const dateB = new Date(b.createdAt || b.registrationDate).getTime();
        return dateB - dateA;
      });

      return teams;
    } catch (err) {
      console.error('Error fetching teams from Firestore:', err);
      throw new Error('Failed to retrieve teams from Cloud Firestore.');
    }
  }

  /**
   * Retrieves a single team by its unique teamId
   */
  public async getTeam(teamId: string): Promise<Team | null> {
    if (!teamId) return null;
    const firestore = this.getDb();
    const teamDocRef = doc(firestore, 'teams', teamId);

    try {
      const docSnap = await getDoc(teamDocRef);
      if (!docSnap.exists()) {
        return null;
      }
      return mapDocToTeam(docSnap.id, docSnap.data());
    } catch (err) {
      console.error(`Error fetching team ${teamId} from Firestore:`, err);
      throw new Error(`Failed to load team ${teamId}.`);
    }
  }

  /**
   * Creates a new team in Firestore.
   * Atomically records the team and advances the counter so ID is never reused.
   */
  public async createTeam(input: CreateTeamInput): Promise<Team> {
    const firestore = this.getDb();
    const currentUid = auth?.currentUser?.uid || 'admin';
    const teamId = input.teamId.trim().toUpperCase();

    if (!teamId) {
      throw new Error('Team ID is required.');
    }

    const teamDocRef = doc(firestore, 'teams', teamId);
    const counterRef = doc(firestore, 'counters', 'teams');

    try {
      await runTransaction(firestore, async (transaction) => {
        const existingDoc = await transaction.get(teamDocRef);
        if (existingDoc.exists()) {
          throw new Error(`Team ID "${teamId}" already exists. Please choose or generate a unique Team ID.`);
        }

        // Parse numeric portion of ID if follows EDGC26-XXX
        const match = teamId.match(/EDGC26-(\d+)/);
        let seqNum = 1;
        if (match && match[1]) {
          seqNum = parseInt(match[1], 10);
        }

        const counterDoc = await transaction.get(counterRef);
        let currentMaxSeq = 0;
        if (counterDoc.exists() && typeof counterDoc.data().currentSeq === 'number') {
          currentMaxSeq = counterDoc.data().currentSeq;
        }

        const newSeq = Math.max(currentMaxSeq, seqNum);
        transaction.set(counterRef, {
          currentSeq: newSeq,
          lastUpdated: serverTimestamp(),
        }, { merge: true });

        const leader = {
          name: input.teamLeader?.name || input.teamLeaderName || '',
          email: input.teamLeader?.email || input.leaderEmail || '',
          phone: input.teamLeader?.phone || input.leaderPhone || '',
        };

        const newDocData = {
          teamId,
          teamName: input.teamName.trim(),
          domain: input.domain || '',
          problemStatement: input.problemStatement || '',
          teamLeader: leader,
          college: input.college.trim(),
          department: input.department.trim(),
          year: input.year.trim(),
          status: input.status || 'pending',
          registrationDate: serverTimestamp(),
          members: Array.isArray(input.members) ? input.members : [],
          notes: input.notes || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          createdBy: currentUid,
        };

        transaction.set(teamDocRef, newDocData);
      });

      const created = await this.getTeam(teamId);
      if (!created) {
        throw new Error('Failed to retrieve newly created team record.');
      }
      return created;
    } catch (err: unknown) {
      console.error('Error creating team in Firestore:', err);
      throw new Error((err as Error).message || 'Failed to create team in Firestore.');
    }
  }

  /**
   * Updates an existing team document in Firestore
   */
  public async updateTeam(teamId: string, updates: UpdateTeamInput): Promise<Team> {
    const firestore = this.getDb();
    const teamDocRef = doc(firestore, 'teams', teamId);

    try {
      const existing = await getDoc(teamDocRef);
      if (!existing.exists()) {
        throw new Error(`Team with ID "${teamId}" does not exist.`);
      }

      const updatePayload: Record<string, any> = {
        updatedAt: serverTimestamp(),
      };

      if (updates.teamName !== undefined) updatePayload.teamName = updates.teamName.trim();
      if (updates.domain !== undefined) updatePayload.domain = updates.domain;
      if (updates.problemStatement !== undefined) updatePayload.problemStatement = updates.problemStatement;
      if (updates.college !== undefined) updatePayload.college = updates.college.trim();
      if (updates.department !== undefined) updatePayload.department = updates.department.trim();
      if (updates.year !== undefined) updatePayload.year = updates.year.trim();
      if (updates.status !== undefined) updatePayload.status = updates.status;
      if (updates.notes !== undefined) updatePayload.notes = updates.notes;
      if (updates.members !== undefined) updatePayload.members = updates.members;

      if (updates.teamLeader || updates.teamLeaderName || updates.leaderEmail || updates.leaderPhone) {
        const existingData = existing.data();
        updatePayload.teamLeader = {
          name: updates.teamLeader?.name ?? updates.teamLeaderName ?? existingData.teamLeader?.name ?? '',
          email: updates.teamLeader?.email ?? updates.leaderEmail ?? existingData.teamLeader?.email ?? '',
          phone: updates.teamLeader?.phone ?? updates.leaderPhone ?? existingData.teamLeader?.phone ?? '',
        };
      }

      await updateDoc(teamDocRef, updatePayload);

      const updated = await this.getTeam(teamId);
      if (!updated) {
        throw new Error('Failed to retrieve updated team record.');
      }
      return updated;
    } catch (err: unknown) {
      console.error(`Error updating team ${teamId} in Firestore:`, err);
      throw new Error((err as Error).message || `Failed to update team ${teamId}.`);
    }
  }

  /**
   * Deletes a team document from Firestore.
   * Note: The ID is NOT reused because counters/teams tracks monotonic max sequence.
   */
  public async deleteTeam(teamId: string): Promise<void> {
    const firestore = this.getDb();
    const teamDocRef = doc(firestore, 'teams', teamId);

    try {
      await deleteDoc(teamDocRef);
    } catch (err: unknown) {
      console.error(`Error deleting team ${teamId} from Firestore:`, err);
      throw new Error((err as Error).message || `Failed to delete team ${teamId}.`);
    }
  }

  /**
   * Updates team status to 'approved'
   */
  public async approveTeam(teamId: string): Promise<Team> {
    return this.updateTeam(teamId, { status: 'approved' });
  }

  /**
   * Updates team status to 'rejected'
   */
  public async rejectTeam(teamId: string): Promise<Team> {
    return this.updateTeam(teamId, { status: 'rejected' });
  }

  /**
   * Calculates live aggregate dashboard metrics directly from Firestore
   */
  public async getMetrics(): Promise<DashboardMetrics> {
    try {
      const teams = await this.getTeams();
      return {
        totalTeams: teams.length,
        pendingCount: teams.filter((t) => t.status === 'pending').length,
        approvedCount: teams.filter((t) => t.status === 'approved').length,
        rejectedCount: teams.filter((t) => t.status === 'rejected').length,
      };
    } catch (err) {
      console.error('Error calculating dashboard metrics from Firestore:', err);
      return {
        totalTeams: 0,
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
      };
    }
  }
}

export const teamRepository = new TeamRepository();
