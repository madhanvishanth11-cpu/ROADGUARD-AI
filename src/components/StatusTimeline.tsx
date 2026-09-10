import React from 'react';
import type { StatusHistory } from '../types';
import { CheckCircle, Clock, XCircle, AlertCircle, Truck, ShieldCheck } from 'lucide-react';

interface StatusTimelineProps {
  history: StatusHistory[];
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ history }) => {
  if (!history || history.length === 0) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'REPORTED': return <AlertCircle className="w-5 h-5 text-gray-500" />;
      case 'VERIFIED': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'ASSIGNED': return <Truck className="w-5 h-5 text-purple-500" />;
      case 'IN_PROGRESS': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'RESOLVED': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      case 'REJECTED': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REPORTED': return 'bg-gray-100 border-gray-300';
      case 'VERIFIED': return 'bg-blue-100 border-blue-300';
      case 'ASSIGNED': return 'bg-purple-100 border-purple-300';
      case 'IN_PROGRESS': return 'bg-yellow-100 border-yellow-300';
      case 'RESOLVED': return 'bg-green-100 border-green-300';
      case 'REJECTED': return 'bg-red-100 border-red-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {history.map((hist, index) => {
        const isLast = index === history.length - 1;
        
        // Extract display notes if they contain image urls
        let displayNotes = hist.notes;
        if (hist.status === 'RESOLVED' && hist.notes?.includes('RESOLVED_IMAGE:')) {
          displayNotes = hist.notes.split('\n')[1] || 'Repair completed and verified.';
        }

        return (
          <div key={hist.id} className="relative pl-8">
            <div className="absolute left-0 top-1">
              <div className={`w-8 h-8 -ml-4 flex items-center justify-center rounded-full border-2 bg-white ${getStatusColor(hist.status)} ${isLast ? 'ring-4 ring-gray-50' : ''}`}>
                {getStatusIcon(hist.status)}
              </div>
            </div>
            {!isLast && (
              <div className="absolute left-0 top-8 bottom-[-16px] w-0.5 bg-gray-200"></div>
            )}
            <div className="pb-4">
              <p className={`text-sm font-bold ${isLast ? 'text-gray-900' : 'text-gray-500'}`}>{hist.status}</p>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">{new Date(hist.updated_at).toLocaleString()}</p>
              {displayNotes && (
                <p className={`mt-2 text-sm p-3 rounded-lg border ${hist.status === 'REJECTED' ? 'bg-red-50 border-red-100 text-red-800' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>
                  {displayNotes}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
