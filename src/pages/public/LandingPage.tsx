import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Activity, MapPin, CheckCircle, Shield,
  AlertTriangle, EyeOff, LayoutDashboard,
  Camera, Zap, Users, Brain, Wrench, Building2
} from 'lucide-react';

export const LandingPage = () => {
  useTitle('RoadGuard AI — Smart Road Damage Management');

  return (
    <div className="bg-white dark:bg-black flex flex-col min-h-screen font-sans transition-colors duration-200">
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 dark:from-black dark:to-black pt-16 pb-16 border-b border-slate-200 dark:border-[#2A2A2A] text-center px-4 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-black dark:to-black pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-black mb-8 uppercase tracking-widest shadow-sm">
            <Shield className="w-4 h-4" /> ENGINEERS DAY CHALLENGE • PUBLIC BETA
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-6 transition-colors">
            RoadGuard AI
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-[#A1A1AA] mb-6 transition-colors">
            Smarter Roads. <span className="text-blue-600 dark:text-blue-500">Faster Repairs.</span> Safer Communities.
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-[#A1A1AA] mb-6 max-w-2xl mx-auto leading-relaxed font-medium transition-colors">
            An AI-powered road damage reporting and repair tracking platform that connects citizens, officers and workers through one simple system.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/report" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-1">
              Report Road Damage <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-sm">
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="py-12 px-4 bg-white dark:bg-black transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-sm font-black text-blue-600 dark:text-blue-500 tracking-widest uppercase mb-4">The Problem</h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight transition-colors">
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
              <div key={i} className="bg-slate-50 dark:bg-[#111111] border border-slate-100 dark:border-[#2A2A2A] p-6 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm group">
                <div className="w-12 h-12 bg-white dark:bg-[#111111] rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-center mb-6 group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors">
                  <item.icon className="w-6 h-6 text-slate-700 dark:text-[#A1A1AA]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-[#A1A1AA] leading-relaxed font-medium transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR PURPOSE */}
      <section className="py-12 px-4 bg-slate-900 dark:bg-black text-white transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-sm font-black text-blue-400 tracking-widest uppercase mb-4">Our Purpose</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">Make road damage reporting simple, transparent and actionable.</h3>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              RoadGuard AI is designed to reduce the gap between citizens who discover road problems and the teams responsible for fixing them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 transition-transform hover:-translate-y-1">
              <Camera className="w-10 h-10 text-blue-400 mb-6" />
              <h4 className="text-2xl font-bold mb-3">REPORT</h4>
              <p className="text-slate-300">Make reporting easy using a photo and location.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 transition-transform hover:-translate-y-1">
              <Zap className="w-10 h-10 text-yellow-400 mb-6" />
              <h4 className="text-2xl font-bold mb-3">PRIORITIZE</h4>
              <p className="text-slate-300">Use AI-assisted analysis to understand severity and help prioritize repairs.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 transition-transform hover:-translate-y-1">
              <Wrench className="w-10 h-10 text-green-400 mb-6" />
              <h4 className="text-2xl font-bold mb-3">RESOLVE</h4>
              <p className="text-slate-300">Connect verified reports to repair workers and track the issue until completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW ROADGUARD AI WORKS */}
      <section id="how-it-works" className="py-12 px-4 bg-slate-50 dark:bg-black border-y border-slate-200 dark:border-[#2A2A2A] overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 transition-colors">HOW ROADGUARD AI WORKS</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative gap-4 lg:gap-0">
            {/* Connecting line (Desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 w-full h-1 bg-slate-200 dark:bg-[#111111] z-0"></div>
            
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
                  <div className="w-16 h-16 bg-white dark:bg-[#111111] border-4 border-slate-100 dark:border-[#2A2A2A] rounded-full flex items-center justify-center font-black text-xl text-blue-600 dark:text-blue-400 shadow-sm group-hover:border-blue-200 dark:group-hover:border-blue-600 transition-colors flex-shrink-0">
                    {step.num}
                  </div>
                  <div className="lg:text-center">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 transition-colors">{step.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-[#A1A1AA] transition-colors">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center items-center flex-wrap gap-4 text-xs font-black text-slate-400 dark:text-[#A1A1AA] uppercase tracking-widest transition-colors">
            <span className="text-slate-800 dark:text-white bg-white dark:bg-[#111111] px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-[#2A2A2A] transition-colors">Citizen</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded shadow-sm border border-blue-100 dark:border-blue-800 transition-colors">AI</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-slate-800 dark:text-white bg-white dark:bg-[#111111] px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-[#2A2A2A] transition-colors">Officer</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-slate-800 dark:text-white bg-white dark:bg-[#111111] px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-[#2A2A2A] transition-colors">Worker</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded shadow-sm border border-green-100 dark:border-green-800 transition-colors">Repair</span> <ArrowRight className="w-4 h-4"/>
            <span className="text-slate-800 dark:text-white bg-white dark:bg-[#111111] px-4 py-2 rounded shadow-sm border border-slate-100 dark:border-[#2A2A2A] transition-colors">Citizen</span>
          </div>
        </div>
      </section>

      {/* 5. WHO BENEFITS */}
      <section className="py-12 px-4 bg-white dark:bg-black transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">WHO BENEFITS?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-500 mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-white">CITIZENS</h3>
              <p className="text-slate-600 dark:text-[#A1A1AA]">Easy reporting and transparent tracking.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Shield className="w-8 h-8 text-slate-700 dark:text-[#A1A1AA] mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-white">OFFICERS</h3>
              <p className="text-slate-600 dark:text-[#A1A1AA]">Centralized dashboard to verify, prioritize and manage reports.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Wrench className="w-8 h-8 text-slate-700 dark:text-[#A1A1AA] mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-white">WORKERS</h3>
              <p className="text-slate-600 dark:text-[#A1A1AA]">Clear repair assignments and location information.</p>
            </div>
            <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl transition-transform hover:-translate-y-1 shadow-sm">
              <Building2 className="w-8 h-8 text-green-600 dark:text-green-500 mb-4" />
              <h3 className="font-black text-xl mb-2 text-slate-900 dark:text-white">COMMUNITIES</h3>
              <p className="text-slate-600 dark:text-[#A1A1AA]">Safer and better-maintained roads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES ROADGUARD AI DIFFERENT */}
      <section className="py-12 px-4 bg-slate-900 dark:bg-black text-white transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
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


      {/* 8 & 9. SYSTEM SHOWCASES */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-black border-y border-slate-200 dark:border-[#2A2A2A] transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] transition-transform hover:-translate-y-1">
            <LayoutDashboard className="w-10 h-10 text-slate-700 dark:text-[#A1A1AA] mb-6 transition-colors" />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 transition-colors">OFFICER & REPAIR MANAGEMENT</h2>
            <ul className="space-y-4 mb-8 text-slate-600 dark:text-[#A1A1AA] font-medium transition-colors">
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

          <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] transition-transform hover:-translate-y-1">
            <Users className="w-10 h-10 text-blue-600 dark:text-blue-500 mb-6 transition-colors" />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 transition-colors">FOR CITIZENS</h2>
            <p className="text-slate-600 dark:text-[#A1A1AA] mb-6 font-medium transition-colors">Citizens can report road damage, receive a unique Report ID and track the progress of their report in real-time.</p>
            
            <div className="bg-slate-50 dark:bg-black p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] mb-8 font-mono text-sm transition-colors">
              <div className="mb-4"><span className="text-slate-400 dark:text-[#A1A1AA]">Report ID:</span> <span className="font-bold text-blue-600 dark:text-blue-400">RG-20260911-001</span></div>
              <div className="text-slate-400 dark:text-[#A1A1AA] mb-1">Status Timeline:</div>
              <div className="text-slate-700 dark:text-[#A1A1AA] font-bold leading-relaxed transition-colors">
                Reported → Verified → Repair Assigned → In Progress → <span className="text-green-600 dark:text-green-500">Resolved</span>
              </div>
            </div>

            <Link to="/report" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Report Road Damage
            </Link>
          </div>

        </div>
      </section>



      {/* 13. FUTURE SCOPE */}
      <section className="py-12 px-4 bg-white dark:bg-black border-b border-slate-200 dark:border-[#2A2A2A] transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-slate-100 dark:bg-[#111111] text-slate-600 dark:text-[#A1A1AA] font-black text-xs uppercase tracking-widest rounded-lg mb-6 transition-colors">
            Future Scope
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 transition-colors">POSSIBLE FUTURE IMPROVEMENTS</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Real AI image detection', 'Real government department integration', 
              'Mobile application', 'Automatic worker routing', 
              'Advanced road-risk prediction', 'Historical road damage analytics',
              'Emergency/high-risk alerts', 'Smart city integration'
            ].map((item, i) => (
              <span key={i} className="px-5 py-3 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-[#A1A1AA] font-bold text-sm rounded-full shadow-sm transition-colors hover:-translate-y-1">
                {item}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 dark:text-[#A1A1AA] mt-8 uppercase tracking-wider font-bold transition-colors">
            * These features are conceptual and not currently live in this prototype.
          </p>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="py-12 px-4 bg-blue-600 dark:bg-blue-700 text-white text-center transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">SEE A ROAD PROBLEM? HELP FIX IT.</h2>
          <p className="text-2xl text-blue-200 mb-6 font-medium">Report it. Track it. Get it resolved.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/report" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-black text-blue-600 dark:text-white rounded-xl font-black text-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shadow-lg">
              Report Road Damage
            </Link>
            <Link to="/track" className="w-full sm:w-auto px-8 py-4 bg-blue-700 dark:bg-blue-800 border border-blue-500 dark:border-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors">
              Track My Report
            </Link>
          </div>
        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="bg-slate-900 dark:bg-black py-12 px-4 border-t border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500 font-medium">
          <p className="mb-2"><strong className="text-slate-300">RoadGuard AI Platform</strong> - Designed for efficient civic management.</p>
          <p>Engineers Day Challenge Prototype</p>
        </div>
      </footer>

    </div>
  );
};
