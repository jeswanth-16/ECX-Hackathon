import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { faqData } from '../data/eventConfig';

export const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'General', 'Registration', 'Challenge', 'Coordinators'];

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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. schedule, rounds, registration)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white text-dark-950 shadow-sm'
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
          <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white mb-1">No matching questions found</h4>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or clear category filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-dark-800 text-slate-200 hover:text-white"
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
                className="overflow-hidden rounded-xl border border-slate-800 bg-dark-900/90 transition-colors hover:border-slate-700"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-slate-600"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-slate-100">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 leading-relaxed animate-fadeIn">
                    <p>{item.answer}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-dark-950 px-2 py-0.5 rounded border border-slate-800">
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
      <div className="mt-8 p-4 rounded-xl bg-dark-900 border border-slate-800 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong>Questions regarding EDGECRAFT 2026?</strong> Feel free to connect with Faculty Coordinator <a href="tel:+919944322900" className="text-cyan-400 hover:text-cyan-300 underline font-semibold" aria-label="Call Faculty Coordinator  Ms.O.Vivedhini">Ms.O.Vivedhini (+91 99443 22900)</a> or Student Coordinators <a href="tel:+918610104355" className="text-cyan-400 hover:text-cyan-300 underline font-semibold" aria-label="Call Student Coordinator Surya A">Surya A (+91 861010 4355)</a> and <a href="tel:+916383785532" className="text-cyan-400 hover:text-cyan-300 underline font-semibold" aria-label="Call Student Coordinator Santhoshini S">Santhoshini S (+91 63837 85532)</a> from the Department of Electronics and Computer Engineering.
        </div>
      </div>
    </div>
  );
};
