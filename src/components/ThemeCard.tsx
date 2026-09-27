import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Globe, 
  ShieldAlert, 
  HeartPulse, 
  School, 
  Leaf, 
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ThemeCategory } from '../types';

interface ThemeCardProps {
  theme: ThemeCategory;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Map icon names to Lucide components
  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-electric-cyan" };
    switch (name) {
      case 'BrainCircuit': return <BrainCircuit {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'HeartPulse': return <HeartPulse {...props} />;
      case 'School': return <School {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <>
      <div className="group relative p-6 rounded-2xl bg-dark-900/90 border border-slate-800/90 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
              {renderIcon(theme.iconName)}
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-950/60 border border-blue-500/20 text-blue-300">
              {theme.tag}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {theme.title}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {theme.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors py-1 group/btn"
          >
            <span>Explore Problems</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <Link
            to={`/register?domain=${encodeURIComponent(theme.title)}`}
            className="text-[11px] font-medium text-slate-400 hover:text-white px-2 py-1 rounded bg-dark-950 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            Choose Track
          </Link>
        </div>
      </div>

      {/* Explore Problems Modal */}
      {modalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="explore-problems-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-lg p-6 rounded-2xl bg-dark-900 border border-blue-500/40 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                {renderIcon(theme.iconName)}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">{theme.tag} Track</span>
                <h4 id="explore-problems-title" className="text-lg font-bold text-white">{theme.title}</h4>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-5">
              {theme.description}
            </p>

            <div className="mb-6">
              <h5 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                Sample Problem Statements & Focus Areas:
              </h5>
              <div className="space-y-2.5">
                {theme.sampleProblems.map((prob, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-dark-950/80 border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{prob}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-slate-400 italic">
                * Note: Teams are also encouraged to propose their own novel problem statement within this domain.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/register?domain=${encodeURIComponent(theme.title)}`}
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-semibold text-center hover:opacity-95 transition-opacity"
              >
                Register for this Theme →
              </Link>
              <button
                onClick={() => setModalOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
