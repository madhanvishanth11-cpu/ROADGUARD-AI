export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ReportStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_VERIFICATION' | 'REWORK_REQUIRED' | 'RESOLVED' | 'REJECTED';

export interface Report {
  id: string; // Used as the RG-2026-00001 format
  created_at: string;
  latitude: number;
  longitude: number;
  gps_accuracy?: number;
  location_source?: 'GPS' | 'MANUAL';
  address: string;
  image_url: string;
  pothole_detected: boolean;
  confidence: number;
  severity: string;
  estimated_size: string;
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  risk_factors: any;
  risk_explanation: string[];
  traffic_level: 'LOW' | 'MEDIUM' | 'HIGH';
  location_type: string;
  weather_risk: 'LOW' | 'MEDIUM' | 'HIGH';
  nearby_reports_count: number;
  priority: PriorityLevel;
  status: ReportStatus;
}

export interface Worker {
  id: string;
  name: string;
  department: string;
  team: string;
  phone?: string;
  status: 'AVAILABLE' | 'BUSY' | 'OFF_DUTY';
  created_at?: string;
}

export interface ReportAssignment {
  id: string;
  report_id: string;
  worker_id: string;
  department: string;
  team: string;
  assigned_by: string; // e.g. 'Officer'
  assigned_at: string;
  expected_completion: string; // e.g. '1 Day'
  status: ReportStatus;
  worker?: Worker; // Joined relation
}

export interface RepairUpdate {
  id: string;
  report_id: string;
  worker_id: string;
  status: ReportStatus;
  before_image_url?: string;
  after_image_url?: string;
  completion_notes?: string;
  completed_at: string;
  created_at?: string;
}

export interface StatusHistory {
  id: string;
  report_id: string;
  status: ReportStatus;
  notes?: string;
  updated_at: string;
}
