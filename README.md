# RoadGuard AI

AI-powered road damage reporting and repair prioritization system.

> **IMPORTANT DISCLAIMER**
> This is a prototype created for the Engineers Day Challenge. It is not currently an official government-integrated system. Demo data is used to illustrate the capability of the AI.

## 1. Problem
Citizens lack a structured way to report road damage, and authorities are overwhelmed by thousands of unstructured complaints daily. As a result, critical road damage on high-traffic roads often goes unnoticed or waits too long for repair.

## 2. Solution
RoadGuard AI is a smart civic-tech platform that converts a simple citizen road image into an actionable, prioritized repair workflow. By analyzing images at the edge, the system objectively calculates severity and risk, ensuring the most dangerous potholes are fixed first.

## 3. System Workflow
**Detect → Locate → Prioritize → Repair → Verify**

## 4. Features
* **AI Object Detection**: Instantly identifies road damage and severity.
* **Risk Scoring Engine**: Factors in traffic, location importance, severity, and weather to calculate a 0-100 risk score.
* **Authority Priority Queue**: A dashboard for municipal workers that sorts reports by Risk Score.
* **Repair Tracking**: Full lifecycle transparency (Reported → Verified → Assigned → In Progress → Resolved).
* **Proof of Repair**: Before and after photographic evidence requirement for accountability.
* **Presentation & Demo Mode**: Built-in 3-minute pitch deck and interactive mock environment.

## 5. Technology Stack
* **Frontend**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS v4, Lucide React (Icons)
* **Maps**: Leaflet / React-Leaflet
* **Backend/Database**: Supabase (PostgreSQL, Auth, Storage)
* **Deployment**: Vercel

## 6. Project Structure
* `/src/components`: Reusable UI elements (AI cards, maps, timelines)
* `/src/pages`: 
  * `/citizen`: Public reporting and profile workflows
  * `/authority`: Admin dashboard and analytics
  * `/public`: Promo reel, slide deck, and landing pages
* `/src/services`: Database (Supabase) and AI integration logic
* `/src/utils`: Risk calculation engine

## 7. Environment Variables
The system requires the following environment variables (defined in `.env`):
* `VITE_SUPABASE_URL`
* `VITE_SUPABASE_ANON_KEY`
* `VITE_AI_PROVIDER` (Set to "demo" for mock data, or "remote" for live AI)
* `VITE_POTHOLE_AI_ENDPOINT`
* `VITE_POTHOLE_AI_PUBLIC_KEY`

## 8. Local Development
1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in your Supabase credentials.
4. Run `npm run dev`.

## 9. Deployment
This project is optimized for deployment on Vercel. See `DEPLOYMENT.md` for exact steps.

## 10. Future Scope
* Real-time AI pothole detection from dashcams.
* Predictive road-risk alerts.
* Municipal API integration for automated ticketing.
* Native mobile applications.
