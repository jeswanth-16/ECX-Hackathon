import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { teamRepository } from '../../services/teamRepository';
import type { Team, TeamStatus } from '../../types/admin';
import { ConfirmationModal, type ConfirmationVariant } from '../components/ConfirmationModal';
import { generateTeamPdf } from '../../utils/pdfGenerator';

export const TeamListPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TeamStatus>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Modal confirmation state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    team: Team | null;
    variant: ConfirmationVariant;
    title: string;
    message: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    team: null,
    variant: 'neutral',
    title: '',
    message: '',
    onConfirm: async () => {},
  });

  const loadTeams = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await teamRepository.getTeams();
      setTeams(data);
    } catch (err) {
      console.error('Failed to load teams:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    teamRepository.getTeams()
      .then((data) => {
        if (isMounted) {
          setTeams(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load teams:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Actions with confirmation
  const handleApproveClick = (team: Team) => {
    setModalState({
      isOpen: true,
      team,
      variant: 'approve',
      title: 'Approve Team?',
      message: `Are you sure you want to approve ${team.teamId} (${team.teamName})?`,
      onConfirm: async () => {
        await teamRepository.approveTeam(team.teamId);
        await loadTeams();
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleRejectClick = (team: Team) => {
    setModalState({
      isOpen: true,
      team,
      variant: 'reject',
      title: 'Reject Team?',
      message: `Are you sure you want to reject ${team.teamId} (${team.teamName})?`,
      onConfirm: async () => {
        await teamRepository.rejectTeam(team.teamId);
        await loadTeams();
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDeleteClick = (team: Team) => {
    setModalState({
      isOpen: true,
      team,
      variant: 'delete',
      title: 'Delete Team?',
      message: `Are you sure you want to permanently delete ${team.teamId} (${team.teamName})? This action cannot be undone.`,
      onConfirm: async () => {
        await teamRepository.deleteTeam(team.teamId);
        await loadTeams();
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Filtered and searched teams
  const filteredTeams = teams.filter((team) => {
    const matchesStatus = statusFilter === 'All' || team.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const leaderName = team.teamLeader?.name || team.teamLeaderName || '';
    const matchesSearch =
      !q ||
      team.teamId.toLowerCase().includes(q) ||
      team.teamName.toLowerCase().includes(q) ||
      leaderName.toLowerCase().includes(q) ||
      team.college.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

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
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Registered Teams
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, review, approve, edit, and export official PDF passes.
          </p>
        </div>

        <Link
          to="/admin/teams/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-xs sm:text-sm font-bold transition-all shadow-sm self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Team</span>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Team ID, Team Name, Leader, or College..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            Status:
          </span>
          {(['All', 'pending', 'approved', 'rejected'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-white text-dark-950 font-bold shadow-sm'
                  : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Teams Table */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card">
        {isLoading ? (
          <div className="text-center py-16 text-slate-400 font-mono text-sm">
            Loading team records...
          </div>
        ) : filteredTeams.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">
              No teams registered yet.
            </h4>
            <p className="text-xs text-slate-400 mb-6">
              {searchQuery || statusFilter !== 'All'
                ? 'No teams match your current search query or status filter.'
                : 'Get started by adding a team reviewed from Google Forms.'}
            </p>
            {searchQuery || statusFilter !== 'All' ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                }}
                className="px-4 py-2 rounded-xl bg-dark-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono"
              >
                Clear Filters
              </button>
            ) : (
              <Link
                to="/admin/teams/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-dark-950 text-xs font-bold"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add First Team</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                  <th className="pb-3.5 font-semibold">Team ID</th>
                  <th className="pb-3.5 font-semibold">Team Name</th>
                  <th className="pb-3.5 font-semibold">Leader</th>
                  <th className="pb-3.5 font-semibold">College</th>
                  <th className="pb-3.5 font-semibold">Status</th>
                  <th className="pb-3.5 font-semibold">Registration Date</th>
                  <th className="pb-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {filteredTeams.map((team) => (
                  <tr key={team.teamId} className="hover:bg-dark-950/50 transition-colors">
                    <td className="py-3.5 font-bold text-cyan-400">{team.teamId}</td>
                    <td className="py-3.5 font-sans font-semibold text-white">{team.teamName}</td>
                    <td className="py-3.5 text-slate-300 font-sans">
                      <div>{team.teamLeader?.name || team.teamLeaderName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{team.teamLeader?.email || team.leaderEmail}</div>
                    </td>
                    <td className="py-3.5 text-slate-400 font-sans max-w-[200px] truncate" title={team.college}>
                      {team.college}
                    </td>
                    <td className="py-3.5">{getStatusBadge(team.status)}</td>
                    <td className="py-3.5 text-slate-400">{team.registrationDate}</td>
                    <td className="py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* View */}
                        <Link
                          to={`/admin/teams/${team.teamId}`}
                          className="p-1.5 rounded-lg bg-dark-950 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit */}
                        <Link
                          to={`/admin/teams/${team.teamId}/edit`}
                          className="p-1.5 rounded-lg bg-dark-950 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                          title="Edit Team"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {/* Approve */}
                        {team.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleApproveClick(team)}
                            className="p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                            title="Approve Team"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Reject */}
                        {team.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => handleRejectClick(team)}
                            className="p-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-400 border border-amber-500/30 transition-colors cursor-pointer"
                            title="Reject Team"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Generate PDF */}
                        <button
                          type="button"
                          onClick={() => generateTeamPdf(team)}
                          className="p-1.5 rounded-lg bg-dark-950 hover:bg-dark-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 transition-colors cursor-pointer"
                          title="Generate Official PDF"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(team)}
                          className="p-1.5 rounded-lg bg-dark-950 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer"
                          title="Delete Team"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Confirmation Dialog Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalState.onConfirm}
        title={modalState.title}
        message={modalState.message}
        variant={modalState.variant}
      />
    </div>
  );
};
