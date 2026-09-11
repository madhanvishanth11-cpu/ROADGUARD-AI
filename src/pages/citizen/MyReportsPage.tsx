import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReports } from '../../services/db/api';
import type { Report } from '../../types';
import { Loader2, MapPin, Activity, Clock, ChevronRight, AlertCircle, Search, Filter } from 'lucide-react';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';

export const MyReportsPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    loadMyReports();
  }, []);

  const loadMyReports = async () => {
    try {
      setLoading(true);
      const allReports = await getReports();
      const myIds: string[] = JSON.parse(localStorage.getItem('my_roadguard_reports') || '[]');
      const myReportsData = allReports.filter(r => myIds.includes(r.id)).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setReports(myReportsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesSearch = 
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (r.address && r.address.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reports, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'REPORTED': return 'bg-slate-100 dark:bg-[#111111] text-slate-800 dark:text-white border-slate-200 dark:border-[#2A2A2A]';
      case 'VERIFIED': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 border-blue-200 dark:border-blue-800/50';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'IN_PROGRESS': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'RESOLVED': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'REJECTED': return 'bg-red-100 dark:bg-red-900/30 text-red-800 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 dark:bg-[#111111] text-slate-800 dark:text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          My Submitted Reports
        </h1>
        <p className="text-slate-500 dark:text-[#A1A1AA] mt-2">Track the progress and repair status of your road damage reports.</p>
      </div>

      <div className="bg-white dark:bg-[#111111] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#A1A1AA]" />
          <input 
            type="text" 
            placeholder="Search by Report ID or Location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400 dark:text-[#A1A1AA]" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 dark:border-[#2A2A2A] rounded-lg px-3 py-2 text-sm focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="REPORTED">Reported</option>
            <option value="VERIFIED">Verified</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-[#2A2A2A] text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-700 dark:text-[#A1A1AA]">No Reports Found</h2>
          <p className="text-slate-500 dark:text-[#A1A1AA] mt-2">No reports match your current filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map(report => (
            <div key={report.id} className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-lg">{report.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-[#A1A1AA] flex items-center gap-1.5 text-sm font-medium mb-1">
                      <MapPin className="w-4 h-4 text-slate-400 dark:text-[#A1A1AA]" /> {report.address || 'GPS Location'}
                    </p>
                    <p className="text-slate-400 dark:text-[#A1A1AA] flex items-center gap-1.5 text-sm">
                      <Clock className="w-4 h-4" /> {new Date(report.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="text-center bg-slate-50 dark:bg-black px-4 py-2 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                      <p className="text-[10px] text-slate-500 dark:text-[#A1A1AA] uppercase font-bold mb-1">AI Severity</p>
                      <span className={`font-bold ${report.severity === 'CRITICAL' ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>{report.severity}</span>
                    </div>
                    <div className="text-center bg-slate-50 dark:bg-black px-4 py-2 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                      <p className="text-[10px] text-slate-500 dark:text-[#A1A1AA] uppercase font-bold mb-1">Risk Score</p>
                      <RiskScoreBadge score={report.risk_score} level={report.priority as any} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-[#2A2A2A]">
                  <button 
                    onClick={() => navigate(`/track?reportId=${report.id}`)}
                    className="w-full flex items-center justify-between text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-[#151515] px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Track Report Progress
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
