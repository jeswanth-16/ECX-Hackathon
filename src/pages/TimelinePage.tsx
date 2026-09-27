import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Timeline } from '../components/Timeline';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TimelinePage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Event Schedule"
        title="Hackathon"
        highlightedText="Roadmap & Timeline"
        subtitle="Follow each key milestone from registration to prototyping, jury evaluation, and the valedictory award ceremony."
      />

      {/* Notice Banner */}
      <div className="mb-10 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 max-w-2xl mx-auto flex items-center gap-3">
        <Calendar className="w-5 h-5 text-electric-cyan shrink-0" />
        <div className="text-xs sm:text-sm text-slate-300">
          All milestones are sequentially structured. Concrete dates will be updated synchronously with academic scheduling notifications.
        </div>
      </div>

      {/* Vertical Interactive Timeline */}
      <Timeline />

      {/* Call to action */}
      <div className="mt-14 p-8 rounded-3xl bg-dark-900 border border-slate-800 max-w-2xl mx-auto text-center">
        <h4 className="text-lg font-bold text-white mb-2">Stage 1 is live!</h4>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Submit your team roster now to secure your registration pass and get priority access to mentor slots.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-all"
        >
          <span>Register Team Today</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
