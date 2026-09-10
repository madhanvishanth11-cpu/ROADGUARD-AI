import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({ beforeImage, afterImage }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-green-50 flex items-center gap-2 text-green-800">
        <ShieldCheck className="w-6 h-6 text-green-600" />
        <h3 className="font-bold text-lg">Repair Verification Evidence</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Before */}
        <div className="relative border-b md:border-b-0 md:border-r border-gray-100">
          <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            BEFORE REPAIR
          </div>
          <img 
            src={beforeImage} 
            alt="Before repair" 
            className="w-full aspect-[4/3] md:aspect-square object-cover"
          />
        </div>
        
        {/* After */}
        <div className="relative bg-gray-50 flex items-center justify-center">
          <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg">
            <ShieldCheck className="w-4 h-4" />
            AFTER REPAIR
          </div>
          <img 
            src={afterImage} 
            alt="After repair" 
            className="w-full aspect-[4/3] md:aspect-square object-cover"
          />
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          Repair evidence uploaded successfully.
        </p>
      </div>
    </div>
  );
};
