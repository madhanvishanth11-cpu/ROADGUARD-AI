import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthGuard } from './components/AuthGuard';
import { RoleGuard } from './components/RoleGuard';

import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { NotFoundPage } from './pages/public/NotFoundPage';
import { PublicLogin } from './pages/auth/PublicLogin';
import { OfficerLogin } from './pages/auth/OfficerLogin';

import { ReportPage } from './pages/citizen/ReportPage';
import { TrackReport } from './pages/citizen/TrackReport';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { SharedReportDetail } from './pages/shared/SharedReportDetail';

import { Dashboard } from './pages/authority/Dashboard';
import { Analytics } from './pages/authority/Analytics';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black transition-colors duration-200">
            <Navigation />
            <main className="flex-1">
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<PublicLogin />} />
                <Route path="/officer-login" element={<OfficerLogin />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/track" element={<TrackReport />} />
                <Route path="/worker" element={<WorkerDashboard />} />
                
                {/* PROTECTED PUBLIC ROUTES */}
                <Route element={<AuthGuard />}>
                  <Route path="/dashboard" element={<MyReportsPage />} />
                  <Route path="/report/:id" element={<SharedReportDetail />} />
                </Route>

                {/* PROTECTED ADMIN ROUTES */}
                <Route element={<RoleGuard allowedRoles={['ADMIN']} />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Route>
                
                {/* 404 NOT FOUND */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
