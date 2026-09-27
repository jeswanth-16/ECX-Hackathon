import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Home, Users, Printer } from 'lucide-react';
import type { Registration } from '../types';
import { DigitalPass } from '../components/DigitalPass';
import { getLastRegisteredTeam } from '../utils/storage';

export const RegistrationSuccess: React.FC = () => {
  const location = useLocation();

  // Try to get registration from router state, or fallback to last registered team in storage
  const registration: Registration | null =
    (location.state as { registration?: Registration })?.registration ||
    getLastRegisteredTeam();

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1677FF', '#7C3AED', '#00F0FF', '#10B981'],
      });
    } catch (e) {
      console.error('Confetti animation error', e);
    }
  }, []);

  if (!registration) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">No active registration found</h3>
        <p className="text-sm text-slate-400 mb-6">
          Please register your team first or look up your existing team registration ID.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/register"
            className="px-6 py-2.5 rounded-xl bg-electric-blue text-white text-xs sm:text-sm font-semibold"
          >
            Go to Register
          </Link>
          <Link
            to="/my-team"
            className="px-6 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold"
          >
            My Team Lookup
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Success Badge */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
          Registration Successful!
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
          Your team has been registered successfully for ECX Hackathon 2026.
        </p>

        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-dark-900 border border-blue-500/30 text-electric-cyan">
          Registration ID: {registration.id}
        </div>
      </div>

      {/* Digital Event Pass */}
      <div className="my-6">
        <DigitalPass registration={registration} showPrintButton={false} />
      </div>

      {/* Action Buttons: Download Confirmation, View My Team, Back to Home */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Printer className="w-4 h-4" />
          <span>Download Confirmation (PDF)</span>
        </button>

        <Link
          to="/my-team"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Users className="w-4 h-4 text-electric-cyan" />
          <span>View My Team</span>
        </Link>

        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-dark-950 hover:bg-dark-900 border border-slate-800 text-slate-400 hover:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 min-h-[44px]"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};
