import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getReports, getStatusHistory, subscribeToReports } from '../../services/db/api';
import type { Report, StatusHistory } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  ArrowLeft, Download, RefreshCw, BarChart3, AlertTriangle, Clock, 
  ShieldCheck, Map as MapIcon, Activity, Loader2
} from 'lucide-react';

// Map markers
const getMarkerIcon = (clusterRisk: number) => {
  let color = 'blue';
  if (clusterRisk >= 85) color = 'red';
  else if (clusterRisk >= 70) color = 'orange';
  else if (clusterRisk >= 40) color = 'yellow';
  else color = 'green';
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
};

const SEVERITY_COLORS = { LOW: '#22c55e', MEDIUM: '#eab308', HIGH: '#f97316', CRITICAL: '#ef4444' };
const STATUS_COLORS = { REPORTED: '#9ca3af', VERIFIED: '#3b82f6', ASSIGNED: '#a855f7', IN_PROGRESS: '#eab308', RESOLVED: '#22c55e', REJECTED: '#ef4444' };

export const Analytics = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [historyCache, setHistoryCache] = useState<Record<string, StatusHistory[]>>({});
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Filters
  const [dateFilter, setDateFilter] = useState<number>(30); // days
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const data = await getReports();
      setReports(data);
      
      // Fetch history for resolved reports to calculate resolution time
      const resolved = data.filter(r => r.status === 'RESOLVED');
      const cache: Record<string, StatusHistory[]> = {};
      for (const r of resolved) {
        try {
          cache[r.id] = await getStatusHistory(r.id);
        } catch (e) { }
      }
      setHistoryCache(cache);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = subscribeToReports(() => fetchData());
    return () => unsubscribe();
  }, []);

  // Filter Data
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const rDate = new Date(r.created_at).getTime();
      const cutoff = new Date().getTime() - (dateFilter * 24 * 60 * 60 * 1000);
      const matchesDate = dateFilter === 0 || rDate >= cutoff;
      const matchesSeverity = severityFilter === 'ALL' || r.severity === severityFilter;
      const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
      
      return matchesDate && matchesSeverity && matchesStatus;
    });
  }, [reports, dateFilter, severityFilter, statusFilter]);

  // Derived Stats
  const stats = useMemo(() => {
    const total = filteredReports.length;
    const active = filteredReports.filter(r => r.status !== 'RESOLVED' && r.status !== 'REJECTED');
    const critical = filteredReports.filter(r => r.priority === 'CRITICAL').length;
    const high = filteredReports.filter(r => r.priority === 'HIGH').length;
    const resolved = filteredReports.filter(r => r.status === 'RESOLVED');
    const avgRisk = total > 0 ? Math.round(filteredReports.reduce((acc, r) => acc + r.risk_score, 0) / total) : 0;
    
    // Performance metrics
    let totalResTime = 0, minRes = Infinity, maxRes = 0;
    resolved.forEach(r => {
      const hist = historyCache[r.id];
      if (hist) {
        const resolvedHist = hist.find(h => h.status === 'RESOLVED');
        if (resolvedHist) {
          const time = new Date(resolvedHist.updated_at).getTime() - new Date(r.created_at).getTime();
          if (time > 0) {
            totalResTime += time;
            minRes = Math.min(minRes, time);
            maxRes = Math.max(maxRes, time);
          }
        }
      }
    });

    const msToHours = (ms: number) => ms === Infinity ? 'N/A' : (ms / (1000 * 60 * 60)).toFixed(1);
    
    return {
      total,
      active: active.length,
      critical,
      high,
      resolved: resolved.length,
      avgRisk,
      resRate: total > 0 ? Math.round((resolved.length / total) * 100) : 0,
      avgResTime: resolved.length > 0 && totalResTime > 0 ? msToHours(totalResTime / resolved.length) : 'N/A',
      fastestRes: minRes !== Infinity ? msToHours(minRes) : 'N/A',
      longestRes: maxRes > 0 ? msToHours(maxRes) : 'N/A'
    };
  }, [filteredReports, historyCache]);

  // Charts Data
  const severityData = useMemo(() => {
    const counts = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
    filteredReports.forEach(r => { if (counts[r.severity as keyof typeof counts] !== undefined) counts[r.severity as keyof typeof counts]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredReports]);

  const statusData = useMemo(() => {
    const counts = { REPORTED: 0, VERIFIED: 0, ASSIGNED: 0, IN_PROGRESS: 0, RESOLVED: 0, REJECTED: 0 };
    filteredReports.forEach(r => { if (counts[r.status as keyof typeof counts] !== undefined) counts[r.status as keyof typeof counts]++; });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [filteredReports]);

  const trendData = useMemo(() => {
    const dates: Record<string, { total: number, critical: number }> = {};
    filteredReports.forEach(r => {
      const date = new Date(r.created_at).toLocaleDateString();
      if (!dates[date]) dates[date] = { total: 0, critical: 0 };
      dates[date].total++;
      if (r.priority === 'CRITICAL' || r.priority === 'HIGH') dates[date].critical++;
    });
    return Object.entries(dates).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()).map(([date, data]) => ({ date, ...data }));
  }, [filteredReports]);

  // Hotspot Clustering (simple distance-based)
  const hotspots = useMemo(() => {
    const clusters: any[] = [];
    const threshold = 0.005; // roughly 500m
    
    filteredReports.forEach(report => {
      let added = false;
      for (const cluster of clusters) {
        const dx = cluster.lat - report.latitude;
        const dy = cluster.lng - report.longitude;
        if (Math.sqrt(dx*dx + dy*dy) < threshold) {
          cluster.reports.push(report);
          cluster.lat = (cluster.lat * (cluster.reports.length - 1) + report.latitude) / cluster.reports.length;
          cluster.lng = (cluster.lng * (cluster.reports.length - 1) + report.longitude) / cluster.reports.length;
          added = true;
          break;
        }
      }
      if (!added) {
        clusters.push({ lat: report.latitude, lng: report.longitude, reports: [report] });
      }
    });

    return clusters.filter(c => c.reports.length >= 2).map((c, i) => {
      const avgRisk = c.reports.reduce((a: number, r: any) => a + r.risk_score, 0) / c.reports.length;
      const active = c.reports.filter((r: any) => r.status !== 'RESOLVED' && r.status !== 'REJECTED').length;
      return { id: `HS-${i+1}`, ...c, avgRisk, active };
    }).sort((a, b) => b.avgRisk - a.avgRisk);
  }, [filteredReports]);

  // CSV Export
  const exportCSV = () => {
    if (filteredReports.length === 0) return;
    
    const headers = ['Report ID', 'Date', 'Latitude', 'Longitude', 'Severity', 'Risk Score', 'Status', 'Location'];
    const rows = filteredReports.map(r => [
      r.id,
      new Date(r.created_at).toISOString(),
      r.latitude,
      r.longitude,
      r.severity,
      r.risk_score,
      r.status,
      `"${r.address || ''}"`
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `roadguard_analytics_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link to="/authority" className="text-gray-500 hover:text-blue-600 inline-flex items-center text-sm font-medium mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-600" /> Analytics Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Data-driven insights for road maintenance prioritization.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <p className="text-xs text-gray-400 hidden sm:block">
            Updated: {lastUpdated.toLocaleTimeString()}
          </p>
          <button onClick={fetchData} disabled={isRefreshing} className="p-2 border border-gray-300 rounded-lg hover:bg-white text-gray-600 transition-colors">
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={exportCSV} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Timeframe</label>
          <select value={dateFilter} onChange={e => setDateFilter(Number(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 outline-none">
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
            <option value={0}>All Time</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Severity</label>
          <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 outline-none">
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 outline-none">
            <option value="ALL">All Statuses</option>
            <option value="REPORTED">Reported</option>
            <option value="VERIFIED">Verified</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase">Total Reports</p>
          <p className="text-3xl font-black text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase">Active</p>
          <p className="text-3xl font-black text-blue-600 mt-2">{stats.active}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 bg-red-50/30">
          <p className="text-xs font-bold text-red-800 uppercase">Critical</p>
          <p className="text-3xl font-black text-red-600 mt-2">{stats.critical}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 bg-orange-50/30">
          <p className="text-xs font-bold text-orange-800 uppercase">High Priority</p>
          <p className="text-3xl font-black text-orange-600 mt-2">{stats.high}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 bg-green-50/30">
          <p className="text-xs font-bold text-green-800 uppercase">Resolved</p>
          <p className="text-3xl font-black text-green-600 mt-2">{stats.resolved}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 bg-purple-50/30">
          <p className="text-xs font-bold text-purple-800 uppercase">Avg Risk Score</p>
          <p className="text-3xl font-black text-purple-600 mt-2">{stats.avgRisk}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Severity Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-gray-400"/> Severity Distribution</h3>
          {stats.total > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" nameKey="name">
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SEVERITY_COLORS[entry.name as keyof typeof SEVERITY_COLORS] || '#ccc'} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <p className="text-center text-gray-400 italic py-10">No data available.</p>}
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-gray-400"/> Status Pipeline</h3>
          {stats.total > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-25} textAnchor="end" height={60} />
                  <YAxis allowDecimals={false} />
                  <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || '#ccc'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : <p className="text-center text-gray-400 italic py-10">No data available.</p>}
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-gray-400"/> Report Trends Over Time</h3>
        {trendData.length > 0 ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{fontSize: 12}} />
                <YAxis allowDecimals={false} />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="Total Reports" dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} name="High/Critical Priority" dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : <p className="text-center text-gray-400 italic py-10">No data available.</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hotspots Map */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><MapIcon className="w-5 h-5 text-gray-400"/> Damage Hotspots</h3>
          <div className="h-[400px] rounded-xl overflow-hidden border border-gray-200">
            {hotspots.length > 0 ? (
              <MapContainer center={[13.0827, 80.2707]} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {hotspots.map((spot, i) => (
                  <Marker key={i} position={[spot.lat, spot.lng]} icon={getMarkerIcon(spot.avgRisk)}>
                    <Popup>
                      <div className="text-sm">
                        <strong className="block mb-1">{spot.id} ({spot.reports.length} reports)</strong>
                        <p>Avg Risk: <strong>{Math.round(spot.avgRisk)}</strong></p>
                        <p>Active: <strong className="text-red-600">{spot.active}</strong></p>
                        <button onClick={() => navigate(`/authority/report/${spot.reports[0].id}`)} className="mt-2 text-xs text-blue-600 font-bold hover:underline">
                          View Nearest Report
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400 italic">Insufficient data to identify hotspots.</div>
            )}
          </div>
        </div>

        {/* Repair Performance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-gray-400"/> Repair Performance</h3>
          
          <div className="space-y-6 flex-1">
            <div>
              <p className="text-sm text-gray-500 font-medium">Resolution Rate</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-4xl font-black text-gray-900">{stats.resRate}%</span>
                <span className="text-sm text-gray-500 mb-1">{stats.resolved} of {stats.total} resolved</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-3">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.resRate}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold">Avg Time</p>
                <p className="text-xl font-black text-gray-900 mt-1">{stats.avgResTime} {stats.avgResTime !== 'N/A' && 'hrs'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold">Fastest</p>
                <p className="text-xl font-black text-green-600 mt-1">{stats.fastestRes} {stats.fastestRes !== 'N/A' && 'hrs'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2">
                <p className="text-xs text-gray-500 uppercase font-bold">Longest Resolution</p>
                <p className="text-xl font-black text-red-600 mt-1">{stats.longestRes} {stats.longestRes !== 'N/A' && 'hrs'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
