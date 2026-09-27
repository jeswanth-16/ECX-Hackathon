import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import type { AdminUser } from '../types';

const ADMIN_SESSION_KEY = 'ecx_admin_auth_user';

/**
 * Checks whether a user UID is an authorized admin in the Firestore 'admins' collection.
 */
export async function checkIsAdmin(uid: string): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    // In dev mode without Firebase, allow preview admin access
    return true;
  }

  try {
    const adminDocRef = doc(db, 'admins', uid);
    const snap = await getDoc(adminDocRef);

    if (snap.exists()) {
      const data = snap.data();
      return data.role === 'admin';
    }

    return false;
  } catch (err) {
    console.error('Error verifying admin authorization:', err);
    return false;
  }
}

/**
 * Log in admin using Firebase Email & Password authentication.
 * Verifies authorization against the Firestore admins allowlist.
 */
export async function loginAdmin(email: string, pass: string): Promise<AdminUser> {
  // If Firebase is not configured, support development preview sign-in
  if (!isFirebaseConfigured() || !auth) {
    const devAdmin: AdminUser = {
      uid: 'dev-admin-preview-uid',
      email: email.trim().toLowerCase(),
      role: 'admin',
    };
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(devAdmin));
    return devAdmin;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), pass);
    const user = userCredential.user;

    // Check if user is an authorized admin
    const isAdmin = await checkIsAdmin(user.uid);
    if (!isAdmin) {
      await signOut(auth);
      throw new Error(
        'Access Denied: Your account is authenticated, but is not authorized in the admins collection.'
      );
    }

    const adminUser: AdminUser = {
      uid: user.uid,
      email: user.email,
      role: 'admin',
    };

    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
    return adminUser;
  } catch (err: any) {
    console.error('Admin login error:', err);
    const message = err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
      ? 'Invalid administrator credentials. Please check your email and password.'
      : err.message || 'Authentication failed. Please verify credentials.';
    throw new Error(message);
  }
}

/**
 * Log out admin.
 */
export async function logoutAdmin(): Promise<void> {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  if (isFirebaseConfigured() && auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out admin:', err);
    }
  }
}

/**
 * Retrieve current logged in admin user from session or Firebase Auth.
 */
export function getCurrentAdminUser(): AdminUser | null {
  try {
    const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.role === 'admin') {
        return parsed;
      }
    }
  } catch {
    // Ignore parse error
  }
  return null;
}

/**
 * Subscribe to Auth State changes for admin session.
 */
export function onAdminAuthStateChange(callback: (user: AdminUser | null) => void): () => void {
  if (!isFirebaseConfigured() || !auth) {
    callback(getCurrentAdminUser());
    return () => {};
  }

  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      callback(null);
      return;
    }

    const isAdmin = await checkIsAdmin(firebaseUser.uid);
    if (isAdmin) {
      const adminUser: AdminUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: 'admin',
      };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
      callback(adminUser);
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      callback(null);
    }
  });

  return unsubscribe;
}
