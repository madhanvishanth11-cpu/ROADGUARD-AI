import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Search, RefreshCw } from 'lucide-react';
import { getReports, subscribeToReports, getStatusHistory } from '../../services/db/api';
import type { Report } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom colored icons for map
const getMarkerIcon = (priority: string) => {
  let color = 'blue';
  if (priority === 'CRITICAL') color = 'red';
  else if (priority === 'HIGH') color = 'orange';
  else if (priority === 'MEDIUM') color = 'yellow';
  else if (priority === 'LOW') color = 'green';
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [avgResolutionTime, setAvgResolutionTime] = useState<string>('N/A');

  // Filters and Search
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchReports = async () => {
    try {
      setIsRefreshing(true);
      const data = await getReports();
      // Sort by risk score descending (Critical first)
      data.sort((a, b) => b.risk_score - a.risk_score);
      setReports(data);
      
      // Calculate Average Resolution Time
      const resolved = data.filter(r => r.status === 'RESOLVED');
      if (resolved.length > 0) {
        let totalTime = 0;
        let count = 0;
        
        for (const r of resolved) {
          try {
            const history = await getStatusHistory(r.id);
            const resolvedHist = history.find(h => h.status === 'RESOLVED');
            if (resolvedHist) {
              const start = new Date(r.created_at).getTime();
              const end = new Date(resolvedHist.updated_at).getTime();
              if (end > start) {
                totalTime += (end - start);
                count++;
              }
            }
          } catch (e) {
            console.error("Failed to fetch history for time calculation", e);
          }
        }
        
        if (count > 0) {
          const avgMs = totalTime / count;
          const hours = Math.round(avgMs / (1000 * 60 * 60));
          if (hours < 24) {
            setAvgResolutionTime(`${hours} hours`);
          } else {
            setAvgResolutionTime(`${Math.round(hours / 24)} days`);
          }
        } else {
          setAvgResolutionTime('N/A');
        }
      } else {
        setAvgResolutionTime('N/A');
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // Subscribe to realtime updates
    const unsubscribe = subscribeToReports(() => {
      fetchReports();
    });
    return () => unsubscribe();
  }, []);

  const stats = useMemo(() => {
    return {
      active: reports.filter(r => r.status !== 'RESOLVED' && r.status !== 'REJECTED').length,
      inProgress: reports.filter(r => r.status === 'IN_PROGRESS').length,
      resolved: reports.filter(r => r.status === 'RESOLVED').length,
      rejected: reports.filter(r => r.status === 'REJECTED').length
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    let filtered = reports.filter(r => {
      const matchesSearch = 
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (r.address && r.address.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPriority = priorityFilter === 'ALL' || r.priority === priorityFilter;
      
      // Exclude RESOLVED from active queue unless explicitly asked
      const matchesStatus = statusFilter === 'ALL' 
        ? r.status !== 'RESOLVED' && r.status !== 'REJECTED'
        : r.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });

    // Sort by risk score descending
    filtered.sort((a, b) => {
      if (b.risk_score !== a.risk_score) return b.risk_score - a.risk_score;
      // If score is equal, newer first
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return filtered;
  }, [reports, searchQuery, priorityFilter, statusFilter]);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'REPORTED': return 'bg-gray-100 text-gray-800';
      case 'VERIFIED': return 'bg-blue-100 text-blue-800';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-800';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><RefreshCw className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">RoadGuard AI — Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor, verify and prioritize reported road damage.</p>
        </div>
        <button 
          onClick={fetchReports} 
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors self-start md:self-end disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 col-span-2 md:col-span-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Active Reports</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{stats.active}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100 bg-yellow-50/30">
          <p className="text-xs font-bold text-yellow-800 uppercase tracking-wide">In Progress</p>
          <p className="text-3xl font-black text-yellow-600 mt-1">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 bg-green-50/30">
          <p className="text-xs font-bold text-green-800 uppercase tracking-wide">Resolved</p>
          <p className="text-3xl font-black text-green-600 mt-1">{stats.resolved}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 bg-red-50/30">
          <p className="text-xs font-bold text-red-800 uppercase tracking-wide">Rejected</p>
          <p className="text-3xl font-black text-red-600 mt-1">{stats.rejected}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 bg-blue-50/30 col-span-2 md:col-span-1">
          <p className="text-xs font-bold text-blue-800 uppercase tracking-wide">Avg Resolution Time</p>
          <p className="text-xl md:text-2xl font-black text-blue-600 mt-1.5">{avgResolutionTime}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive Map */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:col-span-1 lg:order-2 h-[400px] lg:h-auto">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Incident Map</h3>
          </div>
          <div className="flex-1 relative z-0">
            <MapContainer 
              center={[13.0827, 80.2707]} // Default Chennai center
              zoom={12} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {reports.map(report => (
                <Marker 
                  key={report.id} 
                  position={[report.latitude, report.longitude]}
                  icon={getMarkerIcon(report.priority)}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong className="block mb-1">{report.id}</strong>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full block mb-2 w-max ${getPriorityColor(report.priority)}`}>
                        {report.priority} ({report.risk_score})
                      </span>
                      <p className="text-gray-600 mb-2 truncate max-w-[150px]">{report.address}</p>
                      <Link to={`/authority/report/${report.id}`} className="text-blue-600 font-medium hover:underline text-xs">
                        View Report →
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur p-3 rounded-lg shadow-md border border-gray-200 text-xs flex flex-col gap-2 pointer-events-none">
                <span className="font-bold text-gray-700 border-b border-gray-100 pb-1">Priority Legend</span>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-sm border border-red-600"></span> Critical</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm border border-orange-600"></span> High</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm border border-yellow-600"></span> Medium</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 shadow-sm border border-green-600"></span> Low</div>
              </div>
            </MapContainer>
          </div>
        </div>

        {/* Priority Reports List */}
        <div className="lg:col-span-2 lg:order-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Repair Priority Queue</h2>
            
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by ID or Location..." 
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="ALL">All Priorities</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
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

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Report ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Risk</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-sm font-medium text-gray-900">{report.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 truncate max-w-[150px]">{report.address || `${report.latitude.toFixed(2)}, ${report.longitude.toFixed(2)}`}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${getPriorityColor(report.priority)}`}>
                          {report.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <RiskScoreBadge score={report.risk_score} level={report.priority as any} size="sm" />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {new Date(report.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => navigate(`/authority/report/${report.id}`)} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors inline-flex items-center">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No reports found matching your criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono font-bold text-gray-900">{report.id}</span>
                    <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 truncate">{report.address || `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex flex-col items-start justify-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Risk Score</p>
                      <RiskScoreBadge score={report.risk_score} level={report.priority as any} size="sm" />
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex flex-col items-start justify-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Status</p>
                      <span className={`mt-1 inline-flex text-xs font-bold rounded-full ${getStatusColor(report.status).replace('bg-', 'text-').replace('text-', '')}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/authority/report/${report.id}`)} 
                    className="w-full py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors flex justify-center items-center"
                  >
                    View Report <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
              {filteredReports.length === 0 && (
                <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-xl">
                  No reports found matching your criteria.
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
