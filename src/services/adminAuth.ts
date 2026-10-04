import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';
import type { AdminUser } from '../types/admin';

export interface AdminLoginInput {
  email: string;
  password: string;
}

class AdminAuthService {
  private currentUser: AdminUser | null = null;

  /**
   * Validates if a Firebase User UID is an authorized active admin in Firestore
   */
  public async verifyAdminAuthorization(user: FirebaseUser): Promise<AdminUser | null> {
    if (!db) {
      throw new Error('Cloud Firestore is not initialized.');
    }

    try {
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      if (!adminDocSnap.exists()) {
        console.warn(`UID ${user.uid} (${user.email}) attempted admin access but is not registered in admins collection.`);
        return null;
      }

      const data = adminDocSnap.data();
      if (data.role !== 'admin' || data.active !== true) {
        console.warn(`UID ${user.uid} in admins collection lacks active admin status: role=${data.role}, active=${data.active}`);
        return null;
      }

      const adminUser: AdminUser = {
        uid: user.uid,
        email: user.email || data.email || '',
        role: 'admin',
        active: true,
        name: data.name || user.displayName || 'Administrator',
        authenticatedAt: new Date().toISOString(),
      };

      return adminUser;
    } catch (err) {
      console.error('Error verifying admin authorization in Firestore:', err);
      return null;
    }
  }

  /**
   * Signs in using Firebase Authentication and validates against Firestore admins/{uid}
   */
  public async login(credentials: AdminLoginInput): Promise<AdminUser> {
    if (!isFirebaseConfigured() || !auth || !db) {
      throw new Error('Firebase configuration is missing or incomplete. Please check your .env settings.');
    }

    const email = credentials.email.trim();
    const password = credentials.password;

    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const errorCode = (err as { code?: string })?.code;
      if (
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/invalid-credential'
      ) {
        throw new Error('Invalid email or password.');
      }
      if (errorCode === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      }
      if (errorCode === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please wait a few minutes and try again.');
      }
      if (errorCode === 'auth/network-request-failed') {
        throw new Error('Network error. Unable to reach Firebase Authentication service.');
      }
      throw new Error((err as Error).message || 'Authentication failed. Please verify credentials.');
    }

    const firebaseUser = userCredential.user;

    // Authorization verification in Firestore: admins/{uid}
    const adminUser = await this.verifyAdminAuthorization(firebaseUser);

    if (!adminUser) {
      // User is authenticated in Firebase Auth, but NOT authorized as an admin in Firestore
      await signOut(auth);
      this.currentUser = null;
      throw new Error('Access denied. This account is not an authorized EDGECRAFT 2026 administrator.');
    }

    this.currentUser = adminUser;
    return adminUser;
  }

  /**
   * Signs out the current user from Firebase Auth
   */
  public async logout(): Promise<void> {
    this.currentUser = null;
    if (auth) {
      await signOut(auth);
    }
  }

  /**
   * Returns the current cached AdminUser
   */
  public getCurrentUser(): AdminUser | null {
    return this.currentUser;
  }

  /**
   * Subscribes to Firebase Auth state listener and validates admin status
   */
  public subscribeToAuthChanges(callback: (user: AdminUser | null) => void): () => void {
    if (!auth) {
      callback(null);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        this.currentUser = null;
        callback(null);
        return;
      }

      try {
        const authorizedAdmin = await this.verifyAdminAuthorization(firebaseUser);
        if (authorizedAdmin) {
          this.currentUser = authorizedAdmin;
          callback(authorizedAdmin);
        } else {
          console.warn('Session detected for non-admin user. Expelling...');
          if (auth) {
            await signOut(auth);
          }
          this.currentUser = null;
          callback(null);
        }
      } catch (err) {
        console.error('Error during auth state change verification:', err);
        this.currentUser = null;
        callback(null);
      }
    });

    return unsubscribe;
  }
}

export const adminAuthService = new AdminAuthService();
