import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  Settings, 
  LogOut, 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Download, 
  Eye, 
  Trash2, 
  X, 
  Check, 
  RefreshCw,
  ExternalLink,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import type { Registration, RegistrationStatus } from '../types';
import { 
  listenToRegistrations, 
  updateRegistrationStatus as updateFirestoreStatus,
  deleteRegistrationFromFirestore
} from '../services/registrationService';
import { 
  getRegistrations, 
  resetToMockData 
} from '../utils/storage';
import { logoutAdmin } from '../services/authService';
import { exportRegistrationsToCSV } from '../utils/exportCsv';
import { eventConfig, eventThemes } from '../data/eventConfig';
import { isFirebaseConfigured } from '../lib/firebase';

interface ConfirmActionState {
  open: boolean;
  registrationId: string;
  teamName: string;
  targetStatus: 'confirmed' | 'rejected';
  isSubmitting: boolean;
}

interface DeleteConfirmState {
  open: boolean;
  registrationId: string;
  teamName: string;
  isDeleting: boolean;
  error: string | null;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Navigation tab: 'dashboard' | 'registrations' | 'teams' | 'export' | 'settings'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'registrations' | 'teams' | 'export' | 'settings'>('dashboard');

  // State
  const [registrations, setRegistrations] = useState<Registration[]>(() => getRegistrations());
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Detail Modal
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  // Confirmation Modal for Approve / Reject (Requirements 11 & 12)
  const [confirmModal, setConfirmModal] = useState<ConfirmActionState>({
    open: false,
    registrationId: '',
    teamName: '',
    targetStatus: 'confirmed',
    isSubmitting: false,
  });

  // Confirmation Modal for Delete Registration (Admin Only)
  const [deleteModal, setDeleteModal] = useState<DeleteConfirmState>({
    open: false,
    registrationId: '',
    teamName: '',
    isDeleting: false,
    error: null,
  });

  const isConfigured = isFirebaseConfigured();

