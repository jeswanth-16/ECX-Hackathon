import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-dark-950 border-t border-slate-800/80 text-slate-400 text-xs sm:text-sm pt-14 pb-24 md:pb-14 no-print">
      {/* Decorative top ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Branding */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-electric-purple p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-dark-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-electric-cyan" />
                </div>
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {eventConfig.name}
              </span>
            </Link>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
              {eventConfig.department}, {eventConfig.college}. Providing an interdisciplinary launchpad for engineering students to transform bold concepts into working prototypes.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {/* LinkedIn SVG */}
              <a
                href={eventConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href={eventConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* X / Twitter SVG */}
              <a
                href={eventConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* GitHub SVG */}
              <a
                href={eventConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/20 text-blue-300 text-xs">
              <ShieldCheck className="w-4 h-4 text-electric-cyan" />
              <span>Free Student Registration Platform</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Hackathon
                </Link>
              </li>
              <li>
                <Link to="/themes" className="hover:text-white transition-colors">
                  Problem Domains
                </Link>
              </li>
              <li>
                <Link to="/prizes" className="hover:text-white transition-colors">
                  Prizes & Rewards
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-white transition-colors">
                  Event Timeline
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-white transition-colors">
                  Rules & Criteria
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Participants & Admin */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Participants
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <span>Team Registration</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/my-team" className="hover:text-white transition-colors">
                  My Team Dashboard
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-white transition-colors">
                  Code of Conduct
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link
                  to="/admin/login"
                  className="text-slate-500 hover:text-slate-300 transition-colors text-xs flex items-center gap-1"
                >
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Placeholders */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact & Venue
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-300 block">
                  {eventConfig.contact.coordinatorName}
                </span>
                <span className="text-slate-400 block">{eventConfig.departmentShort}, KIOT</span>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{eventConfig.contact.email}</span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{eventConfig.contact.phone}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-tight">
                  {eventConfig.venue}, Salem, Tamil Nadu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {eventConfig.name} • {eventConfig.department}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Organized by</span>
            <span className="text-slate-300 font-semibold">{eventConfig.collegeShort}</span>
            <span>with passion for engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
