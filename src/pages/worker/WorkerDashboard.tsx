import { useEffect, useState, useRef } from 'react';
import { getWorkers, getAssignmentsForWorker, getReportById, submitRepairCompletion, uploadReportImage } from '../../services/db/api';
import type { Worker, ReportAssignment, Report } from '../../types';
import { Camera, MapPin, Loader2, CheckCircle, UploadCloud, X, ArrowRight } from 'lucide-react';

export const WorkerDashboard = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [currentWorker, setCurrentWorker] = useState<Worker | null>(null);
  
  const [tasks, setTasks] = useState<ReportAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected task state
  const [selectedTask, setSelectedTask] = useState<ReportAssignment | null>(null);
  const [reportDetails, setReportDetails] = useState<Report | null>(null);
  
  // Repair form state
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchInitial();
  }, []);

  const fetchInitial = async () => {
    try {
      const w = await getWorkers();
      setWorkers(w);
      if (w.length > 0) {
        // Automatically select the first worker for demo purposes
        handleSelectWorker(w[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectWorker = async (worker: Worker) => {
    setCurrentWorker(worker);
    setLoading(true);
    try {
      const myTasks = await getAssignmentsForWorker(worker.id);
      setTasks(myTasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTask = async (task: ReportAssignment) => {
    setSelectedTask(task);
    setReportDetails(null);
    try {
      const rep = await getReportById(task.report_id);
      setReportDetails(rep);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitRepair = async () => {
    if (!selectedTask || !currentWorker) return;
    setIsUploading(true);
    try {
      let uploadedUrl = '';
      if (image) {
        uploadedUrl = await uploadReportImage(image);
      }
      
      await submitRepairCompletion({
        report_id: selectedTask.report_id,
        worker_id: currentWorker.id,
        status: 'PENDING_VERIFICATION',
        after_image_url: uploadedUrl,
        completion_notes: notes
      });
      
      // Refresh
      await handleSelectWorker(currentWorker);
      setSelectedTask(null);
      setImage(null);
      setImagePreview(null);
      setNotes('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading && !currentWorker) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-100 min-h-screen font-sans pb-12">
      <header className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-bold text-lg">Field Worker App</h1>
            {currentWorker && <p className="text-blue-200 text-xs">{currentWorker.name} ({currentWorker.team})</p>}
          </div>
          <select 
            className="bg-blue-800 border-none text-xs rounded p-1 outline-none cursor-pointer"
            onChange={(e) => {
              const w = workers.find(x => x.id === e.target.value);
              if (w) handleSelectWorker(w);
            }}
            value={currentWorker?.id || ''}
          >
            {workers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 mt-6">
        
        {!selectedTask ? (
          <>
            <h2 className="text-xl font-black text-gray-800 mb-4">My Tasks</h2>
            
            <div className="space-y-4">
              {tasks.filter(t => t.status !== 'RESOLVED' && t.status !== 'PENDING_VERIFICATION').map(task => (
                <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 active:scale-[0.98] transition-transform" onClick={() => handleSelectTask(task)}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono font-bold text-gray-900">{task.report_id}</span>
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700`}>{task.status}</span>
                  </div>
                  <p className="text-sm font-bold text-red-600 mb-2">Expected: {task.expected_completion}</p>
                  <button className="w-full mt-2 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-sm flex items-center justify-center gap-2">
                    View Task <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {tasks.filter(t => t.status !== 'RESOLVED' && t.status !== 'PENDING_VERIFICATION').length === 0 && (
                <div className="text-center p-8 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-300 mb-2" />
                  <p>You have no active tasks!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-slate-100 p-3 flex justify-between items-center border-b border-gray-200">
              <button onClick={() => setSelectedTask(null)} className="text-blue-600 text-sm font-bold">← Back</button>
              <span className="font-mono text-sm font-bold">{selectedTask.report_id}</span>
            </div>
            
            <div className="p-4">
              {!reportDetails ? (
                <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-blue-600"/></div>
              ) : (
                <>
                  <img src={reportDetails.image_url} alt="Damage" className="w-full h-48 object-cover rounded-lg mb-4 bg-gray-100" />
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Location</p>
                    <p className="text-sm bg-gray-50 p-2 rounded border border-gray-100"><MapPin className="w-3 h-3 inline mr-1 text-gray-400"/>{reportDetails.address}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 p-2 rounded border border-red-100">
                      <p className="text-[10px] text-red-500 uppercase font-bold">Priority</p>
                      <p className="text-sm font-bold text-red-700">{reportDetails.priority}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-200">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Severity</p>
                      <p className="text-sm font-bold text-gray-900">{reportDetails.severity}</p>
                    </div>
                  </div>

                  {/* Submission Form */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Complete Repair</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Upload After Photo (Required)</label>
                      {!imagePreview ? (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50"
                        >
                          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-600">Tap to open camera</p>
                        </div>
                      ) : (
                        <div className="relative">
                          <img src={imagePreview} className="w-full h-48 object-cover rounded-xl" alt="Preview" />
                          <button onClick={() => {setImage(null); setImagePreview(null);}} className="absolute top-2 right-2 p-1 bg-white rounded-full text-red-600 shadow"><X className="w-4 h-4"/></button>
                        </div>
                      )}
                      <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Work Completion Notes</label>
                      <textarea 
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:border-blue-500" 
                        rows={3} 
                        placeholder="e.g. Pothole filled and leveled."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>

                    <button 
                      onClick={handleSubmitRepair}
                      disabled={!image || isUploading}
                      className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
                      Submit Completion
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
