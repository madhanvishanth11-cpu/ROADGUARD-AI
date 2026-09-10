import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, X, Shield, AlertTriangle, 
  Brain, MapPin, Activity, MonitorSmartphone, ArrowDown
} from 'lucide-react';

export const PresentationDeck = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 10;

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides) setCurrentSlide(prev => prev + 1);
  }, [currentSlide]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 1) setCurrentSlide(prev => prev - 1);
  }, [currentSlide]);

  const handleExit = useCallback(() => {
    navigate('/demo');
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleExit]);

  const SlideWrapper = ({ children, notes }: { children: React.ReactNode, notes?: string }) => (
    <div className="h-full flex flex-col justify-center px-8 md:px-24">
      <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-right-4 duration-500">
        {children}
      </div>
      {notes && (
        <div className="absolute bottom-24 left-8 md:left-24 max-w-2xl bg-gray-900/90 text-gray-300 p-4 rounded-xl text-sm border border-gray-700 backdrop-blur-sm hidden lg:block">
          <strong>Speaker Note:</strong> {notes}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 h-screen w-screen overflow-hidden flex flex-col font-sans relative">
      
      {/* Presentation Content Area */}
      <div className="flex-1 relative overflow-hidden bg-white shadow-[0_0_50px_rgba(0,0,0,0.05)] m-4 md:m-8 rounded-3xl border border-gray-200">
        
        {/* SLIDE 1: TITLE */}
        {currentSlide === 1 && (
          <SlideWrapper>
            <div className="text-center">
              <Shield className="w-24 h-24 text-blue-600 mx-auto mb-8" />
              <h1 className="text-7xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight">ROADGUARD AI</h1>
              <p className="text-2xl md:text-3xl text-gray-600 font-medium mb-12">
                AI-powered road damage reporting and repair prioritization
              </p>
              <div className="inline-flex items-center gap-4 bg-gray-100 px-6 py-3 rounded-full mb-12">
                <span className="font-bold text-gray-700 uppercase tracking-widest text-sm">Detect</span> <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-gray-700 uppercase tracking-widest text-sm">Prioritize</span> <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-gray-700 uppercase tracking-widest text-sm">Track</span> <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-gray-700 uppercase tracking-widest text-sm">Verify</span>
              </div>
              <p className="text-blue-600 font-black tracking-widest uppercase">Engineers Day Challenge</p>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 2: THE PROBLEM */}
        {currentSlide === 2 && (
          <SlideWrapper notes="Today, the problem is not only detecting potholes. The bigger challenge is knowing which road damage needs attention first and tracking whether it was actually repaired.">
            <h2 className="text-5xl font-black text-gray-900 mb-12">What's the Problem?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ul className="space-y-6 text-xl text-gray-700 leading-relaxed font-medium">
                <li className="flex items-start gap-4"><span className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" /> Potholes and road damage can remain unnoticed</li>
                <li className="flex items-start gap-4"><span className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" /> Citizens may not know where or how to report effectively</li>
                <li className="flex items-start gap-4"><span className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" /> Authorities can receive many complaints</li>
                <li className="flex items-start gap-4"><span className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" /> Not every road issue has the same urgency</li>
                <li className="flex items-start gap-4"><span className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" /> Critical road damage should be prioritized</li>
              </ul>
              <div className="bg-gray-100 rounded-3xl aspect-video flex items-center justify-center p-8 border border-gray-200 shadow-inner">
                <AlertTriangle className="w-32 h-32 text-orange-400" />
              </div>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 3: OUR SOLUTION */}
        {currentSlide === 3 && (
          <SlideWrapper notes="RoadGuard AI converts a simple citizen road image into an actionable repair workflow.">
            <h2 className="text-5xl font-black text-gray-900 mb-16 text-center">Our Solution</h2>
            <div className="flex flex-wrap justify-center items-center gap-4 text-lg font-bold text-gray-800">
              <span className="bg-blue-50 px-6 py-4 rounded-xl border border-blue-100">Citizen</span>
              <ArrowRight className="text-gray-400" />
              <span className="bg-blue-50 px-6 py-4 rounded-xl border border-blue-100">Road Image</span>
              <ArrowRight className="text-gray-400" />
              <span className="bg-purple-50 px-6 py-4 rounded-xl border border-purple-100">AI Detection</span>
              <ArrowRight className="text-gray-400" />
              <span className="bg-purple-50 px-6 py-4 rounded-xl border border-purple-100">GPS Location</span>
              <ArrowRight className="text-gray-400" />
              <span className="bg-purple-50 px-6 py-4 rounded-xl border border-purple-100">Risk Score</span>
              <ArrowRight className="text-gray-400 hidden md:block" />
              <span className="bg-green-50 px-6 py-4 rounded-xl border border-green-100">Priority Queue</span>
              <ArrowRight className="text-gray-400" />
              <span className="bg-green-50 px-6 py-4 rounded-xl border border-green-100">Repair Tracking</span>
              <ArrowRight className="text-gray-400" />
              <span className="bg-green-50 px-6 py-4 rounded-xl border border-green-100">Before/After Verification</span>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 4: HOW AI HELPS */}
        {currentSlide === 4 && (
          <SlideWrapper notes="Instead of treating every complaint equally, our system calculates an explainable risk score and helps prioritize the most important cases.">
            <h2 className="text-5xl font-black text-gray-900 mb-12">AI + Location Intelligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <Brain className="w-10 h-10 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">AI Detects:</h3>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li>• Pothole Presence</li>
                  <li>• Severity Level</li>
                  <li>• AI Confidence</li>
                  <li>• Estimated Size</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <MapPin className="w-10 h-10 text-green-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Location System:</h3>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li>• GPS Coordinates</li>
                  <li>• Map Location Context</li>
                  <li>• Nearby Duplicate Reports</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 border-t-4 border-t-purple-600">
                <Activity className="w-10 h-10 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Risk Engine:</h3>
                <ul className="space-y-2 text-gray-700 font-medium">
                  <li>• Severity</li>
                  <li>• Traffic Conditions</li>
                  <li>• Location Importance</li>
                  <li>• Repeated Reports</li>
                  <li>• Weather Risk</li>
                  <li>• AI Confidence</li>
                </ul>
              </div>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 5: LIVE DEMO */}
        {currentSlide === 5 && (
          <SlideWrapper notes="Now I'll show the complete workflow from citizen reporting to repair verification.">
            <div className="text-center">
              <h2 className="text-5xl font-black text-gray-900 mb-12">Let's See It In Action</h2>
              
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <Link to="/report" className="px-6 py-4 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 transition-colors">1. Report Road Damage</Link>
                <Link to="/authority" className="px-6 py-4 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 transition-colors">2. Authority Dashboard</Link>
                <Link to="/my-reports" className="px-6 py-4 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 transition-colors">3. My Reports</Link>
                <Link to="/authority/analytics" className="px-6 py-4 bg-gray-100 rounded-xl font-bold hover:bg-gray-200 transition-colors">4. Analytics</Link>
              </div>

              <Link to="/demo" className="inline-block px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-2xl hover:bg-blue-700 transition-colors shadow-xl">
                Start Demo
              </Link>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 6: COMPLETE WORKFLOW */}
        {currentSlide === 6 && (
          <SlideWrapper notes="The important part is that the process does not stop after detection. The report can be verified, assigned, tracked and finally supported with repair evidence.">
            <h2 className="text-5xl font-black text-gray-900 mb-6">Complete Workflow</h2>
            <p className="text-2xl text-gray-600 mb-16">Every report has a traceable status history.</p>
            
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
                <span className="bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-full">REPORTED</span>
                <ArrowRight className="text-gray-400" />
                <span className="bg-blue-500 text-white font-bold px-6 py-3 rounded-full">VERIFIED</span>
                <ArrowRight className="text-gray-400" />
                <span className="bg-purple-500 text-white font-bold px-6 py-3 rounded-full">ASSIGNED</span>
                <ArrowRight className="text-gray-400 hidden sm:block" />
                <span className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-full">IN_PROGRESS</span>
                <ArrowRight className="text-gray-400" />
                <span className="bg-green-500 text-white font-bold px-6 py-3 rounded-full">RESOLVED</span>
              </div>

              <div className="flex items-center gap-8 bg-gray-50 p-8 rounded-3xl border border-gray-200">
                <div className="text-center font-bold text-gray-500">Before Repair</div>
                <div className="text-4xl font-black text-gray-300">+</div>
                <div className="text-center font-bold text-green-600">After Repair</div>
              </div>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 7: WHY ROADGUARD AI */}
        {currentSlide === 7 && (
          <SlideWrapper>
            <h2 className="text-5xl font-black text-gray-900 mb-12 text-center">What Makes It Useful?</h2>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                <h3 className="text-2xl font-black text-blue-600 mb-2">1. Detect</h3>
                <p className="text-gray-600 font-medium">AI-assisted road damage detection</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                <h3 className="text-2xl font-black text-purple-600 mb-2">2. Prioritize</h3>
                <p className="text-gray-600 font-medium">Risk-based repair priority</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                <h3 className="text-2xl font-black text-orange-600 mb-2">3. Track</h3>
                <p className="text-gray-600 font-medium">Citizen and authority status tracking</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
                <h3 className="text-2xl font-black text-green-600 mb-2">4. Verify</h3>
                <p className="text-gray-600 font-medium">Before/after repair evidence</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-center text-gray-800">
              Detection <ArrowRight className="inline mx-2" /> Action <ArrowRight className="inline mx-2" /> Accountability
            </p>
          </SlideWrapper>
        )}

        {/* SLIDE 8: REAL-WORLD DEPLOYMENT */}
        {currentSlide === 8 && (
          <SlideWrapper>
            <h2 className="text-5xl font-black text-gray-900 mb-16 text-center">How Can This Scale?</h2>
            
            <div className="flex flex-col items-center mb-16 space-y-6">
              <div className="bg-white border-2 border-gray-300 px-8 py-4 rounded-xl font-bold text-xl w-64 text-center">Citizen App</div>
              <ArrowDown className="text-gray-400" />
              <div className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-xl w-64 text-center shadow-lg">RoadGuard AI</div>
              <ArrowDown className="text-gray-400" />
              <div className="bg-white border-2 border-gray-300 px-8 py-4 rounded-xl font-bold text-xl w-64 text-center">Authority Dashboard</div>
              <ArrowDown className="text-gray-400" />
              <div className="bg-gray-100 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold text-xl w-64 text-center text-gray-500 border-dashed">Existing Government Workflow</div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center max-w-3xl mx-auto">
              <p className="text-yellow-800 text-sm font-bold uppercase tracking-wider mb-1">Important Disclaimer</p>
              <p className="text-yellow-900 text-sm">
                Prototype currently uses its own dashboard and demo workflow. Real government integration would require official authorization/API partnership.
              </p>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 9: FUTURE SCOPE */}
        {currentSlide === 9 && (
          <SlideWrapper notes="Our future goal is to move from simply detecting existing damage toward predicting and preventing high-risk road conditions.">
            <div className="flex items-center gap-4 mb-12">
              <MonitorSmartphone className="w-12 h-12 text-blue-600" />
              <h2 className="text-5xl font-black text-gray-900">What's Next?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-xl text-gray-700 font-medium max-w-4xl">
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Real-time AI pothole detection</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Road damage heatmaps</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Predictive road-risk alerts</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Traffic data integration</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Weather data integration</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Municipal API integration</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Mobile application</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Automated maintenance notifications</div>
            </div>
          </SlideWrapper>
        )}

        {/* SLIDE 10: FINAL PITCH */}
        {currentSlide === 10 && (
          <SlideWrapper>
            <div className="text-center">
              <p className="text-3xl text-gray-500 font-medium mb-12">
                RoadGuard AI doesn't just detect potholes.
              </p>
              <h2 className="text-7xl md:text-9xl font-black text-gray-900 mb-12 leading-tight">
                Detect.<br/>Prioritize.<br/>Track.<br/>Verify.
              </h2>
              <p className="text-2xl text-blue-600 font-bold mb-16">
                Turning road damage reports into an actionable repair workflow.
              </p>
              <p className="text-4xl font-black text-gray-300 uppercase tracking-widest">
                Thank You
              </p>
            </div>
          </SlideWrapper>
        )}

      </div>

      {/* Presentation Controls Footer */}
      <footer className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExit}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" /> Exit Presentation
          </button>
        </div>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={handlePrev}
            disabled={currentSlide === 1}
            className="flex items-center gap-2 font-bold text-gray-700 disabled:opacity-30 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Previous
          </button>
          
          <div className="font-mono font-bold text-gray-400 bg-gray-50 px-4 py-1 rounded-full border border-gray-200">
            {currentSlide} / {totalSlides}
          </div>
          
          {currentSlide < totalSlides ? (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 font-bold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link 
              to="/demo"
              className="flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Start Demo <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </footer>

    </div>
  );
};
