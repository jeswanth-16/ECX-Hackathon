import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building2, 
  Tag, 
  Lightbulb, 
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { teamRepository } from '../../services/teamRepository';
import type { Team } from '../../types/admin';
import { ConfirmationModal, type ConfirmationVariant } from '../components/ConfirmationModal';
import { generateTeamPdf } from '../../utils/pdfGenerator';

export const TeamDetailPage: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Modal confirmation state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    variant: ConfirmationVariant;
    title: string;
    message: string;
    confirmText?: string;
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    variant: 'neutral',
    title: '',
    message: '',
    onConfirm: async () => {},
  });

  const loadTeam = useCallback(async () => {
    if (!teamId) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const found = await teamRepository.getTeam(teamId);
      if (found) {
        setTeam(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error('Failed to load team details:', err);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    let isMounted = true;
    Promise.resolve()
      .then(() => (teamId ? teamRepository.getTeam(teamId) : null))
      .then((found) => {
        if (!isMounted) return;
        if (found) {
          setTeam(found);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load team details:', err);
        if (isMounted) {
          setNotFound(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [teamId]);

  const handleApprove = () => {
    if (!team) return;
    setModalState({
      isOpen: true,
      variant: 'approve',
      title: 'Approve Team Registration?',
      message: `Are you sure you want to approve "${team.teamName}" (${team.teamId}) for EDGECRAFT 2026?`,
      confirmText: 'Approve Team',
      onConfirm: async () => {
        await teamRepository.approveTeam(team.teamId);
        await loadTeam();
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleReject = () => {
    if (!team) return;
    setModalState({
      isOpen: true,
      variant: 'reject',
      title: 'Reject Team Registration?',
      message: `Are you sure you want to reject "${team.teamName}" (${team.teamId})?`,
      confirmText: 'Reject Team',
      onConfirm: async () => {
        await teamRepository.rejectTeam(team.teamId);
        await loadTeam();
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDelete = () => {
    if (!team) return;
    setModalState({
      isOpen: true,
      variant: 'delete',
      title: 'Permanently Delete Team?',
      message: `WARNING: This action CANNOT be undone. You are about to permanently delete team "${team.teamName}" (${team.teamId}) and all member records from the local database.`,
      confirmText: 'Delete Permanently',
      onConfirm: async () => {
        await teamRepository.deleteTeam(team.teamId);
        setModalState((prev) => ({ ...prev, isOpen: false }));
        navigate('/admin/teams');
      },
    });
  };

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-sm">Loading team details...</p>
      </div>
    );
  }

  if (notFound || !team) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center px-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Team Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">
          The requested team ID <span className="font-mono text-cyan-400">"{teamId}"</span> does not exist in the database or may have been deleted.
        </p>
        <Link
          to="/admin/teams"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Teams List</span>
        </Link>
      </div>
    );
  }

  const getStatusBadge = () => {
    switch (team.status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-4 h-4" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-12">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Link
            to="/admin/teams"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Teams</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {team.teamName}
            </h1>
            <span className="px-2.5 py-1 rounded bg-dark-900 border border-slate-800 text-xs font-mono font-bold text-cyan-400">
              {team.teamId}
            </span>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Submitted: {team.createdAt ? new Date(team.createdAt).toLocaleString(undefined, { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : team.registrationDate}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => generateTeamPdf(team)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-700 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 text-xs font-bold transition-all shadow-sm cursor-pointer"
            title="Generate Official Print-Ready PDF"
          >
            <FileText className="w-4 h-4" />
            <span>Generate PDF</span>
          </button>

          <Link
            to={`/admin/teams/${team.teamId}/edit`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-bold transition-colors shadow-sm"
          >
            <Edit className="w-4 h-4 text-slate-400" />
            <span>Edit</span>
          </Link>

          {team.status !== 'approved' && (
            <button
              type="button"
              onClick={handleApprove}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
          )}

          {team.status !== 'rejected' && (
            <button
              type="button"
              onClick={handleReject}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs font-bold transition-colors cursor-pointer"
            title="Permanently Delete Team"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Leader & Academic Info (1 col) */}
        <div className="space-y-6">
          {/* Leader Card */}
          <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Team Leader Details</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-500">Leader Full Name</label>
                <div className="text-base font-bold text-white">{team.teamLeader?.name || team.teamLeaderName}</div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${team.teamLeader?.email || team.leaderEmail}`} className="hover:text-cyan-400 transition-colors font-mono truncate">
                    {team.teamLeader?.email || team.leaderEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`tel:${team.teamLeader?.phone || team.leaderPhone}`} className="hover:text-cyan-400 transition-colors font-mono">
                    {team.teamLeader?.phone || team.leaderPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Info Card */}
          <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>College & Academic Info</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-500">Institution / College</label>
                <div className="text-sm font-semibold text-white flex items-start gap-2 mt-0.5">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{team.college}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-500">Department</label>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">{team.department}</div>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-500">Year of Study</label>
                  <div className="text-xs font-medium text-slate-200 mt-0.5">{team.year}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Administrative Metadata */}
          <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Audit Information</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Team Code:</span>
                <span className="text-cyan-400 font-bold">{team.teamId}</span>
              </div>
              <div className="flex justify-between">
                <span>Registered:</span>
                <span className="text-slate-200">{team.registrationDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="text-slate-200">
                  {team.updatedAt ? new Date(team.updatedAt).toLocaleDateString() : 'Initial Entry'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Problem Statement & Team Members (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project / Track Info */}
          <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Project & Innovation Domain</span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  {team.domain}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-3">Problem Statement</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed bg-dark-950/60 p-4 rounded-xl border border-slate-800/80 whitespace-pre-line">
                {team.problemStatement}
              </p>
            </div>
          </div>

          {/* Additional Team Members */}
          <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>Team Members ({team.members.length + 1} Total)</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                1 Leader + {team.members.length} Member{team.members.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="space-y-3">
              {/* Leader Row */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">
                    L
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{team.teamLeader?.name || team.teamLeaderName}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                        Leader
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1">
                      <span>{team.teamLeader?.email || team.leaderEmail}</span>
                      <span>•</span>
                      <span>{team.teamLeader?.phone || team.leaderPhone}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 text-left sm:text-right font-mono">
                  {team.college}
                </div>
              </div>

              {/* Other Members */}
              {team.members.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 text-center">
                  No additional team members added. (Individual participant / 1-person team)
                </p>
              ) : (
                team.members.map((member, idx) => (
                  <div 
                    key={member.id || idx}
                    className="p-4 rounded-xl bg-dark-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{member.name}</div>
                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1">
                          <span>{member.email}</span>
                          <span>•</span>
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </div>
                    {(member.college || member.department || member.year) && (
                      <div className="text-xs text-slate-400 text-left sm:text-right font-mono">
                        <div>{member.college || team.college}</div>
                        {(member.department || member.year) && (
                          <div className="text-[11px] text-slate-500">
                            {[member.department, member.year].filter(Boolean).join(' • ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Admin Notes Section */}
          <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Administrative Notes</span>
              </div>
              <Link
                to={`/admin/teams/${team.teamId}/edit`}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit Notes</span>
              </Link>
            </div>
            
            {team.notes ? (
              <div className="p-4 rounded-xl bg-dark-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                {team.notes}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                No administrative notes recorded for this team yet. Click "Edit" or "Edit Notes" to add review notes, evaluator feedback, or verification remarks.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalState.onConfirm}
        variant={modalState.variant}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
      />
    </div>
  );
};
