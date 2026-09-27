import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  XCircle, 
  Edit3, 
  FolderGit2, 
  Save, 
  X,
  CheckCircle2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { DigitalPass } from '../components/DigitalPass';
import type { Registration, RegistrationStatus } from '../types';
import { 
  getRegistrationById as fetchRegistrationById, 
  updateRegistrationIdea 
} from '../services/registrationService';
import { 
  getParticipantRegistrationId, 
  getParticipantRegistration 
} from '../utils/storage';
import { eventConfig } from '../data/eventConfig';

export const MyTeam: React.FC = () => {
  const [team, setTeam] = useState<Registration | null>(() => getParticipantRegistration());
  const [isLoading, setIsLoading] = useState(() => {
    return Boolean(getParticipantRegistrationId());
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit fields
  const [editIdeaTitle, setEditIdeaTitle] = useState('');
  const [editIdeaDesc, setEditIdeaDesc] = useState('');

  // Synchronize participant's own registration from backend/storage on mount
  useEffect(() => {
    const participantId = getParticipantRegistrationId();
    if (!participantId) return;

    let isSubscribed = true;
    fetchRegistrationById(participantId)
      .then((updated) => {
        if (isSubscribed && updated) {
          setTeam(updated);
        }
      })
      .catch((err) => {
        console.error('Failed to sync participant registration:', err);
      })
      .finally(() => {
        if (isSubscribed) {
          setIsLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleOpenEdit = () => {
    if (!team) return;
    setEditIdeaTitle(team.ideaTitle);
    setEditIdeaDesc(team.ideaDescription);
    setSaveSuccess(false);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    setIsSaving(true);
    try {
      await updateRegistrationIdea(team.id, editIdeaTitle.trim(), editIdeaDesc.trim());
      setTeam((prev) =>
        prev
          ? {
              ...prev,
              ideaTitle: editIdeaTitle.trim(),
              ideaDescription: editIdeaDesc.trim(),
            }
          : null
      );
      setSaveSuccess(true);
      setTimeout(() => {
        setEditModalOpen(false);
        setSaveSuccess(false);
        setIsSaving(false);
      }, 700);
    } catch (err) {
      console.error('Save idea error:', err);
      setIsSaving(false);
    }
  };

  const renderStatusBadge = (status: RegistrationStatus) => {
    const s = (status || 'pending').toLowerCase();
    switch (s) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Confirmed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Participant Portal"
        title="My Team"
        highlightedText="Digital Pass"
        subtitle="Review your registered team status, member roster, and access your Official Digital Event Pass."
      />

      {/* If Team Found */}
      {team ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Quick Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {team.teamName}
                  </h2>
                  {renderStatusBadge(team.status)}
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-400 mt-1">
                  <span className="font-mono text-electric-cyan font-bold">{team.id}</span>
                  <span className="text-slate-600">•</span>
                  <span>{team.collegeName}</span>
                  <span className="text-slate-600">•</span>
                  <span>Registered: {new Date(team.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {eventConfig.allowTeamEditing && (
                <div className="no-print">
                  <button
                    onClick={handleOpenEdit}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-950 hover:bg-dark-850 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-electric-cyan" />
                    <span>Edit Team Idea</span>
                  </button>
                </div>
              )}
            </div>

            {/* Team Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {/* Leader & College */}
              <div className="p-4 rounded-2xl bg-dark-950/80 border border-slate-800/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  Team Leadership
                </div>
                <div className="text-sm font-bold text-white">{team.leaderName}</div>
                <div className="text-xs text-slate-400 mt-1">{team.email}</div>
                <div className="text-xs text-slate-400">{team.phone}</div>
                <div className="text-xs text-slate-300 mt-2 font-medium">
                  {team.department}, {team.collegeName}
                </div>
              </div>

              {/* Problem Domain & Idea */}
              <div className="p-4 rounded-2xl bg-dark-950/80 border border-slate-800/80 md:col-span-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
                  Problem Track & Submission
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-500/30 mb-2">
                  {team.domain}
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {team.ideaTitle || 'Idea Title Pending'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {team.ideaDescription}
                </p>
              </div>
            </div>

            {/* Members Roster */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Registered Team Members ({team.members.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {team.members.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800/90 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-white">{m.name}</span>
                      {m.isLeader && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-500/30">
                          LEAD
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Reg: {m.regNo || 'N/A'}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{m.email}</div>
                    <div className="text-[11px] text-slate-500">{m.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Digital Event Pass */}
          <div className="pt-4">
            <div className="text-center mb-4 no-print">
              <h3 className="text-lg font-bold text-white">Official Digital Event Pass</h3>
              <p className="text-xs text-slate-400">
                Present this digital credential pass at KIOT Hackathon registration desk
              </p>
            </div>
            <DigitalPass registration={team} />
          </div>
        </div>
      ) : isLoading ? (
        /* Loading skeleton */
        <div className="text-center py-20 p-8 rounded-3xl bg-dark-900 border border-slate-800 max-w-lg mx-auto">
          <div className="w-10 h-10 border-2 border-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-base font-bold text-white mb-1">Loading Digital Event Pass...</h3>
          <p className="text-xs text-slate-400">Retrieving your team credentials</p>
        </div>
      ) : (
        /* Clean Empty State: No active registration on this device */
        <div className="text-center py-16 p-8 rounded-3xl bg-dark-900 border border-slate-800 max-w-lg mx-auto animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 text-electric-cyan">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Active Registration Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
            The Official Digital Event Pass is generated once your team completes registration. If you haven&apos;t registered your team yet, submit your application to receive your pass and unique Registration ID.
          </p>
          <div className="flex justify-center">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-opacity inline-flex items-center gap-2"
            >
              <span>Register Your Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {editModalOpen && team && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-team-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-dark-900 border border-blue-500/40 shadow-2xl">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close edit modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-electric-cyan">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 id="edit-team-modal-title" className="text-lg font-bold text-white">Edit Team Project Info</h3>
                <p className="text-xs text-slate-400">
                  {team.teamName} ({team.id})
                </p>
              </div>
            </div>

            {saveSuccess ? (
              <div className="py-8 text-center text-emerald-400 font-bold text-sm flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8" />
                <span>Changes saved successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Idea Title
                  </label>
                  <input
                    type="text"
                    value={editIdeaTitle}
                    onChange={(e) => setEditIdeaTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-electric-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Brief Idea Description
                  </label>
                  <textarea
                    rows={4}
                    value={editIdeaDesc}
                    onChange={(e) => setEditIdeaDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-electric-blue resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
