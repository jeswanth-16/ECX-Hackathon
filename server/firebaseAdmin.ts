/**
 * Server-side Firebase Integration for ECX Hackathon 2026.
 *
 * SECURE SERVER-SIDE UPDATES:
 * - Updates registration emailStatus in Firestore after Resend dispatch.
 * - Operates entirely on the server; client browsers never have write access to emailStatus.
 * - Supports Firebase Admin SDK with Service Account Key, Google Cloud ADC, and CLI token fallback.
 */

import { initializeApp, cert, applicationDefault, getApps, type App } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

let adminApp: App | null = null;

function getProjectId(): string {
  return (
    process.env.VITE_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID ||
    'ecx-hackathon'
  );
}

/**
 * Attempt to initialize Firebase Admin SDK if service account or credentials are provided.
 */
function initFirebaseAdmin(): boolean {
  if (adminApp) {
    return true;
  }

  try {
    const apps = typeof getApps === 'function' ? getApps() : [];
    if (Array.isArray(apps) && apps.length > 0) {
      adminApp = apps[0];
      return true;
    }
  } catch {
    // Ignore error
  }

  const projectId = getProjectId();

  // 1. Direct Service Account JSON in environment
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountJson) {
    try {
      let certObj: any;
      if (serviceAccountJson.trim().startsWith('{')) {
        certObj = JSON.parse(serviceAccountJson);
      } else if (fs.existsSync(serviceAccountJson.trim())) {
        certObj = JSON.parse(fs.readFileSync(serviceAccountJson.trim(), 'utf8'));
      }
      if (certObj) {
        adminApp = initializeApp({
          credential: cert(certObj),
          projectId,
        });
        console.log('[Server Firebase] Initialized Firebase Admin SDK with service account.');
        return true;
      }
    } catch (err: any) {
      console.warn('[Server Firebase] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', err?.message);
    }
  }

  // 2. Individual credentials in environment
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        projectId,
      });
      console.log('[Server Firebase] Initialized Firebase Admin SDK with client email & private key.');
      return true;
    } catch (err: any) {
      console.warn('[Server Firebase] Failed to initialize with client credentials:', err?.message);
    }
  }

  // 3. Application Default Credentials (e.g. GOOGLE_APPLICATION_CREDENTIALS)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    try {
      adminApp = initializeApp({
        credential: applicationDefault(),
        projectId,
      });
      console.log('[Server Firebase] Initialized Firebase Admin SDK with application default credentials.');
      return true;
    } catch (err: any) {
      console.warn('[Server Firebase] Failed to initialize with applicationDefault:', err?.message);
    }
  }

  return false;
}

/**
 * Exchange Firebase CLI OAuth refresh token for Google Cloud access token.
 */
let cachedCliAccessToken: { token: string; expiresAt: number } | null = null;

async function getCliAccessToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedCliAccessToken && cachedCliAccessToken.expiresAt > now + 60000) {
    return cachedCliAccessToken.token;
  }

  const possiblePaths = [
    path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json'),
    process.env.USERPROFILE
      ? path.join(process.env.USERPROFILE, '.config', 'configstore', 'firebase-tools.json')
      : '',
    process.env.APPDATA
      ? path.join(process.env.APPDATA, '..', '.config', 'configstore', 'firebase-tools.json')
      : '',
  ].filter(Boolean);

  let refreshToken: string | null = process.env.FIREBASE_REFRESH_TOKEN || null;

  if (!refreshToken) {
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        try {
          const content = JSON.parse(fs.readFileSync(p, 'utf8'));
          if (content?.tokens?.refresh_token) {
            refreshToken = content.tokens.refresh_token;
            break;
          }
        } catch {
          // ignore error
        }
      }
    }
  }

  if (!refreshToken) return null;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
        client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = (await res.json()) as any;
    if (data?.access_token) {
      const expiresInMs = (data.expires_in || 3600) * 1000;
      cachedCliAccessToken = {
        token: data.access_token,
        expiresAt: now + expiresInMs,
      };
      return data.access_token;
    }
  } catch (err: any) {
    console.warn('[Server Firebase] Could not refresh CLI token:', err?.message);
  }

  return null;
}

