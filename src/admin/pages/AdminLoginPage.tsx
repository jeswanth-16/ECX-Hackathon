import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Cpu, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/useAdminAuth';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      const state = location.state as { from?: { pathname?: string } } | null;
      const from = state?.from?.pathname || '/admin/overview';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate('/admin/overview', { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed. Please verify credentials.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090E1A] border border-slate-800 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-dark-950 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-card">
              <Cpu className="w-6 h-6" />
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              EDGECRAFT 2026
            </h1>
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 mt-1">
              ADMIN PORTAL
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Sign in to manage hackathon teams & review form entries
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-400 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kiot.ac.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3.5 px-4 rounded-xl bg-white hover:bg-slate-200 text-dark-950 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Restricted Administrative Access Only</span>
            </div>
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              &larr; Back to EDGECRAFT 2026 Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
