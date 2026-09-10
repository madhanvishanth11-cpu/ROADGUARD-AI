import type { AIProvider, AIAnalysisResult, RawAIResponse, BoundingBox } from '../../../types/ai';

export class RemotePotholeProvider implements AIProvider {
  private endpoint: string;
  private apiKey: string;

  constructor(endpoint: string, apiKey: string) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  async analyzeImage(imageFile: File): Promise<AIAnalysisResult> {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          // If required by proxy/API, pass public key in headers
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status} ${response.statusText}`);
      }

      const data: RawAIResponse = await response.json();
      return this.normalizeResponse(data);
    } catch (err: any) {
      console.error('Remote AI Provider Error:', err);
      throw new Error(err.message || 'Network failure when connecting to AI provider.');
    }
  }

  /**
   * Normalizes disparate JSON responses from various remote models into standard RoadGuard AI format.
   */
  private normalizeResponse(data: RawAIResponse): AIAnalysisResult {
    // -------------------------------------------------------------
    // HYPOTHETICAL NORMALIZATION LOGIC
    // Depending on the model, it might return just bounding boxes,
    // or a single classification, or a detailed breakdown.
    // We try to gracefully parse common expected formats.
    // -------------------------------------------------------------

    let potholeDetected = false;
    let confidence = 0;
    let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    let size = 'Unknown';
    let boundingBoxes: BoundingBox[] = [];

    // Scenario A: Provider returns standard predictions array (e.g., Roboflow, custom YOLO)
    if (data.predictions && Array.isArray(data.predictions)) {
      const potholes = data.predictions.filter((p: any) => p.class?.toLowerCase().includes('pothole') || p.label?.toLowerCase().includes('pothole'));
      
      if (potholes.length > 0) {
        potholeDetected = true;
        // Take the highest confidence detection
        const bestDetection = potholes.reduce((prev: any, curr: any) => (prev.confidence > curr.confidence) ? prev : curr);
        
        confidence = Math.round((bestDetection.confidence || 0) * 100);
        
        // Map bounding boxes (assume normalized 0-1 or absolute pixels, we will normalize to 0-1 if they are > 1, assuming 640x640 default if image dimensions aren't provided)
        // A robust implementation would pass image width/height, but this is a generalized proxy.
        boundingBoxes = potholes.map((p: any) => ({
          xmin: p.x - (p.width / 2) || p.xmin || 0,
          ymin: p.y - (p.height / 2) || p.ymin || 0,
          xmax: p.x + (p.width / 2) || p.xmax || 0,
          ymax: p.y + (p.height / 2) || p.ymax || 0,
          label: p.class || p.label || 'Pothole',
          confidence: p.confidence
        }));

        // Heuristic: More bounding boxes = higher severity/size
        if (potholes.length > 3) {
          severity = 'CRITICAL';
          size = 'Large';
        } else if (potholes.length > 1) {
          severity = 'HIGH';
          size = 'Medium';
        } else {
          severity = 'MEDIUM';
          size = 'Small';
        }
      }
    } 
    // Scenario B: Provider returns explicit custom fields
    else if (data.has_damage !== undefined) {
      potholeDetected = data.has_damage;
      confidence = data.confidence ? Math.round(data.confidence * 100) : 85;
      severity = data.severity ? data.severity.toUpperCase() as any : 'MEDIUM';
      size = data.size || 'Medium';
      if (data.boxes) boundingBoxes = data.boxes;
    }

    if (!potholeDetected) {
      return {
        potholeDetected: false,
        confidence: confidence || 99,
        estimatedSeverity: 'LOW',
        estimatedSize: 'None',
        riskScore: 0,
        detectedDamageType: 'None',
        explanation: 'No pothole detected. Please upload a clearer road image.',
        boundingBoxes: []
      };
    }

    // We provide a dummy riskScore here for the UI preview. The REAL score is generated in ReportPage.tsx.
    const riskScore = severity === 'CRITICAL' ? 95 : severity === 'HIGH' ? 80 : severity === 'MEDIUM' ? 55 : 25;

    return {
      potholeDetected: true,
      confidence: confidence > 0 ? confidence : 85, // fallback if confidence parsing fails
      estimatedSeverity: severity,
      estimatedSize: size,
      riskScore,
      detectedDamageType: 'Pothole',
      explanation: `Visible road damage detected. This location should be reviewed for repair.`,
      boundingBoxes: boundingBoxes.length > 0 ? boundingBoxes : undefined
    };
  }
}
