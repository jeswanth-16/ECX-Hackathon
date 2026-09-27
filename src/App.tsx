import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Themes } from './pages/Themes';
import { Prizes } from './pages/Prizes';
import { TimelinePage } from './pages/TimelinePage';
import { Rules } from './pages/Rules';
import { FAQPage } from './pages/FAQPage';
import { Register } from './pages/Register';
import { RegistrationSuccess } from './pages/RegistrationSuccess';
import { MyTeam } from './pages/MyTeam';
import { PublicTeamVerificationPage } from './pages/PublicTeamVerification';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';
import { getCurrentAdminUser } from './services/authService';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Protected Admin Route wrapper
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const admin = getCurrentAdminUser();
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

// Layout wrapper to conditionally show public navigation
function AppContent() {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div className="flex flex-col min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-electric-blue selection:text-white">
      <ScrollToTop />

      {/* Show Navbar on public pages and admin login, hide on full admin dashboard */}
      {!isAdminDashboard && <Navbar />}

      {/* Main content container with padding on mobile for fixed bottom nav */}
      <main className={`flex-1 ${!isAdminDashboard ? 'pb-20 md:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/my-team" element={<MyTeam />} />
          
          {/* Public Team Verification URL (from QR code scan) */}
          <Route path="/team/:registrationId" element={<PublicTeamVerificationPage />} />
          <Route path="/team" element={<Navigate to="/my-team" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/teams"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/export"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Show Footer and Mobile Bottom Nav on public pages */}
      {!isAdminDashboard && (
        <>
          <Footer />
          <MobileBottomNav />
        </>
      )}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
