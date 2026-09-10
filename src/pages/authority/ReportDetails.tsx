import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Clock, Truck, XCircle, Calculator, Loader2 } from 'lucide-react';
import { getReports, updateReportStatus, assignReport, getStatusHistory, updateReportData, uploadReportImage } from '../../services/db/api';
import type { Report, StatusHistory } from '../../types';
import { calculateRiskScore } from '../../utils/riskScore';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import { StatusTimeline } from '../../components/StatusTimeline';
import { AssignRepairModal } from '../../components/AssignRepairModal';
import { AfterRepairUpload } from '../../components/AfterRepairUpload';
import { BeforeAfterComparison } from '../../components/BeforeAfterComparison';
import { AIResultCard } from '../../components/AIResultCard';
import { getAiProviderMode } from '../../services/ai/roadDamageAnalyzer';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export const ReportDetails = () => {
  const { id } = useParams();
  
  const [report, setReport] = useState<Report | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  // Modals & States
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Recalculation State
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [trafficLevel, setTrafficLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [locationType, setLocationType] = useState('LOCAL_ROAD');
  const [weatherRisk, setWeatherRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');

  // Modals & States
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const reports = await getReports();
      const data = reports.find(r => r.id === id);
      setReport(data || null);
      if (data) {
        setTrafficLevel(data.traffic_level as any || 'MEDIUM');
        setLocationType(data.location_type || 'LOCAL_ROAD');
        setWeatherRisk(data.weather_risk as any || 'LOW');
      }
      const historyData = await getStatusHistory(id);
      setHistory(historyData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportAndHistory = loadReport;

  useEffect(() => {
    loadReport();
  }, [id]);

  const handleVerify = async () => {
    if (!report) return;
    await updateReportStatus(report.id, 'VERIFIED', 'Verified by Authority');
    fetchReportAndHistory();
    alert('Report verified successfully.');
  };

  const handleReject = async () => {
    if (!report || !rejectReason.trim()) return;
    await updateReportStatus(report.id, 'REJECTED', `Rejected: ${rejectReason}`);
    setIsRejecting(false);
    fetchReportAndHistory();
  };


  const handleStartWork = async () => {
    try {
      await updateReportStatus(report!.id, 'IN_PROGRESS', 'Repair work has commenced.');
      await loadReport();
    } catch (err) {
      console.error(err);
      alert('Failed to start work.');
    }
  };

  const handleAfterImageUpload = async (file: File) => {
    if (!report) return;
    setIsResolving(true);
    try {
      const imageUrl = await uploadReportImage(file);
      await updateReportStatus(report.id, 'RESOLVED', `RESOLVED_IMAGE:${imageUrl}`);
      await loadReport();
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || 'Failed to resolve.');
    } finally {
      setIsResolving(false);
    }
  };

  const handleRecalculate = async () => {
    if (!report) return;
    setIsRecalculating(true);
    try {
      const newScore = calculateRiskScore({
        severity: report.severity,
        aiConfidence: report.confidence,
        estimatedSize: report.estimated_size,
        trafficLevel,
        locationType: locationType as any,
        gpsAccuracy: report.gps_accuracy,
        reportFrequency: report.nearby_reports_count || 0,
        weatherRisk
      });

      await updateReportData(report.id, {
        risk_score: newScore.score,
        risk_level: newScore.level,
        risk_factors: newScore.factors,
        risk_explanation: newScore.explanation,
        priority: newScore.level,
        traffic_level: trafficLevel,
        location_type: locationType,
        weather_risk: weatherRisk
      });
      await loadReport();
    } catch (err) {
      console.error('Failed to recalculate score:', err);
    } finally {
      setIsRecalculating(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500 flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (!report) return <div className="p-8 text-center text-red-500 font-bold text-xl h-screen flex items-center justify-center">Report not found</div>;

  // Extract after image if available from history
  const resolveHistory = history.find(h => h.status === 'RESOLVED' && h.notes?.includes('RESOLVED_IMAGE:'));
  const resolvedImageUrl = resolveHistory ? resolveHistory.notes?.split('RESOLVED_IMAGE:')[1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link to="/authority" className="text-gray-500 hover:text-blue-600 inline-flex items-center text-sm font-medium mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            Report {report.id}
            <span className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wider uppercase ${
              report.status === 'REPORTED' ? 'bg-gray-100 text-gray-800' :
              report.status === 'VERIFIED' ? 'bg-blue-100 text-blue-800' :
              report.status === 'ASSIGNED' ? 'bg-purple-100 text-purple-800' :
              report.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
              report.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
              'bg-green-100 text-green-800'
            }`}>
              {report.status}
            </span>
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {new Date(report.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details & Evidence */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Before/After Visual if Resolved */}
          {report.status === 'RESOLVED' && resolvedImageUrl ? (
            <BeforeAfterComparison beforeImage={report.image_url} afterImage={resolvedImageUrl} />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-80 bg-gray-100 relative group">
                <img src={report.image_url} alt="Road damage" className="w-full h-full object-contain bg-black/5" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm">
                  Original Citizen Photo
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Analysis */}
            <AIResultCard 
              confidence={report.confidence}
              severity={report.severity}
              estimatedSize={report.estimated_size}
              riskScore={report.risk_score}
              riskLevel={report.risk_level as any}
              riskFactors={report.risk_factors || []}
              isDemo={getAiProviderMode() === 'demo'}
            />
            
            {/* Location & Map */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location
              </h3>
              <p className="text-gray-700 font-medium text-sm mb-3">{report.address}</p>
              
              <div className="flex-1 min-h-[150px] rounded-xl overflow-hidden border border-gray-200 relative z-0">
                <MapContainer 
                  center={[report.latitude, report.longitude]} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[report.latitude, report.longitude]} />
                </MapContainer>
              </div>
              <p className="text-gray-400 text-xs mt-2 font-mono text-center">Lat: {report.latitude.toFixed(4)}, Lng: {report.longitude.toFixed(4)}</p>
            </div>
            
            {/* Risk Engine Explanation & Recalculation */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Smart Risk Assessment
                </h3>
                <RiskScoreBadge score={report.risk_score} level={report.risk_level as any} size="sm" />
              </div>

              {/* Factors Breakdown */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">Why did this report get this priority?</p>
                <div className="space-y-2">
                  {report.risk_factors && Array.isArray(report.risk_factors) ? (
                    report.risk_factors.map((factor: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{factor.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-100 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: (factor.pointsAwarded / factor.maxPoints) * 100 + '%' }}></div>
                          </div>
                          <span className="font-mono font-medium text-gray-900 w-12 text-right">{factor.pointsAwarded}/{factor.maxPoints}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Detailed factors not available for this report.</p>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2 font-bold text-gray-900">
                    <span>Total Risk Score</span>
                    <span>{report.risk_score}/100</span>
                  </div>
                </div>
              </div>

              {/* Explanations */}
              <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {report.risk_explanation?.map((exp, i) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>

              {/* Recalculation Form */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-bold text-gray-700 mb-3">Adjust Environmental Factors</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Traffic Level</label>
                    <select 
                      value={trafficLevel} 
                      onChange={(e) => setTrafficLevel(e.target.value as any)}
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="LOW">Low Traffic</option>
                      <option value="MEDIUM">Medium Traffic</option>
                      <option value="HIGH">High Traffic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Location Type</label>
                    <select 
                      value={locationType} 
                      onChange={(e) => setLocationType(e.target.value)}
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="LOCAL_ROAD">Local Road</option>
                      <option value="MAIN_ROAD">Main Road</option>
                      <option value="SCHOOL_ZONE">School Zone</option>
                      <option value="HOSPITAL_ZONE">Hospital Zone</option>
                      <option value="BUS_ROUTE">Bus Route</option>
                      <option value="HIGH_TRAFFIC_AREA">High Traffic Area</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Weather Risk</label>
                    <select 
                      value={weatherRisk} 
                      onChange={(e) => setWeatherRisk(e.target.value as any)}
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="LOW">Clear / Low</option>
                      <option value="MEDIUM">Rain / Medium</option>
                      <option value="HIGH">Flooding / High</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={handleRecalculate}
                  disabled={isRecalculating}
                  className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  {isRecalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                  Recalculate Score
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Actions & Timeline */}
        <div className="space-y-6">
          
          {/* Action Box */}
          {report.status !== 'RESOLVED' && report.status !== 'REJECTED' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Authority Actions</h3>
              
              {/* Verify / Reject */}
              {report.status === 'REPORTED' && (
                <div className="space-y-3">
                  {!isRejecting ? (
                    <>
                      <button onClick={handleVerify} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Verify Report
                      </button>
                      <button onClick={() => setIsRejecting(true)} className="w-full py-3 bg-white border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" /> Reject Report
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                      <label className="block text-sm font-bold text-gray-700">Reason for rejection:</label>
                      <textarea 
                        value={rejectReason}
                        onChange={e => setRejectReason(e.target.value)}
                        className="w-full border-gray-300 rounded-lg p-3 border focus:ring-red-500 focus:border-red-500 outline-none text-sm"
                        placeholder="e.g. Duplicate report, invalid image..."
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button onClick={handleReject} disabled={!rejectReason.trim()} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 disabled:opacity-50 text-sm">
                          Confirm Reject
                        </button>
                        <button onClick={() => setIsRejecting(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Assign Repair */}
              {report.status === 'VERIFIED' && (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">Report verified. Ready for assignment.</p>
                  <button onClick={() => setShowAssignModal(true)} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-sm flex items-center justify-center gap-2">
                    <Truck className="w-5 h-5" /> Assign Repair Team
                  </button>
                </div>
              )}
              
              {/* Start Repair */}
              {report.status === 'ASSIGNED' && (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-gray-600 font-medium">Team has been assigned. Awaiting work start.</p>
                  <button onClick={handleStartWork} className="w-full py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-sm flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" /> Start Repair
                  </button>
                </div>
              )}
              
              {/* Resolve */}
              {report.status === 'IN_PROGRESS' && (
                <div className="space-y-4">
                  <AfterRepairUpload onUpload={handleAfterImageUpload} isUploading={isResolving} />
                </div>
              )}
            </div>
          )}
          
          {/* Dynamic Timeline */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" /> Status Timeline
            </h3>
            <StatusTimeline history={history} />
          </div>

        </div>
      </div>

      {showAssignModal && (
        <AssignRepairModal 
          reportId={report.id}
          onAssign={async (assignment) => {
            await assignReport(assignment);
            await loadReport();
          }}
          onClose={() => setShowAssignModal(false)}
        />
      )}
    </div>
  );
};
