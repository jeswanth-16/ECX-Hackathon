import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Themes', path: '/themes' },
    { name: 'Prizes', path: '/prizes' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Rules', path: '/rules' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-dark-950/85 border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo & University branding */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-electric-blue rounded-lg py-1"
          >
            {/* Tech Logo Icon */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-electric-blue to-electric-purple p-0.5 shadow-glow-blue flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-electric-cyan group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                {eventConfig.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 -mt-0.5 truncate max-w-[190px] sm:max-w-none">
                {eventConfig.departmentShort} • {eventConfig.college}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive(link.path)
                    ? 'text-white bg-blue-600/20 border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-dark-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-3 py-2 rounded-lg text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-dark-900 transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/my-team"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-dark-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-electric-cyan" />
              <span>My Team</span>
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-electric-blue via-blue-600 to-electric-purple text-white text-xs font-bold shadow-glow-blue hover:opacity-95 transition-all min-h-[40px]"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/register"
              className="sm:hidden px-3 py-1.5 rounded-lg bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs font-bold"
            >
              Register
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-dark-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-dark-850 transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 bg-dark-950/95 border-b border-slate-800 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between min-h-[44px] ${
                    isActive(link.path)
                      ? 'bg-blue-600/20 text-white border border-blue-500/30'
                      : 'text-slate-300 hover:bg-dark-900 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive(link.path) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                  )}
                </Link>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-dark-900 hover:text-white transition-colors min-h-[44px]"
              >
                Contact
              </button>

              <div className="pt-3 mt-2 border-t border-slate-800/80 flex flex-col gap-2.5">
                <Link
                  to="/my-team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-dark-900 border border-slate-800 text-white text-sm font-semibold flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Users className="w-4 h-4 text-electric-cyan" />
                  <span>My Team Dashboard</span>
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-sm font-bold flex items-center justify-center gap-2 shadow-glow-blue min-h-[44px]"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Contact Modal */}
      {contactModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-dark-900 border border-blue-500/30 shadow-2xl">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close contact modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-electric-cyan">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  Organizer Helpdesk
                </span>
                <h3 id="contact-modal-title" className="text-lg font-bold text-white">Event Contact Info</h3>
              </div>
            </div>

            <div className="space-y-3.5 my-5 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-dark-950/80 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Department
                </span>
                <p className="text-white font-medium">{eventConfig.department}</p>
                <p className="text-slate-400 text-xs">{eventConfig.college}</p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-dark-950/80 border border-slate-800">
                <Mail className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Official Email
                  </span>
                  <span className="text-slate-200 font-mono text-xs">{eventConfig.contact.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-dark-950/80 border border-slate-800">
                <Phone className="w-4 h-4 text-electric-purple shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Phone / Helpline
                  </span>
                  <span className="text-slate-200 font-mono text-xs">{eventConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-dark-950/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Campus Address
                  </span>
                  <span className="text-slate-300 text-xs leading-relaxed">{eventConfig.venueFull}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setContactModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
