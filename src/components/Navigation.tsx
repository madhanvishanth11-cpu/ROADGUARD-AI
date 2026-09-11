import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (user?.role === 'ADMIN') {
      navigate('/officer-login');
    } else {
      navigate('/');
    }
  };

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
            
            {/* PUBLIC NAVIGATION */}
            {!user && (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Home</Link>
                <Link to="/report" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Report Damage</Link>
                <Link to="/track" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Track Report</Link>
                <div className="h-4 w-px bg-gray-300 mx-2"></div>
                <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 px-2 py-2 text-sm transition-colors">Public Sign In</Link>
                <Link to="/officer-login" className="text-slate-600 font-bold hover:text-slate-800 px-2 py-2 text-sm transition-colors">Officer Portal</Link>
              </>
            )}

            {/* LOGGED IN - PUBLIC */}
            {user?.role === 'PUBLIC' && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Dashboard</Link>
                <Link to="/report" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Report Damage</Link>
                <Link to="/track" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Track Report</Link>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <UserIcon className="w-4 h-4" /> {user.name}
                  </div>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-700 flex items-center gap-1 px-2 py-2 text-sm font-bold transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            )}

            {/* LOGGED IN - ADMIN */}
            {user?.role === 'ADMIN' && (
              <>
                <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Admin Dashboard</Link>
                <Link to="/analytics" className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors">Analytics</Link>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                    <Shield className="w-3 h-3 text-blue-600" /> {user.name}
                  </div>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-700 flex items-center gap-1 px-2 py-2 text-sm font-bold transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            )}

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
            
            {!user && (
              <>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Home</Link>
                <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Report Damage</Link>
                <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Track Report</Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-blue-600 hover:bg-blue-50 rounded-md">Public Sign In</Link>
                <Link to="/officer-login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-slate-700 hover:bg-slate-50 rounded-md">Officer Portal</Link>
              </>
            )}

            {user?.role === 'PUBLIC' && (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Dashboard</Link>
                <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Report Damage</Link>
                <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Track Report</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 text-base font-bold text-red-600 hover:bg-red-50 rounded-md mt-2">
                  Logout
                </button>
              </>
            )}

            {user?.role === 'ADMIN' && (
              <>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Admin Dashboard</Link>
                <Link to="/analytics" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Analytics</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 text-base font-bold text-red-600 hover:bg-red-50 rounded-md mt-2">
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};
