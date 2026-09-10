import type { AIAnalysisResult } from '../../types/ai';
import { DemoProvider } from './providers/demoProvider';
import { RemotePotholeProvider } from './providers/remotePotholeProvider';

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const VALID_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const validateImage = (imageFile: File): { valid: boolean; error?: string } => {
  if (!VALID_TYPES.includes(imageFile.type)) {
    return { valid: false, error: 'Invalid file format. Please upload JPG, PNG, or WEBP.' };
  }
  
  if (imageFile.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Image is too large. Maximum size is 10MB.' };
  }
  
  return { valid: true };
};

export const getAiProviderMode = (): 'remote' | 'demo' => {
  const mode = import.meta.env.VITE_AI_PROVIDER;
  const endpoint = import.meta.env.VITE_POTHOLE_AI_ENDPOINT;
  
  if (mode === 'remote' && endpoint) {
    return 'remote';
  }
  return 'demo';
};

export const analyzeRoadImage = async (imageFile: File): Promise<AIAnalysisResult> => {
  // 1. Validation
  const validation = validateImage(imageFile);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // 2. Select Provider
  const mode = getAiProviderMode();
  let provider;

  if (mode === 'remote') {
    const endpoint = import.meta.env.VITE_POTHOLE_AI_ENDPOINT || '';
    const apiKey = import.meta.env.VITE_POTHOLE_AI_PUBLIC_KEY || '';
    provider = new RemotePotholeProvider(endpoint, apiKey);
  } else {
    provider = new DemoProvider();
  }

  // 3. Execution with Timeout handling
  try {
    // Add a 15-second timeout safeguard
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('AI analysis timed out. The server took too long to respond.')), 15000);
    });
    
    return await Promise.race([
      provider.analyzeImage(imageFile),
      timeoutPromise
    ]);
  } catch (err: any) {
    console.error('RoadDamageAnalyzer Error:', err);
    
    // Fallback to demo mode if remote fails, for the sake of the prototype competition
    if (mode === 'remote') {
      console.warn('Remote AI failed, falling back to Demo AI for presentation stability.');
      const demoFallback = new DemoProvider();
      return await demoFallback.analyzeImage(imageFile);
    }
    
    throw err;
  }
};
