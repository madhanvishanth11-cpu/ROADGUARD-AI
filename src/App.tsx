import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ReportPage } from './pages/citizen/ReportPage';
import { MyReportsPage } from './pages/citizen/MyReportsPage';
import { CitizenReportDetail } from './pages/citizen/CitizenReportDetail';
import { PresentationMode } from './pages/public/PresentationMode';
import { PresentationDeck } from './pages/public/PresentationDeck';
import { PromoReel } from './pages/public/PromoReel';
import { Dashboard } from './pages/authority/Dashboard';
import { Analytics } from './pages/authority/Analytics';
import { ReportDetails } from './pages/authority/ReportDetails';
import { LandingPage } from './pages/citizen/LandingPage'; // Kept in case it's linked elsewhere, but Dashboard is home

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-blue-100">
        <Navigation />
        <main className="flex-grow flex flex-col w-full relative z-0">
          <Routes>
            {/* Public Core Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/my-reports/:reportId" element={<CitizenReportDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* Kept original authority routes mapped to the same components so existing links don't break */}
            <Route path="/authority" element={<Dashboard />} />
            <Route path="/authority/analytics" element={<Analytics />} />
            <Route path="/authority/report/:id" element={<ReportDetails />} />

            {/* Presentation Routes */}
            <Route path="/demo" element={<PresentationMode />} />
            <Route path="/presentation" element={<PresentationDeck />} />
            <Route path="/reel" element={<PromoReel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
