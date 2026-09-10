# RoadGuard AI Deployment Guide

This document outlines the exact steps to deploy the RoadGuard AI prototype to production using **GitHub** and **Vercel**.

## 1. Push project to GitHub
1. Create a new repository on your GitHub account.
2. Commit your local changes:
   ```bash
   git add .
   git commit -m "Initial RoadGuard AI prototype"
   ```
3. Push to your new repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## 2. Open Vercel
1. Navigate to [vercel.com](https://vercel.com).
2. Log in with your GitHub account.

## 3. Import GitHub repository
1. Click **Add New...** > **Project**.
2. Find your newly created RoadGuard AI repository in the list and click **Import**.

## 4. Select correct framework
1. Vercel should automatically detect **Vite** as the framework.
2. If it does not, select **Vite** from the Framework Preset dropdown.

## 5. Configure build settings
Ensure the build settings match the following (these should be default):
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Install Command**: `npm install`

*(Note: The project includes a `vercel.json` file to automatically handle React Router SPA fallbacks).*

## 6. Add environment variables
Expand the **Environment Variables** section and add the following keys. 

**Required for Database:**
* `VITE_SUPABASE_URL` = (Your Supabase Project URL)
* `VITE_SUPABASE_ANON_KEY` = (Your Supabase anon/public key)

**Required for AI (Optional / Demo Mode):**
* `VITE_AI_PROVIDER` = (Set to `demo` to use the simulated mock engine for the presentation)

*(Note: DO NOT add your Supabase `service_role` key to Vercel environment variables! Only the `anon` key belongs in the frontend).*

## 7. Deploy
1. Click the **Deploy** button.
2. Wait ~60 seconds for Vercel to build the Vite bundle and deploy it to the Edge Network.

## 8. Test production URL
Click on the generated domain (e.g., `https://roadguard-ai.vercel.app`).
Refer to the **Production Test Checklist** in the project instructions to verify the workflow!
