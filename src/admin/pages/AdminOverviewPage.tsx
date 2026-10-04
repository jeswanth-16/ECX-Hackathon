import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  UserPlus, 
  ArrowRight, 
  Eye, 
  FileText
} from 'lucide-react';
import { teamRepository } from '../../services/teamRepository';
import type { Team, DashboardMetrics } from '../../types/admin';
import { generateTeamPdf } from '../../utils/pdfGenerator';

export const AdminOverviewPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalTeams: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
  });
  const [recentTeams, setRecentTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      teamRepository.getMetrics(),
      teamRepository.getTeams(),
    ])
      .then(([m, all]) => {
        if (isMounted) {
          setMetrics(m);
          setRecentTeams(all.slice(0, 5));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load dashboard data:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusBadge = (status: Team['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-rose-950/70 border border-rose-500/40 text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-amber-950/70 border border-amber-500/40 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review and manage hackathon teams registered via Google Forms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/teams/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Team</span>
          </Link>
          <Link
            to="/admin/teams"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL TEAMS */}
        <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
              TOTAL TEAMS
            </span>
            <div className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-mono font-black text-white">
            {isLoading ? '...' : metrics.totalTeams}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            {metrics.totalTeams === 1 ? '1 team recorded' : `${metrics.totalTeams} teams recorded`}
          </p>
        </div>

        {/* PENDING */}
        <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
              PENDING
            </span>
            <div className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-mono font-black text-amber-400">
            {isLoading ? '...' : metrics.pendingCount}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            Awaiting administrator review
          </p>
        </div>

        {/* APPROVED */}
        <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              APPROVED
            </span>
            <div className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-mono font-black text-emerald-400">
            {isLoading ? '...' : metrics.approvedCount}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            Confirmed for October 23
          </p>
        </div>

        {/* REJECTED */}
        <div className="p-5 sm:p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400">
              REJECTED
            </span>
            <div className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-4xl font-mono font-black text-rose-400">
            {isLoading ? '...' : metrics.rejectedCount}
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            Duplicates or invalid entries
          </p>
        </div>
      </div>

      {/* Recent Teams Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Teams</h3>
            <p className="text-xs text-slate-400">Latest teams entered into the portal</p>
          </div>
          <Link
            to="/admin/teams"
            className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View All Teams &rarr;
          </Link>
        </div>

        {recentTeams.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
            <p className="text-sm text-slate-400 font-mono">No teams registered yet.</p>
            <Link
              to="/admin/teams/new"
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-dark-950 text-xs font-bold"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add First Team</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                  <th className="pb-3 font-semibold">Team ID</th>
                  <th className="pb-3 font-semibold">Team Name</th>
                  <th className="pb-3 font-semibold">Leader</th>
                  <th className="pb-3 font-semibold">College</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {recentTeams.map((team) => (
                  <tr key={team.teamId} className="hover:bg-dark-950/50 transition-colors">
                    <td className="py-3 font-bold text-cyan-400">{team.teamId}</td>
                    <td className="py-3 font-sans font-semibold text-white">{team.teamName}</td>
                    <td className="py-3 text-slate-300 font-sans">{team.teamLeader?.name || team.teamLeaderName}</td>
                    <td className="py-3 text-slate-400 font-sans truncate max-w-[200px]">{team.college}</td>
                    <td className="py-3">{getStatusBadge(team.status)}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          to={`/admin/teams/${team.teamId}`}
                          className="p-1.5 rounded-lg bg-dark-950 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => generateTeamPdf(team)}
                          className="p-1.5 rounded-lg bg-dark-950 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                          title="Generate PDF"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
