import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Building2, 
  FolderGit2, 
  Users, 
  Calendar, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { getPublicTeamVerification } from '../services/registrationService';
import type { PublicTeamVerification as PublicTeamData } from '../types';
import { eventConfig } from '../data/eventConfig';

export const PublicTeamVerificationPage: React.FC = () => {
  const { registrationId } = useParams<{ registrationId: string }>();
  const [data, setData] = useState<PublicTeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVerification() {
      if (!registrationId) {
        setError('No registration ID provided in verification URL.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await getPublicTeamVerification(registrationId);
        if (!result) {
          setError(`No registration record found for ID: ${registrationId}`);
        } else {
          setData(result);
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('Unable to load registration verification. Please check network connection.');
      } finally {
        setLoading(false);
      }
    }

    loadVerification();
  }, [registrationId]);

  const renderStatusBadge = (status: 'pending' | 'confirmed' | 'rejected') => {
    switch (status) {
      case 'confirmed':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Confirmed Participant</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-md">
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Registration Not Accepted</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-md">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Registration Received • Under Review</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[80vh] py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Top University Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-950/60 border border-blue-500/30 text-blue-300 mb-3">
          <ShieldCheck className="w-4 h-4 text-electric-cyan" />
          <span>Public Credential Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {eventConfig.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {eventConfig.department} • {eventConfig.college}
        </p>
      </div>

      {loading ? (
        <div className="p-12 rounded-3xl bg-dark-900 border border-slate-800 text-center">
          <div className="w-10 h-10 border-3 border-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-300 font-medium">Verifying Registration Record...</p>
        </div>
      ) : error || !data ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-rose-500/30 text-center shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 text-rose-400">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Registration Not Verified</h2>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            {error || 'The requested registration ID does not exist or may have been removed.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-dark-950 border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:text-white"
            >
              Return Home
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-electric-blue text-white text-xs sm:text-sm font-semibold hover:opacity-95"
            >
              Register Team
            </Link>
          </div>
        </div>
      ) : (
        /* Verified Record Card */
        <div className="rounded-3xl bg-dark-900 border-2 border-blue-500/30 shadow-2xl overflow-hidden animate-fadeIn">
          {/* Top color accent */}
          <div className="h-2 w-full bg-gradient-to-r from-electric-blue via-electric-purple to-electric-cyan" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                  Verified Registration ID
                </span>
                <span className="font-mono text-2xl font-black text-electric-cyan">
                  {data.registrationId}
                </span>
              </div>
              <div>{renderStatusBadge(data.status)}</div>
            </div>

            <div className="py-6 space-y-5">
              {/* Team Name */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Team Name
                </span>
                <h3 className="text-2xl font-black text-white">{data.teamName}</h3>
              </div>

              {/* Grid of verified public fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Institution / College
                    </span>
                    <span className="text-sm font-semibold text-slate-200 block mt-0.5">
                      {data.collegeName}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80 flex items-start gap-3">
                  <FolderGit2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Problem Domain Track
                    </span>
                    <span className="text-sm font-semibold text-slate-200 block mt-0.5">
                      {data.problemDomain}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80 flex items-start gap-3">
                  <Users className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Confirmed Team Size
                    </span>
                    <span className="text-sm font-semibold text-slate-200 block mt-0.5">
                      {data.teamSize} Registered Members
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Venue & Host
                    </span>
                    <span className="text-sm font-semibold text-slate-200 block mt-0.5">
                      {eventConfig.venue}, Salem
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy notice banner */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Privacy Protected Verification:</strong> This public record verifies the genuine registration status for {eventConfig.name}. To safeguard candidate safety, private phone numbers and personal email addresses are withheld.
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/my-team"
                className="text-xs font-semibold text-electric-cyan hover:text-blue-300 inline-flex items-center gap-1.5"
              >
                <span>Participant Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/"
                className="px-5 py-2.5 rounded-xl bg-dark-950 hover:bg-dark-850 border border-slate-800 text-slate-300 text-xs font-semibold"
              >
                Back to Public Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
