import React from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const EventStats: React.FC = () => {
  const cards = [
    {
      label: "DATE",
      value: eventConfig.date,
      subtext: "Registration Portal Open",
      icon: Calendar,
      color: "text-blue-400",
      bgGlow: "group-hover:border-blue-500/50",
    },
    {
      label: "VENUE",
      value: eventConfig.venue,
      subtext: "Salem, Tamil Nadu",
      icon: MapPin,
      color: "text-purple-400",
      bgGlow: "group-hover:border-purple-500/50",
    },
    {
      label: "TEAM SIZE",
      value: `${eventConfig.teamSize.min}–${eventConfig.teamSize.max} Members`,
      subtext: "Cross-dept teams allowed",
      icon: Users,
      color: "text-cyan-400",
      bgGlow: "group-hover:border-cyan-500/50",
    },
    {
      label: "REGISTRATION",
      value: "Free Entry",
      subtext: "Zero participation charges",
      icon: Award,
      color: "text-emerald-400",
      bgGlow: "group-hover:border-emerald-500/50",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`group relative p-4 sm:p-5 rounded-xl bg-dark-900/80 border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${card.bgGlow}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  {card.label}
                </span>
                <div className={`p-2 rounded-lg bg-dark-950/80 border border-slate-800 ${card.color}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <div className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight line-clamp-1">
                {card.value}
              </div>
              <p className="mt-1 text-xs text-slate-400 font-medium">
                {card.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
