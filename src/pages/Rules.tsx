import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { rulesData, eventConfig } from '../data/eventConfig';
import { 
  BookOpen, 
  Users, 
  Code2, 
  ShieldCheck, 
  UploadCloud, 
  Award, 
  Info, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Rules: React.FC = () => {
  // Support multiple or single open accordions; let's allow toggling each
  const [openSections, setOpenSections] = useState<{ [id: string]: boolean }>({
    general: true,
    team: true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen = rulesData.reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {});
    setOpenSections(allOpen);
  };

  const collapseAll = () => {
    setOpenSections({});
  };

  const renderIcon = (name: string) => {
    const props = { className: "w-5 h-5 text-electric-cyan" };
    switch (name) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'UploadCloud': return <UploadCloud {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <Info {...props} />;
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Official Regulations"
        title="Rules &"
        highlightedText="Participation Guidelines"
        subtitle="Please review these policies carefully to ensure an equitable, transparent, and rewarding hackathon experience."
      />

      {/* Expand/Collapse All buttons */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
        <span className="text-xs text-slate-400 font-medium">
          {rulesData.length} Rule Categories Configured
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Expand All
          </button>
          <span className="text-slate-700">•</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {rulesData.map((category) => {
          const isOpen = !!openSections[category.id];

          return (
            <div
              key={category.id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-dark-900/90 transition-colors hover:border-slate-700"
            >
              <button
                type="button"
                onClick={() => toggleSection(category.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-electric-blue/40"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    {renderIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {category.title}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      {category.rules.length} guidelines
                    </span>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-dark-950 text-slate-400 border border-slate-800">
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-electric-blue' : ''
                    }`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 animate-fadeIn">
                  <ul className="space-y-3">
                    {category.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Zero Tolerance Callout */}
      <div className="mt-10 p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-rose-300">Integrity & Anti-Plagiarism Policy:</strong> All projects submitted to {eventConfig.name} must be created during the event. Submissions showing unauthorized copied code or pre-built commercial repositories will be evaluated by the technical audit team and may result in immediate disqualification.
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-slate-400 mb-4">
          Ready to adhere to these standards and compete?
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-all"
        >
          <span>Acknowledge & Register Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
