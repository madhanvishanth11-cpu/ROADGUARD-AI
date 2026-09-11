import type { Report, ReportAssignment, ReportStatus, StatusHistory, Worker, RepairUpdate } from '../../types';

// ==========================================
// MOCK DATA LAYER (LOCAL STORAGE)
// ==========================================

const STORAGE_KEY = 'roadguard_reports';
const ASSIGNMENTS_KEY = 'roadguard_assignments';
const HISTORY_KEY = 'roadguard_history';
const UPDATES_KEY = 'roadguard_updates';
const WORKERS_KEY = 'roadguard_workers';

// Utility to read/write local storage
const readStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const writeStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Seed demo data if empty
export const seedDemoData = () => {
  let reports = readStorage<Report>(STORAGE_KEY);
  if (reports.length === 0) {
    reports = [
      {
        id: 'RG-20260911-001',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        latitude: 12.9716,
        longitude: 77.5946,
        address: 'MG Road, Bangalore',
        image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80',
        pothole_detected: true,
        confidence: 0.95,
        severity: 'High',
        estimated_size: 'Large (1m+)',
        risk_score: 85,
        risk_level: 'HIGH',
        risk_factors: { depth: true, traffic: true },
        risk_explanation: ['Deep pothole detected', 'High traffic area'],
        traffic_level: 'HIGH',
        location_type: 'Main Road',
        weather_risk: 'LOW',
        nearby_reports_count: 3,
        priority: 'HIGH',
        status: 'SUBMITTED'
      },
      {
        id: 'RG-20260911-002',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        latitude: 12.9352,
        longitude: 77.6245,
        address: 'Koramangala 4th Block, Bangalore',
        image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80',
        pothole_detected: true,
        confidence: 0.88,
        severity: 'Medium',
        estimated_size: 'Medium (0.5m)',
        risk_score: 65,
        risk_level: 'MEDIUM',
        risk_factors: {},
        risk_explanation: ['Standard pothole'],
        traffic_level: 'MEDIUM',
        location_type: 'Residential',
        weather_risk: 'LOW',
        nearby_reports_count: 1,
        priority: 'MEDIUM',
        status: 'ASSIGNED'
      },
      {
        id: 'RG-20260911-003',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        latitude: 12.9250,
        longitude: 77.5938,
        address: 'Jayanagar 4th Block, Bangalore',
        image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80',
        pothole_detected: true,
        confidence: 0.98,
        severity: 'Critical',
        estimated_size: 'Very Large (2m+)',
        risk_score: 95,
        risk_level: 'CRITICAL',
        risk_factors: {},
        risk_explanation: ['Massive road damage'],
        traffic_level: 'HIGH',
        location_type: 'Highway',
        weather_risk: 'HIGH',
        nearby_reports_count: 5,
        priority: 'CRITICAL',
        status: 'UNDER_REVIEW'
      }
    ];
    writeStorage(STORAGE_KEY, reports);

    // Initial Status History for seed data
    const history: StatusHistory[] = reports.map(r => ({
      id: crypto.randomUUID(),
      report_id: r.id,
      status: 'SUBMITTED',
      updated_at: r.created_at,
      notes: 'Initial Demo Report'
    }));
    writeStorage(HISTORY_KEY, history);
  }

  let workers = readStorage<Worker>(WORKERS_KEY);
  if (workers.length === 0) {
    workers = [
      { id: 'W-001', name: 'Arun', department: 'Road Maintenance', team: 'Team A', status: 'AVAILABLE' },
      { id: 'W-002', name: 'Kumar', department: 'Municipal Corporation', team: 'Team B', status: 'AVAILABLE' },
      { id: 'W-003', name: 'Suresh', department: 'Highway Maintenance', team: 'Team C', status: 'AVAILABLE' }
    ];
    writeStorage(WORKERS_KEY, workers);
  }
};

// Initialize demo data
seedDemoData();

export const getReports = async (): Promise<Report[]> => {
  return readStorage<Report>(STORAGE_KEY).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

export const getReportById = async (id: string): Promise<Report | null> => {
  const reports = readStorage<Report>(STORAGE_KEY);
  return reports.find(r => r.id === id) || null;
};

export const createReport = async (reportData: Omit<Report, 'id' | 'created_at'>): Promise<Report> => {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const randomSuffix = String(Math.floor(100 + Math.random() * 900));
  const generatedId = `RG-${dateStr}-${randomSuffix}`;
  
  const newReport: Report = {
    ...reportData,
    id: generatedId,
    created_at: now.toISOString(),
    status: 'SUBMITTED'
  };

  const reports = readStorage<Report>(STORAGE_KEY);
  reports.push(newReport);
  writeStorage(STORAGE_KEY, reports);

  await logStatusHistory(generatedId, 'SUBMITTED', 'Report filed by citizen.');
  return newReport;
};

export const updateReportStatus = async (id: string, status: ReportStatus, notes?: string, extraUpdateFields?: Partial<Report>): Promise<void> => {
  const reports = readStorage<Report>(STORAGE_KEY);
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index] = { ...reports[index], status, ...extraUpdateFields };
    writeStorage(STORAGE_KEY, reports);
    await logStatusHistory(id, status, notes);
  }
};

