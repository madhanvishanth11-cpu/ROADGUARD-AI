import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">RoadGuard AI</span>
              <span className="hidden sm:inline-flex ml-2 px-2 py-0.5 bg-green-100 border border-green-200 text-green-700 text-[10px] font-black rounded uppercase tracking-widest">
                Public Beta
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4 lg:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Dashboard</Link>
            <Link to="/report" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Report Damage</Link>
            <Link to="/track" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Track Report</Link>
            
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            
            {/* Internal tools links for easy testing */}
            <Link to="/officer" className="text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded text-xs font-bold transition-colors">Officer Portal</Link>
            <Link to="/worker" className="text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded text-xs font-bold transition-colors">Worker App</Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1 px-4 bg-white shadow-xl">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Public Dashboard</Link>
            <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Report Damage</Link>
            <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Track Report</Link>
            <div className="border-t border-gray-100 my-2 pt-2">
              <Link to="/officer" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-md">Officer Portal</Link>
              <Link to="/worker" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-blue-700 hover:bg-blue-50 rounded-md">Worker App</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
