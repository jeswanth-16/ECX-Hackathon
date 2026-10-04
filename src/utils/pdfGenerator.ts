import type { Team } from '../types/admin';
import { eventConfig } from '../data/eventConfig';

/**
 * Generates an official, print-ready document and triggers the browser's
 * native Save as PDF / Print dialog.
 */
export function generateTeamPdf(team: Team): void {
  const printWindow = window.open('', '_blank', 'width=850,height=1050');
  if (!printWindow) {
    alert('Please allow popups to generate and print the official team PDF.');
    return;
  }

  const memberRows = team.members.length > 0
    ? team.members.map((m, idx) => `
        <div class="member-item">
          <span class="index">${idx + 1}.</span>
          <div class="member-info">
            <strong>${escapeHtml(m.name)}</strong> — 
            <span>${escapeHtml(m.email)}</span> | 
            <span>${escapeHtml(m.phone)}</span>
            ${m.college || m.department ? `<div class="subtext">${escapeHtml(m.college || '')} ${m.department ? `(${escapeHtml(m.department)})` : ''} ${m.year ? `• ${escapeHtml(m.year)}` : ''}</div>` : ''}
          </div>
        </div>
      `).join('')
    : '<div class="empty">No additional team members listed.</div>';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>EDGECRAFT 2026 - Team ${escapeHtml(team.teamId)}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 20mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #111827;
            background: #ffffff;
            line-height: 1.5;
            padding: 30px;
          }
          .header {
            border-bottom: 2px solid #111827;
            padding-bottom: 16px;
            margin-bottom: 24px;
            text-align: center;
          }
          .header h1 {
            font-size: 26px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .header .badge {
            display: inline-block;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 2px;
            padding: 2px 10px;
            border: 1px solid #111827;
            margin-bottom: 10px;
          }
          .header .meta {
            font-size: 12px;
            color: #374151;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .section {
            margin-bottom: 22px;
            border: 1px solid #E5E7EB;
            border-radius: 4px;
            padding: 14px 18px;
          }
          .section-title {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #4B5563;
            margin-bottom: 10px;
            border-bottom: 1px solid #F3F4F6;
            padding-bottom: 4px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px 20px;
          }
          .field {
            font-size: 13px;
          }
          .field-label {
            font-size: 11px;
            color: #6B7280;
            text-transform: uppercase;
            font-weight: 600;
            display: block;
            margin-bottom: 2px;
          }
          .field-value {
            font-size: 13px;
            font-weight: 600;
            color: #111827;
          }
          .status-tag {
            display: inline-block;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            border-radius: 3px;
            border: 1px solid #9CA3AF;
          }
          .member-item {
            display: flex;
            align-items: flex-start;
            padding: 6px 0;
            border-bottom: 1px dashed #E5E7EB;
            font-size: 13px;
          }
          .member-item:last-child {
            border-bottom: none;
          }
          .member-item .index {
            font-weight: 700;
            width: 24px;
            color: #6B7280;
          }
          .member-info .subtext {
            font-size: 11px;
            color: #6B7280;
            margin-top: 2px;
          }
          .footer {
            margin-top: 36px;
            padding-top: 14px;
            border-top: 1px solid #111827;
            text-align: center;
            font-size: 11px;
            color: #4B5563;
          }
          .footer strong {
            color: #111827;
          }
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>EDGECRAFT 2026</h1>
          <div class="badge">8-HOUR HACKATHON</div>
          <div class="meta">
            ${escapeHtml(eventConfig.date)} &bull; ${escapeHtml(eventConfig.time)} &bull; ${escapeHtml(eventConfig.venue)}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Team Details</div>
          <div class="grid">
            <div class="field">
              <span class="field-label">Team ID</span>
              <span class="field-value">${escapeHtml(team.teamId)}</span>
            </div>
            <div class="field">
              <span class="field-label">Team Name</span>
              <span class="field-value">${escapeHtml(team.teamName)}</span>
            </div>
            <div class="field">
              <span class="field-label">Status</span>
              <span class="field-value status-tag">${escapeHtml(team.status.toUpperCase())}</span>
            </div>
            <div class="field">
              <span class="field-label">Registration Date</span>
              <span class="field-value">${escapeHtml(team.registrationDate)}</span>
            </div>
            ${team.domain ? `
              <div class="field" style="grid-column: span 2;">
                <span class="field-label">Technical Track / Domain</span>
                <span class="field-value">${escapeHtml(team.domain)}</span>
              </div>
            ` : ''}
            ${team.problemStatement ? `
              <div class="field" style="grid-column: span 2;">
                <span class="field-label">Problem Statement</span>
                <span class="field-value">${escapeHtml(team.problemStatement)}</span>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Team Leader</div>
          <div class="grid">
            <div class="field">
              <span class="field-label">Name</span>
              <span class="field-value">${escapeHtml(team.teamLeader?.name || team.teamLeaderName || '')}</span>
            </div>
            <div class="field">
              <span class="field-label">Email</span>
              <span class="field-value">${escapeHtml(team.teamLeader?.email || team.leaderEmail || '')}</span>
            </div>
            <div class="field">
              <span class="field-label">Phone</span>
              <span class="field-value">${escapeHtml(team.teamLeader?.phone || team.leaderPhone || '')}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">College</div>
          <div class="grid">
            <div class="field" style="grid-column: span 2;">
              <span class="field-label">College</span>
              <span class="field-value">${escapeHtml(team.college)}</span>
            </div>
            <div class="field">
              <span class="field-label">Department</span>
              <span class="field-value">${escapeHtml(team.department)}</span>
            </div>
            <div class="field">
              <span class="field-label">Year of Study</span>
              <span class="field-value">${escapeHtml(team.year)}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Team Members (${team.members.length})</div>
          ${memberRows}
        </div>

        ${team.notes ? `
          <div class="section">
            <div class="section-title">Administrative Notes</div>
            <div class="field-value" style="font-size: 12px; color: #374151;">${escapeHtml(team.notes)}</div>
          </div>
        ` : ''}

        <div class="footer">
          <div>Official Event Identity:</div>
          <strong>${escapeHtml(eventConfig.college)}</strong><br />
          <strong>${escapeHtml(eventConfig.department)}</strong>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
