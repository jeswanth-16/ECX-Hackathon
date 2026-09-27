import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Info, Home } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { loginAdmin } from '../services/authService';
import { isFirebaseConfigured } from '../lib/firebase';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isConfigured = isFirebaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide both administrative email and access password.');
      return;
    }

    setIsLoading(true);

    try {
      await loginAdmin(email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Admin login error:', err);
      setError(err?.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevQuickLogin = async () => {
    setEmail('coordinator.ecx@kiot.ac.in');
    setPassword('development-access-key');
    setIsLoading(true);
    setError(null);
    try {
      await loginAdmin('coordinator.ecx@kiot.ac.in', 'development-access-key');
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Dev login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Top subtle glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan" />

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 text-electric-cyan shadow-glow-blue">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
              Department Portal
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Admin Authentication
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {eventConfig.name} • {eventConfig.departmentShort} KIOT
            </p>
          </div>

          {/* Environment Status Notice */}
          {isConfigured ? (
            <div className="mb-6 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 leading-relaxed flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Live Firebase Auth & Admin Allowlist Active</span>
            </div>
          ) : (
            <div className="mb-6 p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Local Demo Mode:</strong> To connect live Firebase, populate <code>.env</code> with your project credentials. Use quick preview below to evaluate all admin dashboard features.
              </div>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email / Handle
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="coordinator.ecx@kiot.ac.in"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-electric-blue transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Access Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-electric-blue transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-opacity flex items-center justify-center gap-2 min-h-[44px]"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-click dev button */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleDevQuickLogin}
              className="w-full py-2.5 rounded-xl bg-dark-950 hover:bg-dark-850 border border-slate-700/80 text-electric-cyan text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>1-Click Dev Preview Sign-In</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
