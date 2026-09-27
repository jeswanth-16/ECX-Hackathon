import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Clock } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const targetDateStr = eventConfig.targetCountdownDate;
  const isDateTBA = !targetDateStr || isNaN(new Date(targetDateStr).getTime());

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isTBA, setIsTBA] = useState<boolean>(isDateTBA);
  const [subscribed, setSubscribed] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');

  useEffect(() => {
    if (isDateTBA || !targetDateStr) {
      return;
    }

    const targetDate = new Date(targetDateStr).getTime();
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsTBA(false);
        return;
      }

      setIsTBA(false);
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
  }, [isDateTBA, targetDateStr]);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="relative overflow-hidden rounded-2xl glass-card border border-blue-500/20 p-6 md:p-8 shadow-card">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-purple/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-blue-950/60 border border-blue-500/30 text-blue-400">
            <Clock className="w-3.5 h-3.5 text-electric-cyan" />
            Hackathon Schedule
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Hackathon Starts In
          </h3>

          {isTBA ? (
            /* Requirement: If date is not configured, display "EVENT DATE TO BE ANNOUNCED" instead of fake countdown numbers */
            <div className="my-5 w-full max-w-xl">
              <div className="p-5 md:p-6 rounded-xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-blue-500/30 shadow-inner flex flex-col items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 mb-3 text-electric-cyan">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-blue-200">
                  EVENT DATE TO BE ANNOUNCED
                </div>
                <p className="mt-2 text-sm text-slate-400 max-w-md">
                  Official dates are currently being finalized with the Department of ECX & KIOT Academic Council.
                </p>

                {/* Optional notification signup */}
                <div className="mt-5 w-full max-w-md">
                  {subscribed ? (
                    <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      You will be notified as soon as schedule is finalized!
                    </div>
                  ) : (
                    <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={notifyEmail}
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        placeholder="Enter email to get notified..."
                        className="flex-1 px-3.5 py-2 text-xs md:text-sm rounded-lg bg-dark-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs md:text-sm font-semibold rounded-lg bg-gradient-to-r from-electric-blue to-electric-purple text-white hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm min-h-[40px]"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Live countdown digits when date is active */
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 my-6 w-full max-w-lg">
              {[
                { label: 'Days', value: timeLeft?.days ?? 0 },
                { label: 'Hours', value: timeLeft?.hours ?? 0 },
                { label: 'Minutes', value: timeLeft?.minutes ?? 0 },
                { label: 'Seconds', value: timeLeft?.seconds ?? 0 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-dark-900/90 border border-blue-500/25 shadow-card"
                >
                  <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 pt-2 border-t border-slate-800/80 w-full">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Venue: <strong className="text-slate-200">{eventConfig.venue}</strong>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>
              Registration Status: <strong className="text-electric-cyan">Open Online</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
