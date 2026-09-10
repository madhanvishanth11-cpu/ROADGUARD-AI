import { Link } from 'react-router-dom';
import { AlertOctagon, ArrowLeft } from 'lucide-react';

export const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
          <AlertOctagon className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Access Denied
        </h2>
        <p className="mt-4 text-base text-gray-500 max-w-sm mx-auto">
          You don't have permission to access this page. If you believe this is a mistake, please contact support.
        </p>
        
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};
