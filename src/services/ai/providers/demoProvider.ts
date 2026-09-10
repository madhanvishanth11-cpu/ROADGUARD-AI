import type { AIProvider, AIAnalysisResult } from '../../../types/ai';


export class DemoProvider implements AIProvider {
  async analyzeImage(_imageFile: File): Promise<AIAnalysisResult> {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 90% chance of detecting something for demo purposes
    const isPothole = Math.random() > 0.1;
    
    if (!isPothole) {
      return {
        potholeDetected: false,
        confidence: Math.floor(Math.random() * 20) + 70, // 70-90% confident no pothole
        estimatedSeverity: 'LOW',
        estimatedSize: 'None',
        riskScore: 0,
        detectedDamageType: 'None',
        explanation: 'No significant road damage detected in this image. Please upload a clearer road image if you believe this is an error.'
      };
    }

    const severities: ('LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL')[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const sizes = ['Small', 'Medium', 'Large'];
    
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const confidence = Math.floor(Math.random() * 15) + 85; // 85-99% confident
    
    // We provide a temporary riskScore here just to satisfy the old AI interface. 
    // The REAL score is generated in ReportPage.tsx before submission.
    const riskScore = severity === 'CRITICAL' ? 95 : severity === 'HIGH' ? 80 : severity === 'MEDIUM' ? 55 : 25;

    // Simulate bounding box in the center 40% of the image
    const boundingBoxes = [
      {
        xmin: 0.3,
        ymin: 0.3,
        xmax: 0.7,
        ymax: 0.7,
        label: 'Pothole',
        confidence: confidence / 100
      }
    ];

    return {
      potholeDetected: true,
      confidence,
      estimatedSeverity: severity,
      estimatedSize: size,
      riskScore,
      detectedDamageType: 'Pothole',
      explanation: `Large visible road damage detected. This location should be reviewed for repair.`,
      boundingBoxes
    };
  }
}
