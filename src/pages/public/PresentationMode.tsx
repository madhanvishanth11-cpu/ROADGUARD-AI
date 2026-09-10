import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Brain, MapPin, Search, Activity, RefreshCw, 
  Shield, Zap, AlertTriangle, Eye, Clock, CheckCircle, Image as ImageIcon,
  ArrowDown, Play
} from 'lucide-react';
import { resetDemoData } from '../../services/db/api';
import { useState } from 'react';
import { AIResultCard } from '../../components/AIResultCard';

export const PresentationMode = () => {
  const navigate = useNavigate();
  const [isResetting, setIsResetting] = useState(false);

  const handleResetDemo = () => {
    setIsResetting(true);
    resetDemoData();
    setTimeout(() => {
      setIsResetting(false);
      navigate('/authority');
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-blue-200">
      
      {/* 12. DEMO MODE UI BADGE */}
      <div className="bg-purple-600 text-white py-2 px-4 text-center text-sm font-bold tracking-wide flex items-center justify-center gap-2 z-50 sticky top-0 shadow-md">
        <Zap className="w-4 h-4 animate-pulse" />
        DEMO MODE — Sample data is used for demonstration purposes.
      </div>

      {/* 1. DEMO LANDING */}
      <header className="bg-gray-900 text-white py-24 relative overflow-hidden flex flex-col items-center justify-center border-b-[8px] border-blue-600">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Shield className="w-[600px] h-[600px]" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            ROADGUARD AI
          </h1>
          <p className="text-2xl md:text-3xl text-blue-300 font-bold mb-4 tracking-tight">
            AI-powered road damage reporting and repair prioritization
          </p>
          <p className="text-lg md:text-xl text-gray-400 font-medium mb-12 uppercase tracking-widest flex flex-wrap justify-center gap-2">
            <span>Detect</span> <ArrowRight className="w-5 h-5 hidden sm:block" /> 
            <span>Locate</span> <ArrowRight className="w-5 h-5 hidden sm:block" /> 
            <span>Prioritize</span> <ArrowRight className="w-5 h-5 hidden sm:block" /> 
            <span>Repair</span> <ArrowRight className="w-5 h-5 hidden sm:block" /> 
            <span>Verify</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/reel" className="w-full sm:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-pink-900/50 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-pink-500/50">
              Promo Reel <Play className="w-5 h-5 fill-white" />
            </Link>
            <Link to="/presentation" className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50">
              Slide Deck <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#live-demo" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
              Live Demo <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. PROBLEM SECTION */}
      <section id="problem" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">The Problem</h2>
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Road damage is easy to report, but difficult to prioritize.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Potholes Go Unnoticed</h3>
            <p className="text-gray-600 leading-relaxed">
              Without structured reporting, dangerous road hazards remain invisible to the right departments until it's too late.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Authorities Overwhelmed</h3>
            <p className="text-gray-600 leading-relaxed">
              Municipalities receive thousands of unstructured complaints daily, making it impossible to manually assess severity.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Slow Critical Response</h3>
            <p className="text-gray-600 leading-relaxed">
              Because everything looks like a standard complaint, critical damage on high-traffic roads often waits too long for repair.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section id="how-it-works" className="py-24 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">The Solution</h2>
            <p className="text-xl text-gray-400 font-medium max-w-3xl mx-auto">
              A fully automated pipeline turning unstructured images into prioritized action.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 -translate-y-1/2 rounded-full"></div>
            
            <div className="bg-gray-800 p-6 rounded-2xl text-center border-2 border-gray-700 w-full md:w-1/4 relative z-10 hover:border-gray-500 transition-colors">
              <ImageIcon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="font-bold">Citizen Upload</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-600 rotate-90 md:rotate-0 flex-shrink-0" />
            
            <div className="bg-gray-800 p-6 rounded-2xl text-center border-2 border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] w-full md:w-1/4 relative z-10 scale-105">
              <Brain className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="font-bold text-white">AI Detection &<br/>Risk Score</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-600 rotate-90 md:rotate-0 flex-shrink-0" />
            
            <div className="bg-gray-800 p-6 rounded-2xl text-center border-2 border-gray-700 w-full md:w-1/4 relative z-10 hover:border-gray-500 transition-colors">
              <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="font-bold">Authority<br/>Priority Queue</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-600 rotate-90 md:rotate-0 flex-shrink-0" />
            
            <div className="bg-gray-800 p-6 rounded-2xl text-center border-2 border-gray-700 w-full md:w-1/4 relative z-10 hover:border-gray-500 transition-colors">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="font-bold">Evidence &<br/>Resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. DEMO AI RESULT & RISK SCORE VISUALIZATION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-widest mb-4">Core Technology</span>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">AI & Risk Scoring Engine</h2>
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Our multi-factor algorithm doesn't just see a pothole; it understands its context and danger level.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* We reuse the real AIResultCard but feed it static presentation data */}
          <AIResultCard 
            confidence={94}
            severity="CRITICAL"
            estimatedSize="Large"
            riskScore={91}
            riskLevel="CRITICAL"
            riskFactors={[
              { category: 'Severity', pointsAwarded: 30 },
              { category: 'AI Confidence', pointsAwarded: 14 },
              { category: 'Damage Size', pointsAwarded: 11 },
              { category: 'Traffic (High)', pointsAwarded: 15 },
              { category: 'Location (Hospital Zone)', pointsAwarded: 10 },
              { category: 'Repeated Reports', pointsAwarded: 10 },
              { category: 'Weather Risk (Low)', pointsAwarded: 1 },
            ]}
            isDemo={true}
          />
          <div className="mt-4 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <p className="text-blue-900 font-bold text-lg">
              "High severity damage combined with location importance and repeated reports increases repair priority."
            </p>
          </div>
        </div>
      </section>

      {/* 7 & 8. AUTHORITY PRIORITY QUEUE & REPAIR LIFECYCLE */}
      <section className="py-24 bg-gray-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Priority Queue Mockup */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-gray-900" />
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Priority Queue</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Authorities see a sorted list, ensuring the most dangerous hazards are addressed first.
              </p>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
                <div className="absolute top-2 right-2 px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded border border-gray-200">Demo Authority Queue</div>
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between text-xs font-bold text-gray-500 uppercase">
                  <span>Report ID</span>
                  <span>Risk Score</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { id: 'RG-DEMO-001', level: 'CRITICAL', score: 91, color: 'bg-red-100 text-red-800 border-red-200' },
                    { id: 'RG-DEMO-002', level: 'HIGH', score: 78, color: 'bg-orange-100 text-orange-800 border-orange-200' },
                    { id: 'RG-DEMO-003', level: 'HIGH', score: 72, color: 'bg-orange-100 text-orange-800 border-orange-200' },
                    { id: 'RG-DEMO-004', level: 'MEDIUM', score: 56, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                  ].map((row) => (
                    <div key={row.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-gray-900">{row.id}</span>
                        <span className={`mt-1 text-[10px] font-black px-2 py-0.5 rounded-full w-max uppercase border ${row.color}`}>{row.level}</span>
                      </div>
                      <div className="text-3xl font-black text-gray-900">{row.score}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Repair Lifecycle */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-8 h-8 text-gray-900" />
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Repair Lifecycle</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Every report has a traceable lifecycle. Citizens track status in real-time, holding authorities accountable.
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
                  {[
                    { status: 'REPORTED', desc: 'Citizen submits image and GPS.', color: 'bg-gray-400' },
                    { status: 'VERIFIED', desc: 'Authority confirms hazard.', color: 'bg-blue-500' },
                    { status: 'ASSIGNED', desc: 'Sent to Zone 4 Maintenance Team.', color: 'bg-purple-500' },
                    { status: 'IN PROGRESS', desc: 'Repair crew is on site.', color: 'bg-yellow-500' },
                    { status: 'RESOLVED', desc: 'After-repair evidence uploaded.', color: 'bg-green-500' },
                  ].map((step, idx) => (
                    <div key={idx} className="relative pl-8">
                      <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${step.color} border-4 border-white shadow-sm`} />
                      <h4 className="font-black text-gray-900">{step.status}</h4>
                      <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. BEFORE / AFTER EVIDENCE */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Proof of Repair</h2>
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Repair evidence is uploaded before marking the report as resolved, ensuring complete transparency.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto items-center">
          <div className="flex-1 w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 relative group">
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-black uppercase rounded shadow-md z-10">Before Repair</div>
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Pothole before repair" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-gray-500 font-bold">RG-DEMO-001</span>
                <span className="text-sm font-bold text-red-600">CRITICAL</span>
              </div>
              <p className="text-gray-900 font-medium truncate">Demo Road Area, Chennai</p>
            </div>
          </div>

          <div className="flex items-center justify-center -my-4 md:-mx-4 z-10">
            <div className="w-14 h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 rotate-90 md:rotate-0">
              <ArrowRight className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="flex-1 w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 relative group">
            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 text-xs font-black uppercase rounded shadow-md z-10">After Repair</div>
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80" alt="Road after repair" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-gray-500 font-bold">RG-DEMO-001</span>
                <span className="text-sm font-bold text-green-600">RESOLVED</span>
              </div>
              <p className="text-gray-900 font-medium truncate">Maintenance Team 4</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. IMPACT SECTION */}
      <section className="py-24 bg-blue-600 text-white text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-16 tracking-tight">Measurable Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <p className="text-blue-200 font-bold mb-3 uppercase text-sm tracking-wider">Speed</p>
              <p className="text-2xl font-black">Faster Identification</p>
            </div>
            <div>
              <p className="text-blue-200 font-bold mb-3 uppercase text-sm tracking-wider">Efficiency</p>
              <p className="text-2xl font-black">Smarter Prioritization</p>
            </div>
            <div>
              <p className="text-blue-200 font-bold mb-3 uppercase text-sm tracking-wider">Trust</p>
              <p className="text-2xl font-black">Transparent Tracking</p>
            </div>
            <div>
              <p className="text-blue-200 font-bold mb-3 uppercase text-sm tracking-wider">Accountability</p>
              <p className="text-2xl font-black">Repair Evidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE DEMO FLOW (Interactive Demo) */}
      <section id="live-demo" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Try RoadGuard AI</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the prototype interfaces for both citizens and authorities. Use the reset button to instantly restore the initial demo state.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            <Link to="/report" className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-200 transition-colors flex flex-col items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-blue-500/20">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <span className="font-bold text-gray-900 text-lg">Report Road Damage</span>
            </Link>

            <Link to="/authority" className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-purple-50 hover:border-purple-200 transition-colors flex flex-col items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-purple-500/20">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <span className="font-bold text-gray-900 text-lg">Authority Dashboard</span>
            </Link>

            <Link to="/my-reports" className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-200 transition-colors flex flex-col items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-blue-500/20">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-blue-600" />
              </div>
              <span className="font-bold text-gray-900 text-lg">View My Reports</span>
            </Link>

            <Link to="/authority/analytics" className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-purple-50 hover:border-purple-200 transition-colors flex flex-col items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-purple-500/20">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7 text-purple-600" />
              </div>
              <span className="font-bold text-gray-900 text-lg">View Analytics</span>
            </Link>
          </div>

          <button 
            onClick={handleResetDemo}
            disabled={isResetting}
            className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-gray-900/20 shadow-xl"
            aria-label="Reset Demo Data"
          >
            <RefreshCw className={`w-5 h-5 ${isResetting ? 'animate-spin' : ''}`} /> 
            {isResetting ? 'Resetting Data...' : 'Reset Demo Data'}
          </button>
          <p className="text-sm text-gray-500 mt-6 max-w-sm mx-auto">
            Resets all local reports back to the pristine 18-report demonstration state.
          </p>
        </div>
      </section>

      {/* 11. FINAL PITCH */}
      <footer className="bg-gray-900 text-white py-32 text-center px-4 border-t-8 border-blue-600">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl text-gray-400 mb-8 font-medium">
            RoadGuard AI doesn't just detect potholes.
          </p>
          <h2 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
            Detect.<br />
            Prioritize.<br />
            Track.<br />
            Verify.
          </h2>
          <p className="text-2xl md:text-3xl text-blue-400 font-bold mb-16">
            Turning road damage reports into an actionable repair workflow.
          </p>
          <Link to="/" className="inline-block px-12 py-6 bg-white text-gray-900 rounded-2xl font-black text-2xl hover:bg-gray-100 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] focus:outline-none focus:ring-4 focus:ring-white/50 hover:scale-105 active:scale-95">
            Launch RoadGuard AI
          </Link>
        </div>
      </footer>

    </div>
  );
};
