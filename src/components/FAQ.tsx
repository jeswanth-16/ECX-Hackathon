import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { faqData } from '../data/eventConfig';

export const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const categories = ['All', 'General', 'Team & Registration', 'Technical', 'Prizes & Logistics'];

  const filteredFAQs = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search and Category Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. registration fee, team size, hardware)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-dark-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-electric-blue text-white shadow-glow-blue'
                  : 'bg-dark-900 text-slate-400 hover:text-white hover:bg-dark-850 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      {filteredFAQs.length === 0 ? (
        <div className="text-center py-12 p-8 rounded-2xl bg-dark-900 border border-slate-800">
          <HelpCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white mb-1">No matching questions found</h4>
          <p className="text-sm text-slate-400">
            Try adjusting your search query or clear category filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-dark-800 text-blue-400 hover:text-blue-300"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFAQs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-800/90 bg-dark-900/80 transition-colors hover:border-slate-700"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-electric-blue/40"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-slate-100">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-electric-blue' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed animate-fadeIn">
                    <p>{item.answer}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 bg-dark-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Organizer note */}
      <div className="mt-8 p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong>Need further clarification?</strong> If your question is not listed here, feel free to contact the ECX Hackathon coordinators via the contact details provided in the footer.
        </div>
      </div>
    </div>
  );
};
