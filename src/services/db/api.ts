import type { Report, AuthorityAssignment, ReportStatus, StatusHistory, Notification } from '../../types';
import { supabase, hasSupabase } from './supabaseClient';
import { calculateRiskScore } from '../../utils/riskScore';

const STORAGE_KEY_REPORTS = 'roadguard_reports';
const STORAGE_KEY_ASSIGNMENTS = 'roadguard_assignments';
const STORAGE_KEY_HISTORY = 'roadguard_status_history';
const STORAGE_KEY_NOTIFICATIONS = 'roadguard_notifications';

// Helper to check if we are in mock mode
const useMock = !hasSupabase;

export const getReports = async (): Promise<Report[]> => {
  if (useMock) {
    const data = localStorage.getItem(STORAGE_KEY_REPORTS);
    if (!data) return generateDemoReports();
    return JSON.parse(data);
  }

  const { data, error } = await supabase!.from('reports').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Report[];
};

export const createReport = async (reportData: Omit<Report, 'id' | 'created_at'>): Promise<Report> => {
  const generatedId = `RG-${Math.floor(100000 + Math.random() * 900000)}`;
  
  if (useMock) {
    const reports = await getReports();
    const newReport: Report = {
      ...reportData,
      id: generatedId,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify([newReport, ...reports]));
    await logStatusHistory(generatedId, 'REPORTED', 'Report initially filed by citizen.');
    return newReport;
  }

  const { data, error } = await supabase!.from('reports').insert({
    ...reportData,
    id: generatedId
  }).select().single();
  
  if (error) throw error;
  await logStatusHistory(generatedId, 'REPORTED', 'Report initially filed by citizen.');
  return data as Report;
};

export const updateReportStatus = async (id: string, status: ReportStatus, notes?: string, extraUpdateFields?: Partial<Report>): Promise<void> => {
  const reports = await getReports();
  const report = reports.find(r => r.id === id);
  if (!report) throw new Error("Report not found");

  const validTransitions: Record<ReportStatus, ReportStatus[]> = {
    'REPORTED': ['VERIFIED', 'REJECTED'],
    'VERIFIED': ['ASSIGNED'],
    'ASSIGNED': ['IN_PROGRESS'],
    'IN_PROGRESS': ['RESOLVED'],
    'RESOLVED': [],
    'REJECTED': []
  };

  if (!validTransitions[report.status].includes(status)) {
    throw new Error(`Invalid status transition from ${report.status} to ${status}`);
  }

  if (useMock) {
    const updated = reports.map(r => r.id === id ? { ...r, status, ...extraUpdateFields } : r);
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updated));
    await logStatusHistory(id, status, notes);
    await autoCreateNotification(id, status);
    return;
  }

  const { error } = await supabase!.from('reports').update({ status, ...extraUpdateFields }).eq('id', id);
  if (error) throw error;
  await logStatusHistory(id, status, notes);
  await autoCreateNotification(id, status);
};

export const getAssignments = async (): Promise<AuthorityAssignment[]> => {
  if (useMock) {
    const data = localStorage.getItem(STORAGE_KEY_ASSIGNMENTS);
    return data ? JSON.parse(data) : [];
  }

  const { data, error } = await supabase!.from('authority_assignments').select('*');
  if (error) throw error;
  return data as AuthorityAssignment[];
};

export const assignReport = async (assignment: Omit<AuthorityAssignment, 'id' | 'assigned_at'>): Promise<void> => {
  if (useMock) {
    const assignments = await getAssignments();
    const newAssignment: AuthorityAssignment = {
      ...assignment,
      id: `ASS-${Math.floor(10000 + Math.random() * 90000)}`,
      assigned_at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify([...assignments, newAssignment]));
    await updateReportStatus(assignment.report_id, 'ASSIGNED', `Assigned to ${assignment.team} (${assignment.department})`);
    return;
  }

  const { error } = await supabase!.from('authority_assignments').insert(assignment);
  if (error) throw error;
  await updateReportStatus(assignment.report_id, 'ASSIGNED', `Assigned to ${assignment.team} (${assignment.department})`);
};

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
  const historyEntry: Omit<StatusHistory, 'id'> = {
    report_id,
    status,
    notes,
    updated_at: new Date().toISOString()
  };

  if (useMock) {
    const historyData = localStorage.getItem(STORAGE_KEY_HISTORY);
    const history: StatusHistory[] = historyData ? JSON.parse(historyData) : [];
    const newEntry: StatusHistory = {
      ...historyEntry,
      id: `HIST-${Math.floor(10000 + Math.random() * 90000)}`
    };
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify([...history, newEntry]));
    return;
  }

  const { error } = await supabase!.from('status_history').insert(historyEntry);
  if (error) console.error("Error logging status history:", error);
};

