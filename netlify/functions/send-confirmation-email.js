/**
 * Netlify Serverless Function: send-confirmation-email
 *
 * Endpoint: POST /.netlify/functions/send-confirmation-email
 * Proxied via Netlify Redirect: POST /api/send-confirmation-email
 *
 * Runs strictly server-side on Netlify.
 * Secrets (RESEND_API_KEY, FIREBASE_SERVICE_ACCOUNT_KEY) are kept in Netlify environment variables
 * and are NEVER exposed to browser bundles or client code.
 */

import { sendConfirmationEmailViaResend } from '../../server/emailService.js';
import { isEmailAlreadySent, updateFirestoreEmailStatus } from '../../server/firebaseAdmin.js';

export const config = {
  path: ['/api/send-confirmation-email', '/.netlify/functions/send-confirmation-email'],
};

/**
 * Universal Handler supporting both Netlify Functions v2 (standard Request/Response)
 * and Netlify Functions v1 (Lambda-style event/context).
 */
export default async function handler(req, _context) {
  // Determine if invocation is Web Standards (Netlify v2) or Lambda Event (Netlify v1)
  const isWebStandardRequest = Boolean(req && typeof req.json === 'function');
  let method = 'POST';
  let body = {};

  if (isWebStandardRequest) {
    method = req.method || 'POST';
    try {
      body = await req.json();
    } catch {
      body = {};
    }
  } else {
    method = req?.httpMethod || req?.method || 'POST';
    try {
      body = typeof req?.body === 'string' ? JSON.parse(req.body || '{}') : (req?.body || {});
    } catch {
      body = {};
    }
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  const createResult = (statusCode, data) => {
    if (isWebStandardRequest) {
      return new Response(JSON.stringify(data), {
        status: statusCode,
        headers: corsHeaders,
      });
    }
    return {
      statusCode,
      headers: corsHeaders,
      body: JSON.stringify(data),
    };
  };

  // CORS preflight handling
  if (method === 'OPTIONS') {
    return createResult(200, { ok: true });
  }

  // Method restriction
  if (method !== 'POST') {
    return createResult(405, { success: false, error: 'Method Not Allowed' });
  }

  // Normalize parameters with defensive fallbacks and aliases
  const registrationId = String(body.registrationId || body.id || '').trim();
  const teamName = String(body.teamName || '').trim();
  const teamLeaderName = String(body.teamLeaderName || body.leaderName || '').trim();
  const leaderEmail = String(body.leaderEmail || body.email || '').trim();
  const college = String(body.college || body.collegeName || 'Engineering Institution').trim();
  const status = String(body.status || 'Pending Review').trim();
  const domain = String(body.domain || body.problemDomain || '').trim();
  const members = Array.isArray(body.members) ? body.members : [];

  try {
    // 1. Mandatory Fields Validation
    if (!registrationId || !teamName || !teamLeaderName || !leaderEmail) {
      return createResult(400, {
        success: false,
        error: 'Missing required registration fields: registrationId, teamName, teamLeaderName, and leaderEmail are mandatory.',
      });
    }

    // 2. Duplicate Prevention
    const alreadySent = await isEmailAlreadySent(registrationId);
    if (alreadySent) {
      console.log(`[Netlify Email] Confirmation email already sent for ${registrationId}. Skipping duplicate dispatch.`);
      return createResult(200, {
        success: true,
        message: 'Email already sent previously',
        alreadySent: true,
      });
    }

    // 3. Server-Side Secret Verification (RESEND_API_KEY strictly in Netlify server environment)
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[Netlify Email] RESEND_API_KEY is not configured in Netlify environment variables.');
      await updateFirestoreEmailStatus({
        registrationId,
        status: 'failed',
        error: 'RESEND_API_KEY is not configured in Netlify environment variables.',
      });
      return createResult(500, {
        success: false,
        error: 'RESEND_API_KEY is not configured on the server.',
      });
    }

    const sender = process.env.SENDER_EMAIL || 'ECX Hackathon 2026 <onboarding@resend.dev>';
    // URL is automatically injected by Netlify production environment
    const baseUrl = process.env.PUBLIC_BASE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://ecx-hackathon-2026.netlify.app';

    console.log(`[Netlify Email] Dispatching confirmation email to: ${leaderEmail} (${registrationId})`);

    // 4. Dispatch Email via Resend
    const result = await sendConfirmationEmailViaResend({
      apiKey,
      sender,
      to: leaderEmail,
      data: {
        registrationId,
        teamName,
        teamLeaderName,
        college,
        status,
        domain,
        members,
      },
      baseUrl,
    });

    console.log(`[Netlify Email] Confirmation email delivered! Resend ID: ${result.id}`);

    // 5. Securely synchronize Firestore registration document: emailStatus = "sent", emailSentAt = timestamp
    await updateFirestoreEmailStatus({
      registrationId,
      status: 'sent',
    });

    return createResult(200, {
      success: true,
      emailId: result.id,
    });
  } catch (err) {
    const errorMessage = err?.message || 'Internal server error while sending email';
    console.error('[Netlify Email] Failed to dispatch confirmation email:', errorMessage);

    // Securely synchronize Firestore registration document: emailStatus = "failed", emailError = error message
    if (registrationId) {
      await updateFirestoreEmailStatus({
        registrationId,
        status: 'failed',
        error: errorMessage,
      });
    }

    return createResult(500, {
      success: false,
      error: errorMessage,
    });
  }
}
