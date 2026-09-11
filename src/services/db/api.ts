import type { Report, ReportAssignment, ReportStatus, StatusHistory, Worker, RepairUpdate } from '../../types';
import { supabase, hasSupabase } from './supabaseClient';

// Helper to check if we are in mock mode
const useMock = !hasSupabase;

export const getReports = async (): Promise<Report[]> => {
  if (useMock) return [];
  const { data, error } = await supabase!.from('reports').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Report[];
};

export const getReportById = async (id: string): Promise<Report | null> => {
  if (useMock) return null;
  const { data, error } = await supabase!.from('reports').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as Report | null;
};

export const createReport = async (reportData: Omit<Report, 'id' | 'created_at'>): Promise<Report> => {
  const generatedId = `RG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  
  if (useMock) throw new Error("Supabase is required for reports.");

  const { data, error } = await supabase!.from('reports').insert({
    ...reportData,
    id: generatedId,
    status: 'SUBMITTED' // Enforce initial status
  }).select().single();
  
  if (error) throw error;
  await logStatusHistory(generatedId, 'SUBMITTED', 'Report filed by citizen.');
  return data as Report;
};

export const updateReportStatus = async (id: string, status: ReportStatus, notes?: string, extraUpdateFields?: Partial<Report>): Promise<void> => {
  if (useMock) return;

  const { error } = await supabase!.from('reports').update({ status, ...extraUpdateFields }).eq('id', id);
  if (error) throw error;
  await logStatusHistory(id, status, notes);
};

// --- Workers ---
export const getWorkers = async (): Promise<Worker[]> => {
  if (useMock) return [];
  const { data, error } = await supabase!.from('workers').select('*');
  if (error) throw error;
  
  if (!data || data.length === 0) {
    // Return demo workers if DB is empty
    return [
      { id: 'W-001', name: 'Ravi Kumar', department: 'Road Maintenance', team: 'Team A', status: 'AVAILABLE' },
      { id: 'W-002', name: 'Suresh', department: 'Municipal Corporation', team: 'Team B', status: 'AVAILABLE' },
      { id: 'W-003', name: 'Arun', department: 'Highway Maintenance', team: 'Team C', status: 'AVAILABLE' },
      { id: 'W-004', name: 'Kumar', department: 'Emergency Road Repair', team: 'Team A', status: 'AVAILABLE' },
    ];
  }
  return data as Worker[];
};

// --- Assignments ---
export const getAssignments = async (): Promise<ReportAssignment[]> => {
  if (useMock) return [];
  const { data, error } = await supabase!.from('report_assignments').select('*, worker:workers(*)');
  if (error) throw error;
  return data as ReportAssignment[];
};

export const getAssignmentsForWorker = async (workerId: string): Promise<ReportAssignment[]> => {
  if (useMock) return [];
  const { data, error } = await supabase!.from('report_assignments').select('*, worker:workers(*)').eq('worker_id', workerId).order('assigned_at', { ascending: false });
  if (error) throw error;
  return data as ReportAssignment[];
};

export const assignReport = async (assignment: Omit<ReportAssignment, 'id' | 'assigned_at' | 'status' | 'worker'>): Promise<void> => {
  if (useMock) return;
  const { error } = await supabase!.from('report_assignments').insert({
    ...assignment,
    status: 'ASSIGNED'
  });
  if (error) throw error;
  await updateReportStatus(assignment.report_id, 'ASSIGNED', `Assigned to ${assignment.team} (${assignment.department})`);
};

// --- Repair Updates ---
export const getRepairUpdates = async (reportId: string): Promise<RepairUpdate[]> => {
  if (useMock) return [];
  const { data, error } = await supabase!.from('repair_updates').select('*').eq('report_id', reportId).order('created_at', { ascending: false });
  if (error) throw error;
  return data as RepairUpdate[];
};

export const submitRepairCompletion = async (update: Omit<RepairUpdate, 'id' | 'created_at' | 'completed_at'>): Promise<void> => {
  if (useMock) return;
  const { error } = await supabase!.from('repair_updates').insert({
    ...update,
    status: 'PENDING_VERIFICATION',
    completed_at: new Date().toISOString()
  });
  if (error) throw error;
  await updateReportStatus(update.report_id, 'PENDING_VERIFICATION', update.completion_notes || 'Repair completed. Pending verification.');
  
  // Update assignment status too
  await supabase!.from('report_assignments').update({ status: 'PENDING_VERIFICATION' }).eq('report_id', update.report_id).eq('worker_id', update.worker_id);
};

export const verifyRepair = async (reportId: string, workerId: string, approved: boolean, notes: string): Promise<void> => {
  if (useMock) return;
  const newStatus = approved ? 'RESOLVED' : 'REWORK_REQUIRED';
  
  // Update Report
  await updateReportStatus(reportId, newStatus, notes);
  
  // Update Assignment
  await supabase!.from('report_assignments').update({ status: newStatus }).eq('report_id', reportId).eq('worker_id', workerId);
};

// --- File Upload ---
export const uploadReportImage = async (file: File): Promise<string> => {
  if (useMock) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `reports/${fileName}`;

  const { error } = await supabase!.storage.from('report_images').upload(filePath, file);
  if (error) throw error;

  const { data } = supabase!.storage.from('report_images').getPublicUrl(filePath);
  return data.publicUrl;
};

// --- Status History Logic ---
export const logStatusHistory = async (report_id: string, status: ReportStatus, notes?: string): Promise<void> => {
  if (useMock) return;
  const historyEntry: Omit<StatusHistory, 'id'> = {
    report_id,
    status,
    notes,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase!.from('status_history').insert(historyEntry);
  if (error) console.error("Error logging status history:", error);
};

export const getStatusHistory = async (report_id: string): Promise<StatusHistory[]> => {
  if (useMock) return [];
  const { data, error } = await supabase!.from('status_history').select('*').eq('report_id', report_id).order('updated_at', { ascending: true });
  if (error) throw error;
  return data as StatusHistory[];
};

// Listeners
export const subscribeToReports = (callback: () => void) => {
  if (useMock) return () => {};
  const channel = supabase!
    .channel('public:reports')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, callback)
    .subscribe();
  return () => {
    supabase!.removeChannel(channel);
  };
};

export const updateReportData = async (reportId: string, updates: Partial<Report>): Promise<void> => {
  if (useMock) return;
  const { error } = await supabase!.from('reports').update(updates).eq('id', reportId);
  if (error) throw error;
};
