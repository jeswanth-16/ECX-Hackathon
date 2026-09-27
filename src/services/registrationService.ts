import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  runTransaction, 
  serverTimestamp, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type { Registration, PublicTeamVerification, TeamMember } from '../types';
import * as localStorageManager from '../utils/storage';
import { triggerConfirmationEmail } from './emailService';

export interface CreateRegistrationInput {
  teamName: string;
  leaderName: string;
  leaderRegNo?: string;
  email: string;
  phone: string;
  collegeName: string;
  department: string;
  members: TeamMember[];
  domain: string;
  ideaTitle?: string;
  ideaDescription?: string;
  agreedToRules: boolean;
}

// Convert Firestore doc to standard Registration object
function mapFirestoreDocToRegistration(data: any, docId: string): Registration {
  const createdAtIso = data.createdAt?.toDate 
    ? data.createdAt.toDate().toISOString() 
    : typeof data.createdAt === 'string' 
      ? data.createdAt 
      : new Date().toISOString();

  const updatedAtIso = data.updatedAt?.toDate 
    ? data.updatedAt.toDate().toISOString() 
    : typeof data.updatedAt === 'string' 
      ? data.updatedAt 
      : undefined;

  const leader = data.teamLeader || {};

  const mappedMembers: TeamMember[] = Array.isArray(data.members)
    ? data.members.map((m: any, idx: number) => ({
        id: `mem-${idx + 1}`,
        name: m.name || '',
        registrationNumber: m.registrationNumber || m.regNo || '',
        regNo: m.registrationNumber || m.regNo || '',
        email: m.email || '',
        phone: m.phone || '',
        isLeader: idx === 0,
      }))
    : [];

  return {
    id: data.registrationId || docId,
    registrationId: data.registrationId || docId,
    teamName: data.teamName || '',
    teamNameNormalized: data.teamNameNormalized || (data.teamName || '').toLowerCase().trim(),
    leaderName: leader.name || data.leaderName || '',
    email: leader.email || data.email || '',
    phone: leader.phone || data.phone || '',
    collegeName: data.collegeName || '',
    department: data.department || '',
    members: mappedMembers,
    domain: data.problemDomain || data.domain || '',
    problemDomain: data.problemDomain || data.domain || '',
    ideaTitle: data.ideaTitle || '',
    ideaDescription: data.ideaDescription || '',
    status: (data.status || 'pending').toLowerCase() as any,
    createdAt: createdAtIso,
    updatedAt: updatedAtIso,
    agreedToRules: Boolean(data.agreedToRules),
    emailStatus: data.emailStatus || 'pending',
    emailSentAt: data.emailSentAt?.toDate 
      ? data.emailSentAt.toDate().toISOString() 
      : typeof data.emailSentAt === 'string' 
        ? data.emailSentAt 
        : undefined,
    emailError: data.emailError,
  };
}

/**
 * Creates a new team registration with atomic counter transaction and duplicate prevention.
 */
