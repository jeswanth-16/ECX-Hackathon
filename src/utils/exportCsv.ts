import type { Registration } from '../types';

export function exportRegistrationsToCSV(registrations: Registration[], filename = 'ECX_Hackathon_2026_Registrations.csv'): boolean {
  if (!registrations || registrations.length === 0) {
    console.warn('No registrations available to export.');
    return false;
  }

  const headers = [
    'Registration ID',
    'Registration Date',
    'Status',
    'Confirmation Email Status',
    'Team Name',
    'Leader Name',
    'Leader Email',
    'Leader Phone',
    'College Name',
    'Department',
    'Problem Domain',
    'Idea Title',
    'Idea Description',
    'Team Size',
    'Members Details'
  ];

  const escapeCSV = (value: string | number | undefined | null): string => {
    if (value === undefined || value === null) return '""';
    const stringVal = String(value);
    const escaped = stringVal.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = registrations.map(reg => {
    const membersSummary = reg.members.map((m, idx) => 
      `Member ${idx + 1}: ${m.name} (${m.regNo || 'N/A'}) - ${m.email} / ${m.phone}`
    ).join(' | ');

    const dateFormatted = new Date(reg.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return [
      escapeCSV(reg.id),
      escapeCSV(dateFormatted),
      escapeCSV(reg.status),
      escapeCSV(reg.emailStatus || 'pending'),
      escapeCSV(reg.teamName),
      escapeCSV(reg.leaderName),
      escapeCSV(reg.email),
      escapeCSV(reg.phone),
      escapeCSV(reg.collegeName),
      escapeCSV(reg.department),
      escapeCSV(reg.domain),
      escapeCSV(reg.ideaTitle),
      escapeCSV(reg.ideaDescription),
      escapeCSV(reg.members.length),
      escapeCSV(membersSummary)
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
}
