import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { RegistrationForm } from '../components/RegistrationForm';
import { eventConfig } from '../data/eventConfig';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const Register: React.FC = () => {
  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <SectionHeader
        badge="Official Team Portal"
        title="Team"
        highlightedText="Registration"
        subtitle={`Register your team for ${eventConfig.name}. Please ensure all member contact details are accurate for verification.`}
      />

      {/* Quick summary cards for participants */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Registration Fee</span>
            <span className="text-xs font-bold text-emerald-400">100% Free Entry</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-electric-cyan shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Team Composition</span>
            <span className="text-xs font-bold text-white">{eventConfig.teamSize.min} to {eventConfig.teamSize.max} Members</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Confirmation</span>
            <span className="text-xs font-bold text-white">Instant QR Digital Pass</span>
          </div>
        </div>
      </div>

      {/* Multi-Section Form */}
      <RegistrationForm />
    </div>
  );
};