export async function createRegistration(input: CreateRegistrationInput): Promise<Registration> {
  const teamNameNormalized = input.teamName.trim().toLowerCase();
  const leaderEmailNormalized = input.email.trim().toLowerCase();

  // If Firebase is not configured, fallback to localStorage manager
  if (!isFirebaseConfigured() || !db) {
    console.warn('Firebase not configured. Saving registration to LocalStorage fallback.');
    const nextId = localStorageManager.getNextRegistrationId();
    
    // Check local duplicate
    const existing = localStorageManager.getRegistrations();
    if (existing.some(r => r.teamName.trim().toLowerCase() === teamNameNormalized)) {
      throw new Error(`Team name "${input.teamName}" is already registered. Please choose a unique name.`);
    }
    if (existing.some(r => r.email.trim().toLowerCase() === leaderEmailNormalized)) {
      throw new Error(`Email "${input.email}" is already registered for another team.`);
    }

    const newReg: Registration = {
      id: nextId,
      registrationId: nextId,
      teamName: input.teamName.trim(),
      teamNameNormalized,
      leaderName: input.leaderName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      collegeName: input.collegeName.trim(),
      department: input.department.trim(),
      members: input.members,
      domain: input.domain,
      problemDomain: input.domain,
      ideaTitle: input.ideaTitle?.trim() || 'To Be Finalized',
      ideaDescription: input.ideaDescription?.trim() || 'Description will be finalized during initial mentor check-in.',
      status: 'pending',
      createdAt: new Date().toISOString(),
      agreedToRules: true,
      emailStatus: 'pending',
    };

    localStorageManager.saveRegistration(newReg);

    // Trigger secure server-side email asynchronously (non-blocking)
    triggerConfirmationEmail(newReg).catch((err) => {
      console.warn('[Email] Non-blocking confirmation email trigger error:', err);
    });

    return newReg;
  }

  const firestore = db;

  // 1. Check duplicate team name in Firestore
  const teamQuery = query(
    collection(firestore, 'registrations'),
    where('teamNameNormalized', '==', teamNameNormalized)
  );
  const teamSnapshot = await getDocs(teamQuery);
  if (!teamSnapshot.empty) {
    throw new Error(`Team name "${input.teamName}" is already registered. Please choose a unique name.`);
  }

  // 2. Check duplicate leader email in Firestore
  const emailQuery = query(
    collection(firestore, 'registrations'),
    where('leaderEmailNormalized', '==', leaderEmailNormalized)
  );
  const emailSnapshot = await getDocs(emailQuery);
  if (!emailSnapshot.empty) {
    throw new Error(`Email "${input.email}" is already registered for another team.`);
  }

  // 3. Atomically increment registration counter via Firestore transaction
  const counterRef = doc(firestore, 'counters', 'registrations');

  const registrationId = await runTransaction(firestore, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    let nextNum = 45; // Default start if counter doesn't exist yet

    if (counterDoc.exists()) {
      const data = counterDoc.data();
      nextNum = (data.current || 44) + 1;
    }

    const formattedId = `ECXH-2026-${String(nextNum).padStart(4, '0')}`;

    transaction.set(counterRef, { current: nextNum, updatedAt: serverTimestamp() }, { merge: true });

    // Prepare document data
    const registrationRef = doc(firestore, 'registrations', formattedId);

    const docPayload = {
      registrationId: formattedId,
      teamName: input.teamName.trim(),
      teamNameNormalized,
      teamLeader: {
        name: input.leaderName.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        registrationNumber: input.leaderRegNo?.trim() || '',
      },
      leaderEmailNormalized,
      collegeName: input.collegeName.trim(),
      department: input.department.trim(),
      members: input.members.map((m) => ({
        name: m.name.trim(),
        email: m.email.trim(),
        phone: m.phone.trim(),
        registrationNumber: m.registrationNumber?.trim() || m.regNo?.trim() || '',
      })),
      problemDomain: input.domain,
      ideaTitle: input.ideaTitle?.trim() || 'To Be Finalized',
      ideaDescription: input.ideaDescription?.trim() || 'Description will be finalized during initial mentor check-in.',
      status: 'pending',
      agreedToRules: input.agreedToRules,
      emailStatus: 'pending',
      emailSentAt: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    transaction.set(registrationRef, docPayload);

    return formattedId;
  });

  // Construct return Registration
  const savedRecord: Registration = {
    id: registrationId,
    registrationId: registrationId,
    teamName: input.teamName.trim(),
    teamNameNormalized,
    leaderName: input.leaderName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    collegeName: input.collegeName.trim(),
    department: input.department.trim(),
    members: input.members,
    domain: input.domain,
    problemDomain: input.domain,
    ideaTitle: input.ideaTitle?.trim() || 'To Be Finalized',
    ideaDescription: input.ideaDescription?.trim() || 'Description will be finalized during initial mentor check-in.',
    status: 'pending',
    createdAt: new Date().toISOString(),
    agreedToRules: input.agreedToRules,
    emailStatus: 'pending',
  };

  // Also cache in localStorage for fast local lookup
  localStorageManager.saveRegistration(savedRecord);

  // Trigger secure server-side email asynchronously (non-blocking, never fails registration)
  triggerConfirmationEmail(savedRecord).catch((err) => {
    console.warn('[Email] Non-blocking confirmation email trigger error:', err);
  });

  return savedRecord;
}

/**
 * Fetch registration by ID from Firestore (or fallback).
 */
export async function getRegistrationById(id: string): Promise<Registration | null> {
  const cleanId = id.trim().toUpperCase();
  if (!cleanId) return null;

  if (!isFirebaseConfigured() || !db) {
    return localStorageManager.getRegistrationById(cleanId);
  }

  try {
    const docRef = doc(db, 'registrations', cleanId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return mapFirestoreDocToRegistration(snapshot.data(), snapshot.id);
    }

    // Try query by registrationId field if doc ID differs
    const q = query(collection(db, 'registrations'), where('registrationId', '==', cleanId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      return mapFirestoreDocToRegistration(firstDoc.data(), firstDoc.id);
    }

    // Fallback to local
    return localStorageManager.getRegistrationById(cleanId);
  } catch (err) {
    console.error('Error fetching registration by ID:', err);
    return localStorageManager.getRegistrationById(cleanId);
  }
}

/**
 * Fetch registration by leader email from Firestore.
 */
export async function getRegistrationByEmail(email: string): Promise<Registration | null> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return null;

  if (!isFirebaseConfigured() || !db) {
    return localStorageManager.getRegistrationByEmail(cleanEmail);
  }

  try {
    const q = query(
      collection(db, 'registrations'),
      where('leaderEmailNormalized', '==', cleanEmail)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      return mapFirestoreDocToRegistration(firstDoc.data(), firstDoc.id);
    }

    return localStorageManager.getRegistrationByEmail(cleanEmail);
  } catch (err) {
    console.error('Error fetching registration by email:', err);
    return localStorageManager.getRegistrationByEmail(cleanEmail);
  }
}

