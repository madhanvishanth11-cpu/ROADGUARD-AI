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
      case 'REPORTED': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'VERIFIED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
          <Activity className="w-8 h-8 text-blue-600" />
          My Submitted Reports
        </h1>
        <p className="text-gray-500 mt-2">Track the progress and repair status of your road damage reports.</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Report ID or Location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 outline-none"
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
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-700">No Reports Found</h2>
          <p className="text-gray-500 mt-2">No reports match your current filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map(report => (
            <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-gray-900 text-lg">{report.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-gray-600 flex items-center gap-1.5 text-sm font-medium mb-1">
                      <MapPin className="w-4 h-4 text-gray-400" /> {report.address || 'GPS Location'}
                    </p>
                    <p className="text-gray-400 flex items-center gap-1.5 text-sm">
                      <Clock className="w-4 h-4" /> {new Date(report.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="text-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">AI Severity</p>
                      <span className={`font-bold ${report.severity === 'CRITICAL' ? 'text-red-600' : 'text-gray-900'}`}>{report.severity}</span>
                    </div>
                    <div className="text-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Risk Score</p>
                      <RiskScoreBadge score={report.risk_score} level={report.priority as any} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <button 
                    onClick={() => navigate(`/my-reports/${report.id}`)}
                    className="w-full flex items-center justify-between text-blue-600 font-bold hover:bg-blue-50 px-4 py-2.5 rounded-xl transition-colors"
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