export const updateReportData = async (id: string, updates: Partial<Report>): Promise<void> => {
  const reports = readStorage<Report>(STORAGE_KEY);
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index] = { ...reports[index], ...updates };
    writeStorage(STORAGE_KEY, reports);
  }
};

export const logStatusHistory = async (report_id: string, status: ReportStatus, notes?: string): Promise<void> => {
  const history = readStorage<StatusHistory>(HISTORY_KEY);
  history.push({
    id: crypto.randomUUID(),
    report_id,
    status,
    notes,
    updated_at: new Date().toISOString()
  });
  writeStorage(HISTORY_KEY, history);
};

export const getStatusHistory = async (report_id: string): Promise<StatusHistory[]> => {
  return readStorage<StatusHistory>(HISTORY_KEY)
    .filter(h => h.report_id === report_id)
    .sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
};

// --- Workers ---
export const getWorkers = async (): Promise<Worker[]> => {
  return readStorage<Worker>(WORKERS_KEY);
};

// --- Assignments ---
export const getAssignments = async (): Promise<ReportAssignment[]> => {
  return readStorage<ReportAssignment>(ASSIGNMENTS_KEY);
};

export const getAssignmentsForWorker = async (workerId: string): Promise<ReportAssignment[]> => {
  return readStorage<ReportAssignment>(ASSIGNMENTS_KEY)
    .filter(a => a.worker_id === workerId)
    .sort((a, b) => new Date(b.assigned_at!).getTime() - new Date(a.assigned_at!).getTime());
};

export const assignReport = async (assignment: Omit<ReportAssignment, 'id' | 'assigned_at' | 'status' | 'worker'>): Promise<void> => {
  const assignments = readStorage<ReportAssignment>(ASSIGNMENTS_KEY);
  
  const newAssignment: ReportAssignment = {
    ...assignment,
    id: crypto.randomUUID(),
    assigned_at: new Date().toISOString(),
    status: 'ASSIGNED'
  };

  assignments.push(newAssignment);
  writeStorage(ASSIGNMENTS_KEY, assignments);

  await updateReportStatus(assignment.report_id, 'ASSIGNED', `Assigned to worker ID: ${assignment.worker_id} (${assignment.department})`);
};

// --- Repair Updates ---
export const getRepairUpdates = async (reportId: string): Promise<RepairUpdate[]> => {
  return readStorage<RepairUpdate>(UPDATES_KEY)
    .filter(u => u.report_id === reportId)
    .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());
};

export const submitRepairCompletion = async (update: Omit<RepairUpdate, 'id' | 'created_at' | 'completed_at'>): Promise<void> => {
  const updates = readStorage<RepairUpdate>(UPDATES_KEY);
  const newUpdate: RepairUpdate = {
    ...update,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
    status: 'PENDING_VERIFICATION'
  };

  updates.push(newUpdate);
  writeStorage(UPDATES_KEY, updates);

  await updateReportStatus(update.report_id, 'PENDING_VERIFICATION', update.completion_notes || 'Repair completed. Pending verification.');
  
  // Also update assignment status
  const assignments = readStorage<ReportAssignment>(ASSIGNMENTS_KEY);
  const assignment = assignments.find(a => a.report_id === update.report_id && a.worker_id === update.worker_id);
  if (assignment) {
    assignment.status = 'PENDING_VERIFICATION';
    writeStorage(ASSIGNMENTS_KEY, assignments);
  }
};

export const verifyRepair = async (reportId: string, workerId: string, approved: boolean, notes: string): Promise<void> => {
  const newStatus = approved ? 'RESOLVED' : 'REWORK_REQUIRED';
  
  await updateReportStatus(reportId, newStatus, notes);
  
  const assignments = readStorage<ReportAssignment>(ASSIGNMENTS_KEY);
  const assignment = assignments.find(a => a.report_id === reportId && a.worker_id === workerId);
  if (assignment) {
    assignment.status = newStatus;
    writeStorage(ASSIGNMENTS_KEY, assignments);
  }
};

// --- File Upload ---
export const uploadReportImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

export const subscribeToReports = (callback: () => void) => {
  // In localStorage demo mode, we just return a no-op cleanup
  // To truly sync tabs, we could listen to 'storage' events on window
  const listener = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener('storage', listener);
  };
};

export const resetDemoData = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ASSIGNMENTS_KEY);
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(UPDATES_KEY);
  localStorage.removeItem(WORKERS_KEY);
  seedDemoData();
  window.dispatchEvent(new Event('storage'));
};
