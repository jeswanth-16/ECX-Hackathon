import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Layers, 
  PlusCircle, 
  Users, 
  MoreHorizontal,
  X,
  Trophy,
  Calendar,
  BookOpen,
  HelpCircle,
  Shield,
  Info
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const moreLinks = [
    { name: 'Prizes & Awards', path: '/prizes', icon: Trophy },
    { name: 'Timeline & Schedule', path: '/timeline', icon: Calendar },
    { name: 'Rules & Guidelines', path: '/rules', icon: BookOpen },
    { name: 'Frequently Asked Questions', path: '/faq', icon: HelpCircle },
    { name: 'About ECX Hackathon', path: '/about', icon: Info },
    { name: 'Admin Portal', path: '/admin/login', icon: Shield },
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
                ? 'text-electric-cyan font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">Home</span>
          </Link>

          {/* Themes */}
          <Link
            to="/themes"
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-colors ${
              isActive('/themes') && !moreDrawerOpen
                ? 'text-electric-cyan font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">Themes</span>
          </Link>

          {/* Elevated Register Button */}
          <Link
            to="/register"
            className="flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] group"
          >
            <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-r from-electric-blue to-electric-purple p-0.5 shadow-glow-blue flex items-center justify-center group-active:scale-95 transition-transform">
              <div className="w-full h-full bg-dark-950 rounded-full flex items-center justify-center">
                <PlusCircle className="w-5 h-5 text-electric-cyan" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-white tracking-tight mt-0.5">
              Register
            </span>
          </Link>

          {/* My Team */}
          <Link
            to="/my-team"
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-colors ${
              isActive('/my-team') && !moreDrawerOpen
                ? 'text-electric-cyan font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5 mb-1" />
            <span className="text-[10px] tracking-tight">My Team</span>
          </Link>

          {/* More menu drawer trigger */}
          <button
            onClick={() => setMoreDrawerOpen(true)}
            className={`flex flex-col items-center justify-center flex-1 py-1 min-h-[44px] rounded-xl transition-colors ${
              moreDrawerOpen
                ? 'text-electric-cyan font-semibold'
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
          <div className="p-5 pb-8 rounded-t-3xl bg-dark-900 border-t border-slate-700 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 id="more-menu-title" className="text-sm font-bold uppercase tracking-wider text-white">
                More Navigation
              </h3>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
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
                    onClick={() => setMoreDrawerOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 min-h-[48px] active:bg-dark-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-electric-cyan shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
              ECX Hackathon 2026 • Knowledge Institute of Technology
            </div>
          </div>
        </div>
      )}
    </>
  );
};
