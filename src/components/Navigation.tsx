import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, User as UserIcon, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (user?.role === 'ADMIN') {
      navigate('/officer-login');
    } else {
      navigate('/');
    }
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-[#A1A1AA] dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );

  return (
    <nav className="bg-white/90 dark:bg-black backdrop-blur-md border-b border-gray-100 dark:border-[#2A2A2A] sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight transition-colors">RoadGuard AI</span>
              <span className="hidden sm:inline-flex ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-[10px] font-black rounded uppercase tracking-widest transition-colors">
                Public Beta
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex flex-1 items-center justify-between">
            
            {/* PUBLIC NAVIGATION */}
            {!user && (
              <>
                <div className="flex-1 flex justify-center space-x-6">
                  <Link to="/dashboard" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Dashboard</Link>
                  <Link to="/report" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Report Damage</Link>
                  <Link to="/track" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Track Report</Link>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 text-sm rounded-lg border border-blue-200 dark:border-blue-800 transition-colors">Public Sign In</Link>
                  <Link to="/officer-login" className="bg-slate-800 dark:bg-[#151515] text-white font-bold hover:bg-slate-900 dark:hover:bg-slate-600 px-4 py-2 text-sm rounded-lg transition-colors">Officer Portal</Link>
                </div>
              </>
            )}

            {/* LOGGED IN - PUBLIC */}
            {user?.role === 'PUBLIC' && (
              <>
                <div className="flex-1 flex justify-center space-x-6">
                  <Link to="/dashboard" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Dashboard</Link>
                  <Link to="/report" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Report Damage</Link>
                  <Link to="/track" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Track Report</Link>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-white bg-slate-50 dark:bg-[#111111] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#2A2A2A] transition-colors">
                    <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" /> {user.name}
                  </div>
                  <button onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            )}

            {/* LOGGED IN - ADMIN */}
            {user?.role === 'ADMIN' && (
              <>
                <div className="flex-1 flex justify-center space-x-6">
                  <Link to="/admin" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Admin Dashboard</Link>
                  <Link to="/analytics" className="text-slate-600 dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 text-sm font-medium transition-colors">Analytics</Link>
                </div>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-[#111111] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#2A2A2A] transition-colors">
                    <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" /> {user.name}
                  </div>
                  <button onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            )}

          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-100 dark:border-[#2A2A2A]">
          <div className="pt-2 pb-3 space-y-1 px-4 bg-white dark:bg-black shadow-xl transition-colors">
            
            {!user && (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Dashboard</Link>
                <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Report Damage</Link>
                <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Track Report</Link>
                <div className="border-t border-slate-100 dark:border-[#2A2A2A] my-2 pt-2"></div>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md">Public Sign In</Link>
                <Link to="/officer-login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Officer Portal</Link>
              </>
            )}

            {user?.role === 'PUBLIC' && (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Dashboard</Link>
                <Link to="/report" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Report Damage</Link>
                <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Track Report</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 text-base font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md mt-2">
                  Logout
                </button>
              </>
            )}

            {user?.role === 'ADMIN' && (
              <>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Admin Dashboard</Link>
                <Link to="/analytics" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-[#A1A1AA] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Analytics</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 text-base font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md mt-2">
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
