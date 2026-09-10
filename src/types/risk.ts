export type TrafficLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type LocationType = 'LOCAL_ROAD' | 'MAIN_ROAD' | 'SCHOOL_ZONE' | 'HOSPITAL_ZONE' | 'BUS_ROUTE' | 'HIGH_TRAFFIC_AREA';
export type WeatherRisk = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RiskFactorInput {
  severity: string; // 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  aiConfidence: number; // 0-100
  estimatedSize: string; // 'Small' | 'Medium' | 'Large' | 'Very Large' | 'Unknown'
  trafficLevel: TrafficLevel;
  locationType: LocationType;
  gpsAccuracy?: number;
  reportFrequency: number;
  weatherRisk: WeatherRisk;
}

export interface RiskFactorScore {
  category: string;
  pointsAwarded: number;
  maxPoints: number;
}

export interface RiskScoreResult {
  score: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: RiskFactorScore[];
  explanation: string[];
}
