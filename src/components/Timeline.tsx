import React from 'react';
import { CheckCircle2, Clock, Calendar, ArrowDown } from 'lucide-react';
import { timelineData } from '../data/eventConfig';

export const Timeline: React.FC = () => {
  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Central vertical connecting line */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-8 w-0.5 bg-gradient-to-b from-electric-blue via-electric-purple to-slate-800 md:-translate-x-1/2" />

      <div className="space-y-8 md:space-y-12">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          const isCurrent = item.status === 'current';
          const isCompleted = item.status === 'completed';

          return (
            <div
              key={item.id}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? 'md:flex-row-reverse' : ''
              } group`}
            >
              {/* Timeline center node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 ${
                    isCurrent
                      ? 'bg-blue-600 border-electric-cyan shadow-glow-blue animate-pulse'
                      : isCompleted
                      ? 'bg-emerald-600 border-emerald-400'
                      : 'bg-dark-900 border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : isCurrent ? (
                    <Clock className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '6s' }} />
                  ) : (
                    <span className="text-xs font-bold text-slate-400">{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Content Card (Left or Right on desktop, offset on mobile) */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right text-left'
                }`}
              >
                <div className="p-5 rounded-2xl bg-dark-900/90 border border-slate-800/90 hover:border-blue-500/40 transition-all duration-300 hover:shadow-card-hover group-hover:-translate-y-0.5">
                  <div
                    className={`flex flex-wrap items-center gap-2 mb-2 ${
                      isEven ? 'justify-start' : 'md:justify-end justify-start'
                    }`}
                  >
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-electric-blue/20 text-blue-300 border border-blue-500/30">
                        {item.badge}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-dark-950 px-2 py-0.5 rounded border border-slate-800">
                      <Calendar className="w-3 h-3 text-electric-cyan" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-slate-400 bg-dark-900 border border-slate-800">
          <ArrowDown className="w-3.5 h-3.5 text-blue-400" />
          Specific dates will be populated upon official university notification
        </div>
      </div>
    </div>
  );
};
