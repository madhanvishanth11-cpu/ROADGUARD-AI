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
      case 'CRITICAL': return 'bg-red-100 dark:bg-red-900/30 text-red-800 border-red-200 dark:border-red-800';
      case 'HIGH': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'MEDIUM': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'LOW': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return 'bg-slate-100 dark:bg-[#111111] text-slate-800 dark:text-white border-slate-200 dark:border-[#2A2A2A]';
    }
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] overflow-hidden">
      <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-blue-100 dark:border-blue-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
          <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
            <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Confidence</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{confidence}%</p>
          </div>
          <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
            <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Severity</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{severity}</p>
          </div>
          {estimatedSize && (
            <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A] col-span-2">
              <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Estimated Size</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{estimatedSize}</p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 dark:border-[#2A2A2A] pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400 dark:text-[#A1A1AA]" />
              <h4 className="font-bold text-slate-900 dark:text-white">Risk Assessment</h4>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(riskLevel)}`}>
              {riskLevel} PRIORITY
            </span>
          </div>

          <div className="flex items-end gap-2 mb-6">
            <span className="text-4xl font-black text-slate-900 dark:text-white">{riskScore}</span>
            <span className="text-slate-500 dark:text-[#A1A1AA] font-bold mb-1">/ 100</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-600 dark:text-[#A1A1AA] flex items-center gap-1">
              <Info className="w-4 h-4" /> Why this score?
            </p>
            {riskFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm p-2 bg-slate-50 dark:bg-black rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
                <span className="text-slate-700 dark:text-[#A1A1AA] font-medium">{factor.category}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">+{Math.round(factor.pointsAwarded)} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
