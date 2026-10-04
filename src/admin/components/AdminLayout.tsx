import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useAdminAuth } from '../../context/useAdminAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/admin/overview', icon: LayoutDashboard },
    { name: 'Teams', path: '/admin/teams', icon: Users },
    { name: 'Add Team', path: '/admin/teams/new', icon: UserPlus },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin/overview') {
      return location.pathname === '/admin' || location.pathname === '/admin/overview';
    }
    if (path === '/admin/teams') {
      return location.pathname === '/admin/teams' || (location.pathname.startsWith('/admin/teams/') && location.pathname !== '/admin/teams/new');
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#090E1A]/95 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/admin/overview" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-white group-hover:text-slate-200">
                  EDGECRAFT 2026
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 -mt-0.5">
                  ADMIN PORTAL
                </span>
              </div>
            </Link>
          </div>

          {/* User info & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-dark-900 border border-slate-800 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate max-w-[200px]">{user?.email || 'Administrator'}</span>
            </div>

            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-950 hover:bg-dark-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
              title="View Public Site"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-1 border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-white text-dark-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-dark-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060A12] py-4 text-center text-xs font-mono text-slate-500">
        EDGECRAFT 2026 Admin Portal &bull; Department of Electronics and Computer Engineering &bull; KIOT
      </footer>
    </div>
  );
};
