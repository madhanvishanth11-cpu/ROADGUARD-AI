import { useState, useEffect, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { getReportById, getReports } from '../../services/db/api';
import type { Report } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

// ---------------------------------------------------------
// Error Boundary to prevent white screen
// ---------------------------------------------------------
interface EBProps { children: ReactNode; }
interface EBState { hasError: boolean; }
class TrackReportErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error): EBState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("TrackReport rendering error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-12 min-h-[50vh] flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-slate-600 dark:text-[#A1A1AA] mb-6">We couldn't load this page right now.</p>
          <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Try Again
            </button>
            <a href="/dashboard" className="px-6 py-2 bg-slate-200 dark:bg-[#151515] hover:bg-slate-300 dark:hover:bg-[#2A2A2A] text-slate-800 dark:text-white font-bold rounded-lg transition-colors">
              Back to Dashboard
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------------------------------------------------------
// Main Component
// ---------------------------------------------------------
const TrackReportContent = () => {
  const { user } = useAuth();
  
  const [reportId, setReportId] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState('');
  const [myReports, setMyReports] = useState<Report[]>([]);

  // Automatically fetch reports for "Demo Citizen"
  useEffect(() => {
    if (user?.role === 'PUBLIC' && user.email === 'demo@roadguard.ai') {
      getReports().then(all => {
        // Normally filter by user ID, but since it's demo, just show top 3
        setMyReports(all.slice(0, 3));
      }).catch(e => console.error("Error fetching recent reports", e));
    }
  }, [user]);

  // Keep report updated if local storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'roadguard_reports' && report) {
        handleTrackSubmit(report.id);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [report]);

  const handleTrackSubmit = async (idToTrack: string) => {
    const id = idToTrack.trim();
    if (!id) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getReportById(id);
      if (!data) {
        setReport(null);
        setError('Report Not Found. Please check your Report ID and try again.');
        return;
      }
      setReport(data);
      setReportId(id); // Ensure input matches what was tracked
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch report.');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackSubmit(reportId);
  };

  const normalizeStatus = (s: string) => s.toUpperCase().replace(' ', '_');

  const timelineSteps = [
    { key: 'SUBMITTED', label: 'Report Submitted' },
    { key: 'VERIFIED', label: 'Officer Verified' },
    { key: 'ASSIGNED', label: 'Repair Assigned' },
    { key: 'IN_PROGRESS', label: 'Repair In Progress' },
    { key: 'RESOLVED', label: 'Resolved' },
  ];

  const renderTimeline = (currentStatusRaw: string) => {
    const status = normalizeStatus(currentStatusRaw || '');
    
    if (status === 'REJECTED') {
      return (
        <div className="space-y-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 text-white z-10 border border-[#111111]"><CheckCircle className="w-4 h-4"/></div>
            <div className="pt-1"><h3 className="font-bold text-slate-900 dark:text-white">Report Submitted</h3></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white z-10 border border-[#111111]">✕</div>
            <div className="pt-1"><h3 className="font-bold text-red-600 dark:text-red-400">Report Rejected</h3></div>
          </div>
        </div>
      );
    }

    // Map UNDER_REVIEW to VERIFIED visually
    let visualStatus = status;
    if (visualStatus === 'UNDER_REVIEW') visualStatus = 'VERIFIED';
    if (visualStatus === 'PENDING_VERIFICATION') visualStatus = 'IN_PROGRESS';
    if (visualStatus === 'REWORK_REQUIRED') visualStatus = 'IN_PROGRESS';
    
    // Fallback if somehow missing
    const allowed = ['SUBMITTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
    if (!allowed.includes(visualStatus)) visualStatus = 'SUBMITTED';

    const currentIndex = timelineSteps.findIndex(s => s.key === visualStatus);
    
    return (
      <div className="relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-[#2A2A2A]"></div>
        <div className="space-y-8 relative z-10">
          {timelineSteps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isActive = index === currentIndex;
            
            return (
              <div key={step.key} className={`flex items-start gap-4 ${isCompleted ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors z-10 border-4 border-white dark:border-[#111111]
                  ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-[#2A2A2A] text-slate-400 dark:text-slate-600'}`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-white dark:bg-[#111111]"></div>}
                </div>
                <div className="pt-1">
                  <h3 className={`font-bold text-lg ${isActive ? 'text-blue-600 dark:text-blue-400' : isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-[#A1A1AA]'}`}>
                    {step.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getPriorityColor = (priority: string) => {
    const p = (priority || '').toUpperCase();
    switch(p) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'HIGH': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-[#151515] dark:text-[#A1A1AA]';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Track Your Report</h1>
        <p className="text-slate-600 dark:text-[#A1A1AA]">Enter your Report ID to check the current status and repair progress.</p>
      </div>

      <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] mb-8">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#A1A1AA] w-5 h-5" />
            <input
              type="text"
              placeholder="e.g. RG-20260912-709"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-[#2A2A2A] bg-white dark:bg-black text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono transition-shadow"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !reportId.trim()}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Track Report'}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-6 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] text-center rounded-2xl mb-8">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Report Not Found</h3>
          <p className="text-slate-600 dark:text-[#A1A1AA] mb-4">{error}</p>
          <button onClick={() => setReportId('')} className="px-6 py-2 bg-slate-100 dark:bg-[#151515] hover:bg-slate-200 dark:hover:bg-[#2A2A2A] text-slate-800 dark:text-white font-bold rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      )}

      {report && !error && (
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Report Details</p>
              <h2 className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white break-all">{report.id}</h2>
              <p className="text-slate-600 dark:text-[#A1A1AA] mt-1">{report.address ?? "Location not available"}</p>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto items-start sm:items-end">
              <span className="inline-flex px-4 py-1.5 bg-slate-100 dark:bg-[#151515] border border-slate-200 dark:border-[#2A2A2A] font-bold rounded-full text-sm">
                Status: {report.status ?? "UNKNOWN"}
              </span>
              <span className={`inline-flex px-4 py-1.5 font-bold rounded-full text-sm ${getPriorityColor(report.priority)}`}>
                Priority: {report.priority ?? "Not assigned"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
              <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Damage Type</p>
              <p className="font-medium text-slate-900 dark:text-white mt-1">{report.pothole_detected ? "Pothole" : "Surface Damage"}</p>
            </div>
            <div className="bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
              <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Submitted Date</p>
              <p className="font-medium text-slate-900 dark:text-white mt-1">{report.created_at ? new Date(report.created_at).toLocaleDateString() : "Date unavailable"}</p>
            </div>
            <div className="bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
              <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Risk Score</p>
              <p className="font-medium text-slate-900 dark:text-white mt-1">{report.risk_score ?? "N/A"}</p>
            </div>
            <div className="bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
              <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Image</p>
              <p className="font-medium text-slate-900 dark:text-white mt-1">
                {report.image_url ? (
                  <a href={report.image_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">View Image</a>
                ) : (
                  <span className="text-slate-500">None uploaded</span>
                )}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Report Progress</h3>
          {renderTimeline(report.status)}
          
          <div className="mt-8 text-center">
            <Link to={`/report/${report.id}`} className="inline-flex items-center justify-center text-blue-600 font-bold hover:underline">
              View Full Report Details →
            </Link>
          </div>
        </div>
      )}

      {/* Demo Citizen Recent Reports - Safe Render */}
      {!report && !error && myReports.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">My Recent Reports</h2>
          <div className="grid gap-4">
            {myReports.map(r => (
              <div key={r.id} className="bg-white dark:bg-[#111111] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-mono font-bold text-slate-900 dark:text-white">{r.id}</h3>
                  <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">{r.address ?? "Location unknown"}</p>
                </div>
                <button 
                  onClick={() => handleTrackSubmit(r.id)}
                  className="px-4 py-2 bg-slate-100 dark:bg-[#151515] hover:bg-slate-200 dark:hover:bg-[#2A2A2A] font-bold rounded-lg text-sm transition-colors w-full sm:w-auto text-slate-900 dark:text-white"
                >
                  View Progress
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!report && !error && myReports.length === 0 && user?.role === 'PUBLIC' && (
        <div className="mt-12 text-center bg-slate-50 dark:bg-[#111111] p-8 rounded-2xl border border-dashed border-slate-200 dark:border-[#2A2A2A]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Reports Available</h2>
          <p className="text-slate-600 dark:text-[#A1A1AA] mb-6">You haven't submitted any reports yet.</p>
          <Link to="/report" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
            Report Road Damage
          </Link>
        </div>
      )}

    </div>
  );
};

export const TrackReport = () => (
  <TrackReportErrorBoundary>
    <TrackReportContent />
  </TrackReportErrorBoundary>
);
