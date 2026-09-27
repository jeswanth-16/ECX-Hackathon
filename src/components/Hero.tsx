import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { AbstractTechVisual } from './AbstractTechVisual';
import { Countdown } from './Countdown';
import { EventStats } from './EventStats';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-16 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Department Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 glass-card border border-blue-500/30 text-blue-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
              <span>{eventConfig.department}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] mb-4">
              {eventConfig.name}
            </h1>

            {/* Tagline */}
            <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-gradient-blue mb-5">
              {eventConfig.tagline}
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              {eventConfig.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-electric-blue via-blue-600 to-electric-purple text-white text-base font-bold shadow-glow-blue hover:opacity-95 transition-all flex items-center justify-center gap-2 group min-h-[50px]"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/themes"
                className="w-full sm:w-auto px-7 py-4 rounded-xl glass-card hover:bg-dark-900 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 text-base font-semibold transition-all flex items-center justify-center gap-2 min-h-[50px]"
              >
                <Terminal className="w-4 h-4 text-electric-cyan" />
                <span>Explore Hackathon</span>
              </Link>
            </div>

            {/* University Trust Pill */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Sparkles className="w-4 h-4 text-electric-cyan" />
                {eventConfig.college}
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-emerald-400 font-medium">Free Registration</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span>All Engineering & Polytechnic Colleges Welcome</span>
            </div>
          </div>

          {/* Right Column: Abstract Technology Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AbstractTechVisual />
          </div>
        </div>

        {/* Event Info Cards (Date, Venue, Team Size) */}
        <EventStats />

        {/* Countdown / Schedule Announcement Banner */}
        <Countdown />
      </div>
    </section>
  );
};
