import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, MapPin, Brain, CheckCircle, 
  Camera, Play, Pause, RotateCcw
} from 'lucide-react';

const SCENES = [
  {
    id: 1,
    duration: 5000, // 0-5s
    title: 'Scene 1 — Hook',
    vo: "Every day, thousands of road hazards appear. One pothole can become a serious problem. But with limited resources, how do we know which one needs attention first?"
  },
  {
    id: 2,
    duration: 7000, // 5-12s
    title: 'Scene 2 — Report',
    vo: "It starts with the citizen. Just capture the road damage using the RoadGuard AI app. The system automatically tags the exact GPS location."
  },
  {
    id: 3,
    duration: 8000, // 12-20s
    title: 'Scene 3 — AI Detection',
    vo: "Our edge AI instantly analyzes the image. It confirms the pothole and estimates the severity with high confidence—right on the device."
  },
  {
    id: 4,
    duration: 8000, // 20-28s
    title: 'Scene 4 — Risk Score',
    vo: "Not every pothole is equally dangerous. The system calculates a comprehensive Risk Score by factoring in traffic, location importance, and weather conditions."
  },
  {
    id: 5,
    duration: 8000, // 28-36s
    title: 'Scene 5 — Priority',
    vo: "This data flows instantly to the Authority Dashboard. Instead of a messy inbox, maintenance teams get a sorted priority queue, ensuring the most dangerous hazards are addressed first."
  },
  {
    id: 6,
    duration: 9000, // 36-45s
    title: 'Scene 6 — Repair Tracking',
    vo: "Citizens aren't left in the dark. They can track the repair lifecycle in real-time, from 'Reported' all the way to 'In Progress'."
  },
  {
    id: 7,
    duration: 8000, // 45-53s
    title: 'Scene 7 — Verification',
    vo: "Finally, repair crews upload after-repair evidence. This verifies the fix, holds contractors accountable, and completes the journey."
  },
  {
    id: 8,
    duration: 7000, // 53-60s
    title: 'Scene 8 — Final Hook',
    vo: "Detect. Prioritize. Track. Verify. RoadGuard AI: Smarter roads start with smarter reporting."
  }
];

