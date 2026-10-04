import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ChallengeSection } from '../components/ChallengeSection';
import { eventConfig } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';
import { ArrowRight, Layers } from 'lucide-react';

export const Themes: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Core Challenge Architecture"
        title="EDGECRAFT"
        highlightedText="Three-Round Gauntlet"
        subtitle="A progressive 8-hour hardware challenge: Reverse, Rebuild, and Reconfigure."
      />

      {/* Embedded Challenge Section Component */}
      <ChallengeSection />

      {/* Call to action */}
      <div className="mt-14 p-8 sm:p-12 rounded-3xl bg-dark-900 border border-slate-800 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-dark-950 border border-slate-800 mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Registration Deadline: {eventConfig.registrationDeadline}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
          Ready to Take on the Gauntlet?
        </h3>
        <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
          Prepare your embedded development tools and register your team for EDGECRAFT 2026 at KIOT Campus.
        </p>
        <button
          type="button"
          onClick={openRegistration}
          className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-sm font-bold shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Register Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
