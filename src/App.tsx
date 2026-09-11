import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ReportPage } from './pages/citizen/ReportPage';
import { TrackReport } from './pages/citizen/TrackReport';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { CitizenReportDetail } from './pages/citizen/CitizenReportDetail';
import { Dashboard } from './pages/authority/Dashboard';
import { Analytics } from './pages/authority/Analytics';
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-blue-100">
        <Navigation />
        <main className="flex-grow flex flex-col w-full relative z-0">
          <Routes>
            {/* Public Core Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/track" element={<TrackReport />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/my-reports/:reportId" element={<CitizenReportDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* New Management Dashboards */}
            <Route path="/officer" element={<OfficerDashboard />} />
            <Route path="/worker" element={<WorkerDashboard />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