export const getStatusHistory = async (report_id: string): Promise<StatusHistory[]> => {
  if (useMock) {
    const historyData = localStorage.getItem(STORAGE_KEY_HISTORY);
    const history: StatusHistory[] = historyData ? JSON.parse(historyData) : [];
    // Sort oldest first for timeline
    return history.filter(h => h.report_id === report_id).sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
  }

  const { data, error } = await supabase!.from('status_history').select('*').eq('report_id', report_id).order('updated_at', { ascending: true });
  if (error) throw error;
  return data as StatusHistory[];
};

// Listeners
export const subscribeToReports = (callback: () => void) => {
  if (useMock) {
    // Basic polling mechanism for demo mock mode
    const intervalId = setInterval(callback, 5000);
    return () => clearInterval(intervalId);
  }

  const channel = supabase!
    .channel('public:reports')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, callback)
    .subscribe();

  return () => {
    supabase!.removeChannel(channel);
  };
};

export const updateReportData = async (reportId: string, updates: Partial<Report>): Promise<void> => {
  if (useMock) {
    const reports = await getReports();
    const index = reports.findIndex((r: Report) => r.id === reportId);
    if (index !== -1) {
      reports[index] = { ...reports[index], ...updates };
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
    }
    return;
  }
  const { error } = await supabase!.from('reports').update(updates).eq('id', reportId);
  if (error) throw error;
};

