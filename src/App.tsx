
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/citizen/LandingPage';
import { ReportPage } from './pages/citizen/ReportPage';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { CitizenReportDetail } from './pages/citizen/CitizenReportDetail';
import { PresentationMode } from './pages/public/PresentationMode';
import { PresentationDeck } from './pages/public/PresentationDeck';
import { PromoReel } from './pages/public/PromoReel';
import { Profile } from './pages/citizen/Profile';
import { Dashboard } from './pages/authority/Dashboard';
import { Analytics } from './pages/authority/Analytics';
import { ReportDetails } from './pages/authority/ReportDetails';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Unauthorized } from './pages/auth/Unauthorized';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/AuthGuard';
import { RoleGuard } from './components/RoleGuard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-blue-100">
          <Navigation />
          <main className="flex-grow flex flex-col w-full relative z-0">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/demo" element={<PresentationMode />} />
              <Route path="/presentation" element={<PresentationDeck />} />
              <Route path="/reel" element={<PromoReel />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Citizen / Authenticated Routes */}
              <Route element={<AuthGuard />}>
                <Route path="/my-reports" element={<MyReportsPage />} />
                <Route path="/my-reports/:reportId" element={<CitizenReportDetail />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Authority Only Routes */}
              <Route element={<RoleGuard allowedRoles={['AUTHORITY']} />}>
                <Route path="/authority" element={<Dashboard />} />
                <Route path="/authority/analytics" element={<Analytics />} />
                <Route path="/authority/report/:id" element={<ReportDetails />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
