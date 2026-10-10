import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Timeline } from '../components/Timeline';
import { Calendar, ArrowRight, Clock, MapPin } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';

export const TimelinePage: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Official Event Schedule"
        title="8-Hour"
        highlightedText="Roadmap & Timeline"
        subtitle={`Friday, October 23, 2026 from 7:00 AM to 5:00 PM at KIOT Campus.`}
      />

      {/* Notice Banner */}
      <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-dark-900 border border-slate-800 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-slate-300">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{eventConfig.date}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{eventConfig.time}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{eventConfig.venue}</span>
        </div>
      </div>

      {/* Pre-Screening Quiz Announcement */}
      <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-dark-900 border border-cyan-500/30 max-w-2xl mx-auto shadow-card text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-dark-950 border border-slate-800 mb-2">
          <span>Pre-Screening Quiz</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          17th — Online Quiz
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
          Registered teams will take an online pre-screening quiz on the 17th for initial screening and shortlisting.
        </p>
      </div>

      {/* Vertical Timeline */}
      <Timeline />

      {/* Call to action */}
      <div className="mt-14 p-8 rounded-3xl bg-dark-900 border border-slate-800 max-w-2xl mx-auto text-center">
        <h4 className="text-xl font-black text-white mb-2">Registration Closes October 20, 2026</h4>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Submit your team registration before the deadline to participate in the 8-hour EDGECRAFT 2026 challenge.
        </p>
        <button
          type="button"
          onClick={openRegistration}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer"
        >
          <span>Register Team Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
