import { User, Mail, Phone, Hash, Trash2 } from 'lucide-react';
import type { TeamMember } from '../types';

interface TeamMemberFormProps {
  member: TeamMember;
  index: number;
  onUpdate: (field: keyof TeamMember, value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  errors?: { [key: string]: string };
}

export const TeamMemberForm: React.FC<TeamMemberFormProps> = ({
  member,
  index,
  onUpdate,
  onRemove,
  canRemove,
  errors = {},
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/90 border border-slate-800 transition-all duration-200 hover:border-slate-700">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-500/20 text-electric-cyan text-xs font-bold flex items-center justify-center border border-blue-500/30">
            {index + 1}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-white">
            Member {index + 1} Details
          </h4>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-900/40"
            title="Remove Member"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={member.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-dark-950 border ${
                errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-electric-blue'
              } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
          )}
        </div>

        {/* College / Registration Number */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            College / Reg Number
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={member.regNo}
              onChange={(e) => onUpdate('regNo', e.target.value)}
              placeholder="e.g. 731622106042"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-dark-950 border border-slate-800 focus:border-electric-blue text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors font-mono"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={member.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              placeholder="e.g. rahul.s@college.edu"
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-dark-950 border ${
                errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-electric-blue'
              } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Phone Number <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="tel"
              value={member.phone}
              onChange={(e) => onUpdate('phone', e.target.value)}
              placeholder="10-digit mobile number"
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-dark-950 border ${
                errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-electric-blue'
              } text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};