/**
 * Checks whether an email has already been sent for this registration to prevent duplicates.
 */
export async function isEmailAlreadySent(registrationId?: string): Promise<boolean> {
  if (!registrationId || typeof registrationId !== 'string') return false;
  const cleanId = registrationId.trim().toUpperCase();
  if (!cleanId) return false;

  const projectId = getProjectId();

  // Try Firebase Admin SDK
  if (initFirebaseAdmin()) {
    try {
      const db = getFirestore();
      const doc = await db.collection('registrations').doc(cleanId).get();
      if (doc.exists) {
        const data = doc.data();
        return data?.emailStatus === 'sent';
      }
    } catch (err: any) {
      console.warn('[Server Firebase] Error checking doc with Admin SDK:', err?.message);
    }
  }

  // Try REST API via Google Cloud Access Token
  const token = await getCliAccessToken();
  if (token) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/registrations/${cleanId}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const doc = (await res.json()) as any;
        const status = doc.fields?.emailStatus?.stringValue;
        return status === 'sent';
      }
    } catch (err: any) {
      console.warn('[Server Firebase] Error checking doc with REST API:', err?.message);
    }
  }

  return false;
}

/**
 * Securely updates Firestore registration document with emailStatus and emailSentAt/emailError.
 */
export async function updateFirestoreEmailStatus(params: {
  registrationId?: string;
  status: 'sent' | 'failed';
  error?: string;
}): Promise<boolean> {
  if (!params || typeof params !== 'object') return false;
  const { registrationId, status, error } = params;
  if (!registrationId || typeof registrationId !== 'string') return false;
  const cleanId = registrationId.trim().toUpperCase();
  if (!cleanId) return false;

  const projectId = getProjectId();
  const nowIso = new Date().toISOString();

  // Strategy 1: Firebase Admin SDK
  if (initFirebaseAdmin()) {
    try {
      const db = getFirestore();
      const docRef = db.collection('registrations').doc(cleanId);
      const updateData: Record<string, any> = {
        emailStatus: status,
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (status === 'sent') {
        updateData.emailSentAt = FieldValue.serverTimestamp();
        updateData.emailError = FieldValue.delete();
      } else {
        updateData.emailError = error || 'Failed to dispatch confirmation email';
      }

      await docRef.update(updateData);
      console.log(`[Server Firebase] Successfully updated ${cleanId} emailStatus to "${status}" via Firebase Admin SDK.`);
      return true;
    } catch (err: any) {
      console.error('[Server Firebase] Admin SDK update failed:', err?.message);
    }
  }

  // Strategy 2: Google Cloud Firestore REST API with OAuth token
  const token = await getCliAccessToken();
  if (token) {
    try {
      const fields: Record<string, any> = {
        emailStatus: { stringValue: status },
        updatedAt: { timestampValue: nowIso },
      };

      const fieldPaths = ['emailStatus', 'updatedAt'];

      if (status === 'sent') {
        fields.emailSentAt = { timestampValue: nowIso };
        fields.emailError = { nullValue: null };
        fieldPaths.push('emailSentAt', 'emailError');
      } else {
        fields.emailError = { stringValue: error || 'Failed to dispatch confirmation email' };
        fieldPaths.push('emailError');
      }

      const queryString = fieldPaths.map((f) => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join('&');
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/registrations/${cleanId}?${queryString}`;

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      });

      if (res.ok) {
        console.log(`[Server Firebase] Successfully updated ${cleanId} emailStatus to "${status}" via Firestore REST API.`);
        return true;
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.error('[Server Firebase] REST API patch error:', errJson);
      }
    } catch (err: any) {
      console.error('[Server Firebase] REST API update failed:', err?.message);
    }
  }

  console.warn(`[Server Firebase] Could not update Firestore for ${cleanId}. Please configure FIREBASE_SERVICE_ACCOUNT_KEY in server environment.`);
  return false;
}
