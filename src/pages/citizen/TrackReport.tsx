import { useState } from 'react';
import { Search, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getReportById, getStatusHistory } from '../../services/db/api';
import type { Report, StatusHistory } from '../../types';

export const TrackReport = () => {
  const [reportId, setReportId] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId.trim()) return;
    
    setLoading(true);
    setError('');
    setReport(null);
    setHistory([]);

    try {
      const data = await getReportById(reportId.trim());
      if (!data) {
        setError('Report not found. Please check the Report ID and try again.');
        return;
      }
      setReport(data);
      const hist = await getStatusHistory(data.id);
      setHistory(hist);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch report.');
    } finally {
      setLoading(false);
    }
  };

  const timelineSteps = [
    { status: 'SUBMITTED', label: 'Report Submitted' },
    { status: 'UNDER_REVIEW', label: 'Officer Review' },
    { status: 'ASSIGNED', label: 'Worker Assigned' },
    { status: 'IN_PROGRESS', label: 'Repair In Progress' },
    { status: 'PENDING_VERIFICATION', label: 'Pending Verification' },
    { status: 'RESOLVED', label: 'Resolved' },
  ];

  const getStepIndex = (status: string) => timelineSteps.findIndex(s => s.status === status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-4">Track Report</h1>
        <p className="text-gray-600">Enter your Report ID to track its progress in real-time.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="e.g. RG-2026-00001"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono text-lg transition-shadow"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !reportId}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Track Status'}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {report && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8 pb-6 border-b border-gray-100">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Report Details</p>
              <h2 className="text-2xl font-mono font-black text-gray-900">{report.id}</h2>
              <p className="text-gray-600 mt-2">{report.address}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm mb-2 border border-blue-100">
                {report.status}
              </span>
              <p className="text-sm text-gray-500">Priority: <strong className="text-gray-900">{report.priority}</strong></p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8 relative z-10">
              {timelineSteps.map((step, index) => {
                const stepHist = history.slice().reverse().find(h => h.status === step.status);
                const currentStatusIndex = getStepIndex(report.status);
                
                // If it's a rework scenario, handling it smoothly
                let isCompleted = index <= currentStatusIndex;
                if (report.status === 'REWORK_REQUIRED' && index >= getStepIndex('PENDING_VERIFICATION')) {
                  isCompleted = false;
                }

                const isActive = step.status === report.status;

                return (
                  <div key={step.status} className={`flex items-start gap-4 sm:gap-6 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm transition-colors
                      ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                    >
                      {isActive ? <Clock className="w-4 h-4 sm:w-6 sm:h-6" /> : isCompleted ? <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" /> : <div className="w-3 h-3 rounded-full bg-white"></div>}
                    </div>
                    <div className="pt-1 sm:pt-3">
                      <h3 className={`font-bold text-lg ${isActive ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.label}
                      </h3>
                      {stepHist && (
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(stepHist.updated_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
