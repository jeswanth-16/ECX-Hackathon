/**
 * Standalone Node.js Express Email Server for ECX Hackathon 2026
 * 
 * Can be deployed to any free Node.js hosting platform (Render, Railway, Fly.io, Koyeb, Glitch, or VPS)
 * WITHOUT requiring Firebase Blaze plan or Cloud Functions!
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendConfirmationEmailViaResend } from './emailService.js';
import { isEmailAlreadySent, updateFirestoreEmailStatus } from './firebaseAdmin.js';

// Load server-side environment variables (.env.local or .env)
dotenv.config({ path: '../.env.local' });
dotenv.config(); // fallback to local .env

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ECX Hackathon 2026 Email Backend' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ECX Hackathon 2026 Email Backend' });
});

// Secure Email Dispatch Endpoint
app.post('/api/send-confirmation-email', async (req, res) => {
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
      console.log(`[Email Server] Confirmation email already sent for ${registrationId}. Skipping duplicate dispatch.`);
      return res.json({ success: true, message: 'Email already sent previously', alreadySent: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[Email Server] RESEND_API_KEY is not set in environment.');
      await updateFirestoreEmailStatus({
        registrationId,
        status: 'failed',
        error: 'RESEND_API_KEY is not configured on the server.',
      });
      return res.status(500).json({
        success: false,
        error: 'RESEND_API_KEY is not configured on the server.',
      });
    }

    const sender = process.env.SENDER_EMAIL || 'ECX Hackathon 2026 <onboarding@resend.dev>';
    const baseUrl = process.env.PUBLIC_BASE_URL || process.env.VITE_PUBLIC_BASE_URL || 'http://localhost:5173';

    console.log(`[Email Server] Sending registration confirmation email to: ${leaderEmail} (${registrationId})`);

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

    console.log(`[Email Server] Confirmation email delivered! Resend ID: ${result.id}`);

    // Securely update Firestore registration document: emailStatus = "sent", emailSentAt = current timestamp (Requirement 5)
    await updateFirestoreEmailStatus({
      registrationId,
      status: 'sent',
    });

    return res.json({ success: true, emailId: result.id });
  } catch (err) {
    const errorMessage = err.message || 'Internal server error while sending email';
    console.error('[Email Server] Failed to dispatch email:', errorMessage);

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
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 ECX Hackathon Email Server running on port ${PORT}`);
  console.log(`📡 Ready to send confirmation emails via Resend`);
  console.log(`🔒 Zero Firebase Cloud Functions / Zero Blaze dependency`);
  console.log(`======================================================\n`);
});