const generateDemoReports = (): Report[] => {
  const r1Score = calculateRiskScore({ severity: 'CRITICAL', aiConfidence: 96, estimatedSize: 'Large', trafficLevel: 'HIGH', locationType: 'MAIN_ROAD', reportFrequency: 3, weatherRisk: 'MEDIUM' });
  const r2Score = calculateRiskScore({ severity: 'HIGH', aiConfidence: 91, estimatedSize: 'Medium', trafficLevel: 'HIGH', locationType: 'MAIN_ROAD', reportFrequency: 2, weatherRisk: 'MEDIUM' });
  const r3Score = calculateRiskScore({ severity: 'MEDIUM', aiConfidence: 85, estimatedSize: 'Medium', trafficLevel: 'MEDIUM', locationType: 'LOCAL_ROAD', reportFrequency: 1, weatherRisk: 'LOW' });
  const r4Score = calculateRiskScore({ severity: 'LOW', aiConfidence: 78, estimatedSize: 'Small', trafficLevel: 'LOW', locationType: 'LOCAL_ROAD', reportFrequency: 0, weatherRisk: 'LOW' });

  const demoReports: Report[] = [];
  
  // 3 Critical (2 Reported, 1 In Progress)
  demoReports.push({
    id: 'RG-CRIT-001', created_at: new Date(Date.now() - 3600000).toISOString(), latitude: 13.0827, longitude: 80.2707, gps_accuracy: 5, location_source: 'GPS', address: 'Anna Salai, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 96, severity: 'CRITICAL', estimated_size: 'Large',
    risk_score: r1Score.score, risk_level: r1Score.level, risk_factors: r1Score.factors, risk_explanation: r1Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 3, priority: 'CRITICAL', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-CRIT-002', created_at: new Date(Date.now() - 7200000).toISOString(), latitude: 13.0847, longitude: 80.2727, gps_accuracy: 10, location_source: 'GPS', address: 'Mount Road, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 94, severity: 'CRITICAL', estimated_size: 'Large',
    risk_score: r1Score.score, risk_level: r1Score.level, risk_factors: r1Score.factors, risk_explanation: r1Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 2, priority: 'CRITICAL', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-CRIT-003', created_at: new Date(Date.now() - 86400000).toISOString(), latitude: 13.0604, longitude: 80.2495, gps_accuracy: 8, location_source: 'GPS', address: 'Nungambakkam, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 98, severity: 'CRITICAL', estimated_size: 'Large',
    risk_score: r1Score.score, risk_level: r1Score.level, risk_factors: r1Score.factors, risk_explanation: r1Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 5, priority: 'CRITICAL', status: 'IN_PROGRESS'
  });

  // 5 High (1 Verified, 2 Assigned, 1 In Progress, 1 Resolved)
  demoReports.push({
    id: 'RG-HIGH-001', created_at: new Date(Date.now() - 18000000).toISOString(), latitude: 13.0405, longitude: 80.2337, gps_accuracy: 15, location_source: 'GPS', address: 'T Nagar, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 91, severity: 'HIGH', estimated_size: 'Medium',
    risk_score: r2Score.score, risk_level: r2Score.level, risk_factors: r2Score.factors, risk_explanation: r2Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 2, priority: 'HIGH', status: 'VERIFIED'
  });
  demoReports.push({
    id: 'RG-HIGH-002', created_at: new Date(Date.now() - 28000000).toISOString(), latitude: 13.0305, longitude: 80.2237, gps_accuracy: 12, location_source: 'MANUAL', address: 'West Mambalam, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 89, severity: 'HIGH', estimated_size: 'Medium',
    risk_score: r2Score.score, risk_level: r2Score.level, risk_factors: r2Score.factors, risk_explanation: r2Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 1, priority: 'HIGH', status: 'ASSIGNED'
  });
  demoReports.push({
    id: 'RG-HIGH-003', created_at: new Date(Date.now() - 38000000).toISOString(), latitude: 13.0205, longitude: 80.2137, gps_accuracy: 20, location_source: 'GPS', address: 'Ashok Nagar, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 92, severity: 'HIGH', estimated_size: 'Large',
    risk_score: r2Score.score, risk_level: r2Score.level, risk_factors: r2Score.factors, risk_explanation: r2Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 0, priority: 'HIGH', status: 'ASSIGNED'
  });
  demoReports.push({
    id: 'RG-HIGH-004', created_at: new Date(Date.now() - 48000000).toISOString(), latitude: 13.0105, longitude: 80.2037, gps_accuracy: 10, location_source: 'GPS', address: 'KK Nagar, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 90, severity: 'HIGH', estimated_size: 'Medium',
    risk_score: r2Score.score, risk_level: r2Score.level, risk_factors: r2Score.factors, risk_explanation: r2Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 2, priority: 'HIGH', status: 'IN_PROGRESS'
  });
  demoReports.push({
    id: 'RG-HIGH-005', created_at: new Date(Date.now() - 86400000 * 3).toISOString(), latitude: 13.0005, longitude: 80.1937, gps_accuracy: 15, location_source: 'MANUAL', address: 'Guindy, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 95, severity: 'HIGH', estimated_size: 'Medium',
    risk_score: r2Score.score, risk_level: r2Score.level, risk_factors: r2Score.factors, risk_explanation: r2Score.explanation, traffic_level: 'HIGH', location_type: 'MAIN_ROAD', weather_risk: 'MEDIUM', nearby_reports_count: 1, priority: 'HIGH', status: 'RESOLVED',
    repair_image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80'
  });

  // 6 Medium (3 Reported, 2 Resolved, 1 Rejected)
  demoReports.push({
    id: 'RG-MED-001', created_at: new Date(Date.now() - 86400000).toISOString(), latitude: 13.0116, longitude: 80.2351, gps_accuracy: 10, location_source: 'GPS', address: 'Adyar, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 85, severity: 'MEDIUM', estimated_size: 'Medium',
    risk_score: r3Score.score, risk_level: r3Score.level, risk_factors: r3Score.factors, risk_explanation: r3Score.explanation, traffic_level: 'MEDIUM', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'MEDIUM', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-MED-002', created_at: new Date(Date.now() - 86400000*2).toISOString(), latitude: 12.9816, longitude: 80.2551, gps_accuracy: 15, location_source: 'GPS', address: 'Besant Nagar, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 82, severity: 'MEDIUM', estimated_size: 'Medium',
    risk_score: r3Score.score, risk_level: r3Score.level, risk_factors: r3Score.factors, risk_explanation: r3Score.explanation, traffic_level: 'MEDIUM', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'MEDIUM', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-MED-003', created_at: new Date(Date.now() - 86400000*3).toISOString(), latitude: 12.9616, longitude: 80.2451, gps_accuracy: 20, location_source: 'MANUAL', address: 'Thiruvanmiyur, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 88, severity: 'MEDIUM', estimated_size: 'Medium',
    risk_score: r3Score.score, risk_level: r3Score.level, risk_factors: r3Score.factors, risk_explanation: r3Score.explanation, traffic_level: 'MEDIUM', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 1, priority: 'MEDIUM', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-MED-004', created_at: new Date(Date.now() - 86400000*4).toISOString(), latitude: 12.9416, longitude: 80.2351, gps_accuracy: 5, location_source: 'GPS', address: 'Palavakkam, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 86, severity: 'MEDIUM', estimated_size: 'Medium',
    risk_score: r3Score.score, risk_level: r3Score.level, risk_factors: r3Score.factors, risk_explanation: r3Score.explanation, traffic_level: 'MEDIUM', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'MEDIUM', status: 'RESOLVED',
    repair_image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80'
  });
  demoReports.push({
    id: 'RG-MED-005', created_at: new Date(Date.now() - 86400000*5).toISOString(), latitude: 12.9216, longitude: 80.2251, gps_accuracy: 10, location_source: 'MANUAL', address: 'Neelankarai, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 84, severity: 'MEDIUM', estimated_size: 'Medium',
    risk_score: r3Score.score, risk_level: r3Score.level, risk_factors: r3Score.factors, risk_explanation: r3Score.explanation, traffic_level: 'MEDIUM', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'MEDIUM', status: 'RESOLVED',
    repair_image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80'
  });
  demoReports.push({
    id: 'RG-MED-006', created_at: new Date(Date.now() - 86400000*2).toISOString(), latitude: 12.9016, longitude: 80.2151, gps_accuracy: 30, location_source: 'GPS', address: 'Injambakkam, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: false, confidence: 45, severity: 'LOW', estimated_size: 'Small',
    risk_score: 10, risk_level: 'LOW', risk_factors: [], risk_explanation: ['Not considered a pothole.'], traffic_level: 'LOW', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'LOW', status: 'REJECTED'
  });

  // 4 Low (3 Reported, 1 Resolved)
  demoReports.push({
    id: 'RG-LOW-001', created_at: new Date(Date.now() - 86400000).toISOString(), latitude: 13.0916, longitude: 80.2151, gps_accuracy: 10, location_source: 'GPS', address: 'Villivakkam, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 78, severity: 'LOW', estimated_size: 'Small',
    risk_score: r4Score.score, risk_level: r4Score.level, risk_factors: r4Score.factors, risk_explanation: r4Score.explanation, traffic_level: 'LOW', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'LOW', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-LOW-002', created_at: new Date(Date.now() - 86400000*2).toISOString(), latitude: 13.1016, longitude: 80.2051, gps_accuracy: 12, location_source: 'MANUAL', address: 'Kolathur, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 76, severity: 'LOW', estimated_size: 'Small',
    risk_score: r4Score.score, risk_level: r4Score.level, risk_factors: r4Score.factors, risk_explanation: r4Score.explanation, traffic_level: 'LOW', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'LOW', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-LOW-003', created_at: new Date(Date.now() - 86400000*3).toISOString(), latitude: 13.1116, longitude: 80.1951, gps_accuracy: 15, location_source: 'GPS', address: 'Perambur, Chennai',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 79, severity: 'LOW', estimated_size: 'Small',
    risk_score: r4Score.score, risk_level: r4Score.level, risk_factors: r4Score.factors, risk_explanation: r4Score.explanation, traffic_level: 'LOW', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'LOW', status: 'REPORTED'
  });
  demoReports.push({
    id: 'RG-LOW-004', created_at: new Date(Date.now() - 86400000*4).toISOString(), latitude: 13.1216, longitude: 80.1851, gps_accuracy: 8, location_source: 'GPS', address: 'Vyasarpadi, Chennai',
    image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80', pothole_detected: true, confidence: 80, severity: 'LOW', estimated_size: 'Small',
    risk_score: r4Score.score, risk_level: r4Score.level, risk_factors: r4Score.factors, risk_explanation: r4Score.explanation, traffic_level: 'LOW', location_type: 'LOCAL_ROAD', weather_risk: 'LOW', nearby_reports_count: 0, priority: 'LOW', status: 'RESOLVED',
    repair_image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80'
  });

  localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(demoReports));
  
  // Seed initial history
  demoReports.forEach(r => {
    logStatusHistory(r.id, 'REPORTED', 'Initial demo report created');
    if (r.status === 'VERIFIED' || r.status === 'ASSIGNED' || r.status === 'IN_PROGRESS' || r.status === 'RESOLVED') {
      logStatusHistory(r.id, 'VERIFIED', 'Verified by Authority');
    }
    if (r.status === 'ASSIGNED' || r.status === 'IN_PROGRESS' || r.status === 'RESOLVED') {
      logStatusHistory(r.id, 'ASSIGNED', 'Assigned to Demo Repair Team');
    }
    if (r.status === 'IN_PROGRESS' || r.status === 'RESOLVED') {
      logStatusHistory(r.id, 'IN_PROGRESS', 'Work started on site');
    }
    if (r.status === 'RESOLVED') {
      logStatusHistory(r.id, 'RESOLVED', 'Completed successfully');
    }
    if (r.status === 'REJECTED') {
      logStatusHistory(r.id, 'REJECTED', 'Not a valid pothole report.');
    }
  });

  return demoReports;
};

