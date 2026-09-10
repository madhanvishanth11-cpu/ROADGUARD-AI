import type { RiskFactorInput, RiskScoreResult, RiskFactorScore } from '../types/risk';

// Weights configuration
const WEIGHTS = {
  severity: 30,
  aiConfidence: 15,
  size: 15,
  traffic: 15,
  location: 10,
  reports: 10,
  weather: 5
};

export const calculateRiskScore = (input: RiskFactorInput): RiskScoreResult => {
  let totalScore = 0;
  const factors: RiskFactorScore[] = [];
  const explanation: string[] = [];

  // 1. Severity (30%)
  let severityScore = 0;
  const sev = input.severity.toUpperCase();
  if (sev === 'CRITICAL') severityScore = 100;
  else if (sev === 'HIGH') severityScore = 75;
  else if (sev === 'MEDIUM') severityScore = 50;
  else severityScore = 25; // LOW or unknown
  
  const severityPoints = (severityScore / 100) * WEIGHTS.severity;
  totalScore += severityPoints;
  factors.push({ category: 'Severity', pointsAwarded: Math.round(severityPoints), maxPoints: WEIGHTS.severity });
  if (severityScore >= 75) explanation.push(`High pothole severity detected (${input.severity})`);

  // 2. AI Confidence (15%)
  // Map confidence directly to 0-100 points
  const confidenceScore = Math.max(0, Math.min(100, input.aiConfidence));
  const confidencePoints = (confidenceScore / 100) * WEIGHTS.aiConfidence;
  totalScore += confidencePoints;
  factors.push({ category: 'AI Confidence', pointsAwarded: Math.round(confidencePoints), maxPoints: WEIGHTS.aiConfidence });
  if (confidenceScore >= 85) explanation.push(`High AI detection confidence (${confidenceScore}%)`);

  // 3. Visible Damage Size (15%)
  let sizeScore = 0;
  const size = input.estimatedSize.toLowerCase();
  if (size.includes('very large')) sizeScore = 100;
  else if (size.includes('large')) sizeScore = 75;
  else if (size.includes('medium')) sizeScore = 50;
  else if (size.includes('small')) sizeScore = 25;
  else sizeScore = 50; // Neutral fallback for missing size

  const sizePoints = (sizeScore / 100) * WEIGHTS.size;
  totalScore += sizePoints;
  factors.push({ category: 'Damage Size', pointsAwarded: Math.round(sizePoints), maxPoints: WEIGHTS.size });
  if (sizeScore >= 75) explanation.push(`Large visible damage footprint`);

  // 4. Traffic Level (15%)
  let trafficScore = 0;
  if (input.trafficLevel === 'HIGH') trafficScore = 100;
  else if (input.trafficLevel === 'MEDIUM') trafficScore = 65;
  else trafficScore = 30; // LOW

  const trafficPoints = (trafficScore / 100) * WEIGHTS.traffic;
  totalScore += trafficPoints;
  factors.push({ category: 'Traffic', pointsAwarded: Math.round(trafficPoints), maxPoints: WEIGHTS.traffic });
  if (trafficScore === 100) explanation.push(`Located in a high-traffic zone`);

  // 5. Location Importance (10%)
  let locationScore = 0;
  if (['SCHOOL_ZONE', 'HOSPITAL_ZONE', 'BUS_ROUTE'].includes(input.locationType)) locationScore = 100;
  else if (['MAIN_ROAD', 'HIGH_TRAFFIC_AREA'].includes(input.locationType)) locationScore = 70;
  else locationScore = 30; // LOCAL_ROAD

  const locationPoints = (locationScore / 100) * WEIGHTS.location;
  totalScore += locationPoints;
  factors.push({ category: 'Location', pointsAwarded: Math.round(locationPoints), maxPoints: WEIGHTS.location });
  if (locationScore >= 70) explanation.push(`Critical public infrastructure nearby (${input.locationType.replace('_', ' ')})`);

  // 6. Repeated Reports (10%)
  // 0 reports = 0 score, 1 report = 50, 2+ reports = 100
  let reportScore = 0;
  if (input.reportFrequency >= 2) reportScore = 100;
  else if (input.reportFrequency === 1) reportScore = 50;

  const reportPoints = (reportScore / 100) * WEIGHTS.reports;
  totalScore += reportPoints;
  factors.push({ category: 'Reports', pointsAwarded: Math.round(reportPoints), maxPoints: WEIGHTS.reports });
  if (reportScore > 0) explanation.push(`Multiple nearby reports indicate active hazard`);

  // 7. Weather Risk (5%)
  let weatherScore = 0;
  if (input.weatherRisk === 'HIGH') weatherScore = 100;
  else if (input.weatherRisk === 'MEDIUM') weatherScore = 60;
  else weatherScore = 20; // LOW

  const weatherPoints = (weatherScore / 100) * WEIGHTS.weather;
  totalScore += weatherPoints;
  factors.push({ category: 'Weather', pointsAwarded: Math.round(weatherPoints), maxPoints: WEIGHTS.weather });
  if (weatherScore >= 100) explanation.push(`High weather risk conditions exacerbate danger`);

  // Final Score clamping
  const finalScore = Math.max(0, Math.min(100, Math.round(totalScore)));

  // Determine Level
  let level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  if (finalScore >= 85) level = 'CRITICAL';
  else if (finalScore >= 70) level = 'HIGH';
  else if (finalScore >= 40) level = 'MEDIUM';

  // Fallback explanation if it's super low and nothing triggered
  if (explanation.length === 0) {
    explanation.push(`Standard assessment based on low-risk indicators.`);
  }

  // Handle GPS Accuracy Warning
  if (input.gpsAccuracy && input.gpsAccuracy > 100) {
    // Note: Do not change the risk score! Just add an informative warning.
    explanation.push(`Warning: Location accuracy is low (±${Math.round(input.gpsAccuracy)}m)`);
  }

  return {
    score: finalScore,
    level,
    factors,
    explanation
  };
};
