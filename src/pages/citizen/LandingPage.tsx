import { Link } from 'react-router-dom';
import { ArrowRight, Activity, MapPin, CheckCircle, Wrench, Shield, Search, Brain, FileCheck } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gray-50 pt-20 pb-24 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 uppercase tracking-wider">
              <Shield className="w-4 h-4" /> Civic Technology
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              ROADGUARD AI
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              AI-powered road damage reporting and repair prioritization.
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              From pothole detection to repair tracking — RoadGuard AI helps turn road damage reports into prioritized, trackable action.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
              <Link to="/report" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-sm transition-colors">
                Report Road Damage <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/demo" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-lg transition-all text-center">
                Explore Demo
              </Link>
            </div>

            {/* Simple Visual Workflow */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><Search className="w-4 h-4 text-blue-500"/> Detect</div>
              <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><MapPin className="w-4 h-4 text-blue-500"/> Locate</div>
              <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><Activity className="w-4 h-4 text-blue-500"/> Prioritize</div>
              <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><Wrench className="w-4 h-4 text-blue-500"/> Repair</div>
              <ArrowRight className="w-4 h-4 text-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"><CheckCircle className="w-4 h-4 text-blue-500"/> Verify</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-6">The Reporting Gap</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            Road damage is often reported without enough information about severity, location, or urgency. RoadGuard AI bridges the gap between citizens and authorities.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-8 max-w-5xl mx-auto">
            <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Citizen</h3>
              <p className="text-sm text-gray-500">Easily reports damage with mobile camera and GPS.</p>
            </div>
            
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-300" />
            </div>

            <div className="flex-1 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center relative top-0 md:-top-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-sm mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-blue-900 mb-2">AI Engine</h3>
              <p className="text-sm text-blue-700">Analyzes image, calculates Risk Score, prioritizes urgency.</p>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-300" />
            </div>

            <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Wrench className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Authority</h3>
              <p className="text-sm text-gray-500">Manages high-priority queue, assigns teams, verifies repair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">How It Works</h2>
            <p className="text-gray-400">A transparent, structured workflow from report to resolution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-2xl font-black text-gray-600 mb-4">01</div>
              <Search className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Capture</h3>
              <p className="text-sm text-gray-400">Citizen uploads photo and exact GPS coordinates.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-2xl font-black text-gray-600 mb-4">02</div>
              <Brain className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">AI Detects</h3>
              <p className="text-sm text-gray-400">Model identifies damage presence, type, and bounds.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-2xl font-black text-gray-600 mb-4">03</div>
              <Activity className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Risk Score</h3>
              <p className="text-sm text-gray-400">Multi-factor engine calculates severity and priority.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-2xl font-black text-gray-600 mb-4">04</div>
              <Wrench className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Authority Repairs</h3>
              <p className="text-sm text-gray-400">Teams dispatched to critical hotspots rapidly.</p>
            </div>

            {/* Step 5 */}
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="text-2xl font-black text-gray-600 mb-4">05</div>
              <FileCheck className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Before / After</h3>
              <p className="text-sm text-gray-400">Resolution verified with visual post-repair evidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p className="mb-2"><strong>Demo Project</strong> - Not affiliated with any official government entity.</p>
          <p>Built for Engineers Day Challenge</p>
        </div>
      </footer>
    </div>
  );
};
