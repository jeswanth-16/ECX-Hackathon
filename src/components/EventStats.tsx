import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const EventStats: React.FC = () => {
  const cards = [
    {
      label: "EVENT DATE",
      value: "October 23, 2026",
      subtext: "Friday",
      icon: Calendar,
      color: "text-blue-400",
      borderAccent: "hover:border-blue-500/50",
    },
    {
      label: "EVENT TIME",
      value: "7:00 AM – 5:00 PM",
      subtext: "8-Hour Hackathon",
      icon: Clock,
      color: "text-cyan-400",
      borderAccent: "hover:border-cyan-500/50",
    },
    {
      label: "VENUE",
      value: eventConfig.venue,
      subtext: "Salem, Tamil Nadu",
      icon: MapPin,
      color: "text-purple-400",
      borderAccent: "hover:border-purple-500/50",
    },
    {
      label: "REGISTRATION DEADLINE",
      value: eventConfig.registrationDeadline,
      subtext: "Registration Closes",
      icon: AlertCircle,
      color: "text-amber-400",
      borderAccent: "hover:border-amber-500/50",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`group relative p-5 rounded-2xl bg-dark-900/90 border border-slate-800 transition-all duration-300 hover:-translate-y-1 shadow-card ${card.borderAccent}`}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {card.label}
                </span>
                <div className={`p-2 rounded-lg bg-dark-950 border border-slate-800 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
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
