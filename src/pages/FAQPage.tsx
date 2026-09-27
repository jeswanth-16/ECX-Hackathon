import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { FAQ } from '../components/FAQ';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Participant Help Center"
        title="Frequently Asked"
        highlightedText="Questions"
        subtitle="Quick answers to common questions regarding eligibility, registration, team setup, and hackathon rules."
      />

      {/* Main interactive FAQ component */}
      <FAQ />

      {/* Helpdesk Support Section */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-electric-cyan mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1.5">Have a Specific Question?</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              Reach out to our student coordinator team for guidance on team registrations, accommodation requests, or hardware setups.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono text-electric-cyan block">{eventConfig.contact.email}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1.5">Ready to Get Started?</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              Online registration takes under 3 minutes. Assemble your team and register to receive your instant digital verification pass.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80">
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              <span>Go to Registration Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
