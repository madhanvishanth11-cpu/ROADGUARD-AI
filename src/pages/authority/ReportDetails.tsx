import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Loader2, CheckCircle, Clock, ShieldAlert } from 'lucide-react';
import { getReportById, getWorkers, assignReport, getRepairUpdates, verifyRepair, updateReportStatus } from '../../services/db/api';
import type { Report, Worker, RepairUpdate, ReportStatus } from '../../types';

export const ReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Assignment state
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedDepartment] = useState('Road Maintenance');
  const [selectedTeam] = useState('Team A');
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [expectedCompletion, setExpectedCompletion] = useState('1 Day');
  const [isAssigning, setIsAssigning] = useState(false);

  // Verification state
  const [verificationData, setVerificationData] = useState<RepairUpdate | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, [id]);

  const loadData = async (reportId: string) => {
    try {
      setLoading(true);
      const [data, wData, updates] = await Promise.all([
        getReportById(reportId),
        getWorkers(),
        getRepairUpdates(reportId)
      ]);
      setReport(data);
      setWorkers(wData);
      if (updates && updates.length > 0) {
        setVerificationData(updates[0]); // Latest update
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status: ReportStatus) => {
    if (!report) return;
    try {
      await updateReportStatus(report.id, status, `Status changed by Admin`);
      await loadData(report.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async () => {
    if (!report || !selectedWorkerId) return;
    setIsAssigning(true);
    try {
      await assignReport({
        report_id: report.id,
        worker_id: selectedWorkerId,
        department: selectedDepartment,
        team: selectedTeam,
        assigned_by: 'Admin',
        expected_completion: expectedCompletion
      });
      await loadData(report.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleVerify = async (approved: boolean) => {
    if (!report || !verificationData) return;
    setIsVerifying(true);
    try {
      await verifyRepair(report.id, verificationData.worker_id, approved, verificationNotes);
      await loadData(report.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" /></div>;
  if (!report) return <div className="p-6 text-center text-red-500">Report not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/admin')} className="flex items-center text-slate-500 dark:text-[#A1A1AA] hover:text-blue-600 dark:text-blue-400 mb-6 font-bold">
        <ArrowLeft className="w-5 h-5 mr-1" /> Back to Dashboard
      </button>

      <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img src={report.image_url} alt="Road damage" className="w-full h-[400px] object-cover" />
          </div>
          <div className="p-6 md:w-1/2 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Report ID</p>
                <h1 className="text-2xl font-mono font-black text-slate-900 dark:text-white">{report.id}</h1>
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 font-bold text-sm rounded-full">{report.status}</span>
            </div>

            <p className="flex items-center gap-2 text-slate-600 dark:text-[#A1A1AA] mb-6 font-medium">
              <MapPin className="w-5 h-5 text-slate-400 dark:text-[#A1A1AA]" /> {report.address}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Priority</p>
                <p className="text-lg font-black text-red-700 dark:text-red-400">{report.priority}</p>
              </div>
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Severity</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">{report.severity} ({report.risk_score})</p>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-[#A1A1AA] flex items-center gap-2">
              <Clock className="w-4 h-4" /> Submitted: {new Date(report.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Admin Actions
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => handleUpdateStatus('UNDER_REVIEW')} className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-bold rounded-lg text-sm hover:bg-yellow-200">Mark Under Review</button>
            <button onClick={() => handleUpdateStatus('REJECTED')} className="px-4 py-2 bg-slate-100 dark:bg-[#111111] text-slate-700 dark:text-[#A1A1AA] font-bold rounded-lg text-sm hover:bg-gray-200">Reject Report</button>
            <button onClick={() => handleUpdateStatus('IN_PROGRESS')} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 font-bold rounded-lg text-sm hover:bg-blue-200">Mark In Progress</button>
            <button onClick={() => handleUpdateStatus('RESOLVED')} className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-bold rounded-lg text-sm hover:bg-green-200">Mark Resolved</button>
          </div>
          
          {/* ASSIGNMENT */}
          <div className="border-t border-slate-100 dark:border-[#2A2A2A] pt-6">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Assign Worker</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-[#A1A1AA] uppercase">Worker</label>
                <select value={selectedWorkerId} onChange={(e) => setSelectedWorkerId(e.target.value)} className="w-full border border-slate-300 dark:border-[#2A2A2A] rounded p-2 text-sm">
                  <option value="">-- Select Worker --</option>
                  {workers.map(w => <option key={w.id} value={w.id}>{w.name} ({w.department})</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-[#A1A1AA] uppercase">Expected Completion</label>
                <select value={expectedCompletion} onChange={(e) => setExpectedCompletion(e.target.value)} className="w-full border border-slate-300 dark:border-[#2A2A2A] rounded p-2 text-sm">
                  <option>1 Day</option><option>2 Days</option><option>3 Days</option><option>7 Days</option>
                </select>
              </div>
              <button 
                onClick={handleAssign}
                disabled={!selectedWorkerId || isAssigning}
                className="w-full mt-2 bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isAssigning ? 'Assigning...' : 'Assign Work'}
              </button>
            </div>
          </div>
        </div>

        {/* Verification */}
        {report.status === 'PENDING_VERIFICATION' && verificationData && (
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A]">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" /> Verify Completion
            </h2>
            <img src={verificationData.after_image_url} alt="Fixed" className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-200 dark:border-[#2A2A2A]" />
            <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase mb-1">Worker Notes</p>
            <p className="bg-slate-50 dark:bg-black p-3 rounded-lg border border-slate-100 dark:border-[#2A2A2A] text-sm mb-4">{verificationData.completion_notes || 'No notes provided.'}</p>
            
            <textarea 
              placeholder="Admin verification notes..." 
              className="w-full border border-slate-300 dark:border-[#2A2A2A] rounded p-2 text-sm mb-4"
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={() => handleVerify(true)} disabled={isVerifying} className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700">
                Approve Repair
              </button>
              <button onClick={() => handleVerify(false)} disabled={isVerifying} className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-lg hover:bg-red-700">
                Request Rework
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
