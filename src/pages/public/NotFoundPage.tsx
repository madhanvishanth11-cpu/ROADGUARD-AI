import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';

export const NotFoundPage = () => {
  useTitle('RoadGuard AI — Page Not Found');
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-black flex items-center justify-center p-4 transition-colors">
      <div className="max-w-md w-full text-center">
        <img 
          src="/branding/roadguard-logo.png" 
          alt="RoadGuard AI" 
          className="h-20 w-auto mx-auto mb-8 object-contain dark:bg-white dark:rounded-md dark:p-1" 
        />
        <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 dark:text-[#A1A1AA] mb-4">Page not found.</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
