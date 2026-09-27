import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  GraduationCap, 
  FolderGit2, 
  PlusCircle, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { eventConfig, eventThemes } from '../data/eventConfig';
import type { TeamMember } from '../types';
import { TeamMemberForm } from './TeamMemberForm';
import { createRegistration } from '../services/registrationService';
import { getRegistrations } from '../utils/storage';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Form State
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderRegNo, setLeaderRegNo] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('');

  // Additional Members (excluding leader who is member 1)
  // Initially 1 additional member so total team size starts at 2 (min limit)
  const [additionalMembers, setAdditionalMembers] = useState<TeamMember[]>([
    {
      id: 'mem-2',
      name: '',
      regNo: '',
      email: '',
      phone: '',
      isLeader: false,
    },
  ]);

  const [domain, setDomain] = useState(() => {
    const domainQuery = searchParams.get('domain');
    if (domainQuery) {
      const match = eventThemes.find(
        (t) => t.title.toLowerCase() === domainQuery.toLowerCase()
      );
      if (match) return match.title;
    }
    return '';
  });
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [agreedToRules, setAgreedToRules] = useState(false);

  // Errors & submission state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [memberErrors, setMemberErrors] = useState<{ [index: number]: { [field: string]: string } }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formBannerError, setFormBannerError] = useState<string | null>(null);

  // Handle adding an additional team member
  const handleAddMember = () => {
    const totalMembers = 1 + additionalMembers.length;
    if (totalMembers >= eventConfig.teamSize.max) {
      return;
    }
    setAdditionalMembers((prev) => [
      ...prev,
      {
        id: `mem-${Date.now()}`,
        name: '',
        regNo: '',
        email: '',
        phone: '',
        isLeader: false,
      },
    ]);
  };

  // Handle removing a member
  const handleRemoveMember = (idxToRemove: number) => {
    const totalMembers = 1 + additionalMembers.length;
    if (totalMembers <= eventConfig.teamSize.min) {
      return;
    }
    setAdditionalMembers((prev) => prev.filter((_, idx) => idx !== idxToRemove));
    // Also clean up any member errors for that index
    setMemberErrors((prev) => {
      const next = { ...prev };
      delete next[idxToRemove];
      return next;
    });
  };

  // Handle member field update
  const handleMemberChange = (idx: number, field: keyof TeamMember, value: string) => {
    setAdditionalMembers((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m))
    );
    // Clear field-specific error
    if (memberErrors[idx] && memberErrors[idx][field]) {
      setMemberErrors((prev) => ({
        ...prev,
        [idx]: {
          ...prev[idx],
          [field]: '',
        },
      }));
    }
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const newMemberErrors: { [index: number]: { [field: string]: string } } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // 1. Team Details
    if (!teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    } else if (teamName.trim().length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters';
    }

    if (!leaderName.trim()) {
      newErrors.leaderName = 'Team leader name is required';
    }

    if (!leaderEmail.trim()) {
      newErrors.leaderEmail = 'Leader email is required';
    } else if (!emailRegex.test(leaderEmail.trim())) {
      newErrors.leaderEmail = 'Please enter a valid email address';
    }

    if (!leaderPhone.trim()) {
      newErrors.leaderPhone = 'Leader phone number is required';
    } else if (!phoneRegex.test(leaderPhone.trim().replace(/\D/g, ''))) {
      newErrors.leaderPhone = 'Please enter a valid 10-digit phone number';
    }

    if (!collegeName.trim()) {
      newErrors.collegeName = 'College name is required';
    }

    if (!department.trim()) {
      newErrors.department = 'Department name is required';
    }

    // 2. Additional Members Validation
    const allEmails = [leaderEmail.trim().toLowerCase()];

    additionalMembers.forEach((mem, index) => {
      const currentMemErrors: { [field: string]: string } = {};

      if (!mem.name.trim()) {
        currentMemErrors.name = 'Member name is required';
      }

      if (!mem.email.trim()) {
        currentMemErrors.email = 'Member email is required';
      } else if (!emailRegex.test(mem.email.trim())) {
        currentMemErrors.email = 'Please enter a valid email';
      } else {
        const lowerEmail = mem.email.trim().toLowerCase();
        if (allEmails.includes(lowerEmail)) {
          currentMemErrors.email = 'Email already used by another team member';
        } else {
          allEmails.push(lowerEmail);
        }
      }

      if (!mem.phone.trim()) {
        currentMemErrors.phone = 'Member phone is required';
      } else if (!phoneRegex.test(mem.phone.trim().replace(/\D/g, ''))) {
        currentMemErrors.phone = 'Please enter a valid 10-digit number';
      }

      if (Object.keys(currentMemErrors).length > 0) {
        newMemberErrors[index] = currentMemErrors;
      }
    });

    // 3. Problem Domain
    if (!domain) {
      newErrors.domain = 'Please select a problem domain';
    }

    // 4. Agreement Check
    if (!agreedToRules) {
      newErrors.agreedToRules = 'You must agree to the hackathon rules and guidelines';
    }

    // 5. Existing Team Name Check
    const existingRegistrations = getRegistrations();
    const duplicateTeam = existingRegistrations.find(
      (r) => r.teamName.toLowerCase() === teamName.trim().toLowerCase()
    );
    if (duplicateTeam) {
      newErrors.teamName = 'A team with this name is already registered. Please choose a unique name.';
    }

    setErrors(newErrors);
    setMemberErrors(newMemberErrors);

    const hasErrors =
      Object.keys(newErrors).length > 0 || Object.keys(newMemberErrors).length > 0;

    if (hasErrors) {
      setFormBannerError('Please complete all required fields and correct the highlighted errors.');
      return false;
    }

    setFormBannerError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setFormBannerError(null);

    try {
      const leaderMember: TeamMember = {
        id: 'mem-1-lead',
        name: leaderName.trim(),
        regNo: leaderRegNo.trim(),
        registrationNumber: leaderRegNo.trim(),
        email: leaderEmail.trim(),
        phone: leaderPhone.trim(),
        isLeader: true,
      };

      const formattedMembers: TeamMember[] = [
        leaderMember,
        ...additionalMembers.map((m, idx) => ({
          ...m,
          id: `mem-${idx + 2}`,
          name: m.name.trim(),
          regNo: m.regNo?.trim() || m.registrationNumber?.trim() || '',
          registrationNumber: m.registrationNumber?.trim() || m.regNo?.trim() || '',
          email: m.email.trim(),
          phone: m.phone.trim(),
        })),
      ];

      const savedRegistration = await createRegistration({
        teamName: teamName.trim(),
        leaderName: leaderName.trim(),
        leaderRegNo: leaderRegNo.trim(),
        email: leaderEmail.trim(),
        phone: leaderPhone.trim(),
        collegeName: collegeName.trim(),
        department: department.trim(),
        members: formattedMembers,
        domain: domain,
        ideaTitle: ideaTitle.trim() || 'To Be Finalized',
        ideaDescription: ideaDescription.trim() || 'Description will be finalized during initial mentor check-in.',
        agreedToRules: true,
      });

      setIsSubmitting(false);
      navigate('/registration-success', { state: { registration: savedRegistration } });
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setIsSubmitting(false);
      const errorMsg = err?.message || 'Failed to submit registration. Please check network connection and try again.';
      setFormBannerError(errorMsg);
      window.scrollTo({ top: 250, behavior: 'smooth' });
    }
  };

  const totalMembersCount = 1 + additionalMembers.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Banner Error if validation fails */}
      {formBannerError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 text-sm flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{formBannerError}</span>
        </div>
      )}

      {/* Free Registration Note */}
      <div className="mb-8 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-electric-cyan shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-300">
          <strong className="text-white">Free Team Registration:</strong> There are no registration or processing fees. Complete all sections below to obtain your instant official Digital Registration Pass.
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* SECTION 1: Team & Leader Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-electric-cyan">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                1. Team & Leader Details
              </h3>
              <p className="text-xs text-slate-400">
                Primary contact details for official communication and verification
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Team Name */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Team Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                  if (errors.teamName) setErrors((prev) => ({ ...prev, teamName: '' }));
                }}
                placeholder="e.g. ByteBenders, NeuroCircuits"
                className={`w-full px-4 py-3 rounded-xl bg-dark-950 border ${
                  errors.teamName ? 'border-rose-500' : 'border-slate-800 focus:border-electric-blue'
                } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
              />
              {errors.teamName && (
                <p className="mt-1 text-xs text-rose-400">{errors.teamName}</p>
              )}
            </div>

            {/* Team Leader Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Team Leader Name (Member 1) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={leaderName}
                  onChange={(e) => {
                    setLeaderName(e.target.value);
                    if (errors.leaderName) setErrors((prev) => ({ ...prev, leaderName: '' }));
                  }}
                  placeholder="Full name as in College ID"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border ${
                    errors.leaderName ? 'border-rose-500' : 'border-slate-800 focus:border-electric-blue'
                  } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
                />
              </div>
              {errors.leaderName && (
                <p className="mt-1 text-xs text-rose-400">{errors.leaderName}</p>
              )}
            </div>

            {/* Leader Reg Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Leader College Roll / Reg No.
              </label>
              <input
                type="text"
                value={leaderRegNo}
                onChange={(e) => setLeaderRegNo(e.target.value)}
                placeholder="e.g. 731622106042"
                className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 focus:border-electric-blue text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors font-mono"
              />
            </div>

            {/* Leader Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Leader Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={leaderEmail}
                  onChange={(e) => {
                    setLeaderEmail(e.target.value);
                    if (errors.leaderEmail) setErrors((prev) => ({ ...prev, leaderEmail: '' }));
                  }}
                  placeholder="name@college.edu or gmail"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border ${
                    errors.leaderEmail ? 'border-rose-500' : 'border-slate-800 focus:border-electric-blue'
                  } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
                />
              </div>
              {errors.leaderEmail && (
                <p className="mt-1 text-xs text-rose-400">{errors.leaderEmail}</p>
              )}
            </div>

            {/* Leader Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Leader Phone Number <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  value={leaderPhone}
                  onChange={(e) => {
                    setLeaderPhone(e.target.value);
                    if (errors.leaderPhone) setErrors((prev) => ({ ...prev, leaderPhone: '' }));
                  }}
                  placeholder="10-digit mobile number"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border ${
                    errors.leaderPhone ? 'border-rose-500' : 'border-slate-800 focus:border-electric-blue'
                  } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
                />
              </div>
              {errors.leaderPhone && (
                <p className="mt-1 text-xs text-rose-400">{errors.leaderPhone}</p>
              )}
            </div>

            {/* College Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                College / Institution Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => {
                    setCollegeName(e.target.value);
                    if (errors.collegeName) setErrors((prev) => ({ ...prev, collegeName: '' }));
                  }}
                  placeholder="e.g. Knowledge Institute of Technology"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border ${
                    errors.collegeName ? 'border-rose-500' : 'border-slate-800 focus:border-electric-blue'
                  } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
                />
              </div>
              {errors.collegeName && (
                <p className="mt-1 text-xs text-rose-400">{errors.collegeName}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Department / Branch <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    if (errors.department) setErrors((prev) => ({ ...prev, department: '' }));
                  }}
                  placeholder="e.g. Electronics and Computer Engineering"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-dark-950 border ${
                    errors.department ? 'border-rose-500' : 'border-slate-800 focus:border-electric-blue'
                  } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
                />
              </div>
              {errors.department && (
                <p className="mt-1 text-xs text-rose-400">{errors.department}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Team Members */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  2. Team Members Roster
                </h3>
                <p className="text-xs text-slate-400">
                  Minimum {eventConfig.teamSize.min} members, maximum {eventConfig.teamSize.max} members. (Current: {totalMembersCount})
                </p>
              </div>
            </div>

            {totalMembersCount < eventConfig.teamSize.max && (
              <button
                type="button"
                onClick={handleAddMember}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors min-h-[44px]"
              >
                <PlusCircle className="w-4 h-4 text-electric-cyan" />
                Add Member
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Member 1 Leader Summary card */}
            <div className="p-4 rounded-xl bg-dark-950/60 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-electric-blue text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Team Leader (Member 1)
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {leaderName || 'To be entered above'}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {leaderEmail || 'Email will mirror Section 1'}
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-500/30">
                Leader
              </span>
            </div>

            {/* Additional Members Forms */}
            {additionalMembers.map((member, idx) => (
              <TeamMemberForm
                key={member.id}
                member={member}
                index={idx + 1}
                onUpdate={(field, val) => handleMemberChange(idx, field, val)}
                onRemove={() => handleRemoveMember(idx)}
                canRemove={totalMembersCount > eventConfig.teamSize.min}
                errors={memberErrors[idx]}
              />
            ))}
          </div>

          {totalMembersCount < eventConfig.teamSize.max && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleAddMember}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-slate-500" />
                Click to add Member {totalMembersCount + 1} of {eventConfig.teamSize.max}
              </button>
            </div>
          )}
        </div>

        {/* SECTION 3: Hackathon Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-electric-cyan">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                3. Hackathon Project Details
              </h3>
              <p className="text-xs text-slate-400">
                Choose your focus domain and give a brief overview of your proposed idea
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Domain Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Problem Domain / Track <span className="text-rose-400">*</span>
              </label>
              <select
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  if (errors.domain) setErrors((prev) => ({ ...prev, domain: '' }));
                }}
                className={`w-full px-4 py-3 rounded-xl bg-dark-950 border ${
                  errors.domain ? 'border-rose-500' : 'border-slate-800 focus:border-electric-blue'
                } text-white text-sm focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
              >
                <option value="" disabled>
                  Select a Problem Domain...
                </option>
                {eventThemes.map((theme) => (
                  <option key={theme.id} value={theme.title}>
                    {theme.title} ({theme.tag})
                  </option>
                ))}
              </select>
              {errors.domain && (
                <p className="mt-1 text-xs text-rose-400">{errors.domain}</p>
              )}
            </div>

            {/* Idea Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Idea Title (Optional / Can be refined later)
              </label>
              <input
                type="text"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                placeholder="e.g. Smart IoT Soil Telemetry using LoRaWAN"
                className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 focus:border-electric-blue text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors"
              />
            </div>

            {/* Idea Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Brief Idea Description (Optional / Approx 2–4 sentences)
              </label>
              <textarea
                rows={3}
                value={ideaDescription}
                onChange={(e) => setIdeaDescription(e.target.value)}
                placeholder="Describe the problem, technologies you plan to use, and expected outcome..."
                className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 focus:border-electric-blue text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Rules Agreement & Submit */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800 shadow-card">
          <div className="flex items-start gap-3.5 mb-6">
            <input
              id="agreement"
              type="checkbox"
              checked={agreedToRules}
              onChange={(e) => {
                setAgreedToRules(e.target.checked);
                if (errors.agreedToRules) setErrors((prev) => ({ ...prev, agreedToRules: '' }));
              }}
              className="w-5 h-5 rounded border-slate-700 bg-dark-950 text-electric-blue focus:ring-electric-blue mt-0.5 cursor-pointer accent-blue-600"
            />
            <label htmlFor="agreement" className="text-xs sm:text-sm text-slate-300 leading-relaxed cursor-pointer select-none">
              I agree to the <span className="text-blue-400 font-semibold">rules, code of conduct, and guidelines</span> of ECX Hackathon 2026. I confirm that all team members are bona-fide college students and all submitted work will be authentic.
            </label>
          </div>
          {errors.agreedToRules && (
            <p className="mb-4 text-xs text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.agreedToRules}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Instant digital confirmation upon submission</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-blue via-blue-600 to-electric-purple text-white text-sm sm:text-base font-bold shadow-glow-blue hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 min-h-[48px]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Pass...
                </>
              ) : (
                <>
                  <span>Register Team</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
