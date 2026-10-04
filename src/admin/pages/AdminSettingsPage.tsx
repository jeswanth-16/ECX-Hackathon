import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Download, 
  ShieldCheck, 
  CheckCircle, 
  LogOut, 
  Info, 
  ExternalLink, 
  Cpu, 
  Flame 
} from 'lucide-react';
import { teamRepository } from '../../services/teamRepository';
import { useAdminAuth } from '../../context/useAdminAuth';
import { eventConfig } from '../../data/eventConfig';

export const AdminSettingsPage: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const [teamCount, setTeamCount] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    teamRepository.getTeams()
      .then((teams) => {
        if (isMounted) {
          setTeamCount(teams.length);
        }
      })
      .catch((err) => {
        console.error('Failed to load count from Firestore:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const flashSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  const handleExportBackup = async () => {
    try {
      const teams = await teamRepository.getTeams();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(teams, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `edgecraft_2026_firestore_teams_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      flashSuccess(`Exported ${teams.length} team records from Firestore to JSON.`);
    } catch (err) {
      console.error('Failed to export backup:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>System Administration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Admin Portal Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage Cloud Firestore data backups, review Google Form integration architecture, and configure your session.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Firestore Data Management */}
        <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Database & Team Storage</h2>
                <p className="text-xs text-slate-400 font-mono">Backend: Google Cloud Firestore</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Registered Teams:</span>
                <span className="text-white font-bold font-mono">{teamCount} teams</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Firestore Collection:</span>
                <span className="text-cyan-400 font-mono text-[11px]">teams/&#123;teamId&#125;</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Counter Registry:</span>
                <span className="text-cyan-400 font-mono text-[11px]">counters/teams</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Persistence Status:</span>
                <span className="text-emerald-400 font-medium">Cloud Firestore Synchronized</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Production data safety is enforced: sample resets are disabled to safeguard actual hackathon registrations.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleExportBackup}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-950 hover:bg-dark-850 border border-slate-700 hover:border-cyan-500/40 text-slate-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Teams as JSON Backup</span>
            </button>
          </div>
        </div>

        {/* Card 2: Firebase Admin Session */}
        <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Active Session</h2>
                <p className="text-xs text-slate-400 font-mono">Provider: Firebase Authentication</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-950/60 border border-slate-800 space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Admin Email:</span>
                <span className="text-white font-mono font-medium truncate max-w-[200px]">
                  {user?.email || 'admin@kiot.ac.in'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Firebase UID:</span>
                <span className="text-cyan-400 font-mono text-[11px] truncate max-w-[200px]">
                  {user?.uid || 'Not available'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Authorization:</span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  admins/{user?.uid ? 'active' : 'verified'} (role: admin)
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Authenticated:</span>
                <span className="text-slate-200 font-mono text-[11px]">
                  {user?.authenticatedAt ? new Date(user.authenticatedAt).toLocaleTimeString() : 'Current Session'}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p>
                Access is verified through Firestore collection <code className="text-cyan-400 font-mono text-[11px]">admins/&#123;uid&#125;</code> with <code className="text-cyan-400 font-mono text-[11px]">role == "admin"</code> and <code className="text-cyan-400 font-mono text-[11px]">active == true</code>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Google Forms / Sheets Integration Architecture Section */}
      <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Google Form / Sheet Integration Architecture</span>
        </div>

        <h3 className="text-base font-bold text-white">
          Decoupled Ingestion Pipeline into Cloud Firestore
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The EDGECRAFT 2026 Admin Dashboard is integrated directly with Cloud Firestore collection <code className="text-cyan-400 font-mono text-xs">teams/&#123;teamId&#125;</code>. Submissions from the official Google Form can be imported through:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-cyan-400 block font-mono">1. Manual Review</span>
            <p className="text-slate-400">
              Admin reviews Google Form responses and enters verified teams via the Add Team form directly into Firestore.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-cyan-400 block font-mono">2. Google Sheet CSV</span>
            <p className="text-slate-400">
              Export Google Form response sheet to CSV and import into Firestore via a one-time migration script.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-cyan-400 block font-mono">3. Apps Script Webhook</span>
            <p className="text-slate-400">
              Trigger on Google Form submission using Google Apps Script to write directly to <code className="text-cyan-400 font-mono text-[11px]">teams/</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Event Identity Card */}
      <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{eventConfig.name}</h4>
            <p className="text-xs text-slate-400 font-mono">
              {eventConfig.department} • {eventConfig.organizer}
            </p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {eventConfig.date} • {eventConfig.time}
            </p>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-950 hover:bg-dark-850 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors shrink-0"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </div>
    </div>
  );
};
