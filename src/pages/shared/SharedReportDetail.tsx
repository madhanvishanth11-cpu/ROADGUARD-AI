import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Calendar, Clock, Activity, AlertTriangle, 
  CheckCircle, RefreshCw, User as UserIcon, Settings, Image as ImageIcon
} from 'lucide-react';
import { getReportById, getStatusHistory, getAssignments, getWorkers, assignReport, updateReportStatus } from '../../services/db/api';
import type { Report, StatusHistory, ReportAssignment, Worker } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';

export const SharedReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [report, setReport] = useState<Report | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [assignment, setAssignment] = useState<ReportAssignment | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [expDate, setExpDate] = useState('');

  const isAdmin = user?.role === 'ADMIN';

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const r = await getReportById(id);
      if (!r) {
        setError('Report Not Found');
        return;
      }
      setReport(r);
      
      const h = await getStatusHistory(id);
      setHistory(h);

      const assignments = await getAssignments();
      const currentAssignment = assignments.find(a => a.report_id === id);
      if (currentAssignment) {
        setAssignment(currentAssignment);
      }

      if (isAdmin) {
        const w = await getWorkers();
        setWorkers(w);
      }
    } catch (err) {
      console.error(err);
      setError('Error loading report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'roadguard_reports' || e.key === 'roadguard_assignments' || e.key === 'roadguard_history') {
        fetchData();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [id, isAdmin]);

  const handleAssignWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkerId || !id || !taskDesc || !expDate) return;
    const worker = workers.find(w => w.id === selectedWorkerId);
    if (!worker) return;

    await assignReport({
      report_id: id,
      worker_id: worker.id,
      department: worker.department,
      expected_completion: expDate,
      assigned_by: 'Admin',
      team: worker.team
    });
    
    setShowAssignModal(false);
    fetchData();
  };

  const handleUpdateStatus = async (status: Report['status']) => {
    if (!id) return;
    await updateReportStatus(id, status, `Admin updated status to ${status}`);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-black p-4">
        <AlertTriangle className="w-16 h-16 text-slate-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Report Not Found</h2>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Timeline logic
  const statuses = ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
  let currentIndex = statuses.indexOf(report.status);
  if (currentIndex === -1) currentIndex = 0;
  
  if (report.status === 'UNDER_REVIEW') currentIndex = 1;
  if (report.status === 'PENDING_VERIFICATION') currentIndex = 4;

  const isRejected = report.status === 'REJECTED';

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'HIGH': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-[#151515] dark:text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-black text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:underline mb-2 font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <p className="text-xs font-black tracking-widest text-slate-500 dark:text-[#A1A1AA] uppercase mb-1">RoadGuard AI</p>
          <h1 className="text-3xl font-black">Report Details</h1>
        </div>
        <div className="flex flex-col gap-2 items-start md:items-end">
          <div className="text-sm font-mono bg-slate-100 dark:bg-[#111111] px-3 py-1 rounded border border-slate-200 dark:border-[#2A2A2A]">
            Report ID: <span className="font-bold">{report.id}</span>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111]`}>
              Status: {report.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(report.priority)}`}>
              Priority: {report.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column (Main details) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Image */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" /> Reported Damage
            </h2>
            {report.image_url ? (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#2A2A2A]">
                <img src={report.image_url} alt="Road Damage" className="w-full max-h-96 object-cover" />
                <a href={report.image_url} target="_blank" rel="noreferrer" className="block w-full text-center py-2 bg-slate-50 dark:bg-black text-sm font-bold text-blue-600 border-t border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#151515]">
                  View Full Image
                </a>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-black p-8 rounded-xl border border-dashed border-slate-300 dark:border-[#2A2A2A] text-center text-slate-500 dark:text-[#A1A1AA]">
                No damage image was uploaded.
              </div>
            )}
          </div>

          {/* Info */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
            <h2 className="text-lg font-bold mb-4">Road Damage Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-[#A1A1AA] font-bold uppercase tracking-wider mb-1">Damage Type</p>
                <p className="font-medium">{report.pothole_detected ? 'Pothole Detected' : 'Surface Damage'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-[#A1A1AA] font-bold uppercase tracking-wider mb-1">Description</p>
                <p className="font-medium">{report.risk_explanation?.join(', ') || 'No detailed description provided.'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Submitted Date</p>
                  <p className="font-medium">{new Date(report.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Submitted Time</p>
                  <p className="font-medium">{new Date(report.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" /> Location
            </h2>
            <p className="font-medium mb-4">{report.address}</p>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm font-mono bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-200 dark:border-[#2A2A2A]">
              <div>Lat: {report.latitude.toFixed(6)}</div>
              <div>Lng: {report.longitude.toFixed(6)}</div>
            </div>
            {/* Map placeholder to keep it simple, since we don't have map loaded here, we just show a button or text */}
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`} 
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center w-full py-2 bg-slate-100 dark:bg-[#151515] rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-[#2A2A2A] transition-colors border border-slate-200 dark:border-[#2A2A2A]"
            >
              View on Google Maps
            </a>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
            <h2 className="text-lg font-bold mb-6">Report Timeline</h2>
            
            {isRejected ? (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center"><CheckCircle className="w-4 h-4"/></div>
                    <div className="w-0.5 h-full bg-slate-200 dark:bg-[#2A2A2A] my-1"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-bold">Report Submitted</p>
                    <p className="text-xs text-slate-500 dark:text-[#A1A1AA]">{new Date(report.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">✕</div>
                  </div>
                  <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Report Rejected</p>
                    <p className="text-xs text-slate-500 dark:text-[#A1A1AA]">{new Date(history[history.length - 1]?.updated_at || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                {statuses.map((step, idx) => {
                  const isCompleted = idx <= currentIndex;
                  const isLast = idx === statuses.length - 1;
                  return (
                    <div key={step} className="flex gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${isCompleted ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-[#2A2A2A] text-slate-400'}`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : '○'}
                        </div>
                        {!isLast && <div className={`w-0.5 h-12 ${idx < currentIndex ? 'bg-blue-600' : 'bg-slate-200 dark:bg-[#2A2A2A]'}`}></div>}
                      </div>
                      <div className={`pb-8 pt-0.5 ${isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-[#A1A1AA]'}`}>
                        <p className="font-bold capitalize">{step.replace('_', ' ')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resolved Section */}
          {report.status === 'RESOLVED' && (
            <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-6 shadow-sm border border-green-200 dark:border-green-800">
              <h2 className="text-lg font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" /> Road Damage Resolved
              </h2>
              <div className="space-y-2 text-sm text-green-900 dark:text-green-300">
                <p><span className="font-bold">Resolution Date:</span> {new Date(history[history.length - 1]?.updated_at || Date.now()).toLocaleDateString()}</p>
                <p><span className="font-bold">Resolved By:</span> {assignment ? workers.find(w=>w.id===assignment.worker_id)?.name || assignment.worker_id : 'Unknown Worker'}</p>
                <p><span className="font-bold">Resolution Notes:</span> {history[history.length - 1]?.notes || 'No notes provided.'}</p>
              </div>
            </div>
          )}
          
          {/* Rejected Section */}
          {report.status === 'REJECTED' && (
            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 shadow-sm border border-red-200 dark:border-red-800">
              <h2 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4">Report Rejected</h2>
              <div className="space-y-2 text-sm text-red-900 dark:text-red-300">
                <p><span className="font-bold">Rejected Date:</span> {new Date(history[history.length - 1]?.updated_at || Date.now()).toLocaleDateString()}</p>
                <p><span className="font-bold">Reason:</span> {history[history.length - 1]?.notes || 'No reason provided.'}</p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Sidebar details) */}
        <div className="space-y-6">
          
          {/* AI Analysis (Visible to admin only as requested, but user said show to admin, public doesn't need admin controls. I'll show it but style it nicely) */}
          {(isAdmin || report.confidence > 0) && (
            <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" /> AI Damage Analysis
              </h2>
              
              <div className="flex items-center gap-4 mb-6 bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
                <div className="flex-1 text-center border-r border-slate-200 dark:border-[#2A2A2A]">
                  <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Risk Score</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{report.risk_score}<span className="text-lg text-slate-400">/100</span></p>
                </div>
                <div className="flex-1 flex justify-center">
                  <RiskScoreBadge score={report.risk_score} level={report.priority as any} size="lg" />
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Damage Type</span>
                  <span className="font-bold">{report.pothole_detected ? 'Pothole' : 'Surface Issue'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Severity</span>
                  <span className="font-bold">{report.severity}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">AI Confidence</span>
                  <span className="font-bold">{Math.round(report.confidence * 100)}%</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Damage Size</span>
                  <span className="font-bold">{report.estimated_size}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Traffic</span>
                  <span className="font-bold">{report.traffic_level}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Weather</span>
                  <span className="font-bold">{report.weather_risk}</span>
                </div>
              </div>
            </div>
          )}

          {/* Assigned Worker */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-600" /> Assigned Worker
            </h2>
            {assignment ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Worker ID</span>
                  <span className="font-bold">{assignment.worker_id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Worker Name</span>
                  <span className="font-bold">{workers.find(w=>w.id===assignment.worker_id)?.name || 'Unknown'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-[#2A2A2A] pb-2">
                  <span className="text-slate-500 dark:text-[#A1A1AA]">Assigned Date</span>
                  <span className="font-bold">{new Date(assignment.assigned_at!).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-[#A1A1AA] block mb-1">Task</span>
                  <span className="font-medium bg-slate-50 dark:bg-black p-2 rounded block border border-slate-100 dark:border-[#2A2A2A]">Repair reported road damage</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500 dark:text-[#A1A1AA] bg-slate-50 dark:bg-black p-4 rounded-lg border border-dashed border-slate-200 dark:border-[#2A2A2A]">
                No worker assigned yet.
              </div>
            )}
          </div>

          {/* Officer Actions (ADMIN ONLY) */}
          {isAdmin && (
            <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" /> Officer Actions
              </h2>
              
              <div className="flex flex-col gap-3">
                {report.status === 'SUBMITTED' && (
                  <button onClick={() => handleUpdateStatus('UNDER_REVIEW')} className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
                    Review Report
                  </button>
                )}
                
                {!assignment && report.status !== 'REJECTED' && (
                  <button onClick={() => setShowAssignModal(true)} className="w-full py-2 bg-slate-900 dark:bg-[#2A2A2A] text-white rounded-lg font-bold hover:bg-slate-800">
                    Assign Worker
                  </button>
                )}

                {report.status === 'IN_PROGRESS' && (
                  <button onClick={() => handleUpdateStatus('RESOLVED')} className="w-full py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">
                    Mark as Resolved
                  </button>
                )}

                {report.status !== 'REJECTED' && report.status !== 'RESOLVED' && (
                  <button onClick={() => handleUpdateStatus('REJECTED')} className="w-full py-2 bg-white dark:bg-[#151515] border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg font-bold hover:bg-red-50 dark:hover:bg-red-900/20">
                    Reject Report
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-xl max-w-md w-full border border-slate-200 dark:border-[#2A2A2A]">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Assign Repair Worker</h3>
            <form onSubmit={handleAssignWorker} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-[#A1A1AA] mb-1">Select Worker</label>
                <select 
                  className="w-full p-3 border border-slate-300 dark:border-[#2A2A2A] bg-white dark:bg-black rounded-lg"
                  value={selectedWorkerId}
                  onChange={e => setSelectedWorkerId(e.target.value)}
                  required
                >
                  <option value="">-- Choose a Worker --</option>
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.id} — {w.name} ({w.department})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-[#A1A1AA] mb-1">Task Description</label>
                <input 
                  type="text"
                  className="w-full p-3 border border-slate-300 dark:border-[#2A2A2A] bg-white dark:bg-black rounded-lg"
                  placeholder="Repair reported road damage"
                  value={taskDesc}
                  onChange={e => setTaskDesc(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-[#A1A1AA] mb-1">Expected Completion Date</label>
                <input 
                  type="date"
                  className="w-full p-3 border border-slate-300 dark:border-[#2A2A2A] bg-white dark:bg-black rounded-lg"
                  value={expDate}
                  onChange={e => setExpDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAssignModal(false)} className="flex-1 py-3 bg-slate-100 dark:bg-[#151515] rounded-lg font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold">Assign Worker</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
