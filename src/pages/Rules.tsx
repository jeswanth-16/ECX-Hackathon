import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { eventConfig, challengeRounds } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';
import { 
  ShieldAlert, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const Rules: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Event Guidelines"
        title="Challenge Structure &"
        highlightedText="Official Parameters"
        subtitle="The official framework for the EDGECRAFT 2026 8-hour hardware hackathon."
      />

      {/* Official Challenge Rounds Guidelines */}
      <div className="space-y-6 mb-12">
        <h3 className="text-xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <span>Three-Round Guidelines</span>
        </h3>

        {challengeRounds.map((round) => (
          <div
            key={round.number}
            className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800 shadow-card"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 font-mono">
              <span className="text-lg font-bold text-white">ROUND {round.number} — {round.name}</span>
              <span className="text-xs text-cyan-400 font-bold">{round.flowString}</span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {round.description}
            </p>

            {round.importantNote && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90 font-mono">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-0.5">Crucial Guideline:</strong>
                  {round.importantNote}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Schedule Parameters */}
      <div className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800 mb-12">
        <h3 className="text-xl font-black text-white font-mono uppercase tracking-wider mb-6">
          Schedule & Logistics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-950 border border-slate-800">
            <Calendar className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-slate-500 text-[10px] uppercase font-bold block">Event Date</span>
              <strong className="text-white block">{eventConfig.date}</strong>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-950 border border-slate-800">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-slate-500 text-[10px] uppercase font-bold block">Event Time</span>
              <strong className="text-white block">{eventConfig.time} ({eventConfig.eventType})</strong>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-950 border border-slate-800">
            <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-slate-500 text-[10px] uppercase font-bold block">Venue</span>
              <strong className="text-white block">{eventConfig.venue}</strong>
              <span className="text-slate-400 text-xs">{eventConfig.college}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-950 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-slate-500 text-[10px] uppercase font-bold block">Registration Deadline</span>
              <strong className="text-amber-300 block">{eventConfig.registrationDeadline}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="text-center">
        <p className="text-sm text-slate-400 mb-4">
          Ready to participate in EDGECRAFT 2026?
        </p>
        <button
          type="button"
          onClick={openRegistration}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer"
        >
          <span>Register Team Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
