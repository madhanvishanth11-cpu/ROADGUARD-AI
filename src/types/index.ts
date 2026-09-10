export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ReportStatus = 'REPORTED' | 'VERIFIED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
export type UserRole = 'CITIZEN' | 'AUTHORITY';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  user_id?: string;
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
  risk_factors: any; // JSON containing breakdown
  risk_explanation: string[];
  traffic_level: 'LOW' | 'MEDIUM' | 'HIGH';
  location_type: string;
  weather_risk: 'LOW' | 'MEDIUM' | 'HIGH';
  nearby_reports_count: number;
  priority: PriorityLevel;
  status: ReportStatus;
  repair_image_url?: string;
}

export interface AuthorityAssignment {
  id: string;
  report_id: string;
  department: string;
  zone: string;
  team: string;
  notes?: string;
  assigned_at: string;
}

export interface StatusHistory {
  id: string;
  report_id: string;
  status: ReportStatus;
  notes?: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  report_id: string;
  title: string;
  message: string;
  type: 'REPORT_CREATED' | 'REPORT_VERIFIED' | 'REPAIR_ASSIGNED' | 'REPAIR_STARTED' | 'REPORT_RESOLVED' | 'REPORT_REJECTED';
  is_read: boolean;
  created_at: string;
}
