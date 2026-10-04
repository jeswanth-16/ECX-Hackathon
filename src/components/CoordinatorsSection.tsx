import React from 'react';
import { eventConfig } from '../data/eventConfig';
import { SectionHeader } from './SectionHeader';
import { UserCheck, Users, Building, Phone } from 'lucide-react';

export const CoordinatorsSection: React.FC = () => {
  const { faculty, students } = eventConfig.coordinators;

  return (
    <section id="coordinators" className="py-14 md:py-24 relative bg-dark-900/40 scroll-mt-20 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Event Leadership & Inquiries"
          title="Contact"
          highlightedText="Coordinators"
          subtitle={`Reach out to the official faculty and student coordinators for queries, team assistance, and event support.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
          {/* Faculty Coordinator - Desktop Col 5 */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Faculty Coordinator
              </h3>
            </div>

            {faculty.map((coord, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-card flex-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric-cyan font-bold">
                      {coord.role}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-electric-cyan">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {coord.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {eventConfig.department}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {eventConfig.college}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span>KIOT Campus, Salem</span>
                  </div>

                  {coord.phone && (
                    <a
                      href={coord.phoneTel || `tel:${coord.phone.replace(/\s+/g, '')}`}
                      aria-label={`Call Faculty Coordinator ${coord.name}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-dark-850 text-white font-mono text-xs sm:text-sm transition-all group min-h-[44px]"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {coord.phone}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Student Coordinators - Desktop Col 7 */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Student Coordinators
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {students.map((coord, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                        {coord.role}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-300">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {coord.name}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {eventConfig.department}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {eventConfig.college}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80">
                    {coord.phone && (
                      <a
                        href={coord.phoneTel || `tel:${coord.phone.replace(/\s+/g, '')}`}
                        aria-label={`Call Student Coordinator ${coord.name}`}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-dark-850 text-white font-mono text-xs sm:text-sm transition-all group min-h-[44px]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {coord.phone}
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
