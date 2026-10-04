import React, { useState, useEffect } from 'react';
import { Clock, MapPin, AlertCircle } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const targetDateStr = eventConfig.targetCountdownDate;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDateStr) return;

    const targetDate = new Date(targetDateStr).getTime();
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-dark-900/90 border border-slate-800 p-6 md:p-8 shadow-card">
        {/* Subtle ambient light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-3 bg-dark-950 border border-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-electric-cyan" />
            <span>Event Countdown // {eventConfig.date}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white mb-1">
            Hackathon Kick-off In
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Friday, October 23, 2026 • 7:00 AM – 5:00 PM at {eventConfig.venue}
          </p>

          {/* Countdown Grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 my-2 w-full max-w-lg">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-dark-950 border border-slate-800"
              >
                <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="mt-1 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-5 mt-6 border-t border-slate-800/80 w-full">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              Venue: <strong className="text-slate-200">{eventConfig.venue}</strong>
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Registration Closes: <strong className="text-amber-300">{eventConfig.registrationDeadline}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
