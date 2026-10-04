import React from 'react';
import { ArrowRight, Terminal, Calendar, Clock, MapPin } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { AbstractTechVisual } from './AbstractTechVisual';
import { EventStats } from './EventStats';
import { Countdown } from './Countdown';
import { useRegistration } from '../context/useRegistration';
import { ShinyButton } from './ui/shiny-button';

export const Hero: React.FC = () => {
  const { openRegistration } = useRegistration();

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const challengeEl = document.getElementById('challenge');
    if (challengeEl) {
      e.preventDefault();
      challengeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 md:pt-16 pb-12">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/10 via-slate-800/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Department & Organizer Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide uppercase mb-6 bg-dark-900 border border-slate-800 text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
              <span>{eventConfig.department} • {eventConfig.collegeShort}</span>
            </div>

            {/* Event Name */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05] mb-2 font-sans">
              {eventConfig.name}
            </h1>

            {/* Event Type Badge */}
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-blue-950/80 border border-blue-500/30 text-xs sm:text-sm font-mono font-bold tracking-widest text-cyan-300 uppercase">
                {eventConfig.eventType}
              </span>
            </div>

            {/* Tagline */}
            <div className="mb-4">
              <div className="text-lg sm:text-2xl font-bold tracking-wide text-white">
                {eventConfig.tagline}
              </div>
              <div className="text-sm sm:text-base font-medium text-slate-400 mt-1">
                {eventConfig.taglineSub}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              {eventConfig.description} An intensive 8-hour hardware and embedded systems sprint testing system analysis, physical sense-compute-actuate prototyping, and theoretical adaptation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <ShinyButton
                onClick={openRegistration}
                className="w-full sm:w-auto"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </ShinyButton>

              <a
                href="#challenge"
                onClick={handleExploreClick}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-dark-900 hover:bg-dark-850 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 text-base font-semibold transition-all flex items-center justify-center gap-2 min-h-[50px]"
              >
                <Terminal className="w-4 h-4 text-electric-cyan" />
                <span>Explore 3 Rounds</span>
              </a>
            </div>

            {/* Hardware & Engineering Badges */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                {eventConfig.date}
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {eventConfig.time}
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                {eventConfig.venue}
              </span>
            </div>
          </div>

          {/* Right Column: Abstract Technology Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AbstractTechVisual />
          </div>
        </div>

        {/* Event Info Cards (Date, Time, Venue, Deadline) */}
        <EventStats />

        {/* Live Countdown to Kick-off */}
        <Countdown />
      </div>
    </section>
  );
};