/**
 * Public Verification function for QR code scans.
 * STRICT SECURITY: Only exposes public-safe metadata:
 * ID, Team Name, College, Domain, Team Size, Status.
 * NEVER returns phone numbers, emails, or admin details.
 */
export async function getPublicTeamVerification(registrationId: string): Promise<PublicTeamVerification | null> {
  const reg = await getRegistrationById(registrationId);
  if (!reg) return null;

  const rawStatus = (reg.status || 'pending').toLowerCase();
  const validStatus: 'pending' | 'confirmed' | 'rejected' = 
    rawStatus === 'confirmed' ? 'confirmed' : rawStatus === 'rejected' ? 'rejected' : 'pending';

  return {
    registrationId: reg.id,
    teamName: reg.teamName,
    collegeName: reg.collegeName,
    problemDomain: reg.domain || reg.problemDomain || 'Open Track',
    teamSize: reg.members.length,
    status: validStatus,
    createdAt: reg.createdAt,
  };
}

/**
 * Admin action: update status ('confirmed' | 'rejected' | 'pending')
 */
export async function updateRegistrationStatus(id: string, status: 'confirmed' | 'rejected' | 'pending'): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    localStorageManager.updateRegistrationStatus(id, status as any);
    return;
  }

  try {
    const docRef = doc(db, 'registrations', id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    // Sync local cache
    localStorageManager.updateRegistrationStatus(id, status as any);
  } catch (err) {
    console.error('Failed to update registration status in Firestore:', err);
    throw err;
  }
}

/**
 * Update team idea description & title
 */
export async function updateRegistrationIdea(id: string, ideaTitle: string, ideaDescription: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) {
    localStorageManager.updateRegistration(id, { ideaTitle, ideaDescription });
    return;
  }

  try {
    const docRef = doc(db, 'registrations', id);
    await updateDoc(docRef, {
      ideaTitle,
      ideaDescription,
      updatedAt: serverTimestamp(),
    });
    localStorageManager.updateRegistration(id, { ideaTitle, ideaDescription });
  } catch (err) {
    console.error('Failed to update registration idea in Firestore:', err);
    throw err;
  }
}

/**
 * Listen to real-time registrations for the Admin Dashboard.
 */
export function listenToRegistrations(
  onUpdate: (registrations: Registration[]) => void,
  onError?: (err: Error) => void
): () => void {
  if (!isFirebaseConfigured() || !db) {
    // Return current local storage registrations and a no-op unsubscribe
    onUpdate(localStorageManager.getRegistrations());
    return () => {};
  }

  try {
    const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Registration[] = snapshot.docs.map((docSnap) =>
          mapFirestoreDocToRegistration(docSnap.data(), docSnap.id)
        );
        onUpdate(list);
      },
      (err) => {
        console.error('Real-time registrations listener error:', err);
        if (onError) onError(err);
        // Fallback to local
        onUpdate(localStorageManager.getRegistrations());
      }
    );
    return unsubscribe;
  } catch (err) {
    console.error('Failed to attach registrations listener:', err);
    onUpdate(localStorageManager.getRegistrations());
    return () => {};
  }
}

/**
 * Admin action: securely delete a registration document from Firestore.
 * Does NOT modify or decrement the registration counter (ID reuse is strictly prohibited).
 */
export async function deleteRegistrationFromFirestore(id: string): Promise<void> {
  const cleanId = id.trim().toUpperCase();
  if (!cleanId) throw new Error('Invalid registration ID for deletion.');

  if (!isFirebaseConfigured() || !db) {
    localStorageManager.deleteRegistration(cleanId);
    return;
  }

  try {
    const docRef = doc(db, 'registrations', cleanId);
    await deleteDoc(docRef);
    // Sync local storage cache
    localStorageManager.deleteRegistration(cleanId);
  } catch (err: any) {
    console.error('Failed to delete registration from Firestore:', err);
    throw new Error(err?.message || 'Failed to delete registration from Firestore. Verify administrator privileges.');
  }
}

