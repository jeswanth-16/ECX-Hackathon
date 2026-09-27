import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, BookOpen, Layers, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { SectionHeader } from '../components/SectionHeader';
import { ThemeCard } from '../components/ThemeCard';
import { PrizeCard } from '../components/PrizeCard';
import { Timeline } from '../components/Timeline';
import { FAQ } from '../components/FAQ';
import { eventThemes, prizeData, eventConfig } from '../data/eventConfig';

export const Home: React.FC = () => {
  // Show first 4 themes for homepage teaser
  const featuredThemes = eventThemes.slice(0, 4);
  const featuredPrizes = prizeData.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Value Section */}
      <ValueProps />

      {/* 3. Problem Domains / Themes Teaser */}
      <section className="py-14 md:py-20 relative bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Innovation Tracks"
            title="Focus"
            highlightedText="Problem Domains"
            subtitle="Explore high-impact domains spanning hardware, artificial intelligence, security, and cloud systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredThemes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/themes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-900 hover:bg-dark-850 text-blue-400 hover:text-blue-300 font-semibold text-sm border border-slate-800 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>View All {eventThemes.length} Tracks & Sample Problems</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Prizes & Rewards Teaser */}
      <section className="py-14 md:py-20 relative bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Recognition & Rewards"
            title="Celebrate"
            highlightedText="Excellence & Innovation"
            subtitle="Win coveted trophies, cash awards, developer hardware kits, and incubation certificates."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredPrizes.map((prize) => (
              <PrizeCard key={prize.id} prize={prize} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/prizes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-900 hover:bg-dark-850 text-amber-400 hover:text-amber-300 font-semibold text-sm border border-slate-800 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>Explore Special Category Awards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Timeline Preview */}
      <section className="py-14 md:py-20 relative bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Roadmap"
            title="Hackathon"
            highlightedText="Journey & Schedule"
            subtitle="From initial online registration to final code freeze, live pitching, and awards ceremony."
          />

          <Timeline />
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-14 md:py-20 relative bg-dark-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Answers & Support"
            title="Frequently Asked"
            highlightedText="Questions"
            subtitle="Everything you need to know about team eligibility, hardware requirements, and rules."
          />

          <FAQ />
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-14 md:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-blue-950/80 via-dark-900 to-purple-950/80 border border-blue-500/30 text-center shadow-2xl">
            {/* Subtle glow nodes */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-electric-purple/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-electric-cyan bg-blue-950/60 border border-blue-500/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Registrations Open
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Build the Next Big Innovation?
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Assemble your team of {eventConfig.teamSize.min}–{eventConfig.teamSize.max} engineers, pick your track, and take the stage at KIOT Campus. Free entry with immediate digital pass confirmation.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-blue via-blue-600 to-electric-purple text-white font-bold text-sm sm:text-base shadow-glow-blue hover:opacity-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <span>Register Team Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/rules"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-950 hover:bg-dark-900 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <BookOpen className="w-4 h-4 text-electric-cyan" />
                  <span>Review Guidelines</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
