import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Glow icon */}
        <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-6 text-electric-cyan shadow-glow-blue">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
          Error 404 • Page Not Found
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Looks like this route took a wrong turn.
        </h1>

        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The page or resource you are searching for does not exist on the {eventConfig.name} platform. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/register"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span>Team Registration</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
