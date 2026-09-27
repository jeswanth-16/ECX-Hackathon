import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ThemeCard } from '../components/ThemeCard';
import { eventThemes } from '../data/eventConfig';
import { Search, Sparkles, Filter } from 'lucide-react';

export const Themes: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterButtons = [
    { label: 'All', value: 'All' },
    { label: 'AI & ML', value: 'ai-ml' },
    { label: 'IoT', value: 'iot' },
    { label: 'Web & Mobile', value: 'web-mobile' },
    { label: 'Cybersecurity', value: 'cybersecurity' },
    { label: 'Other', value: 'other' },
  ];

  const filteredThemes = eventThemes.filter((theme) => {
    const matchesFilter =
      activeFilter === 'All' || theme.slug === activeFilter;
    const matchesSearch =
      theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.sampleProblems.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Problem Statements & Tracks"
        title="Hackathon"
        highlightedText="Themes & Domains"
        subtitle="Choose from 8 problem categories or propose your own innovative solution within the Open Track."
      />

      {/* Filter and Search Bar */}
      <div className="mb-10 max-w-4xl mx-auto space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domains or sample problems (e.g. edge AI, sensor, agriculture, security)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setActiveFilter(btn.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 min-h-[38px] ${
                activeFilter === btn.value
                  ? 'bg-gradient-to-r from-electric-blue to-electric-purple text-white shadow-glow-blue'
                  : 'bg-dark-900 text-slate-400 hover:text-white hover:bg-dark-850 border border-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Themes Grid */}
      {filteredThemes.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-dark-900 border border-slate-800 max-w-md mx-auto">
          <Sparkles className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white mb-1">No tracks match your query</h4>
          <p className="text-xs text-slate-400 mb-4">
            Try resetting your search query or selecting &quot;All&quot; categories.
          </p>
          <button
            onClick={() => {
              setActiveFilter('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-dark-800 text-blue-400 hover:text-blue-300 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      )}

      {/* Note about Open Innovation */}
      <div className="mt-14 p-6 rounded-2xl bg-blue-950/30 border border-blue-500/20 max-w-3xl mx-auto text-center">
        <h4 className="text-base font-bold text-white mb-1.5 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-electric-cyan" />
          Have an interdisciplinary or out-of-the-box project?
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          You don&apos;t have to be constrained by predefined problem statements. Select <strong>Open Innovation</strong> during registration and detail your project during submission!
        </p>
      </div>
    </div>
  );
};
