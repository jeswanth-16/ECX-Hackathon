import React from 'react';
import { ArrowRight, Cpu, Sparkles, Building } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ChallengeSection } from '../components/ChallengeSection';
import { CoordinatorsSection } from '../components/CoordinatorsSection';
import { Timeline } from '../components/Timeline';
import { FAQ } from '../components/FAQ';
import { SectionHeader } from '../components/SectionHeader';
import { eventConfig } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';

export const Home: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section (includes EventStats & Countdown) */}
      <Hero />

      {/* 2. About EDGECRAFT Section */}
      <section id="about" className="py-14 md:py-20 relative bg-dark-900/40 border-t border-slate-800/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="About The Hackathon"
            title="Engineering"
            highlightedText="At The Edge"
            subtitle={`${eventConfig.name} is a dedicated 8-hour innovation sprint uniting aspiring electronics, hardware, and computing engineers.`}
          />

          <div className="p-6 sm:p-10 rounded-3xl bg-dark-900 border border-slate-800 shadow-card max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-dark-950 text-cyan-300 border border-slate-800">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{eventConfig.college}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Turning Ideas into Real Solutions
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Organized by the <strong>{eventConfig.department}</strong> at <strong>{eventConfig.college}</strong>, {eventConfig.name} is an 8-hour intensive engineering challenge designed to push the boundaries of practical hardware and embedded systems creation.
                </p>

                <p className="text-sm text-slate-400 leading-relaxed">
                  Participants take on real-world engineering constraints across three rigorous phases: deconstructing unfamiliar systems via sensor telemetry in <em>Round 1 (Reverse)</em>, building a physical functional prototype on their own platform in <em>Round 2 (Rebuild)</em>, and demonstrating technical acumen through theoretical defense under strict budget and component caps in <em>Round 3 (Reconfigure)</em>.
                </p>
              </div>

              <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-dark-950 border border-slate-800 space-y-4 font-mono text-xs">
                <div className="border-b border-slate-800/80 pb-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Event Type</span>
                  <p className="text-sm font-bold text-white mt-0.5">{eventConfig.eventType}</p>
                  <p className="text-slate-400">7:00 AM – 5:00 PM</p>
                </div>

                <div className="border-b border-slate-800/80 pb-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Date & Venue</span>
                  <p className="text-sm font-bold text-white mt-0.5">{eventConfig.date}</p>
                  <p className="text-slate-400">{eventConfig.venue}, Salem</p>
                </div>

                <div className="border-b border-slate-800/80 pb-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Registration Fee</span>
                  <p className="text-sm font-bold text-cyan-300 mt-0.5">₹250 per team</p>
                  <p className="text-slate-400">One payment per team</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Registration Deadline</span>
                  <p className="text-sm font-bold text-amber-300 mt-0.5">{eventConfig.registrationDeadline}</p>
                  <p className="text-slate-400">via Official Google Form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three-Round Challenge Section */}
      <ChallengeSection />

      {/* 4. Event Schedule / Timeline */}
      <section id="timeline" className="py-14 md:py-24 relative bg-dark-950 scroll-mt-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="8-Hour Schedule"
            title="Hackathon"
            highlightedText="Roadmap"
            subtitle={`Join us on Friday, October 23, 2026 at KIOT Campus from 7:00 AM to 5:00 PM.`}
          />

          <Timeline />
        </div>
      </section>

      {/* 5. Registration Call To Action Banner */}
      <section className="py-14 md:py-20 relative bg-dark-900/60 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-dark-900 border border-slate-800 text-center shadow-2xl">
            {/* Subtle glow nodes */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-dark-950 border border-slate-800 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Registrations Open // Deadline: {eventConfig.registrationDeadline}</span>
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Build at EDGECRAFT 2026?
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Take the stage at KIOT Campus on October 23, 2026. Register your team before the October 20 deadline to secure your place in the 8-hour hardware challenge.
              </p>

              {/* Registration Fee Highlight Box */}
              <div className="my-6 inline-flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-dark-950 border border-cyan-500/30 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  REGISTRATION FEE
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                  ₹250 <span className="text-sm font-mono font-normal text-slate-400">/ Per Person</span>
                </span>
                <span className="text-xs text-cyan-300 mt-1 font-medium">
                  Registration Fee: ₹250 per Member
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  One payment is required per team, regardless of team size.
                </span>
              </div>

              <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={openRegistration}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#challenge"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-950 hover:bg-dark-850 text-slate-300 hover:text-white font-semibold text-sm border border-slate-800 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Review 3 Rounds</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Coordinator Information Section */}
      <CoordinatorsSection />

      {/* 7. FAQ Section */}
      <section className="py-14 md:py-20 relative bg-dark-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Official Clarifications"
            title="Frequently Asked"
            highlightedText="Questions"
            subtitle="Essential details regarding schedule, challenges, and registration."
          />

          <FAQ />
        </div>
      </section>
    </div>
  );
};
