import { useEffect, useState, useMemo } from 'react';
import { getReports, getWorkers, assignReport, getRepairUpdates, verifyRepair } from '../../services/db/api';
import type { Report, Worker, RepairUpdate } from '../../types';
import { Search, MapPin, XCircle, Loader2 } from 'lucide-react';

export const OfficerDashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Selection state
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [viewMode, setViewMode] = useState<'DETAILS' | 'ASSIGN' | 'VERIFY'>('DETAILS');
  const [verificationData, setVerificationData] = useState<RepairUpdate | null>(null);
  
  // Assignment state
  const [selectedDepartment, setSelectedDepartment] = useState('Road Maintenance');
  const [selectedTeam, setSelectedTeam] = useState('Team A');
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [expectedCompletion, setExpectedCompletion] = useState('1 Day');
  const [isAssigning, setIsAssigning] = useState(false);

  // Verification state
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reportsData, workersData] = await Promise.all([
        getReports(),
        getWorkers()
      ]);
      setReports(reportsData);
      setWorkers(workersData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedReport || !selectedWorkerId) return;
    setIsAssigning(true);
    try {
      await assignReport({
        report_id: selectedReport.id,
        worker_id: selectedWorkerId,
        department: selectedDepartment,
        team: selectedTeam,
        assigned_by: 'Officer (Demo)',
        expected_completion: expectedCompletion
      });
      await fetchData();
      setSelectedReport(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleVerify = async (approved: boolean) => {
    if (!selectedReport || !verificationData) return;
    setIsVerifying(true);
    try {
      await verifyRepair(selectedReport.id, verificationData.worker_id, approved, verificationNotes);
      await fetchData();
      setSelectedReport(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const openVerification = async (report: Report) => {
    setSelectedReport(report);
    setViewMode('VERIFY');
    try {
      const updates = await getRepairUpdates(report.id);
      if (updates.length > 0) {
        setVerificationData(updates[0]); // latest
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredWorkers = useMemo(() => {
    return workers.filter(w => w.department === selectedDepartment && w.team === selectedTeam);
  }, [workers, selectedDepartment, selectedTeam]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-slate-900 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Government Officer Portal</h1>
            <p className="text-slate-400 text-sm mt-1">RoadGuard AI Management</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Reports List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Active Reports Queue</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="p-3">Report ID</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Priority</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reports.filter(r => r.status !== 'RESOLVED').map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono text-sm font-bold text-slate-700">{r.id}</td>
                      <td className="p-3 text-sm text-gray-600 truncate max-w-[150px]"><MapPin className="w-3 h-3 inline mr-1"/>{r.address}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs font-bold rounded ${r.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' : r.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {r.priority}
                        </span>
                      </td>
                      <td className="p-3 text-xs font-bold text-slate-500">{r.status}</td>
                      <td className="p-3 text-right">
                        {r.status === 'PENDING_VERIFICATION' ? (
                          <button onClick={() => openVerification(r)} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded shadow-sm">
                            Verify Work
                          </button>
                        ) : (
                          <button onClick={() => { setSelectedReport(r); setViewMode(r.status === 'SUBMITTED' ? 'ASSIGN' : 'DETAILS'); }} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded shadow-sm">
                            Manage
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Details / Assign Panel */}
        <div className="lg:col-span-1">
          {selectedReport ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
                <h3 className="font-bold">Report Details</h3>
                <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-white"><XCircle className="w-5 h-5"/></button>
              </div>
              
              <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                <img src={selectedReport.image_url} alt="Damage" className="w-full h-48 object-cover rounded-lg mb-4 bg-gray-100" />
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Report ID</p>
                    <p className="font-mono text-sm font-bold">{selectedReport.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                    <p className="text-sm font-bold text-blue-600">{selectedReport.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">AI Severity</p>
                    <p className="text-sm font-bold">{selectedReport.severity} ({selectedReport.risk_score}/100)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Priority</p>
                    <p className="text-sm font-bold text-red-600">{selectedReport.priority}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Location</p>
                  <p className="text-sm bg-gray-50 p-2 rounded border border-gray-100">{selectedReport.address}</p>
                </div>

                {/* VERIFICATION MODE */}
                {viewMode === 'VERIFY' && verificationData && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-bold text-gray-800 mb-3">Verification Details</h4>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">After Repair Image</p>
                    {verificationData.after_image_url ? (
                      <img src={verificationData.after_image_url} alt="Fixed" className="w-full h-48 object-cover rounded-lg mb-3 border-2 border-green-200" />
                    ) : (
                      <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500 mb-3">No image provided</div>
                    )}
                    
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Worker Notes</p>
                    <p className="text-sm bg-gray-50 p-2 rounded border border-gray-100 mb-4">{verificationData.completion_notes || 'None'}</p>

                    <textarea 
                      placeholder="Officer feedback/notes..." 
                      className="w-full border border-gray-300 rounded p-2 text-sm mb-4"
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                    ></textarea>

                    <div className="flex gap-2">
                      <button onClick={() => handleVerify(true)} disabled={isVerifying} className="flex-1 bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 flex justify-center">
                        {isVerifying ? <Loader2 className="w-4 h-4 animate-spin"/> : 'Approve Repair'}
                      </button>
                      <button onClick={() => handleVerify(false)} disabled={isVerifying} className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700">
                        Request Rework
                      </button>
                    </div>
                  </div>
                )}

                {/* ASSIGNMENT MODE */}
                {(viewMode === 'ASSIGN' || selectedReport.status === 'SUBMITTED' || selectedReport.status === 'UNDER_REVIEW') && viewMode !== 'VERIFY' && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-bold text-gray-800 mb-3">Assign Work</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase">Department</label>
                        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm">
                          <option>Road Maintenance</option>
                          <option>Municipal Corporation</option>
                          <option>Highway Maintenance</option>
                          <option>Emergency Road Repair</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase">Team</label>
                        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm">
                          <option>Team A</option>
                          <option>Team B</option>
                          <option>Team C</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase">Worker</label>
                        <select value={selectedWorkerId} onChange={(e) => setSelectedWorkerId(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm">
                          <option value="">-- Select Worker --</option>
                          {filteredWorkers.map(w => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-600 uppercase">Expected Completion</label>
                        <select value={expectedCompletion} onChange={(e) => setExpectedCompletion(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm">
                          <option>1 Day</option>
                          <option>2 Days</option>
                          <option>3 Days</option>
                          <option>7 Days</option>
                        </select>
                      </div>

                      <button 
                        onClick={handleAssign}
                        disabled={!selectedWorkerId || isAssigning}
                        className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 flex justify-center"
                      >
                        {isAssigning ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Assign Work'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl h-64 flex flex-col items-center justify-center text-slate-400">
              <Search className="w-12 h-12 mb-2 opacity-50" />
              <p className="font-medium">Select a report to manage</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