export const PromoReel = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const runTimer = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const sceneDuration = SCENES[currentScene].duration;
      const currentProgress = (elapsed / sceneDuration) * 100;

      if (currentProgress >= 100) {
        if (currentScene < SCENES.length - 1) {
          setCurrentScene(prev => prev + 1);
          setProgress(0);
          startTime = timestamp; // Reset start time for next scene
        } else {
          setIsPlaying(false);
          setProgress(100);
        }
      } else {
        setProgress(currentProgress);
      }

      if (isPlaying && currentScene < SCENES.length) {
        animationFrame = requestAnimationFrame(runTimer);
      }
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(runTimer);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, currentScene]);

  const togglePlay = () => {
    if (currentScene === SCENES.length - 1 && progress === 100) {
      // Reset if at end
      setCurrentScene(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const jumpToScene = (index: number) => {
    setCurrentScene(index);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-4 gap-8 font-sans">
      
      {/* Phone Frame (9:16) */}
      <div className="relative w-[340px] h-[604px] bg-black rounded-[3rem] border-[14px] border-gray-800 shadow-2xl overflow-hidden shrink-0">
        
        {/* Top Notch */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
          <div className="w-32 h-6 bg-gray-800 rounded-b-2xl"></div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-8 inset-x-4 flex gap-1 z-50">
          {SCENES.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all ease-linear"
                style={{ 
                  width: idx < currentScene ? '100%' : idx === currentScene ? `${progress}%` : '0%',
                  transitionDuration: isPlaying && idx === currentScene ? '0.1s' : '0s'
                }}
              />
            </div>
          ))}
        </div>

        {/* SCENES CONTENT */}
        <div className="relative w-full h-full bg-gray-50 text-gray-900 flex flex-col">
          
          {/* SCENE 1 — HOOK */}
          <div className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6 bg-gray-900 text-white ${currentScene === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0 opacity-40">
              <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Pothole background" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-black leading-tight animate-in slide-in-from-bottom-4 fade-in duration-700">One pothole can become a serious road problem.</h2>
              <p className="text-xl text-gray-300 font-medium animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">But how do we know which one needs attention first?</p>
            </div>
          </div>

          {/* SCENE 2 — REPORT */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-white p-6 pt-20 flex flex-col ${currentScene === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="w-full bg-gray-100 rounded-2xl aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden animate-in zoom-in duration-500">
                <Camera className="w-12 h-12 text-gray-400" />
                <div className="absolute bottom-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-in slide-in-from-bottom duration-500 delay-300">
                  <MapPin className="w-4 h-4" /> 13.0827° N, 80.2707° E
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 mb-2">Just capture the road damage.</p>
              </div>
            </div>
          </div>

          {/* SCENE 3 — AI DETECTION */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-gray-900 text-white p-6 pt-20 flex flex-col items-center justify-center ${currentScene === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="w-full max-w-sm bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl relative animate-in scale-in duration-500">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">Demo AI</div>
              <Brain className="w-16 h-16 text-blue-400 mx-auto mb-6 animate-pulse" />
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-black text-white">POTHOLE DETECTED</h3>
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm font-bold uppercase mb-1">Confidence</p>
                  <p className="text-3xl font-black text-green-400">94%</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400 text-sm font-bold uppercase mb-1">Severity</p>
                  <p className="text-2xl font-black text-red-500">CRITICAL</p>
                </div>
              </div>
            </div>
            <p className="text-center mt-8 text-xl font-medium text-gray-300 animate-in slide-in-from-bottom duration-500 delay-300">
              AI identifies the road damage and estimates its severity.
            </p>
          </div>

          {/* SCENE 4 — RISK SCORE */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-white p-6 pt-16 flex flex-col items-center justify-center ${currentScene === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="text-center mb-8 animate-in slide-in-from-top duration-500">
              <p className="text-gray-500 font-bold uppercase tracking-widest mb-2">Risk Score</p>
              <div className="text-7xl font-black text-red-600 leading-none">91<span className="text-3xl text-gray-400">/100</span></div>
              <div className="mt-2 inline-block px-4 py-1 bg-red-100 text-red-700 font-black rounded-full uppercase">Critical</div>
            </div>
            
            <div className="w-full space-y-3 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              {[
                { label: 'Severity', width: '90%' },
                { label: 'Traffic', width: '80%' },
                { label: 'Location', width: '70%' },
                { label: 'Repeated Reports', width: '60%' },
                { label: 'AI Confidence', width: '85%' },
              ].map((factor, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700">{factor.label}</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: factor.width }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-lg font-bold text-gray-800">
              Not every pothole is equally dangerous.
            </p>
          </div>

          {/* SCENE 5 — PRIORITY */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-gray-50 p-6 pt-20 flex flex-col ${currentScene === 4 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="flex items-center gap-2 mb-6 animate-in fade-in">
              <Shield className="w-6 h-6 text-gray-900" />
              <h3 className="text-xl font-black text-gray-900">Priority Queue</h3>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { score: 91, level: 'CRITICAL', color: 'bg-red-100 text-red-700 border-red-200' },
                { score: 78, level: 'HIGH', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                { score: 72, level: 'HIGH', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                { score: 56, level: 'MEDIUM', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm animate-in slide-in-from-right" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div>
                    <div className="w-12 h-2 bg-gray-200 rounded-full mb-2"></div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase border ${item.color}`}>{item.level}</span>
                  </div>
                  <div className="text-3xl font-black text-gray-900">{item.score}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-xl font-black text-blue-600 mt-4 leading-tight">
              RoadGuard helps prioritize what needs attention first.
            </p>
          </div>

          {/* SCENE 6 — REPAIR TRACKING */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-gray-900 text-white p-6 pt-24 flex flex-col items-center justify-center ${currentScene === 5 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="relative border-l-2 border-gray-700 ml-4 space-y-8 w-full max-w-[200px] mb-12">
              {[
                { status: 'REPORTED', color: 'bg-gray-500', delay: 0 },
                { status: 'VERIFIED', color: 'bg-blue-500', delay: 300 },
                { status: 'ASSIGNED', color: 'bg-purple-500', delay: 600 },
                { status: 'IN_PROGRESS', color: 'bg-yellow-500', delay: 900 },
              ].map((step, idx) => (
                <div key={idx} className="relative pl-6 animate-in slide-in-from-left fade-in fill-mode-both duration-500" style={{ animationDelay: `${step.delay}ms` }}>
                  <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${step.color} border-4 border-gray-900`} />
                  <h4 className="font-black text-white">{step.status}</h4>
                </div>
              ))}
            </div>
            <p className="text-center text-2xl font-bold text-blue-400 leading-tight">
              Track the repair instead of losing the complaint.
            </p>
          </div>

          {/* SCENE 7 — VERIFICATION */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-white p-6 pt-20 flex flex-col items-center justify-center ${currentScene === 6 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="w-full space-y-4 mb-8">
              <div className="bg-gray-100 rounded-2xl p-2 relative overflow-hidden animate-in slide-in-from-top duration-500">
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded z-10">Before Repair</div>
                <div className="aspect-video bg-gray-300 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Before" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex justify-center -my-2 relative z-10">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-2 relative overflow-hidden animate-in slide-in-from-bottom duration-500 delay-300">
                <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded z-10">After Repair</div>
                <div className="aspect-video bg-gray-300 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80" alt="After" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4 animate-in zoom-in duration-500 delay-700">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-black text-green-600 uppercase">Resolved</span>
            </div>
            <p className="text-center font-bold text-gray-600">Repair evidence completes the journey.</p>
          </div>

          {/* SCENE 8 — FINAL HOOK */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-blue-600 text-white p-6 pt-24 flex flex-col items-center justify-center text-center ${currentScene === 7 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <Shield className="w-16 h-16 text-white mb-6 animate-in zoom-in duration-500" />
            <h1 className="text-4xl font-black mb-8 tracking-tight animate-in slide-in-from-bottom duration-500 delay-100">ROADGUARD AI</h1>
            <div className="space-y-2 mb-12 text-2xl font-bold text-blue-200">
              <p className="animate-in slide-in-from-left duration-300 delay-300">Detect.</p>
              <p className="animate-in slide-in-from-left duration-300 delay-400">Prioritize.</p>
              <p className="animate-in slide-in-from-left duration-300 delay-500">Track.</p>
              <p className="animate-in slide-in-from-left duration-300 delay-600">Verify.</p>
            </div>
            <p className="text-lg font-medium leading-tight animate-in fade-in duration-700 delay-1000">
              Smarter roads start with smarter reporting.
            </p>
          </div>

        </div>
      </div>

      {/* Side Panel: Controls & Voiceover */}
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-xl">
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-black text-white">Promo Reel</h1>
            <p className="text-gray-400 font-medium mt-1">Storyboard Viewer (9:16)</p>
          </div>
          <Link to="/demo" className="text-sm font-bold text-blue-400 hover:text-blue-300 px-4 py-2 bg-blue-500/10 rounded-lg">
            Exit
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : currentScene === SCENES.length - 1 && progress === 100 ? <RotateCcw className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 min-h-[200px]">
          <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-4">
            {SCENES[currentScene].title}
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed font-medium italic">
            "{SCENES[currentScene].vo}"
          </p>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-2">
          {SCENES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToScene(idx)}
              className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                currentScene === idx 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
