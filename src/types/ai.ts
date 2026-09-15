export interface BoundingBox {
  xmin: number; // percentage (0-100) or relative (0-1) depending on normalization
  ymin: number;
  xmax: number;
  ymax: number;
  label?: string;
  confidence?: number;
}

export interface AIAnalysisResult {
  potholeDetected: boolean;
  confidence: number;
  estimatedSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedSize: string;
  estimatedLength?: number;
  estimatedWidth?: number;
  estimatedArea?: number;
  estimatedDepth?: string;
  riskScore: number;
  detectedDamageType: string;
  explanation: string;
  aiAssessment?: string;
  recommendedAction?: string;
  boundingBoxes?: BoundingBox[];
}

export interface AIProvider {
  analyzeImage(imageFile: File): Promise<AIAnalysisResult>;
}

// Any raw response from a remote AI provider
export type RawAIResponse = any;
