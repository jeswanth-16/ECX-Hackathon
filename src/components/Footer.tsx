import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  MapPin, 
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';

export const Footer: React.FC = () => {
  const { openRegistration } = useRegistration();

  return (
    <footer className="relative bg-dark-950 border-t border-slate-800/80 text-slate-400 text-xs sm:text-sm pt-14 pb-24 md:pb-14 no-print">
      {/* Decorative top ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Branding & Organizer */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-700 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-electric-cyan" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {eventConfig.name}
              </span>
            </Link>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
              {eventConfig.description}
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-white">{eventConfig.department}</p>
              <p>{eventConfig.college}</p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              {/* LinkedIn */}
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

              {/* Instagram */}
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

              {/* Twitter / X */}
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
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About EDGECRAFT
                </Link>
              </li>
              <li>
                <a href="/#challenge" className="hover:text-white transition-colors">
                  Three-Round Challenge
                </a>
              </li>
              <li>
                <Link to="/timeline" className="hover:text-white transition-colors">
                  Event Schedule
                </Link>
              </li>
              <li>
                <a href="/#coordinators" className="hover:text-white transition-colors">
                  Coordinators
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openRegistration}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Event Key Details & Coordinators */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Event Details
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">{eventConfig.date}</span>
                  <span className="text-slate-400">Registration Deadline: {eventConfig.registrationDeadline}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{eventConfig.time} ({eventConfig.eventType})</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-tight">
                  {eventConfig.venue}, Salem, Tamil Nadu
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-mono">
                  Coordinators
                </span>
                <span className="text-white block mt-0.5">
                  Faculty: <a href="tel:+916379339310" className="hover:text-cyan-300 transition-colors" aria-label="Call Faculty Coordinator Vividhini O">Vividhini O</a> (+91 63793 39310)
                </span>
                <span className="text-slate-300 block mt-0.5">
                  Students: <a href="tel:+918610104355" className="text-white hover:text-cyan-300 transition-colors" aria-label="Call Student Coordinator Surya A">Surya A</a>, <a href="tel:+916383785532" className="text-white hover:text-cyan-300 transition-colors" aria-label="Call Student Coordinator Sarthoshini S">Sarthoshini S</a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {eventConfig.name} • {eventConfig.department}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Organized by</span>
            <span className="text-slate-200 font-semibold">{eventConfig.collegeShort}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
