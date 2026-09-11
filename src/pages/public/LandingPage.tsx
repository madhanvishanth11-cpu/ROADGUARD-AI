import { Link } from 'react-router-dom';
import { ArrowRight, Activity, MapPin, CheckCircle, Shield, Search } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="bg-white flex flex-col min-h-[calc(100vh-64px)]">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gray-50 flex-grow flex flex-col justify-center overflow-hidden border-b border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 uppercase tracking-wider">
              <Shield className="w-4 h-4" /> PUBLIC BETA
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              Smarter Roads.<br className="hidden md:block"/> Faster Repairs.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Report road damage, track repairs, and help make roads safer with AI-powered reporting.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
              <Link to="/report" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-md transition-all hover:-translate-y-0.5">
                Report Road Damage <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/track" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-lg transition-all text-center flex items-center justify-center gap-2">
                <Search className="w-5 h-5"/> Track My Report
              </Link>
            </div>

            {/* Simple Visual Workflow */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm font-bold text-gray-500 uppercase tracking-wider mt-12">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><MapPin className="w-4 h-4 text-blue-500"/> Report</div>
              <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><Activity className="w-4 h-4 text-blue-500"/> AI Analysis</div>
              <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><CheckCircle className="w-4 h-4 text-blue-500"/> Repaired</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p className="mb-2"><strong>RoadGuard AI Platform</strong> - Designed for efficient civic management.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">Public Sign In</Link>
            <span>|</span>
            <Link to="/officer-login" className="text-slate-600 hover:underline">Officer Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
