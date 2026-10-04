import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Building, 
  Users, 
  User, 
  Calendar,
  FileText
} from 'lucide-react';
import { teamRepository } from '../../services/teamRepository';
import type { TeamMember, TeamStatus } from '../../types/admin';

export const TeamFormPage: React.FC = () => {
  const { teamId: paramTeamId } = useParams<{ teamId?: string }>();
  const isEditing = Boolean(paramTeamId);
  const navigate = useNavigate();

  // Form State
  const [teamId, setTeamId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [domain, setDomain] = useState('');
  const [problemStatement, setProblemStatement] = useState('');

  // Team Leader
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');

  // College Info
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('3rd Year');

  // Status & Registration
  const [status, setStatus] = useState<TeamStatus>('pending');
  const [registrationDate, setRegistrationDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  // Dynamic Team Members
  const [members, setMembers] = useState<TeamMember[]>([]);

  // UI State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditing);

  useEffect(() => {
    let isMounted = true;
    if (isEditing && paramTeamId) {
      teamRepository.getTeam(paramTeamId)
        .then((team) => {
          if (!isMounted) return;
          if (!team) {
            alert(`Team with ID "${paramTeamId}" was not found.`);
            navigate('/admin/teams');
            return;
          }

          setTeamId(team.teamId);
          setTeamName(team.teamName);
          setDomain(team.domain || '');
          setProblemStatement(team.problemStatement || '');
          setTeamLeaderName(team.teamLeaderName || team.teamLeader?.name || '');
          setLeaderEmail(team.leaderEmail || team.teamLeader?.email || '');
          setLeaderPhone(team.leaderPhone || team.teamLeader?.phone || '');
          setCollege(team.college);
          setDepartment(team.department);
          setYear(team.year);
          setStatus(team.status);
          setRegistrationDate(team.registrationDate);
          setNotes(team.notes || '');
          setMembers(team.members || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load team:', err);
          if (isMounted) {
            setIsLoading(false);
          }
        });
    } else if (!isEditing) {
      teamRepository.getNextTeamId()
        .then((nextId) => {
          if (isMounted && nextId) {
            setTeamId(nextId);
          }
        })
        .catch((err) => {
          console.error('Failed to prefetch next team ID:', err);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [isEditing, paramTeamId, navigate]);

  // Member row management
  const addMemberRow = () => {
    setMembers((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: '',
        email: '',
        phone: '',
        college: college || '',
        department: department || '',
        year: year || '3rd Year',
      },
    ]);
  };

  const removeMemberRow = (idx: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateMemberRow = (idx: number, field: keyof TeamMember, value: string) => {
    setMembers((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );
  };

  // Form Validation
  const validateForm = async (): Promise<boolean> => {
    const errs: { [key: string]: string } = {};

    if (!teamId.trim()) {
      errs.teamId = 'Team ID is required (e.g. EDGE-101).';
    } else if (!isEditing) {
      const isUnique = await teamRepository.isTeamIdUnique(teamId);
      if (!isUnique) {
        errs.teamId = `Team ID "${teamId.trim().toUpperCase()}" is already in use. Please specify a unique ID.`;
      }
    }

    if (!teamName.trim()) {
      errs.teamName = 'Team Name is required.';
    }

    if (!teamLeaderName.trim()) {
      errs.teamLeaderName = 'Team Leader Name is required.';
    }

    if (!leaderEmail.trim()) {
      errs.leaderEmail = 'Leader Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leaderEmail.trim())) {
      errs.leaderEmail = 'Please provide a valid email address.';
    }

    if (!leaderPhone.trim()) {
      errs.leaderPhone = 'Leader Phone is required.';
    }

    if (!college.trim()) {
      errs.college = 'College Name is required.';
    }

    if (!department.trim()) {
      errs.department = 'Department is required.';
    }

    if (!year.trim()) {
      errs.year = 'Year of study is required.';
    }

    if (!registrationDate.trim()) {
      errs.registrationDate = 'Registration Date is required.';
    }

    // Validate members if any row has partial details
    members.forEach((m, idx) => {
      if (m.name.trim() && m.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) {
        errs[`member_${idx}_email`] = `Member ${idx + 1} has an invalid email format.`;
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanMembers = members
        .filter((m) => m.name.trim() !== '')
        .map((m) => ({
          ...m,
          name: m.name.trim(),
          email: m.email.trim().toLowerCase(),
          phone: m.phone.trim(),
          college: m.college?.trim(),
          department: m.department?.trim(),
          year: m.year?.trim(),
        }));

      const leaderPayload = {
        name: teamLeaderName.trim(),
        email: leaderEmail.trim().toLowerCase(),
        phone: leaderPhone.trim(),
      };

      if (isEditing && paramTeamId) {
        await teamRepository.updateTeam(paramTeamId, {
          teamName: teamName.trim(),
          teamLeader: leaderPayload,
          teamLeaderName: leaderPayload.name,
          leaderEmail: leaderPayload.email,
          leaderPhone: leaderPayload.phone,
          college: college.trim(),
          department: department.trim(),
          year: year.trim(),
          status,
          registrationDate,
          domain: domain || undefined,
          problemStatement: problemStatement || undefined,
          notes: notes || undefined,
          members: cleanMembers,
        });
        navigate(`/admin/teams/${paramTeamId}`);
      } else {
        const created = await teamRepository.createTeam({
          teamId,
          teamName: teamName.trim(),
          teamLeader: leaderPayload,
          teamLeaderName: leaderPayload.name,
          leaderEmail: leaderPayload.email,
          leaderPhone: leaderPayload.phone,
          college: college.trim(),
          department: department.trim(),
          year: year.trim(),
          status,
          registrationDate,
          domain: domain || undefined,
          problemStatement: problemStatement || undefined,
          notes: notes || undefined,
          members: cleanMembers,
        });
        navigate(`/admin/teams/${created.teamId}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save team record.';
      setErrors({ form: msg });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center font-mono text-sm text-slate-400">
        Loading team data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/teams"
            className="p-2 rounded-xl bg-dark-900 hover:bg-dark-850 text-slate-300 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {isEditing ? `Edit Team — ${teamId}` : 'Add New Team'}
            </h2>
            <p className="text-xs text-slate-400">
              Enter verified team parameters from Google Form responses
            </p>
          </div>
        </div>
      </div>

      {/* Global Form Error Banner */}
      {errors.form && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. TEAM INFORMATION */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            <FileText className="w-4 h-4" />
            <span>1. Team Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono uppercase font-semibold text-slate-300">
                  Team ID <span className="text-rose-400">*</span>
                </label>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const next = await teamRepository.getNextTeamId();
                        setTeamId(next);
                      } catch (err) {
                        console.error('Failed to generate ID:', err);
                      }
                    }}
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    Auto-Generate ID
                  </button>
                )}
              </div>
              <input
                type="text"
                disabled={isEditing}
                value={teamId}
                onChange={(e) => setTeamId(e.target.value.toUpperCase())}
                placeholder="e.g. EDGC26-001"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                  errors.teamId ? 'border-rose-500' : 'border-slate-800'
                } ${isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
              {errors.teamId && <p className="mt-1 text-xs text-rose-400">{errors.teamId}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Team Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. VoltForge Labs"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                  errors.teamName ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.teamName && <p className="mt-1 text-xs text-rose-400">{errors.teamName}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Domain / Track (Optional)
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. Embedded IoT, Sensing, Robotics"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Problem Statement (Optional)
              </label>
              <input
                type="text"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="Brief project statement"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* 2. TEAM LEADER */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            <User className="w-4 h-4" />
            <span>2. Team Leader</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Leader Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={teamLeaderName}
                onChange={(e) => setTeamLeaderName(e.target.value)}
                placeholder="Full Name"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                  errors.teamLeaderName ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.teamLeaderName && <p className="mt-1 text-xs text-rose-400">{errors.teamLeaderName}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={leaderEmail}
                onChange={(e) => setLeaderEmail(e.target.value)}
                placeholder="leader@college.edu"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                  errors.leaderEmail ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.leaderEmail && <p className="mt-1 text-xs text-rose-400">{errors.leaderEmail}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={leaderPhone}
                onChange={(e) => setLeaderPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border text-sm font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                  errors.leaderPhone ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.leaderPhone && <p className="mt-1 text-xs text-rose-400">{errors.leaderPhone}</p>}
            </div>
          </div>
        </div>

        {/* 3. COLLEGE INFORMATION */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Building className="w-4 h-4" />
            <span>3. College Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                College Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Knowledge Institute of Technology"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                  errors.college ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.college && <p className="mt-1 text-xs text-rose-400">{errors.college}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Department <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Electronics & Computer Engg"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 ${
                  errors.department ? 'border-rose-500' : 'border-slate-800'
                }`}
              />
              {errors.department && <p className="mt-1 text-xs text-rose-400">{errors.department}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Year of Study <span className="text-rose-400">*</span>
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Polytechnic">Polytechnic</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. TEAM MEMBERS */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Users className="w-4 h-4" />
              <span>4. Additional Team Members ({members.length})</span>
            </div>
            <button
              type="button"
              onClick={addMemberRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-950 hover:bg-dark-850 text-cyan-400 hover:text-cyan-300 border border-slate-800 text-xs font-mono transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>

          {members.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-2">
              No additional team members added. Click &quot;Add Member&quot; if the team has more than one member.
            </p>
          ) : (
            <div className="space-y-4">
              {members.map((member, idx) => (
                <div
                  key={member.id}
                  className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-400">
                      Member #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeMemberRow(idx)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-dark-900 transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMemberRow(idx, 'name', e.target.value)}
                        placeholder="Member Name"
                        className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateMemberRow(idx, 'email', e.target.value)}
                        placeholder="Member Email"
                        className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                      {errors[`member_${idx}_email`] && (
                        <p className="mt-1 text-[11px] text-rose-400">{errors[`member_${idx}_email`]}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={member.phone}
                        onChange={(e) => updateMemberRow(idx, 'phone', e.target.value)}
                        placeholder="Member Phone"
                        className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={member.college || ''}
                      onChange={(e) => updateMemberRow(idx, 'college', e.target.value)}
                      placeholder="College (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      value={member.department || ''}
                      onChange={(e) => updateMemberRow(idx, 'department', e.target.value)}
                      placeholder="Department (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="text"
                      value={member.year || ''}
                      onChange={(e) => updateMemberRow(idx, 'year', e.target.value)}
                      placeholder="Year (optional)"
                      className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. STATUS & REGISTRATION INFORMATION */}
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Calendar className="w-4 h-4" />
            <span>5. Status & Registration Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TeamStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Registration Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
              {errors.registrationDate && (
                <p className="mt-1 text-xs text-rose-400">{errors.registrationDate}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase font-semibold text-slate-300 mb-1">
                Administrative Notes (Internal)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes (e.g. reviewed from Google Forms row #12, hardware components confirmed, ID card verified)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Link
            to="/admin/teams"
            className="px-5 py-2.5 rounded-xl bg-dark-950 hover:bg-dark-850 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Team' : 'Save Team'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
