import { Brain, Info, Activity } from 'lucide-react';
import type { PriorityLevel } from '../types';

interface AIResultCardProps {
  confidence: number;
  severity: string;
  estimatedSize?: string;
  riskScore: number;
  riskLevel: PriorityLevel;
  riskFactors: { category: string; pointsAwarded: number }[];
  isDemo?: boolean;
}

export const AIResultCard = ({
  confidence,
  severity,
  estimatedSize,
  riskScore,
  riskLevel,
  riskFactors,
  isDemo = false
}: AIResultCardProps) => {
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-blue-900">AI Analysis Results</h3>
        </div>
        {isDemo && (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg border border-purple-200">
            DEMO AI
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Confidence</p>
            <p className="text-xl font-black text-gray-900">{confidence}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Severity</p>
            <p className="text-xl font-black text-gray-900">{severity}</p>
          </div>
          {estimatedSize && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Estimated Size</p>
              <p className="text-lg font-bold text-gray-900">{estimatedSize}</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-400" />
              <h4 className="font-bold text-gray-900">Risk Assessment</h4>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(riskLevel)}`}>
              {riskLevel} PRIORITY
            </span>
          </div>

          <div className="flex items-end gap-2 mb-6">
            <span className="text-4xl font-black text-gray-900">{riskScore}</span>
            <span className="text-gray-500 font-bold mb-1">/ 100</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-600 flex items-center gap-1">
              <Info className="w-4 h-4" /> Why this score?
            </p>
            {riskFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-gray-700 font-medium">{factor.category}</span>
                <span className="font-bold text-blue-600">+{Math.round(factor.pointsAwarded)} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
