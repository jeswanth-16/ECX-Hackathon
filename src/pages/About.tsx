import React from 'react';
import { 
  Layers, 
  ArrowRight,
  Building,
  Phone
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { eventConfig, challengeRounds } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';

export const About: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Header & Overview */}
      <SectionHeader
        badge="About the Event"
        title="Department of Electronics and Computer Engineering Presents"
        highlightedText={eventConfig.name}
        subtitle="An intensive 8-hour hardware and embedded systems hackathon challenging students to analyze, build, and adapt real-world electronic solutions."
      />

      {/* 2. Department & Event Background */}
      <div className="mb-16 p-6 sm:p-10 rounded-3xl bg-dark-900 border border-slate-800 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-dark-950 text-cyan-300 border border-slate-800">
              <Building className="w-3.5 h-3.5 text-cyan-400" />
              <span>{eventConfig.college}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Think • Build • Innovate
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {eventConfig.name} is an 8-hour hackathon organized by the <strong>{eventConfig.department}</strong> at <strong>{eventConfig.college}</strong>. It brings together forward-thinking student engineers to tackle real-world challenges through embedded systems, electronics, IoT architectures, and rapid hardware prototyping.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              The event departs from standard software-only hackathons by placing emphasis on sense-compute-actuate loops, sensor log inspection, block diagram analysis, and theoretical reconfiguration under strict component and budget constraints.
            </p>
          </div>

          <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-dark-950 border border-slate-800 space-y-4 font-mono text-xs">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Event Type</span>
              <p className="text-sm font-bold text-white mt-0.5">{eventConfig.eventType}</p>
              <p className="text-slate-400">{eventConfig.time}</p>
            </div>
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Date & Venue</span>
              <p className="text-sm font-bold text-white mt-0.5">{eventConfig.date}</p>
              <p className="text-slate-400">{eventConfig.venue}, Salem</p>
            </div>
            <div className="border-b border-slate-800 pb-3">
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

      {/* 3. The Three Rounds Breakdown */}
      <div className="mb-16">
        <SectionHeader
          badge="Gauntlet Architecture"
          title="Three Progressive"
          highlightedText="Challenge Rounds"
          subtitle="A systematic journey from reverse engineering to physical fabrication and theoretical adaptation."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challengeRounds.map((round) => (
            <div
              key={round.number}
              className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 font-mono">
                  <span className="text-2xl font-black text-white">{round.number}</span>
                  <span className="text-xs uppercase text-cyan-400 font-bold tracking-wider">STAGE {round.number}</span>
                </div>

                <h4 className="text-xl font-black text-white mb-3">{round.name}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{round.description}</p>

                {round.importantNote && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 mb-4 font-mono">
                    <strong className="text-amber-300 block mb-0.5">Important:</strong>
                    {round.importantNote}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block mb-1">Flow</span>
                <span className="text-xs font-mono font-bold text-cyan-300">{round.flowString}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Leadership & Coordinators */}
      <div className="mb-16 p-8 rounded-3xl bg-dark-900 border border-slate-800">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-electric-cyan" />
          Event Coordinators
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                Faculty Coordinator
              </span>
              <p className="text-base font-bold text-white">Ms.O.Vivedhini</p>
              <p className="text-slate-400 text-xs mt-1">{eventConfig.department}</p>
            </div>
            <a
              href="tel:+919944322900"
              aria-label="Call Faculty Coordinator Ms.O.Vivedhini"
              className="mt-3 pt-3 border-t border-slate-800/80 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 99443 22900</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                Student Coordinator
              </span>
              <p className="text-base font-bold text-white">Surya A</p>
              <p className="text-slate-400 text-xs mt-1">{eventConfig.department}</p>
            </div>
            <a
              href="tel:+918610104355"
              aria-label="Call Student Coordinator Surya A"
              className="mt-3 pt-3 border-t border-slate-800/80 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 861010 4355</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                Student Coordinator
              </span>
              <p className="text-base font-bold text-white">Santhoshini S</p>
              <p className="text-slate-400 text-xs mt-1">{eventConfig.department}</p>
            </div>
            <a
              href="tel:+916383785532"
              aria-label="Call Student Coordinator Santhoshini S"
              className="mt-3 pt-3 border-t border-slate-800/80 inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 63837 85532</span>
            </a>
          </div>
        </div>
      </div>

      {/* Action banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-dark-900 border border-slate-800 text-center flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Ready to Compete at EDGECRAFT 2026?
        </h3>
        <p className="text-sm text-slate-400 mb-4 max-w-md">
          Review the three-round progression, prepare your engineering platform, and submit your registration before October 20, 2026.
        </p>
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-950 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <span className="font-bold">Team Registration Fee: ₹250</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">One payment per team</span>
        </div>
        <button
          type="button"
          onClick={openRegistration}
          className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Register Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
