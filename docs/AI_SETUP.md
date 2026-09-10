# RoadGuard AI — AI Setup Guide

RoadGuard AI supports a flexible AI Provider architecture designed to work with real computer vision models for pothole detection, while maintaining a robust "Demo Mode" fallback for presentations and prototyping.

## 1. Provider Modes

The application operates in two AI modes controlled by the `VITE_AI_PROVIDER` environment variable:

- `demo` (Default): Uses `DemoProvider`. Simulates AI analysis with randomized delays and confidence scores. No external network requests are made.
- `remote`: Uses `RemotePotholeProvider`. Connects to a real machine learning endpoint via an HTTP POST request containing the image.

## 2. Environment Variables

To connect a real AI model, add the following to your `.env` file at the root of the project:

```env
VITE_AI_PROVIDER=remote
VITE_POTHOLE_AI_ENDPOINT=https://your-ai-api.com/v1/detect
VITE_POTHOLE_AI_PUBLIC_KEY=your_public_token
```

### Security Warning
**Never expose private, secret API keys (e.g., OpenAI secret keys, raw AWS credentials) in these variables.** 
Vite environment variables (`VITE_`) are bundled into the frontend code and are publicly visible. 
If your AI provider requires a secret key, you **must** deploy a secure backend proxy (like a Node.js/Express server or an Edge Function) that holds the secret key and securely forwards the image to the AI provider. In that case, `VITE_POTHOLE_AI_ENDPOINT` should point to your secure proxy.

## 3. Supported API Responses (Normalization)

Different ML models (YOLO, Roboflow, custom ResNet) return different JSON structures. 
The `RemotePotholeProvider` automatically attempts to normalize standard responses into the `AIAnalysisResult` format required by RoadGuard AI.

The standard expected fields in the normalized response are:
- `potholeDetected` (boolean)
- `confidence` (0-100)
- `estimatedSeverity` (LOW, MEDIUM, HIGH, CRITICAL)
- `riskScore` (0-100)
- `boundingBoxes` (Array of { xmin, ymin, xmax, ymax })

If your custom API returns a unique format, you can easily modify the `normalizeResponse()` method inside `src/services/ai/providers/remotePotholeProvider.ts`.

## 4. UI Indicators and Fallback

- The Citizen Report page will display a small badge indicating whether the app is using **Real AI** or **Demo AI**.
- If the app is set to `remote` but the network request fails or times out (after 15 seconds), the system will seamlessly fallback to Demo Mode so the user (or judge) does not experience a broken application during a live demo.
