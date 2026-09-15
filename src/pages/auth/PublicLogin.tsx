import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const PublicLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginPublic } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPublic(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleDemoLogin = () => {
    if (loginPublic('demo@roadguard.ai', 'RoadGuard@123')) {
      navigate('/dashboard');
    }
  };

  const useDemo = () => {
    setEmail('demo@roadguard.ai');
    setPassword('RoadGuard@123');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-black flex items-center justify-center p-4 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] overflow-hidden transition-colors">
        <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center transition-colors">
          <img 
            src="/branding/roadguard-logo.png" 
            alt="RoadGuard AI" 
            className="h-16 w-auto mx-auto mb-4 object-contain bg-white rounded-md p-1" 
          />
          <span className="inline-block px-2 py-0.5 bg-blue-800 text-blue-100 text-[10px] font-black rounded uppercase tracking-widest mb-2">Public Beta</span>
          <h2 className="text-2xl font-black text-white">Demo Citizen Login</h2>
          <p className="text-blue-100 mt-2 text-sm">Sign in to report road damage and track your reports.</p>
        </div>
        
        <div className="p-6">
          {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-bold mb-4 border border-red-200 dark:border-red-900/50">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-[#A1A1AA] mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#A1A1AA] w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-slate-300 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-[#A1A1AA] mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#A1A1AA] w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black border border-slate-300 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button type="button" onClick={useDemo} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline w-full text-right">
              Use Demo Credentials
            </button>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg shadow-sm transition-transform hover:-translate-y-1"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-[#2A2A2A] pt-6">
            <button 
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-black dark:hover:bg-slate-950 text-slate-700 dark:text-[#A1A1AA] py-3 rounded-xl font-bold border border-slate-200 dark:border-[#2A2A2A] transition-colors"
            >
              1-Click Demo Login <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
