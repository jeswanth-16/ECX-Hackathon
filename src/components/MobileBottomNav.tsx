import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Cpu, 
  PlusCircle, 
  Calendar, 
  MoreHorizontal,
  X,
  Info,
  Users,
  HelpCircle
} from 'lucide-react';
import { useRegistration } from '../context/useRegistration';
import { eventConfig } from '../data/eventConfig';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const { openRegistration } = useRegistration();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.hash === path.replace('/', '');
    return location.pathname === path;
  };

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setMoreDrawerOpen(false);
      }
    }
  };

  const moreLinks = [
    { name: 'About EDGECRAFT', path: '/about', icon: Info },
    { name: 'Coordinators', path: '/#coordinators', icon: Users },
    { name: 'Frequently Asked Questions', path: '/faq', icon: HelpCircle },
  ];

  return (
    <>
      {/* Fixed Mobile Bottom Bar */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-dark-950/95 border-t border-slate-800/90 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-colors ${
              isActive('/') && !moreDrawerOpen
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">Home</span>
          </Link>

          {/* Challenge */}
          <a
            href="/#challenge"
            onClick={(e) => handleNavClick('/#challenge', e)}
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-colors ${
              isActive('/#challenge') && !moreDrawerOpen
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">Challenge</span>
          </a>

          {/* Elevated Register Button */}
          <button
            type="button"
            onClick={openRegistration}
            className="flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] group cursor-pointer"
          >
            <div className="w-10 h-10 -mt-5 rounded-full bg-white text-dark-950 shadow-lg flex items-center justify-center group-active:scale-95 transition-transform">
              <PlusCircle className="w-5 h-5 text-dark-950" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-tight mt-0.5">
              Register
            </span>
          </button>

          {/* Schedule */}
          <Link
            to="/timeline"
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-colors ${
              isActive('/timeline') && !moreDrawerOpen
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">Schedule</span>
          </Link>

          {/* More menu drawer trigger */}
          <button
            type="button"
            onClick={() => setMoreDrawerOpen(true)}
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-colors ${
              moreDrawerOpen
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MoreHorizontal className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* More Drawer Sheet */}
      {moreDrawerOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="more-menu-title"
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-dark-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="p-5 pb-8 rounded-t-3xl bg-dark-900 border-t border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 id="more-menu-title" className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Navigation // EDGECRAFT 2026
              </h3>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-dark-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {moreLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={(e) => {
                      handleNavClick(item.path, e);
                      setMoreDrawerOpen(false);
                    }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 min-h-[48px] active:bg-dark-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-electric-cyan shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-center text-[11px] font-mono text-slate-500">
              {eventConfig.name} • {eventConfig.college}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
