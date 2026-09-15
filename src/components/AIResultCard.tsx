import { Brain, Info, Activity } from 'lucide-react';
import type { PriorityLevel } from '../types';

interface AIResultCardProps {
  damageType?: string;
  confidence: number;
  severity: string;
  estimatedSize?: string;
  estimatedLength?: number;
  estimatedWidth?: number;
  estimatedArea?: number;
  estimatedDepth?: string;
  riskScore: number;
  riskLevel: PriorityLevel;
  riskFactors: { category: string; pointsAwarded: number }[];
  aiAssessment?: string;
  recommendedAction?: string;
  isDemo?: boolean;
}

export const AIResultCard = ({
  damageType,
  confidence,
  severity,
  estimatedSize,
  estimatedLength,
  estimatedWidth,
  estimatedArea,
  estimatedDepth,
  riskScore,
  riskLevel,
  riskFactors,
  aiAssessment,
  recommendedAction,
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

  const severityExplanation = () => {
    if (severity === 'CRITICAL') return "Major road failure posing severe hazard.";
    if (severity === 'HIGH') return "Large road depression that may create a safety risk.";
    if (severity === 'MEDIUM') return "Noticeable road damage affecting ride comfort.";
    return "Minor surface wear. Low immediate risk.";
  };

  // Generate progress bar for confidence
  const barCount = 20;
  const filledCount = Math.round((confidence / 100) * barCount);
  const progressBar = "█".repeat(filledCount) + "░".repeat(barCount - filledCount);

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] overflow-hidden">
      <div className="bg-blue-50 dark:bg-[#111111] px-6 py-4 border-b border-blue-100 dark:border-[#2A2A2A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-blue-900 dark:text-white text-lg">AI Road Damage Analysis</h3>
        </div>
        {isDemo && (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg border border-purple-200">
            DEMO AI
          </span>
        )}
      </div>

      <div className="p-6 space-y-6">
        
        {/* Detection Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
            <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Damage Detected</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{damageType || 'Road Damage'}</p>
          </div>
          <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
            <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Severity</p>
            <p className="text-xl font-black text-slate-900 dark:text-white mb-1">{severity}</p>
            <p className="text-xs text-slate-500 dark:text-[#A1A1AA]">{severityExplanation()}</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">AI Confidence</p>
            <p className="font-bold text-blue-600 dark:text-blue-400">{confidence}%</p>
          </div>
          <div className="font-mono text-sm text-blue-600 dark:text-blue-400 tracking-tighter opacity-80 overflow-hidden">
            {progressBar}
          </div>
        </div>

        {/* Estimated Size Card */}
        <div className="border border-slate-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden">
          <div className="bg-slate-100 dark:bg-[#151515] px-4 py-3 border-b border-slate-200 dark:border-[#2A2A2A] flex justify-between items-center">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-wider">ESTIMATED DAMAGE SIZE</h4>
            <span className="text-[10px] uppercase font-bold bg-slate-200 dark:bg-[#2A2A2A] text-slate-600 dark:text-[#A1A1AA] px-2 py-0.5 rounded">Image-based estimate</span>
          </div>
          <div className="p-4 grid grid-cols-2 gap-y-4">
            {!estimatedLength ? (
              <div className="col-span-2">
                <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mb-1">Estimated Size</p>
                <p className="font-bold text-slate-900 dark:text-white">{estimatedSize}</p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mb-1">Length</p>
                  <p className="font-bold text-slate-900 dark:text-white">{estimatedLength} m</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mb-1">Width</p>
                  <p className="font-bold text-slate-900 dark:text-white">{estimatedWidth} m</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mb-1">Estimated Area</p>
                  <p className="font-bold text-slate-900 dark:text-white">{estimatedArea} m²</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-[#A1A1AA] mb-1">Estimated Depth</p>
                  <p className="font-bold text-slate-900 dark:text-white">{estimatedDepth || 'N/A'}</p>
                </div>
              </>
            )}
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 px-4 py-3 border-t border-slate-200 dark:border-[#2A2A2A] flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-800 dark:text-amber-400">
              <strong>How is the size estimated?</strong> RoadGuard AI estimates dimensions from visible shape and proportions in the uploaded image. Measurements are approximate. Field verification is recommended before repair planning.
            </div>
          </div>
        </div>

        {/* Risk Score */}
        <div className="border border-slate-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 dark:bg-[#151515] p-2 rounded-lg">
                <Activity className="w-5 h-5 text-slate-600 dark:text-[#A1A1AA]" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">Risk Score</p>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{riskScore}</span>
                  <span className="text-slate-500 dark:text-[#A1A1AA] text-sm font-bold">/100</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">Priority</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getLevelColor(riskLevel)}`}>
                {riskLevel}
              </span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-[#151515] p-4">
            <p className="text-xs font-bold text-slate-600 dark:text-[#A1A1AA] mb-3 uppercase tracking-wider">Risk Score Breakdown</p>
            <div className="space-y-2">
              {riskFactors.map((factor, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-[#A1A1AA]">{factor.category}</span>
                  <span className="font-bold text-slate-900 dark:text-white">+{Math.round(factor.pointsAwarded)} pts</span>
                </div>
              ))}
              <div className="border-t border-slate-200 dark:border-[#2A2A2A] pt-2 mt-2 flex justify-between text-sm font-bold">
                <span className="text-slate-900 dark:text-white">Total</span>
                <span className="text-slate-900 dark:text-white">{riskScore}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment and Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
            <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-2">AI Assessment</p>
            <p className="text-sm text-slate-700 dark:text-[#A1A1AA] leading-relaxed">
              {aiAssessment || "Road damage detected in the provided image."}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Recommended Action</p>
            <p className="text-sm font-bold text-blue-900 dark:text-blue-300">
              {recommendedAction || "Inspect and schedule maintenance."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
