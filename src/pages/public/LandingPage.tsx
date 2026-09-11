import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Activity, MapPin, CheckCircle, Shield,
  AlertTriangle, EyeOff, LayoutDashboard, ArrowDown,
  Camera, Zap, Users, Brain, Wrench, Building2,
  X, ChevronLeft, ChevronRight, Play
} from 'lucide-react';

// --- Presentation View Component ---
const PresentationDeck = ({ onClose }: { onClose: () => void }) => {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "RoadGuard AI",
      content: "Smarter Roads. Faster Repairs. Safer Communities.\n\nAn AI-powered road damage reporting and repair tracking platform that connects citizens, officers and workers through one simple system."
    },
    {
      title: "The Problem",
      content: "Road damage such as potholes, cracks and damaged road surfaces can create accidents, traffic problems and inconvenience for the public.\n\nCitizens often don't know where to report, and authorities lack prioritized data."
    },
    {
      title: "Our Solution",
      content: "A unified digital platform connecting:\n\n1. Citizens (Reporting)\n2. AI (Analysis & Prioritization)\n3. Officers (Verification & Management)\n4. Workers (Execution)\n\nCreating a complete, transparent, and actionable workflow."
    },
    {
      title: "How It Works",
      content: "1. Citizen Reports issue via mobile\n2. AI analyzes damage type & severity\n3. Officer verifies & assigns priority\n4. Worker is dispatched with location data\n5. Repair is completed & verified\n6. Citizen tracks resolution in real-time"
    },
    {
      title: "Technology",
      content: "• AI-assisted Image Analysis\n• Real-time Geolocation Services\n• Secure Role-based Web Architecture\n• Digital Workflow & Assignment Management\n• Cloud Database & Storage"
    },
    {
      title: "Who Benefits",
      content: "CITIZENS: Easy reporting and transparent tracking.\nOFFICERS: Centralized dashboard to prioritize and manage reports.\nWORKERS: Clear assignments and accurate location data.\nCOMMUNITIES: Safer, better-maintained roads."
    },
    {
      title: "Expected Impact",
      content: "• Faster Reporting\n• Better Prioritization of critical issues\n• Transparent Tracking for the public\n• Efficient Coordination across departments\n• Safer Communities overall"
    },
    {
      title: "Future Scope",
      content: "• Integration with real Government Departments\n• Dedicated Mobile Native Application\n• Automatic Worker Routing Algorithms\n• Historical Road Damage Analytics\n• Smart City Infrastructure Integration"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col">
      <div className="flex justify-between items-center p-6 bg-slate-800 text-white border-b border-slate-700">
        <div className="font-bold tracking-widest text-slate-400 text-sm">ROADGUARD AI • ENGINEERS DAY</div>
        <button onClick={onClose} className="hover:bg-slate-700 p-2 rounded-lg transition-colors flex items-center gap-2 font-bold text-sm">
          <X className="w-5 h-5" /> Exit Presentation
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative bg-slate-900">
        <div className="max-w-4xl w-full aspect-video bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-12 flex flex-col justify-center relative overflow-hidden transition-colors">
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 dark:bg-slate-700">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${((slide + 1) / slides.length) * 100}%` }}></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 transition-colors">{slides[slide].title}</h2>
          <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed transition-colors">
            {slides[slide].content}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 flex justify-between items-center text-white border-t border-slate-700">
        <button 
          onClick={() => setSlide(s => Math.max(0, s - 1))} 
          disabled={slide === 0}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>
        <div className="font-mono text-slate-400 font-bold tracking-widest">
          {slide + 1} / {slides.length}
        </div>
        <button 
          onClick={() => setSlide(s => Math.min(slides.length - 1, s + 1))}
          disabled={slide === slides.length - 1}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold flex items-center gap-2 transition-colors"
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


export const LandingPage = () => {
  const [showPresentation, setShowPresentation] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 flex flex-col min-h-screen font-sans transition-colors duration-200">
      
      {showPresentation && <PresentationDeck onClose={() => setShowPresentation(false)} />}

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-900 pt-24 pb-32 border-b border-slate-200 dark:border-slate-800 text-center px-4 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-slate-900 dark:to-slate-900 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-black mb-8 uppercase tracking-widest shadow-sm">
            <Shield className="w-4 h-4" /> ENGINEERS DAY CHALLENGE • PUBLIC BETA
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-6 transition-colors">
            RoadGuard AI
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-300 mb-6 transition-colors">
            Smarter Roads. <span className="text-blue-600 dark:text-blue-500">Faster Repairs.</span> Safer Communities.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium transition-colors">
            An AI-powered road damage reporting and repair tracking platform that connects citizens, officers and workers through one simple system.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/report" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-1">
              Report Road Damage <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-sm">
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-blue-600 dark:text-blue-500 tracking-widest uppercase mb-4">The Problem</h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 max-w-3xl mx-auto leading-tight transition-colors">
              Road damage such as potholes, cracks and damaged road surfaces can create accidents, traffic problems and inconvenience for the public.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: AlertTriangle, title: 'Potholes', desc: 'Damaged roads can create safety risks for drivers and pedestrians.' },
              { icon: Shield, title: 'Safety Risks', desc: 'Unreported road damage can lead to accidents and vehicle damage.' },
              { icon: MapPin, title: 'Difficult Reporting', desc: 'Citizens may not know where or how to report the problem.' },
              { icon: EyeOff, title: 'No Clear Tracking', desc: 'After reporting, citizens often cannot easily know what happened to their complaint.' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 p-8 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm group">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors">
                  <item.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR PURPOSE */}
      <section className="py-24 px-4 bg-slate-900 dark:bg-slate-950 text-white transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-blue-400 tracking-widest uppercase mb-4">Our Purpose</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Make road damage reporting simple, transparent and actionable.</h3>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              RoadGuard AI is designed to reduce the gap between citizens who discover road problems and the teams responsible for fixing them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transition-transform hover:-translate-y-1">
              <Camera className="w-10 h-10 text-blue-400 mb-6" />
              <h4 className="text-2xl font-bold mb-3">REPORT</h4>
              <p className="text-slate-300">Make reporting easy using a photo and location.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transition-transform hover:-translate-y-1">
              <Zap className="w-10 h-10 text-yellow-400 mb-6" />
              <h4 className="text-2xl font-bold mb-3">PRIORITIZE</h4>
              <p className="text-slate-300">Use AI-assisted analysis to understand severity and help prioritize repairs.</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transition-transform hover:-translate-y-1">
              <Wrench className="w-10 h-10 text-green-400 mb-6" />
              <h4 className="text-2xl font-bold mb-3">RESOLVE</h4>
              <p className="text-slate-300">Connect verified reports to repair workers and track the issue until completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW ROADGUARD AI WORKS */}
      <section id="how-it-works" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 transition-colors">HOW ROADGUARD AI WORKS</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative gap-8 lg:gap-0">
            {/* Connecting line (Desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 z-0"></div>
            
            {[
              { num: 1, title: 'Citizen Reports', desc: 'Citizen takes a photo of the damaged road and submits the report.' },
              { num: 2, title: 'AI Analysis', desc: 'AI analyzes the submitted info and helps identify severity and risk.' },
              { num: 3, title: 'Officer Verification', desc: 'An officer reviews the report and verifies the issue.' },
              { num: 4, title: 'Repair Assigned', desc: 'The verified report is assigned to the appropriate worker.' },
              { num: 5, title: 'Repair In Progress', desc: 'The worker repairs the road damage and updates progress.' },
              { num: 6, title: 'Resolved', desc: 'Officer verifies completion and citizen sees final status.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col lg:items-center w-full lg:w-1/6 group">
                <div className="flex flex-row lg:flex-col items-center gap-6 lg:gap-4">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 rounded-full flex items-center justify-center font-black text-xl text-blue-600 dark:text-blue-400 shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-600 transition-colors flex-shrink-0">
                    {step.num}
                  </div>
                  <div className="lg:text-center">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 transition-colors">{step.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center items-center flex-wrap gap-4 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
            <span className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">Citizen</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded shadow-sm border border-blue-100 dark:border-blue-800 transition-colors">AI</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">Officer</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">Worker</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded shadow-sm border border-green-100 dark:border-green-800 transition-colors">Repair</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">Citizen</span>
          </div>
        </div>
      </section>

      {/* 5. WHO BENEFITS */}
      <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">WHO BENEFITS?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-500 mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-slate-100">CITIZENS</h3>
              <p className="text-slate-600 dark:text-slate-400">Easy reporting and transparent tracking.</p>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Shield className="w-8 h-8 text-slate-700 dark:text-slate-300 mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-slate-100">OFFICERS</h3>
              <p className="text-slate-600 dark:text-slate-400">Centralized dashboard to verify, prioritize and manage reports.</p>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Wrench className="w-8 h-8 text-slate-700 dark:text-slate-300 mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-slate-100">WORKERS</h3>
              <p className="text-slate-600 dark:text-slate-400">Clear repair assignments and location information.</p>
            </div>
            <div className="p-8 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Building2 className="w-8 h-8 text-green-600 dark:text-green-500 mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-slate-100">COMMUNITIES</h3>
              <p className="text-slate-600 dark:text-slate-400">Safer and better-maintained roads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES ROADGUARD AI DIFFERENT */}
      <section className="py-24 px-4 bg-slate-900 dark:bg-slate-950 text-white transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">WHAT MAKES ROADGUARD AI DIFFERENT?</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              RoadGuard AI is not just a complaint system. It creates a complete workflow from identifying a road problem to verifying its repair.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Camera, text: 'Photo-based reporting' },
              { icon: MapPin, text: 'Location-based issue tracking' },
              { icon: Brain, text: 'AI-assisted damage analysis' },
              { icon: AlertTriangle, text: 'Severity & risk prioritization' },
              { icon: Shield, text: 'Officer verification' },
              { icon: Users, text: 'Worker assignment' },
              { icon: Activity, text: 'Real-time-style status tracking' },
              { icon: CheckCircle, text: 'Repair completion verification' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm transition-transform hover:-translate-y-1">
                <feature.icon className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <span className="font-bold text-sm text-slate-200">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPLETE WORKFLOW */}
      <section className="py-32 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 text-center transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-black text-blue-600 dark:text-blue-500 tracking-widest uppercase mb-4">From Problem to Solution</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-16 transition-colors">THE COMPLETE WORKFLOW</h3>
          
          <div className="flex flex-col items-center gap-4">
            {['ROAD DAMAGE', 'REPORT', 'AI ANALYSIS', 'PRIORITY', 'OFFICER VERIFICATION', 'WORKER ASSIGNMENT', 'REPAIR', 'VERIFICATION', 'RESOLVED'].map((step, i, arr) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`px-8 py-4 rounded-xl font-black tracking-widest text-lg shadow-sm border transition-colors ${i === 0 || i === arr.length - 1 ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-800 dark:border-blue-700' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}>
                  {step}
                </div>
                {i !== arr.length - 1 && <ArrowDown className="w-6 h-6 text-slate-300 dark:text-slate-600 my-4 transition-colors" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 & 9. SYSTEM SHOWCASES */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-transform hover:-translate-y-1">
            <LayoutDashboard className="w-10 h-10 text-slate-700 dark:text-slate-300 mb-6 transition-colors" />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 transition-colors">OFFICER & REPAIR MANAGEMENT</h2>
            <ul className="space-y-4 mb-8 text-slate-600 dark:text-slate-300 font-medium transition-colors">
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500"/> View all reported road damage</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500"/> Verify reports & check severity</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500"/> Prioritize repairs & assign workers</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500"/> Track repair progress & mark resolved</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500"/> View incidents on an interactive map</li>
            </ul>
            <Link to="/officer-login" className="inline-block px-6 py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              View Officer Portal
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-transform hover:-translate-y-1">
            <Users className="w-10 h-10 text-blue-600 dark:text-blue-500 mb-6 transition-colors" />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 transition-colors">FOR CITIZENS</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium transition-colors">Citizens can report road damage, receive a unique Report ID and track the progress of their report in real-time.</p>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8 font-mono text-sm transition-colors">
              <div className="mb-4"><span className="text-slate-400 dark:text-slate-500">Report ID:</span> <span className="font-bold text-blue-600 dark:text-blue-400">RG-20260911-001</span></div>
              <div className="text-slate-400 dark:text-slate-500 mb-1">Status Timeline:</div>
              <div className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed transition-colors">
                Reported → Verified → Repair Assigned → In Progress → <span className="text-green-600 dark:text-green-500">Resolved</span>
              </div>
            </div>

            <Link to="/report" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Report Road Damage
            </Link>
          </div>

        </div>
      </section>

      {/* 10. PROJECT IMPACT */}
      <section className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">EXPECTED IMPACT</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Faster Reporting', desc: 'Problems can be reported immediately using a smartphone.' },
              { title: 'Better Prioritization', desc: 'High-risk problems can receive higher priority automatically.' },
              { title: 'Transparent Tracking', desc: 'Citizens can follow the progress of their specific complaint.' },
              { title: 'Efficient Coordination', desc: 'Officers and workers have a shared, connected workflow.' },
              { title: 'Safer Communities', desc: 'Faster identification and repair can help improve overall road safety.' }
            ].map((item, i) => (
              <div key={i} className="p-6 border-l-4 border-blue-600 bg-slate-50 dark:bg-slate-800/50 dark:border-blue-500 rounded-r-xl transition-transform hover:-translate-y-1 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2 transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 & 12. PPT-STYLE PROJECT EXPLANATION */}
      <section className="py-24 px-4 bg-slate-900 dark:bg-slate-950 text-white relative transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black">PROJECT EXPLANATION</h2>
              <p className="text-slate-400 mt-2">Engineers Day Challenge Documentation</p>
            </div>
            <button 
              onClick={() => setShowPresentation(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center gap-2 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" /> Presentation View
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'PROBLEM', desc: 'Road damage is often difficult to report, prioritize and track.' },
              { num: '02', title: 'IDEA', desc: 'Create one digital platform connecting citizens, AI, officers and repair workers.' },
              { num: '03', title: 'TECHNOLOGY', desc: 'AI-assisted image analysis, location services, web technology and digital workflow management.' },
              { num: '04', title: 'SOLUTION', desc: 'RoadGuard AI converts a road damage photo into a structured, trackable repair report.' },
              { num: '05', title: 'WORKFLOW', desc: 'Report → AI Analysis → Officer Verification → Worker Assignment → Repair → Resolution.' },
              { num: '06', title: 'IMPACT', desc: 'A transparent and organized system for faster road maintenance and better public safety.' }
            ].map((card, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 group hover:border-blue-500 transition-all hover:-translate-y-1 shadow-sm">
                <div className="text-5xl font-black text-slate-700 mb-6 group-hover:text-blue-500 transition-colors">{card.num}</div>
                <h3 className="text-xl font-bold mb-3 tracking-widest uppercase">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FUTURE SCOPE */}
      <section className="py-24 px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-xs uppercase tracking-widest rounded-lg mb-6 transition-colors">
            Future Scope
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-12 transition-colors">POSSIBLE FUTURE IMPROVEMENTS</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Real AI image detection', 'Real government department integration', 
              'Mobile application', 'Automatic worker routing', 
              'Advanced road-risk prediction', 'Historical road damage analytics',
              'Emergency/high-risk alerts', 'Smart city integration'
            ].map((item, i) => (
              <span key={i} className="px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-full shadow-sm transition-colors hover:-translate-y-1">
                {item}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-8 uppercase tracking-wider font-bold transition-colors">
            * These features are conceptual and not currently live in this prototype.
          </p>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="py-32 px-4 bg-blue-600 dark:bg-blue-700 text-white text-center transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">SEE A ROAD PROBLEM? HELP FIX IT.</h2>
          <p className="text-2xl text-blue-200 mb-12 font-medium">Report it. Track it. Get it resolved.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/report" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-blue-600 dark:text-white rounded-xl font-black text-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shadow-lg">
              Report Road Damage
            </Link>
            <Link to="/track" className="w-full sm:w-auto px-8 py-4 bg-blue-700 dark:bg-blue-800 border border-blue-500 dark:border-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors">
              Track My Report
            </Link>
          </div>
        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="bg-slate-900 dark:bg-slate-950 py-12 px-4 border-t border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500 font-medium">
          <p className="mb-2"><strong className="text-slate-300">RoadGuard AI Platform</strong> - Designed for efficient civic management.</p>
          <p>Engineers Day Challenge Prototype</p>
        </div>
      </footer>

    </div>
  );
};