export const resetDemoData = (): void => {
  if (useMock) {
    localStorage.removeItem(STORAGE_KEY_REPORTS);
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    localStorage.removeItem(STORAGE_KEY_NOTIFICATIONS);
    generateDemoReports();
  }
};

// --- Notifications ---

export const getNotifications = async (): Promise<Notification[]> => {
  if (useMock) {
    const data = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  }
  // In a real app with auth, filter by user_id
  const { data, error } = await supabase!.from('notifications').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Notification[];
};

export const markNotificationRead = async (id: string): Promise<void> => {
  if (useMock) {
    const notifs = await getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, is_read: true } : n);
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return;
  }
  const { error } = await supabase!.from('notifications').update({ is_read: true }).eq('id', id);
  if (error) throw error;
};

export const markAllNotificationsRead = async (): Promise<void> => {
  if (useMock) {
    const notifs = await getNotifications();
    const updated = notifs.map(n => ({ ...n, is_read: true }));
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(updated));
    return;
  }
  const { error } = await supabase!.from('notifications').update({ is_read: true }).eq('is_read', false);
  if (error) throw error;
};

export const createNotification = async (notification: Omit<Notification, 'id' | 'created_at'>): Promise<void> => {
  if (useMock) {
    const notifs = await getNotifications();
    const newNotif: Notification = {
      ...notification,
      id: `NOTIF-${Math.floor(100000 + Math.random() * 900000)}`,
      created_at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify([newNotif, ...notifs]));
    return;
  }
  const { error } = await supabase!.from('notifications').insert(notification);
  if (error) throw error;
};

