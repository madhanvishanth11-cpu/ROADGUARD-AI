import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getReports, getStatusHistory } from '../../services/db/api';
import type { Report, StatusHistory } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import { StatusTimeline } from '../../components/StatusTimeline';
import { BeforeAfterComparison } from '../../components/BeforeAfterComparison';
import { AIResultCard } from '../../components/AIResultCard';
import { Loader2 } from 'lucide-react';
import { getAiProviderMode } from '../../services/ai/roadDamageAnalyzer';

export const CitizenReportDetail = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadReportData = async () => {
      try {
        setLoading(true);
        // Security check: only load if in my_roadguard_reports
        const myIds: string[] = JSON.parse(localStorage.getItem('my_roadguard_reports') || '[]');
        if (!reportId || !myIds.includes(reportId)) {
          setErrorMsg("Unauthorized or report not found.");
          return;
        }

        const allReports = await getReports();
        const found = allReports.find(r => r.id === reportId);
        if (!found) {
          setErrorMsg("Report not found in database.");
          return;
        }
        setReport(found);
        
        const hist = await getStatusHistory(reportId);
        setHistory(hist);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load report data.");
      } finally {
        setLoading(false);
      }
    };
    loadReportData();
  }, [reportId]);

  const getStatusExplanation = (status: string) => {
    switch (status) {
      case 'REPORTED': return "Your report has been received and is awaiting authority review.";
      case 'VERIFIED': return "Your report has been reviewed and verified by authorities.";
      case 'ASSIGNED': return "A maintenance team has been assigned to this issue.";
      case 'IN_PROGRESS': return "Repair work is currently in progress.";
      case 'RESOLVED': return "Repair has been completed and evidence has been uploaded.";
      case 'REJECTED': return "This report was rejected.";
      default: return "Status unknown.";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'REPORTED': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'VERIFIED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (errorMsg || !report) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
      <p className="text-gray-500 mb-6">{errorMsg || "We couldn't load this report."}</p>
      <Link to="/my-reports" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Back to My Reports</Link>
    </div>
  );

  // Extract after image and rejection reason if applicable
  const resolveHistory = history.find(h => h.status === 'RESOLVED' && h.notes?.includes('RESOLVED_IMAGE:'));
  const resolvedImageUrl = resolveHistory ? resolveHistory.notes?.split('RESOLVED_IMAGE:')[1] : null;
  const rejectHistory = history.find(h => h.status === 'REJECTED');
  const rejectReason = rejectHistory?.notes || "No reason provided.";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20">
      <Link to="/my-reports" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to My Reports
      </Link>
      
      {/* Top Status Card */}
      <div className={`mb-8 p-6 rounded-2xl border-2 shadow-sm ${getStatusColor(report.status).replace('text', 'text').replace('bg', 'bg').replace('border', 'border')}`}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/50 rounded-xl">
            {report.status === 'RESOLVED' ? <ShieldCheck className="w-8 h-8" /> : 
             report.status === 'REJECTED' ? <XCircle className="w-8 h-8" /> :
             <Clock className="w-8 h-8" />}
          </div>
          <div>
            <h1 className="text-2xl font-black">{report.status}</h1>
            <p className="font-medium mt-1 opacity-90">{getStatusExplanation(report.status)}</p>
            {report.status === 'REJECTED' && (
              <div className="mt-4 p-4 bg-white/60 rounded-lg">
                <p className="text-sm font-bold uppercase tracking-wider mb-1">Rejection Reason</p>
                <p className="font-medium">{rejectReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Main Visual */}
          {report.status === 'RESOLVED' && resolvedImageUrl ? (
            <BeforeAfterComparison beforeImage={report.image_url} afterImage={resolvedImageUrl} />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-72 bg-gray-100 relative">
                <img src={report.image_url} alt="Road damage" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <RiskScoreBadge score={report.risk_score} level={report.risk_level} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Report ID</p>
                    <p className="font-mono text-gray-900 font-bold">{report.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Reported On</p>
                    <p className="font-medium text-gray-900">{new Date(report.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-gray-400 mt-0.5" />
                  <p className="font-medium">{report.address || 'Location coordinates saved'}</p>
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis Info */}
          <div className="animate-in fade-in slide-in-from-bottom-3 delay-150">
            <AIResultCard 
              confidence={report.confidence}
              severity={report.severity}
              estimatedSize={report.estimated_size}
              riskScore={report.risk_score}
              riskLevel={report.risk_level as any}
              riskFactors={report.risk_factors || []}
              isDemo={getAiProviderMode() === 'demo'}
            />
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-6">Status Timeline</h3>
            <StatusTimeline history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};
