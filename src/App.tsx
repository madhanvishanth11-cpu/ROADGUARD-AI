import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { RoleGuard } from './components/RoleGuard';

import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/public/LandingPage';
import { PublicLogin } from './pages/auth/PublicLogin';
import { OfficerLogin } from './pages/auth/OfficerLogin';

import { ReportPage } from './pages/citizen/ReportPage';
import { TrackReport } from './pages/citizen/TrackReport';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { CitizenReportDetail } from './pages/citizen/CitizenReportDetail';

import { Dashboard } from './pages/authority/Dashboard';
import { Analytics } from './pages/authority/Analytics';
import { ReportDetails } from './pages/authority/ReportDetails';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-blue-100">
          <Navigation />
          <main className="flex-grow flex flex-col w-full relative z-0">
            <Routes>
              {/* Public Unauthenticated Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<PublicLogin />} />
              <Route path="/officer-login" element={<OfficerLogin />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/track" element={<TrackReport />} />
              <Route path="/worker" element={<WorkerDashboard />} />
              
              {/* Public Dashboard (Protected) */}
              <Route element={<AuthGuard />}>
                <Route path="/dashboard" element={<MyReportsPage />} />
                <Route path="/dashboard/:reportId" element={<CitizenReportDetail />} />
              </Route>
              
              {/* Admin Dashboard (Role Protected) */}
              <Route element={<RoleGuard allowedRoles={['ADMIN']} />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/report/:id" element={<ReportDetails />} />
                <Route path="/analytics" element={<Analytics />} />
              </Route>

            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
