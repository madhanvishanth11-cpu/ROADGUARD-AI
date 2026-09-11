import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

export const OfficerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid admin demo email or password.');
    }
  };

  const useDemo = () => {
    setEmail('admin@roadguard.ai');
    setPassword('Admin@123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-slate-800 p-8 text-center border-b-4 border-blue-600">
          <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">RoadGuard AI</h2>
          <p className="text-slate-300 mt-2 text-sm font-bold tracking-wide uppercase">Officer Portal</p>
          <p className="text-slate-400 mt-1 text-xs">Monitor, verify and manage road damage reports.</p>
        </div>
        
        <div className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50"
                  placeholder="Enter admin email"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-2">
              Secure Login <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs font-bold text-blue-800 uppercase mb-2">Admin Demo Account</p>
              <p className="text-sm text-blue-900">Email: <strong>admin@roadguard.ai</strong></p>
              <p className="text-sm text-blue-900 mb-3">Password: <strong>Admin@123</strong></p>
              <button onClick={useDemo} className="w-full py-2 bg-white border border-blue-200 text-blue-800 text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Use Admin Demo Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
