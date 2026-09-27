import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { PrizeCard } from '../components/PrizeCard';
import { prizeData } from '../data/eventConfig';
import { Trophy, Gift, Award, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Prizes: React.FC = () => {
  const mainPrizes = prizeData.filter((p) => p.color !== 'special');
  const specialAwards = prizeData.filter((p) => p.color === 'special');

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Rewards & Recognition"
        title="Hackathon"
        highlightedText="Prizes & Accolades"
        subtitle="Rewarding outstanding engineering craftsmanship, practical innovation, and collaborative teamwork."
      />

      {/* Placeholder Disclaimer Banner */}
      <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 max-w-3xl mx-auto flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
          <strong className="text-white">Prize Pool Placeholder Notice:</strong> All cash prize figures shown below (<span className="font-mono font-bold text-amber-300">₹XX,XXX</span>) are configurable placeholders. Exact prize amounts and sponsor bounty allocations will be officially declared by the ECX organizing committee prior to the hackathon kick-off.
        </div>
      </div>

      {/* Main Podium Prizes (1st, 2nd, 3rd) */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Podium Winners
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Top three overall team rankings across all technical domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {mainPrizes.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
        </div>
      </div>

      {/* Special Category Awards */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            Special Distinction Awards
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Celebrating specific dimensions of diversity, embedded mastery, and emerging talent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {specialAwards.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
        </div>
      </div>

      {/* Non-cash Perks and Certificates */}
      <div className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-slate-800 max-w-4xl mx-auto mb-12">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
          <Gift className="w-5 h-5 text-electric-cyan" />
          For Every Registered Participant & Team
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          {[
            "Official Certificate of Participation with verifiable digital credential ID",
            "Access to free cloud developer credits and AI API sandboxes",
            "Complimentary food, high-speed Wi-Fi, and 24/7 overnight campus facilities",
            "Direct interaction with senior industry technology jury members",
            "Exclusive ECX Hackathon commemorative participant badge and swag kit",
            "Eligibility for project incubation and seed support under KIOT TBI"
          ].map((perk, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-dark-950/70 border border-slate-800/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-slate-300">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-blue via-blue-600 to-electric-purple text-white font-bold text-sm shadow-glow-blue hover:opacity-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Register to Compete</span>
        </Link>
      </div>
    </div>
  );
};
