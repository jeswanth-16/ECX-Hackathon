import React from 'react';
import { challengeRounds } from '../data/eventConfig';
import { SectionHeader } from './SectionHeader';
import { Cpu, ArrowRight, ShieldAlert, Wrench, RefreshCw, Terminal, Layers } from 'lucide-react';

export const ChallengeSection: React.FC = () => {
  const roundIcons = [Terminal, Wrench, RefreshCw];

  return (
    <section id="challenge" className="py-14 md:py-24 relative bg-dark-950 scroll-mt-20">
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Core Engineering Challenge"
          title="The Three-Round"
          highlightedText="Hardware Gauntlet"
          subtitle="An intensive 8-hour progressive sprint testing system analysis, physical prototyping, and architectural agility."
        />

        {/* Progression Indicator Banner */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-dark-900 border border-slate-800 text-xs sm:text-sm font-mono text-slate-300">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-electric-cyan" />
              REVERSE
            </span>
            <span className="text-slate-600 font-sans">↓</span>
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              REBUILD
            </span>
            <span className="text-slate-600 font-sans">↓</span>
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              RECONFIGURE
            </span>
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {challengeRounds.map((round, idx) => {
            const Icon = roundIcons[idx] || Cpu;
            const isRound3 = idx === 2;

            return (
              <div
                key={round.number}
                className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-card hover:-translate-y-1"
              >
                {/* Top Technical Metadata */}
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 font-mono">
                    <span className="text-3xl sm:text-4xl font-black text-white/90 tracking-tighter">
                      {round.number}
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-dark-950 border border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <Icon className="w-3.5 h-3.5 text-electric-cyan" />
                      <span>STAGE {round.number}</span>
                    </div>
                  </div>

                  {/* Round Name */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                    {round.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {round.description}
                  </p>

                  {/* Important Callout for Round 3 */}
                  {isRound3 && round.importantNote && (
                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 mb-6 flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-200/90 font-medium leading-relaxed">
                        <strong className="text-amber-300 uppercase tracking-wide block mb-0.5">Important</strong>
                        {round.importantNote}
                      </div>
                    </div>
                  )}
                </div>

                {/* Core Flow Footer */}
                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-500 block mb-2">
                    CORE FLOW
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {round.flow.map((step, sIdx) => (
                      <React.Fragment key={step}>
                        <span className="px-2.5 py-1 rounded-md bg-dark-950 border border-slate-800 text-xs font-mono font-bold text-slate-200">
                          {step}
                        </span>
                        {sIdx < round.flow.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-600" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Context Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-dark-900 border border-slate-800/80 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-electric-cyan" />
            <span>Progressive Challenge Architecture</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            All teams advance through the structured 8-hour progression: analyzing sensor telemetry in Round 1, building a physical functional prototype in Round 2, and defending theoretical architectural reconfigurations in Round 3.
          </p>
        </div>
      </div>
    </section>
  );
};
