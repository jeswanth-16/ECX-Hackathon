/**
 * Email Service for ECX Hackathon 2026
 * Formats confirmation emails and dispatches them securely via Resend API.
 * This runs solely on the server side; secrets are never exposed to client browsers.
 */

export function buildConfirmationEmail(params = {}) {
  const teamLeaderName = String(params.teamLeaderName || 'Team Leader').trim();
  const registrationId = String(params.registrationId || '').trim();
  const teamName = String(params.teamName || 'Your Team').trim();
  const college = String(params.college || 'Engineering Institution').trim();
  const status = String(params.status || 'Pending Review').toUpperCase();
  const digitalPassUrl = params.digitalPassUrl || '';
  const domain = params.domain || '';
  const validMembers = Array.isArray(params.members) ? params.members.filter(Boolean) : [];

  const subject = `ECX Hackathon 2026 — Registration Confirmed | ${registrationId}`;

  // Plain Text Version (Matches exact required specification)
  let text = `ECX HACKATHON 2026
Department of Electronics and Computer Engineering

Registration Confirmed

Hello ${teamLeaderName},

Your team has been successfully registered for ECX Hackathon 2026.

Registration ID: ${registrationId}
Team Name: ${teamName}
College: ${college}
Status: ${status}`;

  if (domain) {
    text += `\nProblem Track: ${domain}`;
  }

  if (validMembers.length > 0) {
    text += `\n\nTeam Roster (${validMembers.length} Members):\n`;
    text += validMembers
      .map((m, idx) => {
        const leaderTag = m.isLeader ? ' (Leader)' : '';
        const regTag = m.regNo || m.registrationNumber ? ` — ${m.regNo || m.registrationNumber}` : '';
        return `${idx + 1}. ${m.name || 'Member'}${leaderTag}${regTag}`;
      })
      .join('\n');
  }

  text += `\n
Your Official Digital Event Pass is ready.

View your pass here: ${digitalPassUrl}

Please keep this pass available during the event for check-in and verification.

Regards,
ECX Hackathon 2026 Organizing Team
Department of Electronics and Computer Engineering`;

  // Professional Responsive HTML Version (Matches dark navy / electric blue branding)
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #030712; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0b1528; border: 1px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          <!-- Top Accent Line -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #1677ff 0%, #7c3aed 50%, #00f0ff 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 20px 36px; text-align: left;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #38bdf8; display: block; margin-bottom: 4px;">
                Department of Electronics and Computer Engineering
              </span>
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">
                ECX HACKATHON 2026
              </h1>
              <div style="margin-top: 14px; display: inline-block; padding: 4px 12px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 999px; font-size: 11px; font-weight: 700; color: #34d399; text-transform: uppercase; letter-spacing: 0.5px;">
                Registration Confirmed
              </div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;"><hr style="border: 0; border-top: 1px solid #1e293b; margin: 0;"></td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 36px; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #ffffff;">
                Hello <strong style="color: #38bdf8;">${teamLeaderName}</strong>,
              </p>
              <p style="margin: 0 0 24px 0;">
                Your team has been successfully registered for <strong>ECX Hackathon 2026</strong>.
              </p>

              <!-- Registration Summary Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #030712; border: 1px solid #1e293b; border-radius: 16px; margin: 0 0 24px 0; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; width: 38%; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    Registration ID
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 15px; font-family: monospace; font-weight: 800; color: #00f0ff;">
                    ${registrationId}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    Team Name
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 14px; font-weight: 700; color: #ffffff;">
                    ${teamName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    College
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 14px; color: #e2e8f0;">
                    ${college}
                  </td>
                </tr>
                ${domain ? `
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    Problem Track
                  </td>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; font-size: 13px; font-weight: 600; color: #38bdf8;">
                    ${domain}
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 14px 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8;">
                    Status
                  </td>
                  <td style="padding: 14px 20px; font-size: 13px; font-weight: 700; color: #fbbf24;">
                    ${status}
                  </td>
                </tr>
              </table>

              ${validMembers.length > 0 ? `
              <!-- Team Roster Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #030712; border: 1px solid #1e293b; border-radius: 16px; margin: 0 0 28px 0; overflow: hidden;">
                <tr>
                  <td colspan="2" style="padding: 12px 20px; background-color: rgba(22, 119, 255, 0.08); border-bottom: 1px solid #1e293b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8;">
                    Team Members Roster (${validMembers.length})
                  </td>
                </tr>
                ${validMembers.map((m, idx) => `
                <tr>
                  <td style="padding: 10px 20px; border-bottom: ${idx < validMembers.length - 1 ? '1px solid #1e293b' : 'none'}; font-size: 13px; color: #ffffff;">
                    <strong>${m.name || 'Member'}</strong> ${m.isLeader ? '<span style="color: #38bdf8; font-size: 11px;">(Leader)</span>' : ''}
                  </td>
                  <td style="padding: 10px 20px; border-bottom: ${idx < validMembers.length - 1 ? '1px solid #1e293b' : 'none'}; font-size: 12px; color: #94a3b8; text-align: right; font-family: monospace;">
                    ${m.regNo || m.registrationNumber || ''}
                  </td>
                </tr>
                `).join('')}
              </table>
              ` : ''}

              <!-- Digital Pass Callout -->
              <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #ffffff; text-align: center;">
                Your Official Digital Event Pass is ready.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${digitalPassUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #1677ff 0%, #7c3aed 100%); color: #ffffff; padding: 15px 32px; border-radius: 14px; text-decoration: none; font-weight: 800; font-size: 13px; letter-spacing: 0.8px; text-transform: uppercase; box-shadow: 0 8px 24px rgba(22, 119, 255, 0.4);">
                      VIEW OFFICIAL DIGITAL EVENT PASS
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px 0; font-size: 13px; color: #94a3b8; line-height: 1.5; text-align: center;">
                Please keep this pass available during the event for check-in and verification.
              </p>

              <hr style="border: 0; border-top: 1px solid #1e293b; margin: 28px 0;">

              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Regards,<br>
                <strong style="color: #cbd5e1;">ECX Hackathon 2026 Organizing Team</strong><br>
                Department of Electronics and Computer Engineering<br>
                Knowledge Institute of Technology (KIOT)
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #030712; padding: 20px 36px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b;">
              This is an automated event confirmation message for ECX Hackathon 2026.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

/**
 * Dispatches confirmation email to the team leader via Resend REST API.
 */
export async function sendConfirmationEmailViaResend(params = {}) {
  const { apiKey, sender, to, data = {}, baseUrl } = params;

  if (!apiKey || typeof apiKey !== 'string' || !apiKey.startsWith('re_')) {
    throw new Error('Valid RESEND_API_KEY is not configured on the server.');
  }

  // Format recipient safely
  const recipientList = Array.isArray(to)
    ? to.map((e) => String(e || '').trim()).filter(Boolean)
    : [String(to || '').trim()].filter(Boolean);

  if (recipientList.length === 0 || !recipientList[0].includes('@')) {
    throw new Error(`Invalid recipient email address: "${Array.isArray(to) ? to.join(', ') : to}"`);
  }

  const regId = String(data.registrationId || data.id || '').trim();
  const teamLeaderName = String(data.teamLeaderName || data.leaderName || 'Team Leader').trim();
  const teamName = String(data.teamName || 'Your Team').trim();
  const college = String(data.college || data.collegeName || 'Engineering Institution').trim();
  const status = String(data.status || 'Pending Review').trim();
  const domain = String(data.domain || data.problemDomain || '').trim();
  const members = Array.isArray(data.members) ? data.members : [];

  const cleanBaseUrl = (baseUrl || 'http://localhost:5173').replace(/\/+$/, '');
  const digitalPassUrl = `${cleanBaseUrl}/team/${encodeURIComponent(regId)}`;

  const { subject, text, html } = buildConfirmationEmail({
    teamLeaderName,
    registrationId: regId,
    teamName,
    college,
    status,
    digitalPassUrl,
    domain,
    members,
  });

  const fromSender = sender || 'ECX Hackathon 2026 <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromSender,
      to: recipientList,
      subject,
      text,
      html,
    }),
  });

  const resJson = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = resJson?.message || `Resend API failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return resJson;
}
