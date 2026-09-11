import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Loader2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn, profile } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      // Wait a moment to ensure state is updated
      setTimeout(() => navigate('/my-reports', { replace: true }), 100);
    } catch (err: any) {
      setError(err.message || 'Invalid demo email or password.');
      setLoading(false);
    }
  };

  // Auto redirect if profile exists
  if (profile) {
    if (profile.role === 'AUTHORITY') navigate('/authority', { replace: true });
    else navigate('/my-reports', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Demo Presentation Mode
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to the RoadGuard AI dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-red-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                  placeholder="demo@roadguard.ai"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-xs text-blue-800 border border-blue-200">
            <p className="font-bold flex items-center gap-2 mb-2 uppercase tracking-wider">
              <Info className="w-4 h-4" /> Demo Access
            </p>
            <p className="mb-1">Email: <span className="font-bold select-all">demo@roadguard.ai</span></p>
            <p>Password: <span className="font-bold select-all">RoadGuard@123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
