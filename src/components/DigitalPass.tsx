import type { Registration } from '../types';
import { eventConfig } from '../data/eventConfig';
import { QRCard } from './QRCard';
import { ShieldCheck, Calendar, MapPin, Printer } from 'lucide-react';
import { getPublicBaseUrl } from '../lib/firebase';

interface DigitalPassProps {
  registration: Registration;
  showPrintButton?: boolean;
}

export const DigitalPass: React.FC<DigitalPassProps> = ({
  registration,
  showPrintButton = true,
}) => {
  const baseUrl = getPublicBaseUrl();
  const verificationUrl = `${baseUrl}/team/${encodeURIComponent(registration.id)}`;

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = () => {
    const s = (registration.status || 'pending').toLowerCase();
    switch (s) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Confirmed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-4">
      {/* Outer Ticket Container with perforated cut notches */}
      <div className="relative overflow-hidden rounded-3xl bg-dark-900 border-2 border-blue-500/30 shadow-2xl print-only-card">
        {/* Top Glow bar */}
        <div className="h-2.5 w-full bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-800/80 bg-gradient-to-b from-dark-850 to-dark-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-electric-cyan" />
                Official Participant Pass
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {eventConfig.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {eventConfig.department} • {eventConfig.collegeShort}
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Registration ID
              </span>
              <span className="text-lg sm:text-xl font-mono font-extrabold text-electric-cyan bg-dark-950 px-3 py-1 rounded-lg border border-blue-500/30 mt-0.5">
                {registration.id}
              </span>
            </div>
          </div>
        </div>

        {/* Pass Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Details (2 cols on md) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Team Name
                </span>
                <h3 className="text-xl font-bold text-white">{registration.teamName}</h3>
              </div>
              <div>{getStatusBadge()}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Team Leader
                </span>
                <span className="font-semibold text-slate-200">{registration.leaderName}</span>
                <span className="text-[11px] text-slate-400 block">{registration.email}</span>
                <span className="text-[11px] text-slate-400 block">{registration.phone}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Institution
                </span>
                <span className="font-semibold text-slate-200 block truncate" title={registration.collegeName}>
                  {registration.collegeName}
                </span>
                <span className="text-[11px] text-slate-400 block truncate" title={registration.department}>
                  {registration.department}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Problem Domain & Track
              </span>
              <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-950/70 border border-blue-500/30 text-blue-300">
                {registration.domain}
              </span>
              {registration.ideaTitle && (
                <p className="mt-1.5 text-xs text-slate-300 font-medium italic">
                  &ldquo;{registration.ideaTitle}&rdquo;
                </p>
              )}
            </div>

            {/* Members summary */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Team Roster ({registration.members.length} Members)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {registration.members.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-md bg-dark-950/70 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between"
                  >
                    <span className="font-medium truncate max-w-[120px]">
                      {m.name} {m.isLeader ? '(Lead)' : ''}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">
                      {m.regNo || `#${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QR Code and verification column */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-dark-950/90 border border-slate-800 text-center">
            <QRCard value={verificationUrl} registrationId={registration.id} size={140} />
            <span className="text-[10px] text-slate-400 mt-3 block leading-snug">
              Scan to verify credentials at registration desk
            </span>
          </div>
        </div>

        {/* Footer of ticket */}
        <div className="px-6 py-4 bg-dark-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
              {eventConfig.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-electric-purple" />
              {eventConfig.venue}
            </span>
          </div>

          <div className="text-[10px] text-slate-500 font-mono">
            Issued: {new Date(registration.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {showPrintButton && (
        <div className="mt-4 flex justify-end no-print">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors border border-slate-700 shadow-sm"
          >
            <Printer className="w-4 h-4 text-electric-cyan" />
            Print / Save Pass (PDF)
          </button>
        </div>
      )}
    </div>
  );
};
