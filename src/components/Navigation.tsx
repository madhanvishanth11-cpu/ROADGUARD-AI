import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';
import { useAuth } from '../contexts/AuthContext';

export const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
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
              <span className="hidden sm:inline-flex ml-2 px-2 py-0.5 bg-purple-100 border border-purple-200 text-purple-700 text-[10px] font-black rounded uppercase tracking-widest">
                Demo Mode
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {!profile || profile.role !== 'AUTHORITY' ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
                <Link to="/report" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Report Damage</Link>
                {user ? (
                  <>
                    <Link to="/my-reports" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">My Reports</Link>
                    <NotificationCenter />
                    <Link to="/profile" className="text-gray-700 hover:text-blue-600 flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors">
                      <UserIcon className="w-4 h-4" /> Profile
                    </Link>
                    <button onClick={handleSignOut} className="text-red-600 hover:text-red-700 flex items-center gap-2 px-3 py-2 text-sm font-bold transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2">
                    <UserIcon className="w-4 h-4" /> Sign In
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/authority" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Dashboard</Link>
                <Link to="/authority/analytics" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Analytics</Link>
                
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">Authority Mode</span>
                  </div>
                  <button onClick={handleSignOut} className="text-red-600 hover:text-red-700 flex items-center gap-2 px-3 py-2 text-sm font-bold transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
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
            {!profile || profile.role !== 'AUTHORITY' ? (
              <>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Home</Link>
                <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Report Damage</Link>
                {user ? (
                  <>
                    <Link to="/my-reports" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">My Reports</Link>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md flex items-center gap-2">
                      <UserIcon className="w-5 h-5" /> Profile
                    </Link>
                    <button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 text-base font-bold text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2">
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-blue-600 bg-blue-50 rounded-md mt-4 text-center">
                    Sign In / Register
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/authority" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Dashboard</Link>
                <Link to="/authority/analytics" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Analytics</Link>
                <button onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 text-base font-bold text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2 mt-4">
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
