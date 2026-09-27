import React from 'react';
import { Trophy, Award, CheckCircle2, Sparkles } from 'lucide-react';
import type { PrizeItem } from '../types';

interface PrizeCardProps {
  prize: PrizeItem;
}

export const PrizeCard: React.FC<PrizeCardProps> = ({ prize }) => {
  const getColorStyles = () => {
    switch (prize.color) {
      case 'gold':
        return {
          border: 'border-amber-500/40 hover:border-amber-400',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          glow: 'shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)]',
          iconColor: 'text-amber-400',
          gradientTitle: 'text-amber-200',
        };
      case 'silver':
        return {
          border: 'border-slate-400/40 hover:border-slate-300',
          badgeBg: 'bg-slate-400/20 text-slate-200 border-slate-400/30',
          glow: 'shadow-[0_0_25px_-5px_rgba(148,163,184,0.2)]',
          iconColor: 'text-slate-300',
          gradientTitle: 'text-slate-200',
        };
      case 'bronze':
        return {
          border: 'border-orange-500/40 hover:border-orange-400',
          badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
          glow: 'shadow-[0_0_25px_-5px_rgba(249,115,22,0.2)]',
          iconColor: 'text-orange-400',
          gradientTitle: 'text-orange-200',
        };
      default:
        return {
          border: 'border-purple-500/30 hover:border-purple-400',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          glow: 'shadow-[0_0_25px_-5px_rgba(168,85,247,0.2)]',
          iconColor: 'text-purple-400',
          gradientTitle: 'text-purple-200',
        };
    }
  };

  const styles = getColorStyles();

  return (
    <div
      className={`relative p-6 sm:p-7 rounded-2xl bg-dark-900/90 border ${styles.border} ${
        prize.isPopular ? styles.glow : ''
      } transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
    >
      {prize.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          Grand Winner
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${styles.badgeBg}`}
          >
            {prize.rank}
          </span>
          <div className={`p-2.5 rounded-xl bg-dark-950 border border-slate-800 ${styles.iconColor}`}>
            {prize.color === 'special' ? (
              <Award className="w-6 h-6" />
            ) : (
              <Trophy className="w-6 h-6" />
            )}
          </div>
        </div>

        <h3 className={`text-xl sm:text-2xl font-black mb-2 ${styles.gradientTitle}`}>
          {prize.title}
        </h3>

        {/* Amount with clear configurable placeholder label */}
        <div className="my-4 p-3 rounded-xl bg-dark-950/90 border border-slate-800/80 text-center">
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
            {prize.amountPlaceholder}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1 font-medium">
            (Configurable Placeholder Amount)
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
          {prize.description}
        </p>

        <div className="space-y-2.5 pt-4 border-t border-slate-800/70">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Prizes & Perks Include:
          </span>
          {prize.perks.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/70 text-center">
        <span className="text-[11px] text-slate-400 font-medium">
          Official prize pool announced by organizers
        </span>
      </div>
    </div>
  );
};
