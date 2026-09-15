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
    const damageTypes = ['Pothole', 'Crack', 'Road Surface Damage', 'Broken Edge', 'Waterlogging', 'Uneven Road'];
    
    // Hash the file name or size to make it deterministic for the same image
    const seed = _imageFile.size;
    const random = () => {
      let x = Math.sin(seed + 1) * 10000;
      return x - Math.floor(x);
    };

    const severity = severities[Math.floor(random() * severities.length)];
    const damageType = damageTypes[Math.floor(random() * damageTypes.length)];
    const confidence = Math.floor(random() * 15) + 85; // 85-99% confident
    
    // Detailed sizes based on severity
    let estimatedLength = 0, estimatedWidth = 0, estimatedDepthStr = "";
    if (severity === 'LOW') {
      estimatedLength = 0.3 + random() * 0.4;
      estimatedWidth = 0.2 + random() * 0.3;
      estimatedDepthStr = "2–4 cm";
    } else if (severity === 'MEDIUM') {
      estimatedLength = 0.6 + random() * 0.6;
      estimatedWidth = 0.4 + random() * 0.5;
      estimatedDepthStr = "5–10 cm";
    } else if (severity === 'HIGH') {
      estimatedLength = 1.2 + random() * 0.8;
      estimatedWidth = 0.8 + random() * 0.6;
      estimatedDepthStr = "10–15 cm";
    } else {
      estimatedLength = 2.0 + random() * 1.5;
      estimatedWidth = 1.2 + random() * 1.0;
      estimatedDepthStr = "15–25 cm";
    }
    
    // Round to 2 decimal places
    estimatedLength = Math.round(estimatedLength * 100) / 100;
    estimatedWidth = Math.round(estimatedWidth * 100) / 100;
    const estimatedArea = Math.round(estimatedLength * estimatedWidth * 100) / 100;

    let aiAssessment = "";
    let recommendedAction = "";
    
    if (severity === 'CRITICAL') {
      aiAssessment = `Extensive ${damageType.toLowerCase()} detected. The estimated dimensions indicate a major obstruction that may cause vehicle damage or severe accidents.`;
      recommendedAction = "Urgent inspection and repair recommended.";
    } else if (severity === 'HIGH') {
      aiAssessment = `Large visible ${damageType.toLowerCase()} that may create a safety risk for two-wheelers and vehicles, especially during low visibility or wet conditions.`;
      recommendedAction = "Priority inspection recommended.";
    } else if (severity === 'MEDIUM') {
      aiAssessment = `Moderate ${damageType.toLowerCase()} identified. May cause ride discomfort or worsen over time under heavy traffic.`;
      recommendedAction = "Schedule inspection and repair.";
    } else {
      aiAssessment = `Minor ${damageType.toLowerCase()} visible. Currently poses minimal immediate safety risk but requires monitoring.`;
      recommendedAction = "Monitor and schedule maintenance if the damage worsens.";
    }

    const riskScore = severity === 'CRITICAL' ? 95 : severity === 'HIGH' ? 80 : severity === 'MEDIUM' ? 55 : 25;

    // Simulate bounding box
    const boundingBoxes = [
      {
        xmin: 0.2 + random() * 0.2,
        ymin: 0.2 + random() * 0.2,
        xmax: 0.6 + random() * 0.2,
        ymax: 0.6 + random() * 0.2,
        label: damageType,
        confidence: confidence / 100
      }
    ];

    return {
      potholeDetected: true,
      confidence,
      estimatedSeverity: severity,
      estimatedSize: `${estimatedLength}m × ${estimatedWidth}m`,
      estimatedLength,
      estimatedWidth,
      estimatedArea,
      estimatedDepth: estimatedDepthStr,
      riskScore,
      detectedDamageType: damageType,
      explanation: aiAssessment,
      aiAssessment,
      recommendedAction,
      boundingBoxes
    };
  }
}
