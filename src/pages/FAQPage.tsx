import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { FAQ } from '../components/FAQ';
import { Users, ArrowRight } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';

export const FAQPage: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Clarifications & Support"
        title="Frequently Asked"
        highlightedText="Questions"
        subtitle="Answers to common questions regarding schedule, the three-round challenge, and registration."
      />

      {/* Main interactive FAQ component */}
      <FAQ />

      {/* Support Section */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1.5">Need Further Assistance?</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              Connect with Faculty Coordinator <a href="tel:+919944322900" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-slate-700 underline-offset-2" aria-label="Call Faculty Coordinator  Ms.O.Vivedhini">Ms.O.Vivedhini (+91 99443 22900)</a>, or Student Coordinators <a href="tel:+918610104355" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-slate-700 underline-offset-2" aria-label="Call Student Coordinator Surya A">Surya A (+91 861010 4355)</a> and <a href="tel:+916383785532" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-slate-700 underline-offset-2" aria-label="Call Student Coordinator Santhoshini S">Santhoshini S (+91 63837 85532)</a> at {eventConfig.college}.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 font-mono text-xs text-slate-300">
            {eventConfig.department}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <ArrowRight className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1.5">Ready to Compete?</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              Registrations close on {eventConfig.registrationDeadline}. Click below to access the registration portal.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={openRegistration}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>Ms.O.Vivedhini
          </div>
        </div>
      </div>
    </div>
  );
};
