import { sendConfirmationEmailViaResend } from '../server/emailService.js';
import { isEmailAlreadySent, updateFirestoreEmailStatus } from '../server/firebaseAdmin.js';

/**
 * Serverless API handler compatible with Vercel and Netlify functions.
 * Deploy free without requiring Firebase Blaze plan or credit cards!
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const body = req.body || {};
  const registrationId = String(body.registrationId || body.id || '').trim();
  const teamName = String(body.teamName || '').trim();
  const teamLeaderName = String(body.teamLeaderName || body.leaderName || '').trim();
  const leaderEmail = String(body.leaderEmail || body.email || '').trim();
  const college = String(body.college || body.collegeName || 'Engineering Institution').trim();
  const status = String(body.status || 'Pending Review').trim();
  const domain = String(body.domain || body.problemDomain || '').trim();
  const members = Array.isArray(body.members) ? body.members : [];

  try {
    if (!registrationId || !teamName || !teamLeaderName || !leaderEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required registration fields: registrationId, teamName, teamLeaderName, and leaderEmail are mandatory.',
      });
    }

    // Prevent duplicate email sends where possible (Requirement 15)
    const alreadySent = await isEmailAlreadySent(registrationId);
    if (alreadySent) {
      console.log(`[Serverless Email] Confirmation email already sent for ${registrationId}. Skipping duplicate dispatch.`);
      return res.status(200).json({ success: true, message: 'Email already sent previously', alreadySent: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      await updateFirestoreEmailStatus({
        registrationId,
        status: 'failed',
        error: 'RESEND_API_KEY is not configured in server environment.',
      });
      return res.status(500).json({
        success: false,
        error: 'RESEND_API_KEY is not configured in server environment.',
      });
    }

    const sender = process.env.SENDER_EMAIL || 'ECX Hackathon 2026 <onboarding@resend.dev>';
    const baseUrl = process.env.PUBLIC_BASE_URL || process.env.VITE_PUBLIC_BASE_URL || 'https://ecx-hackathon-2026.web.app';

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

    // Securely update Firestore registration document: emailStatus = "sent", emailSentAt = current timestamp (Requirement 5)
    await updateFirestoreEmailStatus({
      registrationId,
      status: 'sent',
    });

    return res.status(200).json({ success: true, emailId: result.id });
  } catch (err) {
    const errorMessage = err.message || 'Internal server error while sending email';
    console.error('Serverless email error:', errorMessage);

    // Securely update Firestore registration document: emailStatus = "failed", emailError = error message (Requirement 6)
    if (registrationId) {
      await updateFirestoreEmailStatus({
        registrationId,
        status: 'failed',
        error: errorMessage,
      });
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}
