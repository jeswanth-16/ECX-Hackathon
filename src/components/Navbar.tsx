import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { eventConfig } from '../data/eventConfig';
import { useRegistration } from '../context/useRegistration';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openRegistration } = useRegistration();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Challenge', path: '/#challenge' },
    { name: 'Schedule', path: '/timeline' },
    { name: 'Coordinators', path: '/#coordinators' },
  ];

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.hash === path.replace('/', '');
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-dark-950/90 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo & Department branding */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg py-1"
        >
          {/* Tech Logo Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-dark-900 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-slate-500 transition-colors">
            <Cpu className="w-5 h-5 text-electric-cyan group-hover:scale-105 transition-transform" />
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-slate-200 transition-colors">
              {eventConfig.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 -mt-0.5 truncate max-w-[200px] sm:max-w-none">
              {eventConfig.departmentShort} • {eventConfig.collegeShort}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavClick(link.path, e)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                isActive(link.path)
                  ? 'text-white bg-dark-900 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-dark-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={openRegistration}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-xs font-bold transition-all min-h-[40px] cursor-pointer shadow-sm"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile hamburger button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openRegistration}
            className="px-3 py-1.5 rounded-lg bg-white text-dark-950 text-xs font-bold"
          >
            Register
          </button>
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
        <div className="md:hidden px-4 pt-3 pb-6 bg-dark-950/95 border-b border-slate-800 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  handleNavClick(link.path, e);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between min-h-[44px] ${
                  isActive(link.path)
                    ? 'bg-dark-900 text-white border border-slate-700'
                    : 'text-slate-300 hover:bg-dark-900 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                )}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRegistration();
                }}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-200 text-dark-950 text-sm font-bold flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