  // Real-time Firestore synchronization
  useEffect(() => {
    const unsubscribe = listenToRegistrations(
      (data) => {
        setRegistrations(data);
        setIsLoading(false);
      },
      (err) => {
        console.error('Real-time registration listener error:', err);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  // Open confirmation modal for Approve / Reject
  const requestStatusChange = (id: string, teamName: string, targetStatus: 'confirmed' | 'rejected') => {
    setConfirmModal({
      open: true,
      registrationId: id,
      teamName,
      targetStatus,
      isSubmitting: false,
    });
  };

  // Execute confirmed status change
  const executeStatusChange = async () => {
    if (!confirmModal.registrationId) return;

    setConfirmModal((prev) => ({ ...prev, isSubmitting: true }));
    try {
      await updateFirestoreStatus(confirmModal.registrationId, confirmModal.targetStatus);

      // Update local state if needed
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === confirmModal.registrationId
            ? { ...r, status: confirmModal.targetStatus }
            : r
        )
      );

      if (selectedReg && selectedReg.id === confirmModal.registrationId) {
        setSelectedReg((prev) =>
          prev ? { ...prev, status: confirmModal.targetStatus } : null
        );
      }

      setNotification(
        `Team "${confirmModal.teamName}" status successfully updated to ${confirmModal.targetStatus.toUpperCase()}.`
      );
      setTimeout(() => setNotification(null), 4000);

      setConfirmModal({
        open: false,
        registrationId: '',
        teamName: '',
        targetStatus: 'confirmed',
        isSubmitting: false,
      });
    } catch (err: any) {
      console.error('Failed to change registration status:', err);
      alert(`Error updating status: ${err?.message || 'Network error'}`);
      setConfirmModal((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // Open confirmation modal for Delete Team
  const requestDelete = (registrationId: string, teamName: string) => {
    setDeleteModal({
      open: true,
      registrationId,
      teamName,
      isDeleting: false,
      error: null,
    });
  };

  // Execute confirmed deletion
  const executeDelete = async () => {
    if (!deleteModal.registrationId) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true, error: null }));
    try {
      await deleteRegistrationFromFirestore(deleteModal.registrationId);

      // Immediately remove the team from the Admin Dashboard list
      setRegistrations((prev) => prev.filter((r) => r.id !== deleteModal.registrationId));

      // Close detail modal if the deleted team was open
      if (selectedReg && selectedReg.id === deleteModal.registrationId) {
        setSelectedReg(null);
      }

      const deletedId = deleteModal.registrationId;
      setDeleteModal({
        open: false,
        registrationId: '',
        teamName: '',
        isDeleting: false,
        error: null,
      });

      setNotification(`Registration ${deletedId} deleted successfully.`);
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      console.error('Failed to delete registration:', err);
      const errMsg = err?.message || 'Failed to delete registration. Please check permissions.';
      setDeleteModal((prev) => ({
        ...prev,
        isDeleting: false,
        error: errMsg,
      }));
    }
  };

  // Compute stat counts (strictly NO paid/payment/revenue metrics)
  const totalCount = registrations.length;
  const confirmedCount = registrations.filter((r) => (r.status || '').toLowerCase() === 'confirmed').length;
  const pendingCount = registrations.filter((r) => (r.status || '').toLowerCase() === 'pending').length;
  const rejectedCount = registrations.filter((r) => (r.status || '').toLowerCase() === 'rejected').length;

  // Filter & Sort
  const filteredRegistrations = registrations
    .filter((reg) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        reg.id.toLowerCase().includes(q) ||
        reg.teamName.toLowerCase().includes(q) ||
        reg.leaderName.toLowerCase().includes(q) ||
        reg.collegeName.toLowerCase().includes(q) ||
        reg.email.toLowerCase().includes(q);

      const matchesDomain =
        domainFilter === 'All' || reg.domain === domainFilter || reg.problemDomain === domainFilter;
      
      const currentStatus = (reg.status || 'pending').toLowerCase();
      const targetFilter = statusFilter.toLowerCase();
      const matchesStatus =
        statusFilter === 'All' || currentStatus === targetFilter;

      return matchesSearch && matchesDomain && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortOrder === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return a.teamName.localeCompare(b.teamName);
    });

  const renderStatusBadge = (status: RegistrationStatus) => {
    const s = (status || 'pending').toLowerCase();
    switch (s) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <Check className="w-3 h-3 text-emerald-400" />
            Confirmed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <X className="w-3 h-3 text-rose-400" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3 text-amber-400" />
            Pending
          </span>
        );
    }
  };

