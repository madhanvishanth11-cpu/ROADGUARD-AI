import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import { Camera, MapPin, ListChecks, CheckCircle, Brain, ArrowRight, Check, Clock } from 'lucide-react';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';

export const AboutPage = () => {
  useTitle('RoadGuard AI — About the Project');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors">
      
      {/* 3. HERO SECTION */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto">
        <span className="inline-flex px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          Engineers Day Innovation Project
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">RoadGuard AI</h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-600 dark:text-[#A1A1AA] mb-4">
          Smart Pothole Detection & Road Repair Priority System
        </h2>
        <p className="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 italic mb-8">
          "Smarter Roads. Faster Repairs. Safer Communities."
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          RoadGuard AI transforms road-damage reporting into an AI-assisted, priority-based repair workflow connecting citizens, officers and workers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#how-it-works" className="px-6 py-3 bg-slate-100 dark:bg-[#151515] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-white font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-[#2A2A2A] transition-colors">
            See How It Works
          </a>
          <Link to="/report" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm">
            Report Road Damage
          </Link>
        </div>
      </section>

      {/* 4. PROBLEM SECTION */}
      <section className="py-16 px-4 bg-white dark:bg-[#111111] border-y border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4">The Problem We See Every Day</h2>
            <p className="text-slate-600 dark:text-[#A1A1AA] max-w-2xl mx-auto">
              Common challenges in road-damage management. Road damage such as potholes, cracks and broken surfaces can create:
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/50">
              <ul className="space-y-3 font-medium text-red-900 dark:text-red-300">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 flex-shrink-0" /> Safety risks</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 flex-shrink-0" /> Vehicle damage</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 flex-shrink-0" /> Traffic disruption</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 flex-shrink-0" /> Delayed maintenance</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 flex-shrink-0" /> Difficulty prioritizing multiple complaints</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-slate-50 dark:bg-black p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] font-bold text-center">
                <div className="text-slate-800 dark:text-white">ROAD DAMAGE</div>
                <div className="my-2 text-slate-300 dark:text-[#2A2A2A]">↓</div>
                <div className="text-slate-800 dark:text-white">CITIZEN REPORT</div>
                <div className="my-2 text-slate-300 dark:text-[#2A2A2A]">↓</div>
                <div className="text-slate-800 dark:text-white">VERIFICATION</div>
                <div className="my-2 text-slate-300 dark:text-[#2A2A2A]">↓</div>
                <div className="text-slate-800 dark:text-white">PRIORITY DECISION</div>
                <div className="my-2 text-slate-300 dark:text-[#2A2A2A]">↓</div>
                <div className="text-slate-800 dark:text-white">REPAIR</div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 text-center font-bold text-amber-900 dark:text-amber-400">
            "Reporting a problem is only the first step. The bigger challenge is deciding what needs attention first and coordinating the repair."
          </div>
        </div>
      </section>

      {/* 5. OUR SOLUTION */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Introducing RoadGuard AI</h2>
          <p className="text-slate-600 dark:text-[#A1A1AA] mb-12 max-w-2xl mx-auto">
            RoadGuard AI connects citizen reporting, AI-assisted assessment, risk-based prioritization, officer verification, worker assignment and citizen tracking in one platform.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 font-bold text-sm">
            <div className="px-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-lg shadow-sm w-full md:w-auto">Citizen</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-blue-600" />
            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg shadow-sm w-full md:w-auto">RoadGuard AI</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-blue-600" />
            <div className="px-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-lg shadow-sm w-full md:w-auto">Officer</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-blue-600" />
            <div className="px-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-lg shadow-sm w-full md:w-auto">Worker</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-blue-600" />
            <div className="px-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-lg shadow-sm w-full md:w-auto">Repair</div>
            <ArrowRight className="hidden md:block w-5 h-5 text-blue-600" />
            <div className="px-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A] rounded-lg shadow-sm w-full md:w-auto">Citizen</div>
          </div>
          
          <p className="mt-8 text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider">
            AI supports decision-making; officers remain responsible for verification and repair decisions.
          </p>
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 px-4 bg-slate-100 dark:bg-[#111111] border-y border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-6">
            
            <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] text-center flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-black mb-4">1</div>
              <Camera className="w-6 h-6 mb-2 text-slate-400 dark:text-[#A1A1AA]" />
              <h3 className="font-bold mb-2">REPORT</h3>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Citizen uploads or captures a road-damage image.</p>
            </div>
            
            <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] text-center flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-black mb-4">2</div>
              <MapPin className="w-6 h-6 mb-2 text-slate-400 dark:text-[#A1A1AA]" />
              <h3 className="font-bold mb-2">LOCATE</h3>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Location is attached to the report using GPS or user-provided location.</p>
            </div>
            
            <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] text-center flex flex-col items-center border-t-4 border-t-blue-500 dark:border-t-blue-500">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-black mb-4">3</div>
              <Brain className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold mb-2 text-blue-600 dark:text-blue-400">ANALYZE</h3>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">AI-assisted analysis identifies damage type, severity and confidence and provides approximate measurements where possible.</p>
            </div>
            
            <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] text-center flex flex-col items-center border-t-4 border-t-blue-500 dark:border-t-blue-500">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-black mb-4">4</div>
              <ListChecks className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold mb-2 text-blue-600 dark:text-blue-400">PRIORITIZE</h3>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Risk factors are combined to recommend repair priority.</p>
            </div>
            
            <div className="bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-slate-200 dark:border-[#2A2A2A] text-center flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-black mb-4">5</div>
              <CheckCircle className="w-6 h-6 mb-2 text-slate-400 dark:text-[#A1A1AA]" />
              <h3 className="font-bold mb-2">REPAIR & TRACK</h3>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Officer verifies the report, assigns a worker and the citizen tracks progress.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 7. AI ANALYSIS SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4">AI-Assisted Road Damage Assessment</h2>
          </div>
          
          <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-[#2A2A2A] max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Damage Type</p>
                <p className="text-lg font-bold">Pothole</p>
              </div>
              <div className="bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Severity</p>
                <p className="text-lg font-bold">HIGH</p>
              </div>
            </div>
            
            <div className="mb-6 flex justify-between items-center bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
              <span className="font-bold text-slate-500 dark:text-[#A1A1AA]">AI Confidence</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">91% ██████████████████░░</span>
            </div>

            <div className="border border-slate-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden mb-6">
              <div className="bg-slate-100 dark:bg-[#151515] px-4 py-2 border-b border-slate-200 dark:border-[#2A2A2A] flex justify-between items-center">
                <h4 className="font-bold text-sm tracking-wider">ESTIMATED DAMAGE SIZE</h4>
                <span className="text-[10px] uppercase font-bold bg-slate-200 dark:bg-[#2A2A2A] px-2 py-0.5 rounded text-slate-600 dark:text-[#A1A1AA]">AI Estimated</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-y-4 text-sm bg-white dark:bg-black">
                <div><span className="text-slate-500 dark:text-[#A1A1AA] block text-xs font-bold">Length</span><span className="font-bold">1.8 m</span></div>
                <div><span className="text-slate-500 dark:text-[#A1A1AA] block text-xs font-bold">Width</span><span className="font-bold">1.2 m</span></div>
                <div><span className="text-slate-500 dark:text-[#A1A1AA] block text-xs font-bold">Estimated Area</span><span className="font-bold">2.16 m²</span></div>
                <div><span className="text-slate-500 dark:text-[#A1A1AA] block text-xs font-bold">Estimated Depth</span><span className="font-bold">12–18 cm</span></div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 px-4 py-2 border-t border-slate-200 dark:border-[#2A2A2A]">
                <p className="text-xs text-amber-800 dark:text-amber-400">
                  ⚠ Measurements shown from image-based analysis are approximate. Field verification is recommended before repair planning.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-50 dark:bg-black p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Risk Score</p>
                <p className="text-2xl font-black">82<span className="text-sm text-slate-400">/100</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase mb-1">Priority</p>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800 font-bold text-sm rounded-full">HIGH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRIORITY SCORING */}
      <section className="py-16 px-4 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-10">From Damage Report to Repair Priority</h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8 font-bold text-xs sm:text-sm text-slate-600 dark:text-[#A1A1AA]">
            <span className="px-3 py-1 bg-slate-50 dark:bg-black rounded-full border border-slate-200 dark:border-[#2A2A2A]">Severity</span> +
            <span className="px-3 py-1 bg-slate-50 dark:bg-black rounded-full border border-slate-200 dark:border-[#2A2A2A]">AI Confidence</span> +
            <span className="px-3 py-1 bg-slate-50 dark:bg-black rounded-full border border-slate-200 dark:border-[#2A2A2A]">Damage Size</span> +
            <span className="px-3 py-1 bg-slate-50 dark:bg-black rounded-full border border-slate-200 dark:border-[#2A2A2A]">Traffic</span> +
            <span className="px-3 py-1 bg-slate-50 dark:bg-black rounded-full border border-slate-200 dark:border-[#2A2A2A]">Location</span> +
            <span className="px-3 py-1 bg-slate-50 dark:bg-black rounded-full border border-slate-200 dark:border-[#2A2A2A]">Previous Reports</span> +
            <span className="px-3 py-1 bg-slate-50 dark:bg-black rounded-full border border-slate-200 dark:border-[#2A2A2A]">Weather</span>
          </div>
          
          <div className="text-2xl mb-8 text-slate-300 dark:text-[#2A2A2A]">↓</div>
          
          <div className="flex justify-center mb-8">
            <div className="bg-slate-50 dark:bg-black p-6 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm max-w-sm w-full">
               <h3 className="font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-2">RISK SCORE</h3>
               <div className="text-4xl font-black mb-2">82 <span className="text-lg text-slate-400">/ 100</span></div>
               <div className="w-full bg-slate-200 dark:bg-[#2A2A2A] rounded-full h-2 mb-4 overflow-hidden">
                 <div className="bg-red-500 h-2" style={{width: '82%'}}></div>
               </div>
               <h3 className="font-bold text-slate-500 dark:text-[#A1A1AA] uppercase tracking-wider mb-2 pt-2 border-t border-slate-200 dark:border-[#2A2A2A]">REPAIR PRIORITY</h3>
               <div className="text-red-600 dark:text-red-400 font-bold text-lg">HIGH RISK</div>
               <p className="text-sm mt-2 font-medium">Urgent inspection and repair recommended.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. OFFICER DASHBOARD */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Officer Decision Dashboard</h2>
            <p className="text-slate-600 dark:text-[#A1A1AA]">
              Officers can review reported road damage, inspect AI-assisted assessments, filter reports by priority and assign repair tasks.
            </p>
          </div>
          
          <div className="bg-white dark:bg-[#111111] p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm mb-8 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#2A2A2A] text-slate-500 dark:text-[#A1A1AA]">
                  <th className="pb-3 font-bold">Report ID</th>
                  <th className="pb-3 font-bold">Location</th>
                  <th className="pb-3 font-bold">Priority</th>
                  <th className="pb-3 font-bold">Risk</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-50 dark:border-[#151515]">
                  <td className="py-3 font-mono font-bold">RG-20260912-768</td>
                  <td className="py-3">Grand Southern Trunk Road</td>
                  <td className="py-3"><RiskScoreBadge score={82} level="HIGH" /></td>
                  <td className="py-3 font-bold text-red-600 dark:text-red-400">82/100</td>
                  <td className="py-3"><span className="px-2 py-1 bg-slate-100 dark:bg-[#151515] text-xs font-bold rounded-full">ASSIGNED</span></td>
                  <td className="py-3"><span className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer">View</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center">
            <Link to="/officer-login" className="inline-flex px-6 py-3 bg-slate-800 dark:bg-[#2A2A2A] hover:bg-slate-900 dark:hover:bg-slate-800 text-white font-bold rounded-lg transition-colors">
              Open Officer Portal
            </Link>
          </div>
        </div>
      </section>

      {/* 10. WORKER WORKFLOW */}
      <section className="py-16 px-4 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4">From Priority to Action</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-bold text-slate-600 dark:text-[#A1A1AA] mb-12">
            <div className="bg-slate-50 dark:bg-black px-3 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A]">Report Verified</div>
            <ArrowRight className="hidden md:block w-4 h-4" />
            <div className="bg-slate-50 dark:bg-black px-3 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A]">Worker Assigned</div>
            <ArrowRight className="hidden md:block w-4 h-4" />
            <div className="bg-slate-50 dark:bg-black px-3 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A]">Repair Task Created</div>
            <ArrowRight className="hidden md:block w-4 h-4" />
            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-900/50">Repair In Progress</div>
            <ArrowRight className="hidden md:block w-4 h-4" />
            <div className="bg-slate-50 dark:bg-black px-3 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A]">Repair Completed</div>
          </div>
          
          <div className="bg-slate-50 dark:bg-black p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
              <h4 className="font-black text-slate-800 dark:text-white">WORKER TASK</h4>
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-bold rounded">IN PROGRESS</span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Task</p>
                <p className="font-bold">Repair pothole</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Location</p>
                <p className="font-bold">Grand Southern Trunk Road</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-[#A1A1AA] uppercase">Priority</p>
                <p className="font-bold text-red-600 dark:text-red-400">HIGH</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CITIZEN TRACKING */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">Transparent Repair Tracking</h2>
              <p className="text-slate-600 dark:text-[#A1A1AA] mb-8">
                Citizens can follow the progress of their road-damage report instead of repeatedly asking for updates.
              </p>
              <Link to="/track" className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                Track a Report
              </Link>
            </div>
            
            <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm font-bold text-sm space-y-4">
              <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Report Submitted
              </div>
              <div className="w-0.5 h-4 bg-slate-200 dark:bg-[#2A2A2A] ml-2.5"></div>
              <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Officer Verified
              </div>
              <div className="w-0.5 h-4 bg-slate-200 dark:bg-[#2A2A2A] ml-2.5"></div>
              <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Repair Assigned
              </div>
              <div className="w-0.5 h-4 bg-slate-200 dark:bg-[#2A2A2A] ml-2.5"></div>
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Clock className="w-5 h-5" /> Repair In Progress
              </div>
              <div className="w-0.5 h-4 bg-slate-200 dark:bg-[#2A2A2A] ml-2.5"></div>
              <div className="flex items-center gap-3 text-slate-400 dark:text-[#A1A1AA]">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-[#A1A1AA]"></div> Resolved
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. TECHNOLOGY SECTION */}
      <section className="py-16 px-4 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-10">Technology Behind RoadGuard AI</h2>
          
          <div className="flex flex-col items-center gap-2 font-mono text-sm font-bold mb-8">
             <div className="px-4 py-2 bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#2A2A2A] rounded">USER</div>
             <div className="text-slate-400">↓</div>
             <div className="px-4 py-2 bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#2A2A2A] rounded">ROADGUARD AI WEB APP</div>
             <div className="text-slate-400">↓</div>
             <div className="px-4 py-2 bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#2A2A2A] rounded">IMAGE PROCESSING</div>
             <div className="text-slate-400">↓</div>
             <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 rounded">AI-ASSISTED ANALYSIS</div>
             <div className="text-slate-400">↓</div>
             <div className="px-4 py-2 bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#2A2A2A] rounded">RISK / PRIORITY ENGINE</div>
             <div className="text-slate-400">↓</div>
             <div className="px-4 py-2 bg-slate-50 dark:bg-black border border-slate-200 dark:border-[#2A2A2A] rounded">OFFICER DASHBOARD & WORKER ASSIGNMENT</div>
          </div>
          
          <div className="inline-block px-4 py-2 bg-slate-100 dark:bg-[#151515] border border-slate-300 dark:border-[#2A2A2A] rounded-full text-xs font-bold text-slate-500 dark:text-[#A1A1AA]">
            Prototype / Demo Data Layer
          </div>
        </div>
      </section>

      {/* 13. IMPACT SECTION */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-10 text-center">Who Benefits?</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm">
              <h3 className="font-black text-lg mb-4 text-blue-600 dark:text-blue-400">CITIZENS</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-[#A1A1AA] font-medium">
                <li>• Easy reporting</li>
                <li>• Transparent tracking</li>
                <li>• Better visibility</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm">
              <h3 className="font-black text-lg mb-4 text-slate-800 dark:text-white">OFFICERS</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-[#A1A1AA] font-medium">
                <li>• Faster prioritization</li>
                <li>• Centralized reports</li>
                <li>• Decision support</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm">
              <h3 className="font-black text-lg mb-4 text-slate-800 dark:text-white">WORKERS</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-[#A1A1AA] font-medium">
                <li>• Clear repair tasks</li>
                <li>• Location information</li>
                <li>• Priority information</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A] shadow-sm">
              <h3 className="font-black text-lg mb-4 text-green-600 dark:text-green-400">COMMUNITY</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-[#A1A1AA] font-medium">
                <li>• Better maintenance coordination</li>
                <li>• Safer road environment</li>
                <li>• More transparent repair workflow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 14. WHAT MAKES IT DIFFERENT */}
      <section className="py-16 px-4 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-10 text-center">Why RoadGuard AI?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-50 dark:bg-black p-6 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <h3 className="font-bold text-slate-500 dark:text-[#A1A1AA] mb-4">TRADITIONAL:</h3>
              <div className="font-bold text-lg text-slate-700 dark:text-slate-300">
                Report <ArrowRight className="inline w-5 h-5 text-slate-400" /> Wait
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4">ROADGUARD AI:</h3>
              <div className="font-bold text-lg text-blue-900 dark:text-blue-300 flex flex-wrap items-center gap-2">
                Report <ArrowRight className="inline w-4 h-4 text-blue-400" /> 
                AI Assess <ArrowRight className="inline w-4 h-4 text-blue-400" /> 
                Prioritize <ArrowRight className="inline w-4 h-4 text-blue-400" /> 
                Verify <ArrowRight className="inline w-4 h-4 text-blue-400" /> 
                Assign <ArrowRight className="inline w-4 h-4 text-blue-400" /> 
                Repair <ArrowRight className="inline w-4 h-4 text-blue-400" /> 
                Track
              </div>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 font-bold text-sm"><Check className="w-5 h-5 text-blue-600" /> AI-assisted assessment</div>
            <div className="flex items-center gap-3 font-bold text-sm"><Check className="w-5 h-5 text-blue-600" /> Risk-based prioritization</div>
            <div className="flex items-center gap-3 font-bold text-sm"><Check className="w-5 h-5 text-blue-600" /> Officer dashboard</div>
            <div className="flex items-center gap-3 font-bold text-sm"><Check className="w-5 h-5 text-blue-600" /> Worker assignment</div>
            <div className="flex items-center gap-3 font-bold text-sm"><Check className="w-5 h-5 text-blue-600" /> Citizen tracking</div>
            <div className="flex items-center gap-3 font-bold text-sm"><Check className="w-5 h-5 text-blue-600" /> Connected workflow</div>
          </div>
        </div>
      </section>

      {/* 15. FUTURE SCOPE */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Future Possibilities</h2>
            <span className="px-3 py-1 bg-slate-200 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#A1A1AA] text-xs font-bold rounded-full uppercase tracking-wider">
              Future Scope
            </span>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <h4 className="font-bold mb-2">Computer Vision</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Better damage detection using local road datasets.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <h4 className="font-bold mb-2">Traffic Intelligence</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Use traffic density to improve priority scoring.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <h4 className="font-bold mb-2">Weather Integration</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Consider rain and weather conditions.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <h4 className="font-bold mb-2">Historical Analysis</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Identify recurring road-damage locations.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <h4 className="font-bold mb-2">Duplicate Detection</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Identify multiple reports for the same damage.</p>
            </div>
            <div className="bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <h4 className="font-bold mb-2">Predictive Maintenance</h4>
              <p className="text-sm text-slate-600 dark:text-[#A1A1AA]">Identify roads that may require maintenance before major damage occurs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 16. FINAL VISION SECTION */}
      <section className="py-20 px-4 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-[#2A2A2A] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8">From Reporting Roads to Managing Road Safety</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-bold text-slate-500 dark:text-[#A1A1AA] mb-8">
            <span>CITIZEN</span> <ArrowRight className="w-4 h-4" />
            <span>REPORT</span> <ArrowRight className="w-4 h-4" />
            <span>AI ASSESSMENT</span> <ArrowRight className="w-4 h-4" />
            <span>PRIORITY</span> <ArrowRight className="w-4 h-4" />
            <span>OFFICER</span> <ArrowRight className="w-4 h-4" />
            <span>WORKER</span> <ArrowRight className="w-4 h-4" />
            <span>REPAIR</span> <ArrowRight className="w-4 h-4" />
            <span>TRACK</span> <ArrowRight className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 dark:text-blue-400">SAFER ROADS</span>
          </div>
          
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium mb-10 leading-relaxed">
            "RoadGuard AI aims to transform road-damage reporting from a simple complaint into a transparent, data-assisted repair workflow."
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/report" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Report Road Damage
            </Link>
            <Link to="/dashboard" className="px-6 py-3 bg-slate-100 dark:bg-[#151515] hover:bg-slate-200 dark:hover:bg-[#2A2A2A] text-slate-900 dark:text-white font-bold rounded-lg transition-colors border border-slate-200 dark:border-[#2A2A2A]">
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};
