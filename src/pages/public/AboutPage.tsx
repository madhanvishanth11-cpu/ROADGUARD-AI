import { useState, useEffect } from 'react';
import { useTitle } from '../../hooks/useTitle';
import { 
  ChevronLeft, ChevronRight, CheckCircle, Shield, Clock, Brain, 
  MapPin, Camera, AlertTriangle, ArrowRight,
  Users, Activity, Building2, EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  useTitle('RoadGuard AI — Project Explanation');
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slides = [
    // 01
    (
      <div className="flex flex-col items-center justify-center text-center h-full space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-black uppercase tracking-widest shadow-sm">
          ENGINEERS DAY INNOVATION CHALLENGE 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">ROADGUARD AI</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-[#A1A1AA]">Smart Pothole Detection & Road Repair Priority System</h2>
        <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 italic">"Smarter Roads. Faster Repairs. Safer Communities."</p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-[#2A2A2A]">
          <span className="font-bold text-slate-500 dark:text-[#A1A1AA] flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" /> Civic-Tech Prototype</span>
          <span className="text-slate-300 dark:text-[#2A2A2A]">•</span>
          <span className="font-bold text-slate-500 dark:text-[#A1A1AA] flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-500" /> Smart Municipal Infrastructure</span>
          <span className="text-slate-300 dark:text-[#2A2A2A]">•</span>
          <span className="font-bold text-slate-500 dark:text-[#A1A1AA] flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500" /> Decision-Support System</span>
        </div>
      </div>
    ),
    // 02
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">The Problem We See Every Day</h2>
        
        <div className="grid md:grid-cols-2 gap-8 flex-1">
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-black uppercase tracking-widest rounded mb-6 w-max">
              <AlertTriangle className="w-4 h-4" /> REAL-WORLD IMPACT
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Unchecked Road Hazards</h3>
            <p className="text-slate-600 dark:text-[#A1A1AA] mb-6 font-medium leading-relaxed">
              Potholes, surface cracks, and road degradation are chronic urban hazards that trigger immediate and compounding risks:
            </p>
            <ul className="space-y-4 mb-6 flex-1">
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">✕</div>
                Severe safety risks for two-wheelers and vulnerable road users
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">✕</div>
                Frequent vehicle suspension damage and tire blowouts
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">✕</div>
                Unpredictable traffic bottlenecks and secondary collisions
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">✕</div>
                Citizens trapped in repeated, unanswered grievance cycles
              </li>
            </ul>
            <div className="bg-red-50 dark:bg-red-900/10 p-4 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-red-900 dark:text-red-300 font-bold">
                Core Insight: <span className="font-medium">Reporting a pothole is simple; triaging, prioritizing, and executing repairs in time is the true bottleneck.</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col justify-center">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Fragmented Lifecycle of Current Complaints</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-black rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
                <div className="w-8 h-8 rounded bg-slate-200 dark:bg-[#151515] text-slate-700 dark:text-[#A1A1AA] font-black flex items-center justify-center flex-shrink-0">1</div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Citizen encounters damage & files unstructured complaint</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-black rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
                <div className="w-8 h-8 rounded bg-slate-200 dark:bg-[#151515] text-slate-700 dark:text-[#A1A1AA] font-black flex items-center justify-center flex-shrink-0">2</div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Complaint rests in unranked municipal grievance inbox</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-black rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
                <div className="w-8 h-8 rounded bg-slate-200 dark:bg-[#151515] text-slate-700 dark:text-[#A1A1AA] font-black flex items-center justify-center flex-shrink-0">3</div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Slow physical verification; priority difficult to objectively evaluate</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-black rounded-lg border border-slate-100 dark:border-[#2A2A2A]">
                <div className="w-8 h-8 rounded bg-slate-200 dark:bg-[#151515] text-slate-700 dark:text-[#A1A1AA] font-black flex items-center justify-center flex-shrink-0">4</div>
                <p className="font-bold text-slate-700 dark:text-slate-300">Delayed contractor assignment; citizen has zero progress visibility</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    // 03
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4">Gaps in Current Road Management</h2>
        <p className="text-lg text-slate-600 dark:text-[#A1A1AA] mb-12 font-medium">Common systemic challenges observed across conventional municipal road-damage grievance frameworks:</p>
        
        <div className="grid md:grid-cols-3 gap-6 flex-1">
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border-t-4 border-amber-400 border-x border-b border-slate-200 dark:border-x-[#2A2A2A] dark:border-b-[#2A2A2A] shadow-sm flex flex-col justify-center">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">Unstructured Intake</h3>
            <p className="text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">
              Citizens submit arbitrary photos with varying angles, lighting, and vague text descriptions. Duplicate reports accumulate without clustering, overwhelming municipal admin desks.
            </p>
          </div>
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border-t-4 border-red-500 border-x border-b border-slate-200 dark:border-x-[#2A2A2A] dark:border-b-[#2A2A2A] shadow-sm flex flex-col justify-center">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl flex items-center justify-center mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">Subjective Triage</h3>
            <p className="text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">
              Without automated severity or risk modeling, a dangerous deep pothole on an arterial corridor may receive the exact same administrative queue priority as minor cosmetic spalling.
            </p>
          </div>
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border-t-4 border-blue-600 border-x border-b border-slate-200 dark:border-x-[#2A2A2A] dark:border-b-[#2A2A2A] shadow-sm flex flex-col justify-center">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">Disconnected Dispatch</h3>
            <p className="text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">
              Grievance software remains separated from field crew dispatch and material estimating. Citizens receive no status updates, breeding cynicism and redundant follow-up calls.
            </p>
          </div>
        </div>
      </div>
    ),
    // 04
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Introducing RoadGuard AI</h2>
        
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm mb-8">
          <div className="inline-flex px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-black uppercase tracking-widest rounded mb-4">
            THE CORE VISION
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-400 mb-4 leading-tight">
            "Turn a road complaint into an actionable, prioritized repair workflow."
          </h3>
          <p className="text-slate-700 dark:text-slate-300 font-medium text-lg leading-relaxed max-w-4xl">
            RoadGuard AI integrates citizen crowdsourcing, computer vision damage assessment, dynamic risk-weighted scoring, municipal engineer verification, and worker dispatch into one transparent platform.
          </p>
        </div>
        
        <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex-1 flex flex-col">
          <h4 className="text-center font-black text-slate-500 dark:text-[#A1A1AA] tracking-widest uppercase mb-10">UNIFIED CLOSED-LOOP ECOSYSTEM</h4>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-1 pb-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-black rounded-2xl flex items-center justify-center mb-4 border border-slate-200 dark:border-[#2A2A2A]">
                <Camera className="w-8 h-8 text-slate-700 dark:text-slate-300" />
              </div>
              <h5 className="font-black text-slate-900 dark:text-white">Citizen</h5>
              <p className="text-sm text-slate-500 dark:text-[#A1A1AA] font-medium">Snap & Report</p>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-slate-300 dark:text-[#2A2A2A]" />
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-900/50">
                <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h5 className="font-black text-blue-700 dark:text-blue-400">RoadGuard AI</h5>
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70 font-medium">Assess & Prioritize</p>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-slate-300 dark:text-[#2A2A2A]" />
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-900/50">
                <Shield className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h5 className="font-black text-slate-900 dark:text-white">Ward Officer</h5>
              <p className="text-sm text-slate-500 dark:text-[#A1A1AA] font-medium">Verify & Approve</p>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-slate-300 dark:text-[#2A2A2A]" />
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-4 border border-green-200 dark:border-green-900/50">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h5 className="font-black text-slate-900 dark:text-white">Field Crew</h5>
              <p className="text-sm text-slate-500 dark:text-[#A1A1AA] font-medium">Execute Repair</p>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-slate-300 dark:text-[#2A2A2A]" />
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-4 border border-purple-200 dark:border-purple-900/50">
                <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h5 className="font-black text-slate-900 dark:text-white">Citizen Track</h5>
              <p className="text-sm text-slate-500 dark:text-[#A1A1AA] font-medium">Verified Closure</p>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-[#2A2A2A] text-center mt-auto">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400">ℹ Engineering Governance Principle:</span> AI acts as an algorithmic decision-support tool; municipal engineers retain official verification authority.
            </p>
          </div>
        </div>
      </div>
    ),
    // 05
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">How RoadGuard AI Works</h2>
        
        <div className="grid md:grid-cols-5 gap-4 flex-1 mb-8">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-6">1</div>
            <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">REPORT</h3>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">Citizen captures damage photo through responsive web client with basic guidance on angle and lighting.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-6">2</div>
            <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">LOCATE</h3>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">Precise GPS coordinates, road name, and municipal ward boundaries are automatically pinned to the report.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-6">3</div>
            <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">ANALYZE</h3>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">Vision model classifies damage category, detects approximate footprint, and returns model confidence.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-6">4</div>
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">PRIORITIZE</h3>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">Multi-factor risk engine computes 0-100 severity index and sorts item into high/medium/low municipal queue.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col items-center text-center group hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-6">5</div>
            <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">TRACK & FIX</h3>
            <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">Ward engineer approves work order, dispatches road crew, and citizen receives milestone notifications.</p>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-[#151515] p-4 rounded-xl border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
          <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" /> End-to-End Latency Target: Under 90 seconds from citizen capture to prioritized municipal inbox.
          </p>
          <span className="hidden md:inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-black uppercase tracking-widest rounded-full">
            OPTIMIZED PIPELINE
          </span>
        </div>
      </div>
    ),
    // 06
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">AI-Assisted Damage Assessment</h2>
        
        <div className="grid md:grid-cols-2 gap-8 flex-1">
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Inference Output: Report #RG-2026-881
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold text-xs rounded-full border border-red-200 dark:border-red-900/50 tracking-wider">CRITICAL ACTION</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">DAMAGE TYPE</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">Pothole (Severe)</p>
              </div>
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">AI CONFIDENCE SCORE</p>
                <p className="text-xl font-black text-blue-600 dark:text-blue-400">91.4%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">AI ESTIMATED FOOTPRINT</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">~1.8 m × 1.2 m</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Approx Area: ~2.16 m²</p>
              </div>
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-1">APPROXIMATE DEPTH</p>
                <p className="text-xl font-black text-red-600 dark:text-red-400">12 – 18 cm</p>
                <p className="text-xs text-slate-500 font-medium mt-1">Sub-base exposed</p>
              </div>
            </div>
            
            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/50 flex justify-between items-center mb-6">
              <div>
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">COMPUTED RISK SCORE</p>
                <p className="text-4xl font-black text-blue-900 dark:text-blue-300 tracking-tight">82 <span className="text-xl text-blue-500">/ 100</span></p>
              </div>
              <span className="px-4 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-black rounded border border-red-200 dark:border-red-900/50 tracking-wider">HIGH PRIORITY</span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-[#A1A1AA] font-medium italic mt-auto">
              * Important Engineering Disclaimer: Measurements are image-based pixel estimates and provide triage guidance. Field calibration is recommended before asphalt dispatch.
            </p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-2 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video md:aspect-auto md:flex-1 mb-4 flex items-center justify-center border border-slate-200 dark:border-[#2A2A2A]">
              <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded border border-white/20 z-10 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-blue-400" /> BBOX: [X:142, Y:210, W:380, H:260]
              </div>
              <div className="absolute bottom-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg z-10">
                SEVERITY: HIGH (0.91)
              </div>
              {/* Mock visualization of computer vision analysis */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-90"></div>
              <div className="absolute top-[30%] left-[20%] w-[40%] h-[35%] border-2 border-red-500 bg-red-500/20"></div>
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="border-r border-white/30 backdrop-grayscale-[0.5]"></div>
                <div></div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Visual Telemetry Conversion</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium">Raw camera frames are processed to detect surface anomalies and convert uncalibrated imagery into structured municipal data.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    // 07
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Dynamic Risk Scoring Model</h2>
        
        <div className="grid md:grid-cols-2 gap-8 flex-1">
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="inline-flex px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-widest rounded mb-6 border border-blue-100 dark:border-blue-900/50 w-max">
              ALGORITHMIC FORMULATION
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Multi-Factor Risk Assessment</h3>
            <p className="text-slate-600 dark:text-[#A1A1AA] mb-8 font-medium leading-relaxed">
              The Risk Index synthesizes visual damage characteristics with external geospatial and traffic context:
            </p>
            
            <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#2A2A2A] rounded-xl p-6 mb-8 text-center">
              <div className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                R<sub className="text-xs">score</sub> = w<sub className="text-xs">1</sub> S<sub className="text-xs">AI</sub> + w<sub className="text-xs">2</sub> A + w<sub className="text-xs">3</sub> T<sub className="text-xs">road</sub> + w<sub className="text-xs">4</sub> C
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-[#2A2A2A] pb-3">
                <span className="font-bold text-blue-700 dark:text-blue-400 font-mono text-sm">S_AI (35%)</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm flex-1 ml-4">AI Damage Severity & Depth Estimate</span>
                <span className="text-slate-900 dark:text-white font-bold text-sm">High Weight</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-[#2A2A2A] pb-3">
                <span className="font-bold text-blue-700 dark:text-blue-400 font-mono text-sm">A (20%)</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm flex-1 ml-4">Damage Footprint Area (~m²)</span>
                <span className="text-slate-900 dark:text-white font-bold text-sm">Geometric</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-[#2A2A2A] pb-3">
                <span className="font-bold text-blue-700 dark:text-blue-400 font-mono text-sm">T_road (30%)</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm flex-1 ml-4">Road Category (Arterial vs. Alleyway)</span>
                <span className="text-slate-900 dark:text-white font-bold text-sm">Traffic Context</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="font-bold text-blue-700 dark:text-blue-400 font-mono text-sm">C (15%)</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm flex-1 ml-4">Model Confidence & Weather Vulnerability</span>
                <span className="text-slate-900 dark:text-white font-bold text-sm">Environmental</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="inline-flex px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-widest rounded mb-6 border border-amber-100 dark:border-amber-900/50 w-max">
              CALIBRATION EXAMPLE
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Triage Thresholds</h3>
            
            <div className="space-y-4 flex-1">
              <div className="border-l-4 border-red-500 bg-red-50/50 dark:bg-red-900/10 p-5 rounded-r-xl border-y border-r border-slate-100 dark:border-[#2A2A2A] flex justify-between items-start">
                <div>
                  <h4 className="font-black text-red-700 dark:text-red-400 text-lg mb-1">Score 75 – 100: CRITICAL / HIGH</h4>
                  <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium">Immediate dispatch within 24–48 hours; severe traffic/hazard.</p>
                </div>
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-bold rounded">SLA: 48H</span>
              </div>
              
              <div className="border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-900/10 p-5 rounded-r-xl border-y border-r border-slate-100 dark:border-[#2A2A2A] flex justify-between items-start">
                <div>
                  <h4 className="font-black text-amber-700 dark:text-amber-400 text-lg mb-1">Score 45 – 74: MEDIUM PRIORITY</h4>
                  <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium">Scheduled for routine patch cycle; secondary street hazard.</p>
                </div>
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold rounded">SLA: 5 DAYS</span>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50/50 dark:bg-green-900/10 p-5 rounded-r-xl border-y border-r border-slate-100 dark:border-[#2A2A2A] flex justify-between items-start">
                <div>
                  <h4 className="font-black text-green-700 dark:text-green-400 text-lg mb-1">Score 0 – 44: LOW / MONITOR</h4>
                  <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium">Surface wear or hairline cracking; logged for cyclical review.</p>
                </div>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-bold rounded">SLA: 14 DAYS</span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-[#151515] p-4 rounded-xl border border-slate-200 dark:border-[#2A2A2A] mt-6">
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                ⚖ Prototype decision-support matrix calibrated with municipal engineering guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    // 08
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Municipal Officer Dashboard</h2>
        
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-[#2A2A2A] flex justify-between items-end bg-slate-50 dark:bg-black">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Ward 142 Engineering Triage Queue</h3>
              <p className="text-slate-500 dark:text-[#A1A1AA] font-medium mt-1">Aggregated incoming reports sorted by computed risk score</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-900/30 rounded-full text-xs font-bold tracking-wider">🚨 3 CRITICAL</span>
              <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 border border-amber-100 dark:border-amber-900/30 rounded-full text-xs font-bold tracking-wider">7 IN REVIEW</span>
              <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 border border-green-100 dark:border-green-900/30 rounded-full text-xs font-bold tracking-wider">14 RESOLVED</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-100 dark:bg-[#151515]">
                <tr>
                  <th className="px-6 py-4 font-bold text-sm text-slate-700 dark:text-slate-300">Report ID</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-700 dark:text-slate-300">Location / Street</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-700 dark:text-slate-300">Damage Type</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-700 dark:text-slate-300">AI Est. Size</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-700 dark:text-slate-300">Risk Score</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-700 dark:text-slate-300">Queue Priority</th>
                  <th className="px-6 py-4 font-bold text-sm text-slate-700 dark:text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#2A2A2A]">
                <tr className="bg-red-50/30 dark:bg-red-900/5">
                  <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">#RG-1042</td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Grand Southern Trunk Rd (Nr. Flyover)</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">Deep Pothole</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">1.8m × 1.2m</td>
                  <td className="px-6 py-4 font-black text-red-600 dark:text-red-400">92 / 100</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-black tracking-wider rounded">CRITICAL</span></td>
                  <td className="px-6 py-4"><button className="px-3 py-1.5 bg-blue-600 text-white font-bold text-sm rounded shadow-sm hover:bg-blue-700">Assign Crew</button></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">#RG-1048</td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Anna Salai Jn 4 (Right Lane)</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">Edge Failure / Spall</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">2.1m × 0.8m</td>
                  <td className="px-6 py-4 font-black text-amber-600 dark:text-amber-400">82 / 100</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-black tracking-wider rounded">HIGH</span></td>
                  <td className="px-6 py-4"><button className="px-3 py-1.5 bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-white font-bold text-sm rounded border border-slate-200 dark:border-[#3A3A3A] shadow-sm">Review</button></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">#RG-1051</td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Residential 3rd Main Rd</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">Fatigue Cracking</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">1.2m × 0.6m</td>
                  <td className="px-6 py-4 font-black text-amber-500">54 / 100</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-xs font-black tracking-wider rounded border border-amber-100 dark:border-amber-900/30">MEDIUM</span></td>
                  <td className="px-6 py-4"><button className="px-3 py-1.5 bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-white font-bold text-sm rounded border border-slate-200 dark:border-[#3A3A3A] shadow-sm">Queue</button></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">#RG-1055</td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Service Lane Sector 8</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">Minor Depression</td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-[#A1A1AA]">0.5m × 0.4m</td>
                  <td className="px-6 py-4 font-black text-green-600 dark:text-green-400">31 / 100</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 text-xs font-black tracking-wider rounded border border-green-100 dark:border-green-900/30">LOW</span></td>
                  <td className="px-6 py-4"><button className="px-3 py-1.5 bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-white font-bold text-sm rounded border border-slate-200 dark:border-[#3A3A3A] shadow-sm">Monitor</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="p-4 mt-auto border-t border-slate-200 dark:border-[#2A2A2A] flex justify-between items-center bg-slate-50 dark:bg-black">
            <p className="text-sm font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
              💡 Efficiency Gain: Officers bypass unorganized grievance logs and execute targeted, risk-sorted work orders.
            </p>
            <span className="text-sm font-bold text-slate-500 dark:text-[#A1A1AA] flex items-center gap-1 cursor-pointer hover:text-slate-800 dark:hover:text-white">
              Export to Work Order System <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    ),
    // 09
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Field Worker Repair Workflow</h2>
        
        <div className="grid md:grid-cols-2 gap-8 flex-1">
          <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="inline-flex px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-widest rounded border border-blue-100 dark:border-blue-900/50">
                DIGITAL WORK ORDER #WO-882
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-xs font-black tracking-wider rounded border border-red-200 dark:border-red-900/50">PRIORITY: HIGH</span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Task: Hot-Mix Asphalt Patching</h3>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-center border-b border-slate-100 dark:border-[#2A2A2A] pb-3">
                <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-bold text-slate-500 dark:text-[#A1A1AA] w-40 text-sm">Location:</span>
                <span className="font-black text-slate-900 dark:text-white">GST Road, Ch. 14+200 (Southbound)</span>
              </div>
              <div className="flex items-center border-b border-slate-100 dark:border-[#2A2A2A] pb-3">
                <Activity className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-bold text-slate-500 dark:text-[#A1A1AA] w-40 text-sm">AI Est. Footprint:</span>
                <span className="font-black text-slate-900 dark:text-white">1.8 m × 1.2 m (~2.16 m²)</span>
              </div>
              <div className="flex items-center border-b border-slate-100 dark:border-[#2A2A2A] pb-3">
                <Building2 className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-bold text-slate-500 dark:text-[#A1A1AA] w-40 text-sm">Material Estimate:</span>
                <span className="font-black text-slate-900 dark:text-white">~0.35 m³ Dense Bituminous Macadam</span>
              </div>
              <div className="flex items-center pb-3">
                <Users className="w-5 h-5 text-blue-500 mr-3" />
                <span className="font-bold text-slate-500 dark:text-[#A1A1AA] w-40 text-sm">Assigning Officer:</span>
                <span className="font-black text-slate-900 dark:text-white">Assistant Executive Engineer (Ward 142)</span>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <p className="text-sm font-bold text-slate-500 dark:text-[#A1A1AA] mb-3">Field Crew Actions:</p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#3A3A3A] rounded text-sm font-bold text-slate-700 dark:text-white">1. Navigate to GPS</div>
                <div className="px-3 py-1.5 bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#3A3A3A] rounded text-sm font-bold text-slate-700 dark:text-white">2. Mill & Compact</div>
                <div className="px-3 py-1.5 bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#3A3A3A] rounded text-sm font-bold text-slate-700 dark:text-white">3. Upload Post-Fix Photo</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-2 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="rounded-xl overflow-hidden bg-slate-900 aspect-video md:flex-1 mb-4">
              <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&q=80" alt="Worker repairing pothole" className="w-full h-full object-cover opacity-90" />
            </div>
            <div className="px-4 pb-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Structured Contractor Dispatch</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA] font-medium leading-relaxed">Contractors receive precise digital briefs with geo-pins, dimensions, and material expectations—eliminating ambiguous verbal dispatches.</p>
            </div>
          </div>
        </div>
      </div>
    ),
    // 10
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Transparent Citizen Tracking</h2>
        
        <div className="bg-white dark:bg-[#111111] p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm mb-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Citizen Tracking ID: #RG-2026-881</h3>
              <p className="text-slate-500 dark:text-[#A1A1AA] font-medium text-sm">Submitted: Sept 14, 2026 • Grand Southern Trunk Road</p>
            </div>
            <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-xs font-black tracking-wider rounded-full border border-amber-200 dark:border-amber-900/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> REPAIR IN PROGRESS
            </span>
          </div>
          
          {/* Timeline visualization */}
          <div className="relative flex flex-col md:flex-row justify-between items-center w-full px-4 mb-8">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-[#2A2A2A] -z-10 -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 left-0 w-[70%] h-1 bg-blue-600 -z-10 -translate-y-1/2"></div>
            
            <div className="flex flex-col items-center text-center w-full md:w-auto relative mb-6 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111] border-2 border-green-500 text-green-500 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">Report Submitted</h4>
              <p className="text-xs font-medium text-slate-500 dark:text-[#A1A1AA]">09:15 AM (Photo & GPS)</p>
            </div>
            
            <div className="flex flex-col items-center text-center w-full md:w-auto relative mb-6 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111] border-2 border-green-500 text-green-500 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">AI Assessed</h4>
              <p className="text-xs font-medium text-slate-500 dark:text-[#A1A1AA]">09:16 AM (Score: 82)</p>
            </div>
            
            <div className="flex flex-col items-center text-center w-full md:w-auto relative mb-6 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111] border-2 border-green-500 text-green-500 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">Officer Verified</h4>
              <p className="text-xs font-medium text-slate-500 dark:text-[#A1A1AA]">11:30 AM (Approved)</p>
            </div>
            
            <div className="flex flex-col items-center text-center w-full md:w-auto relative mb-6 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 border-4 border-blue-600 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3 -mt-2">
                <Users className="w-7 h-7" />
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">Repair in Progress</h4>
              <p className="text-xs font-medium text-slate-500 dark:text-[#A1A1AA]">Crew Dispatched</p>
            </div>
            
            <div className="flex flex-col items-center text-center w-full md:w-auto relative opacity-50">
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111111] border-2 border-slate-300 dark:border-[#3A3A3A] flex items-center justify-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-[#3A3A3A]"></div>
              </div>
              <h4 className="font-black text-slate-500 dark:text-[#A1A1AA] text-sm mb-1">Verified & Closed</h4>
              <p className="text-xs font-medium text-slate-500 dark:text-[#A1A1AA]">Pending Post-Fix</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50/50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/50 flex gap-4">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-black text-green-800 dark:text-green-400 text-lg mb-2">Closing the Feedback Loop</h4>
              <p className="text-sm font-medium text-green-700/80 dark:text-green-300 leading-relaxed">
                Citizens no longer have to repeatedly inquire about reported potholes. Real-time status notifications build civic trust and prevent duplicate grievances.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/50 flex gap-4">
            <Activity className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-black text-blue-800 dark:text-blue-400 text-lg mb-2">Mandatory After-Fix Verification</h4>
              <p className="text-sm font-medium text-blue-700/80 dark:text-blue-300 leading-relaxed">
                Work orders cannot be marked resolved without an authenticated, geo-tagged post-repair photograph from the repair contractor.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    // 11
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">System Architecture</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 mb-6">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <Camera className="w-8 h-8 text-blue-500 mb-6" />
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-4">Frontend Layer</h3>
            <ul className="space-y-3 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-center before:content-['•'] before:mr-2 before:text-blue-500">Lightweight Responsive PWA</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-center before:content-['•'] before:mr-2 before:text-blue-500">Native Geolocation API</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-center before:content-['•'] before:mr-2 before:text-blue-500">Client-side Image Compression</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-center before:content-['•'] before:mr-2 before:text-blue-500">Offline capture support</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <Activity className="w-8 h-8 text-blue-500 mb-6" />
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-4">Processing API</h3>
            <ul className="space-y-3 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">RESTful ingestion endpoint</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">EXIF GPS parsing & verification</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Spatial deduplication buffer</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Image format standardization</span></li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <Brain className="w-8 h-8 text-blue-500 mb-6" />
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-4">AI & Risk Engine</h3>
            <ul className="space-y-3 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Damage classification model</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Bounding box aspect estimation</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Multi-factor risk calculator</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Model confidence scoring</span></li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <Building2 className="w-8 h-8 text-blue-500 mb-6" />
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-4">Data & Roles</h3>
            <ul className="space-y-3 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Spatial database (PostGIS ready)</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Role-based access control</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Citizen / Officer / Crew portals</span></li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start before:content-['•'] before:mr-2 before:text-blue-500 before:mt-0.5"><span className="flex-1">Open municipal API export</span></li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30 flex flex-col md:flex-row justify-between items-center gap-4 border-dashed">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300 leading-relaxed">
            <span className="font-bold text-blue-900 dark:text-blue-200">Prototype Implementation:</span> Demonstrated using lightweight web microservices and simulated municipal data queues. Modular design allows direct plug-in to municipal smart city command centers.
          </p>
          <span className="px-4 py-2 bg-white dark:bg-[#111111] text-blue-600 font-black text-xs rounded-full shadow-sm whitespace-nowrap">ENGINEERING READY</span>
        </div>
      </div>
    ),
    // 12
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Multi-Stakeholder Impact</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col border-t-4 border-t-blue-600">
            <Users className="w-8 h-8 text-blue-600 mb-6" />
            <h3 className="font-black text-xl text-slate-900 dark:text-white mb-6">Citizens</h3>
            <ul className="space-y-4 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Frictionless reporting in under 30 seconds</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Full transparency through live status timeline</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Restored trust in public road maintenance</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col border-t-4 border-t-amber-500">
            <Shield className="w-8 h-8 text-amber-500 mb-6" />
            <h3 className="font-black text-xl text-slate-900 dark:text-white mb-6">Ward Officers</h3>
            <ul className="space-y-4 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Risk-sorted priority queue replaces clutter</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> AI decision-support for faster verification</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Optimal municipal budget & contractor allocation</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col border-t-4 border-t-blue-400">
            <Building2 className="w-8 h-8 text-blue-400 mb-6" />
            <h3 className="font-black text-xl text-slate-900 dark:text-white mb-6">Road Workers</h3>
            <ul className="space-y-4 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Pinpoint GPS location without scouting</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Pre-estimated material needs and patch size</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Clear work order requirements and photo log</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col border-t-4 border-t-green-500">
            <Activity className="w-8 h-8 text-green-500 mb-6" />
            <h3 className="font-black text-xl text-slate-900 dark:text-white mb-6">Urban Community</h3>
            <ul className="space-y-4 flex-1">
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Proactive reduction in road hazard exposure</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Smoother traffic flow and fewer secondary jams</li>
              <li className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] flex items-start"><span className="text-green-500 mr-2 mt-0.5">✓</span> Data-driven civic infrastructure governance</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    // 13
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Why RoadGuard AI?</h2>
        
        <div className="grid md:grid-cols-2 gap-8 flex-1">
          <div className="bg-slate-50 dark:bg-[#151515] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] flex flex-col">
            <div className="inline-block px-3 py-1 bg-slate-200 dark:bg-[#2A2A2A] text-slate-600 dark:text-[#A1A1AA] text-xs font-black tracking-widest rounded-full mb-6 w-max">CONVENTIONAL GRIEVANCE PORTALS</div>
            
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-8 font-mono">REPORT → WAIT</h3>
            
            <ul className="space-y-6">
              <li className="flex items-start text-slate-600 dark:text-[#A1A1AA] font-medium"><span className="text-red-500 font-bold mr-3 mt-0.5">✕</span> Unstructured images with zero automated validation</li>
              <li className="flex items-start text-slate-600 dark:text-[#A1A1AA] font-medium"><span className="text-red-500 font-bold mr-3 mt-0.5">✕</span> First-come, first-served queue without risk prioritization</li>
              <li className="flex items-start text-slate-600 dark:text-[#A1A1AA] font-medium"><span className="text-red-500 font-bold mr-3 mt-0.5">✕</span> Disconnected from contractor dispatch & materials</li>
              <li className="flex items-start text-slate-600 dark:text-[#A1A1AA] font-medium"><span className="text-red-500 font-bold mr-3 mt-0.5">✕</span> Black-box status updates leaving citizens uninformed</li>
            </ul>
          </div>
          
          <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-2xl border-2 border-blue-500 shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-black tracking-widest rounded-full mb-6 w-max">ROADGUARD AI PARADIGM</div>
            
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-8 font-mono">REPORT → ASSESS → PRIORITIZE → VERIFY → TRACK</h3>
            
            <ul className="space-y-6">
              <li className="flex items-start text-blue-900 dark:text-blue-200 font-medium">
                <span className="text-green-500 font-bold mr-3 mt-0.5">✓</span> 
                <span><strong className="font-black text-blue-950 dark:text-blue-100">AI-Assisted Assessment:</strong> Automated damage classification & metrics</span>
              </li>
              <li className="flex items-start text-blue-900 dark:text-blue-200 font-medium">
                <span className="text-green-500 font-bold mr-3 mt-0.5">✓</span> 
                <span><strong className="font-black text-blue-950 dark:text-blue-100">Multi-Factor Risk Scoring:</strong> Severity, size & traffic corridor context</span>
              </li>
              <li className="flex items-start text-blue-900 dark:text-blue-200 font-medium">
                <span className="text-green-500 font-bold mr-3 mt-0.5">✓</span> 
                <span><strong className="font-black text-blue-950 dark:text-blue-100">Structured Engineer Triage:</strong> Actionable work orders in one click</span>
              </li>
              <li className="flex items-start text-blue-900 dark:text-blue-200 font-medium">
                <span className="text-green-500 font-bold mr-3 mt-0.5">✓</span> 
                <span><strong className="font-black text-blue-950 dark:text-blue-100">Transparent Tracking:</strong> Milestone-based public verification</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    // 14
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Future Roadmap & Scope</h2>
        <p className="text-lg text-slate-600 dark:text-[#A1A1AA] mb-10 font-medium">Potential future extensions following proof-of-concept validation and municipal field trials:</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 mb-8">
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-slate-100 dark:bg-[#151515] text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-3">Calibrated 3D Vision</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] leading-relaxed">Integrating multi-angle photogrammetry and smartphone LiDAR for millimeter-precise volumetric asphalt estimates.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-slate-100 dark:bg-[#151515] text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-3">Fleet Telematics</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] leading-relaxed">Mounting camera units on public transit buses and municipal waste trucks for automated continuous road scanning.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-slate-100 dark:bg-[#151515] text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-3">Predictive Weather AI</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] leading-relaxed">Correlating monsoon rainfall forecasts and soil data to predict structural road failures before full collapse.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex flex-col">
            <div className="w-10 h-10 bg-slate-100 dark:bg-[#151515] text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white mb-3">National Integrations</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] leading-relaxed">API connectors to CP-GRAMS, NHAI grievance portals, and Smart Cities Mission municipal command centers.</p>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-[#151515] p-4 rounded-xl border border-slate-200 dark:border-[#2A2A2A] text-center">
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400">
            <MapPin className="inline w-4 h-4 mr-1" /> Note: Items above represent secondary research and scaling scope beyond the current demonstration prototype.
          </p>
        </div>
      </div>
    ),
    // 15
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-10 border-l-4 border-blue-600 pl-4">From Reporting to Safety</h2>
        
        <div className="bg-white dark:bg-[#111111] p-10 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex-1 flex flex-col items-center justify-center">
          
          <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 text-xs font-black tracking-widest rounded-full border border-blue-100 dark:border-blue-900/30 mb-10">
            THE COMPLETE ECOSYSTEM
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 w-full text-sm font-black tracking-wider">
            <div className="px-5 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full w-full md:w-auto text-center">CITIZEN REPORT</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-slate-300 dark:text-[#3A3A3A]" />
            <div className="px-5 py-3 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full w-full md:w-auto text-center">AI ANALYSIS & SCORE</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-slate-300 dark:text-[#3A3A3A]" />
            <div className="px-5 py-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full w-full md:w-auto text-center">OFFICER VERIFICATION</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-slate-300 dark:text-[#3A3A3A]" />
            <div className="px-5 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full w-full md:w-auto text-center">FIELD REPAIR</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-slate-300 dark:text-[#3A3A3A]" />
            <div className="px-5 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full w-full md:w-auto text-center">SAFER COMMUNITIES</div>
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white text-center mb-16 leading-relaxed max-w-4xl">
            "RoadGuard AI transforms road-damage reporting from a passive complaint into an accountable, data-assisted engineering pipeline."
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 w-full">
            <div className="text-center p-6 bg-slate-50 dark:bg-black rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
              <h4 className="font-black text-blue-600 dark:text-blue-400 text-lg mb-3">Explainable AI</h4>
              <p className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] leading-relaxed">Assists human engineers without replacing statutory verification standards.</p>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-black rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
              <h4 className="font-black text-blue-600 dark:text-blue-400 text-lg mb-3">Civic Accountability</h4>
              <p className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] leading-relaxed">Builds trust through transparent, milestone-based status updates for citizens.</p>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-black rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
              <h4 className="font-black text-blue-600 dark:text-blue-400 text-lg mb-3">Resource Efficiency</h4>
              <p className="text-sm font-medium text-slate-600 dark:text-[#A1A1AA] leading-relaxed">Directs municipal asphalt, machinery, and crews to where risk is highest.</p>
            </div>
          </div>
          
        </div>
      </div>
    ),
    // 16
    (
      <div className="flex flex-col items-center justify-center text-center h-full space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-blue-600 text-xs font-black uppercase tracking-widest shadow-sm">
          <Shield className="w-4 h-4" /> THANK YOU
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">ROADGUARD AI</h1>
        <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 italic">"Smarter Roads. Faster Repairs. Safer Communities."</p>
        
        <p className="text-slate-600 dark:text-[#A1A1AA] font-medium mt-4">Prototype concept presented for the Engineers Day Innovation Challenge.</p>
        
        <div className="mt-12">
          <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-black rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <Activity className="w-5 h-5 text-blue-600" /> Questions & Engineering Discussion
          </Link>
        </div>
      </div>
    ),
    // 17
    (
      <div className="flex flex-col h-full animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">Image Sources</h2>
        
        <div className="bg-white dark:bg-[#111111] p-8 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm flex-1 flex flex-col">
          <ul className="space-y-6 divide-y divide-slate-100 dark:divide-[#2A2A2A]">
            <li className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-6 first:pt-0">
              <div className="w-32 h-20 bg-slate-100 dark:bg-[#151515] rounded overflow-hidden flex-shrink-0 border border-slate-200 dark:border-[#3A3A3A]">
                <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Reference image 1" className="w-full h-full object-cover" />
              </div>
              <div>
                <a href="https://img.nowtoronto.com/spio/ret_img,q_cdnize,to_webp,s_webp/nowtoronto.com/wp-content/uploads/2026/04/potholes.webp" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 dark:text-slate-300 break-all hover:text-blue-600 hover:underline">
                  https://img.nowtoronto.com/spio/ret_img,q_cdnize,to_webp,s_webp/nowtoronto.com/wp-content/uploads/2026/04/potholes.webp
                </a>
                <p className="text-sm text-slate-500 dark:text-[#A1A1AA] mt-1 font-bold">Source: nowtoronto.com</p>
              </div>
            </li>
            
            <li className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-6">
              <div className="w-32 h-20 bg-slate-100 dark:bg-[#151515] rounded overflow-hidden flex-shrink-0 border border-slate-200 dark:border-[#3A3A3A]">
                <img src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&q=80" alt="Reference image 2" className="w-full h-full object-cover" />
              </div>
              <div>
                <a href="https://neyrapaving.com/wp-content/uploads/2023/09/Neyra-Paving.jpg" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 dark:text-slate-300 break-all hover:text-blue-600 hover:underline">
                  https://neyrapaving.com/wp-content/uploads/2023/09/Neyra-Paving.jpg
                </a>
                <p className="text-sm text-slate-500 dark:text-[#A1A1AA] mt-1 font-bold">Source: neyrapaving.com</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-auto pt-8">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Images are used as visual reference for the prototype.</p>
          </div>
        </div>
      </div>
    )
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors relative flex flex-col font-sans">
      
      {/* Presentation Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative flex flex-col">
        {slides[currentSlide]}
      </div>
      
      {/* Navigation Footer */}
      <div className="sticky bottom-0 left-0 w-full bg-white/90 dark:bg-[#111111]/90 backdrop-blur border-t border-slate-200 dark:border-[#2A2A2A] z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-black hover:bg-slate-200 dark:hover:bg-[#151515] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-sm transition-colors border border-transparent dark:border-[#2A2A2A]"
          >
            <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Previous</span>
          </button>
          
          <div className="flex flex-col items-center">
            <span className="font-mono font-bold text-slate-500 dark:text-[#A1A1AA] text-sm">
              Slide {currentSlide + 1} / {slides.length}
            </span>
            <div className="flex gap-1 mt-2">
              {slides.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${currentSlide === i ? 'bg-blue-600' : 'bg-slate-300 dark:bg-[#3A3A3A]'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold text-sm transition-colors"
          >
            <span className="hidden sm:inline">Next</span> <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