  const handleExportCSV = (recordsToExport: Registration[], filename?: string) => {
    const success = exportRegistrationsToCSV(recordsToExport, filename);
    if (success) {
      setNotification(`CSV dataset (${recordsToExport.length} rows) exported successfully.`);
      setTimeout(() => setNotification(null), 4000);
    } else {
      setNotification('No registration records available to export.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-dark-900 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-electric-cyan">
                Admin Portal
              </span>
              {isConfigured && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </div>
            <h1 className="text-lg font-black text-white mt-0.5">
              {eventConfig.name}
            </h1>
            <p className="text-xs text-slate-400">{eventConfig.departmentShort}, KIOT</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'registrations', label: 'Registrations', icon: Users, badge: totalCount },
              { id: 'teams', label: 'Confirmed Teams', icon: CheckCircle2, badge: confirmedCount },
              { id: 'export', label: 'Export Data', icon: FileSpreadsheet },
              { id: 'settings', label: 'Event Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    if (item.id === 'teams') {
                      setStatusFilter('confirmed');
                    } else if (item.id === 'registrations') {
                      setStatusFilter('All');
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-white border border-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-dark-850'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-electric-cyan' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-dark-950 text-slate-300 border border-slate-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 mt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-dark-850 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Toast Notification Banner */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-blue-950/80 border border-blue-500/50 text-electric-cyan text-xs sm:text-sm font-medium flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-white capitalize">
                {activeTab === 'dashboard' ? 'Overview Dashboard' : activeTab}
              </h2>
              {isConfigured ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Cloud Firestore Sync</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/30">
                  Local Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live registration auditing, candidate approvals, and reporting records
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExportCSV(registrations)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-700 text-xs font-semibold text-white transition-colors"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 300);
              }}
              className="p-2 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* STATS CARDS (Total, Confirmed, Pending, Rejected - STRICTLY NO PAYMENT STATS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Teams
              </span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-electric-cyan border border-blue-500/20">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {totalCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Registrations received</p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Confirmed
              </span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">
              {confirmedCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Official participant teams</p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Pending Review
              </span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              {pendingCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting coordinator review</p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-rose-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Rejected
              </span>
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-300 font-mono">
              {rejectedCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Declined applications</p>
          </div>
        </div>

        {/* TAB VIEWS */}
        {activeTab === 'export' ? (
          /* EXPORT VIEW */
          <div className="max-w-3xl space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-electric-cyan">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Export Registration Datasets</h3>
                  <p className="text-xs text-slate-400">
                    Download participant tables for offline review, ID card generation, and hall allocation
                  </p>
                </div>
              </div>

              <div className="my-6 p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div>Total records ready for export: <strong className="text-white">{totalCount}</strong></div>
                <div>Confirmed teams: <strong className="text-emerald-400">{confirmedCount}</strong></div>
                <div>Pending teams: <strong className="text-amber-400">{pendingCount}</strong></div>
                <div className="text-slate-500 pt-1">
                  Columns included: Registration ID, Registration Date, Status, Team Name, Leader Name, Leader Email, Leader Phone, College Name, Department, Problem Domain, Idea Title, Idea Description, Team Size, Members Details.
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleExportCSV(registrations)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-electric-purple text-white text-xs sm:text-sm font-bold shadow-glow-blue hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download All as CSV ({totalCount})</span>
                </button>

                <button
                  onClick={() => {
                    const confirmedOnly = registrations.filter(
                      (r) => (r.status || '').toLowerCase() === 'confirmed'
                    );
                    handleExportCSV(confirmedOnly, 'ECX_Hackathon_2026_Confirmed_Teams.csv');
                  }}
                  className="px-5 py-3 rounded-xl bg-dark-950 hover:bg-dark-850 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Download Confirmed Teams Only ({confirmedCount})</span>
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'settings' ? (
          /* SETTINGS VIEW */
          <div className="max-w-3xl space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">Central Event Configuration</h3>
              <p className="text-xs text-slate-400 mb-6">
                All event parameters are configured centrally in <code className="text-electric-cyan font-mono bg-dark-950 px-2 py-0.5 rounded">src/data/eventConfig.ts</code>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-slate-500 font-bold uppercase block mb-1">Event Name</span>
                  <span className="text-white font-semibold">{eventConfig.name}</span>
                </div>
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-slate-500 font-bold uppercase block mb-1">College</span>
                  <span className="text-white font-semibold">{eventConfig.college}</span>
                </div>
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-slate-500 font-bold uppercase block mb-1">Department</span>
                  <span className="text-white font-semibold">{eventConfig.department}</span>
                </div>
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-slate-500 font-bold uppercase block mb-1">Team Limits</span>
                  <span className="text-white font-semibold">{eventConfig.teamSize.min} to {eventConfig.teamSize.max} Members</span>
                </div>
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-slate-500 font-bold uppercase block mb-1">Registration Policy</span>
                  <span className="text-emerald-400 font-semibold">Free Registration (No Payment)</span>
                </div>
                <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-slate-500 font-bold uppercase block mb-1">Allow Participant Edit</span>
                  <span className="text-white font-semibold">{eventConfig.allowTeamEditing ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Reset Local Mock Data</h4>
                  <p className="text-xs text-slate-400">Restore default sample candidate records in local storage fallback</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset local fallback registrations to initial dataset?')) {
                      resetToMockData();
                      setRegistrations(getRegistrations());
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold hover:bg-rose-900/60"
                >
                  Reset Local Dataset
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* REGISTRATIONS TABLE VIEW (for dashboard, registrations, and teams tabs) */
          <div>
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, team, leader, college, or email..."
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-electric-blue transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-electric-blue"
                >
                  <option value="All">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>

                {/* Domain Filter */}
                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-electric-blue max-w-[160px] truncate"
                >
                  <option value="All">All Domains</option>
                  {eventThemes.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-electric-blue"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Team Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-dark-900/90 shadow-card">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-dark-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Reg ID</th>
                    <th className="py-3 px-4">Team Name</th>
                    <th className="py-3 px-4">Leader & College</th>
                    <th className="py-3 px-4">Domain</th>
                    <th className="py-3 px-4 text-center">Members</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-500">
                        {isLoading ? 'Loading live registrations from Firestore...' : 'No registrations matching the selected criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => {
                      const curStatus = (reg.status || 'pending').toLowerCase();
                      return (
                        <tr
                          key={reg.id}
                          className="hover:bg-dark-850/60 transition-colors group"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-electric-cyan whitespace-nowrap">
                            {reg.id}
                          </td>

                          <td className="py-3 px-4 font-semibold text-white">
                            <button
                              onClick={() => setSelectedReg(reg)}
                              className="hover:text-blue-400 transition-colors text-left"
                            >
                              {reg.teamName}
                            </button>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-200">{reg.leaderName}</div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                              {reg.collegeName}
                            </div>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-950/70 border border-blue-500/20 text-blue-300">
                              {reg.domain || reg.problemDomain}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center font-mono font-bold text-slate-300">
                            {reg.members.length}
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            {renderStatusBadge(reg.status)}
                          </td>

                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </td>

                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View detail button */}
                              <button
                                onClick={() => setSelectedReg(reg)}
                                className="p-1.5 rounded-lg bg-dark-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                                title="View Team Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Quick Approve with Confirmation Modal (Req 11) */}
                              {curStatus !== 'confirmed' && (
                                <button
                                  onClick={() => requestStatusChange(reg.id, reg.teamName, 'confirmed')}
                                  className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 transition-colors"
                                  title="Approve Registration"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Quick Reject with Confirmation Modal (Req 12) */}
                              {curStatus !== 'rejected' && (
                                <button
                                  onClick={() => requestStatusChange(reg.id, reg.teamName, 'rejected')}
                                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-400 border border-rose-500/30 transition-colors"
                                  title="Reject Registration"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Delete with Confirmation Modal */}
                              <button
                                onClick={() => requestDelete(reg.id, reg.teamName)}
                                className="p-1.5 rounded-lg bg-dark-950 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 border border-slate-800 transition-colors"
                                title={`Delete registration ${reg.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing {filteredRegistrations.length} of {totalCount} total registrations</span>
              <span className="font-mono text-[11px]">Free Platform • No Payment Records</span>
            </div>
          </div>
        )}
      </main>

      {/* CONFIRMATION MODAL FOR APPROVE / REJECT (Requirements 11 & 12) */}
      {confirmModal.open && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-action-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-dark-900 border border-blue-500/40 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  confirmModal.targetStatus === 'confirmed'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                }`}
              >
                {confirmModal.targetStatus === 'confirmed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 id="confirm-action-title" className="text-lg font-bold text-white">
                  Confirm {confirmModal.targetStatus === 'confirmed' ? 'Approval' : 'Rejection'}
                </h3>
                <span className="font-mono text-xs text-electric-cyan">
                  {confirmModal.registrationId}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Are you sure you want to change the status of team{' '}
              <strong className="text-white">&ldquo;{confirmModal.teamName}&rdquo;</strong> to{' '}
              <span
                className={`font-bold uppercase ${
                  confirmModal.targetStatus === 'confirmed' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {confirmModal.targetStatus}
              </span>
              ? This update will be committed directly to Cloud Firestore.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
                disabled={confirmModal.isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeStatusChange}
                disabled={confirmModal.isSubmitting}
                className={`flex-1 py-2.5 px-4 rounded-xl text-white text-xs font-bold transition-opacity flex items-center justify-center gap-2 ${
                  confirmModal.targetStatus === 'confirmed'
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : 'bg-rose-600 hover:bg-rose-500'
                }`}
              >
                {confirmModal.isSubmitting ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>
                    Confirm {confirmModal.targetStatus === 'confirmed' ? 'Approve' : 'Reject'}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL FOR DELETE REGISTRATION */}
      {deleteModal.open && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-dark-900 border border-rose-500/40 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 id="delete-dialog-title" className="text-lg font-bold text-white">
                  Delete registration {deleteModal.registrationId}?
                </h3>
                <span className="font-medium text-xs text-slate-400">
                  Team: <strong className="text-white">&ldquo;{deleteModal.teamName}&rdquo;</strong>
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold mb-6 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>This action cannot be undone.</span>
            </div>

            {deleteModal.error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{deleteModal.error}</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal((prev) => ({ ...prev, open: false, error: null }))}
                disabled={deleteModal.isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                disabled={deleteModal.isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-rose-900/40"
              >
                {deleteModal.isDeleting ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEAM DETAILS MODAL (Requirement 13) */}
      {selectedReg && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-details-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-dark-900 border border-blue-500/40 shadow-2xl">
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs font-bold text-electric-cyan block">
                  {selectedReg.id}
                </span>
                <h3 id="team-details-title" className="text-xl font-bold text-white mt-0.5">
                  {selectedReg.teamName}
                </h3>
              </div>
              <div>{renderStatusBadge(selectedReg.status)}</div>
            </div>

            {/* Change Status Action Row with Confirmation */}
            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-between mb-6">
              <span className="text-xs text-slate-400 font-semibold">Change Team Status:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => requestStatusChange(selectedReg.id, selectedReg.teamName, 'confirmed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    (selectedReg.status || '').toLowerCase() === 'confirmed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-dark-900 border border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  Approve
                </button>
                <button
                  onClick={() => requestStatusChange(selectedReg.id, selectedReg.teamName, 'rejected')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    (selectedReg.status || '').toLowerCase() === 'rejected'
                      ? 'bg-rose-600 text-white'
                      : 'bg-dark-900 border border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-dark-950/70 border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Leader Name
                  </span>
                  <span className="font-semibold text-white">{selectedReg.leaderName}</span>
                  <span className="text-slate-400 block">{selectedReg.email}</span>
                  <span className="text-slate-400 block">{selectedReg.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Institution & Branch
                  </span>
                  <span className="font-semibold text-white">{selectedReg.collegeName}</span>
                  <span className="text-slate-400 block">{selectedReg.department}</span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Submitted: {new Date(selectedReg.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-dark-950/70 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Problem Track & Proposed Idea
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-500/20 mb-2">
                  {selectedReg.domain || selectedReg.problemDomain}
                </span>
                <h4 className="font-bold text-white mb-1">{selectedReg.ideaTitle}</h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {selectedReg.ideaDescription}
                </p>
              </div>

              {/* Members List */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                  Team Members Roster ({selectedReg.members.length})
                </span>
                <div className="space-y-2">
                  {selectedReg.members.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-white">
                          {m.name} {m.isLeader ? '(Leader)' : ''}
                        </span>
                        <span className="text-slate-400 block text-[11px]">
                          {m.email} • {m.phone}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">
                        {m.registrationNumber || m.regNo || 'No Reg No'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => requestDelete(selectedReg.id, selectedReg.teamName)}
                className="px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-colors flex items-center gap-1.5"
                title={`Delete registration ${selectedReg.id}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Team</span>
              </button>
              <div className="flex items-center gap-3">
                <Link
                  to={`/team/${selectedReg.id}`}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-dark-950 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <span>Public Verification URL</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => setSelectedReg(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
