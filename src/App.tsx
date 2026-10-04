import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { RegistrationProvider } from './context/RegistrationContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Themes } from './pages/Themes';
import { TimelinePage } from './pages/TimelinePage';
import { Rules } from './pages/Rules';
import { FAQPage } from './pages/FAQPage';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

// Admin Components & Pages
import { AdminProtectedRoute } from './admin/components/AdminProtectedRoute';
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { AdminOverviewPage } from './admin/pages/AdminOverviewPage';
import { TeamListPage } from './admin/pages/TeamListPage';
import { TeamFormPage } from './admin/pages/TeamFormPage';
import { TeamDetailPage } from './admin/pages/TeamDetailPage';
import { AdminSettingsPage } from './admin/pages/AdminSettingsPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      <ScrollToTop />

      {/* Render Public Navigation only on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <main className={isAdminRoute ? 'flex-1' : 'flex-1 pb-20 md:pb-0'}>
        <Routes>
          {/* Public Event Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/challenge" element={<Themes />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Portal Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/overview" replace />}
          />
          <Route
            path="/admin/overview"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminOverviewPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/teams"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <TeamListPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/teams/new"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <TeamFormPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/teams/:teamId"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <TeamDetailPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/teams/:teamId/edit"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <TeamFormPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <AdminSettingsPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

          {/* Legacy redirects */}
          <Route path="/prizes" element={<Navigate to="/#challenge" replace />} />
          <Route path="/my-team" element={<Navigate to="/register" replace />} />
          <Route path="/team/*" element={<Navigate to="/register" replace />} />
          <Route path="/team" element={<Navigate to="/register" replace />} />
          <Route path="/registration-success" element={<Navigate to="/register" replace />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Render Public Footer & Mobile Bottom Bar only on non-admin routes */}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileBottomNav />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <RegistrationProvider>
          <AppContent />
        </RegistrationProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
