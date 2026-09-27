import type { Registration } from '../types';

export interface SendConfirmationEmailParams {
  registrationId: string;
  teamName: string;
  teamLeaderName: string;
  leaderEmail: string;
  college: string;
  status: string;
  domain?: string;
  members?: Array<{ name: string; email?: string; phone?: string; registrationNumber?: string; regNo?: string }>;
}

/**
 * Triggers the secure server-side confirmation email endpoint.
 *
 * STRICT SECURITY:
 * - No API keys or secrets are stored or transmitted by the browser.
 * - The browser only sends registration metadata to the server-side /api/send-confirmation-email endpoint.
 * - Non-blocking: If the email server is temporarily offline, the registration is NEVER broken or duplicated.
 */
export async function triggerConfirmationEmail(registration: Registration): Promise<boolean> {
  if (!registration || !registration.email || !registration.id) {
    console.warn('[Email] Cannot trigger email: registration record missing ID or email.');
    return false;
  }

  const payload: SendConfirmationEmailParams = {
    registrationId: registration.id,
    teamName: registration.teamName,
    teamLeaderName: registration.leaderName,
    leaderEmail: registration.email,
    college: registration.collegeName,
    status: registration.status || 'pending',
    domain: registration.domain || registration.problemDomain,
    members: Array.isArray(registration.members) ? registration.members : [],
  };

  try {
    const response = await fetch('/api/send-confirmation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.warn('[Email] Server confirmation email endpoint returned error:', data.error || response.statusText);
      return false;
    }

    console.info(`[Email] Confirmation email successfully sent for ${registration.id} (ID: ${data.emailId})`);
    return true;
  } catch (err) {
    // Non-blocking: log warning so participant registration and digital pass are never interrupted
    console.warn('[Email] Could not reach server confirmation email endpoint:', err);
    return false;
  }
}