const autoCreateNotification = async (reportId: string, status: ReportStatus): Promise<void> => {
  let title = '';
  let message = '';
  let type: Notification['type'] = 'REPORT_CREATED';

  switch (status) {
    case 'REPORTED':
      title = 'Report Submitted';
      message = 'Your road damage report has been received.';
      type = 'REPORT_CREATED';
      break;
    case 'VERIFIED':
      title = 'Report Verified';
      message = 'Your road damage report has been verified.';
      type = 'REPORT_VERIFIED';
      break;
    case 'ASSIGNED':
      title = 'Repair Assigned';
      message = 'A repair team has been assigned to your report.';
      type = 'REPAIR_ASSIGNED';
      break;
    case 'IN_PROGRESS':
      title = 'Repair Started';
      message = 'Repair work has started.';
      type = 'REPAIR_STARTED';
      break;
    case 'RESOLVED':
      title = 'Report Resolved';
      message = 'Your report has been marked resolved.';
      type = 'REPORT_RESOLVED';
      break;
    case 'REJECTED':
      title = 'Report Rejected';
      message = 'Your report was rejected.';
      type = 'REPORT_REJECTED';
      break;
  }

  // Assuming user_id is the citizen who submitted, we'll mock it or leave blank for demo
  await createNotification({
    user_id: 'citizen',
    report_id: reportId,
    title,
    message,
    type,
    is_read: false
  });
};
