import React from 'react';

interface RiskScoreBadgeProps {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  size?: 'sm' | 'md' | 'lg';
}

export const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({ score, level, size = 'md' }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  let borderColor = 'border-gray-200';

  if (level === 'CRITICAL') {
    bgColor = 'bg-red-50';
    textColor = 'text-red-700';
    borderColor = 'border-red-200';
  } else if (level === 'HIGH') {
    bgColor = 'bg-orange-50';
    textColor = 'text-orange-700';
    borderColor = 'border-orange-200';
  } else if (level === 'MEDIUM') {
    bgColor = 'bg-yellow-50';
    textColor = 'text-yellow-700';
    borderColor = 'border-yellow-200';
  } else if (level === 'LOW') {
    bgColor = 'bg-green-50';
    textColor = 'text-green-700';
    borderColor = 'border-green-200';
  }

  if (size === 'sm') {
    return (
      <div className={`inline-flex flex-col items-center justify-center px-2 py-1 rounded border ${bgColor} ${borderColor} ${textColor}`}>
        <span className="text-xs font-bold">{score}/100</span>
        <span className="text-[9px] font-black tracking-wider leading-none uppercase">{level}</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 ${bgColor} ${borderColor} ${textColor}`}>
        <span className="text-4xl font-black">{score}<span className="text-xl font-bold opacity-70">/100</span></span>
        <span className="text-sm font-black tracking-widest mt-1 uppercase">{level}</span>
      </div>
    );
  }

  // Default md
  return (
    <div className={`inline-flex flex-col items-center justify-center px-3 py-1.5 rounded-lg border ${bgColor} ${borderColor} ${textColor}`}>
      <span className="text-lg font-black leading-none">{score}/100</span>
      <span className="text-[10px] font-bold tracking-widest mt-1 uppercase">{level}</span>
    </div>
  );
};
