# Deployment Guide - PollNext on Vercel

This guide will walk you through deploying your PollNext app to Vercel with persistent storage.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient)

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

If you haven't already, initialize a git repository and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: PollNext question voting app"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"New Project"**
4. Select **Import Git Repository**
5. Find and select your PollNext repository
6. Click **"Import"**
7. Keep all default settings and click **"Deploy"**
8. Wait for the deployment to complete (1-2 minutes)

**Important:** At this point, your app is deployed but **data won't persist** yet. Continue to Step 3.

### Step 3: Create Vercel KV Database

1. After deployment, you'll be on your project dashboard
2. Click on the **"Storage"** tab at the top
3. Click **"Create Database"**
4. Select **"KV"** (Redis-based key-value store)
5. Configure the database:
   - **Name**: `pollnext-kv` (or any name you prefer)
   - **Region**: Choose the one closest to your users
   - **Plan**: Select **"Hobby"** (Free)
6. Click **"Create"**

### Step 4: Connect Database to Project

1. After creating the database, you'll see a screen to connect it
2. Select your **PollNext project** from the dropdown
3. Click **"Connect"**
4. Vercel will automatically add these environment variables to your project:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`

### Step 5: Redeploy

1. Go back to your project's **"Deployments"** tab
2. Click on the **"..."** menu on the latest deployment
3. Select **"Redeploy"**
4. Click **"Redeploy"** in the confirmation dialog

Alternatively, just push a new commit to trigger automatic redeployment:

```bash
git commit --allow-empty -m "Trigger redeploy with KV"
git push
```

### Step 6: Test Your App

1. Visit your deployment URL (e.g., `https://your-app.vercel.app`)
2. Submit a test question
3. Upvote it
4. Refresh the page - your question should still be there!
5. Go to the Vercel dashboard → Storage → your KV database → **Browse** to see your data

## Verifying Data Persistence

To verify that data persists across deployments:

1. Submit several questions and vote on them
2. Make a small change to your code (e.g., update a text string)
3. Push to GitHub to trigger a new deployment
4. Visit your site - all questions and votes should still be there!

## Vercel KV Free Tier Limits

The free "Hobby" plan includes:
- ✅ **256 MB storage** (enough for thousands of questions)
- ✅ **10,000 commands per day** (reads/writes)
- ✅ **Unlimited projects**

For a typical question voting app, this is more than sufficient!

## Troubleshooting

### Questions disappear after deployment

**Problem**: Questions are gone after redeploying.

**Solution**: Make sure you completed Step 3 (Create KV Database) and Step 5 (Redeploy). The environment variables must be present for the app to use KV storage.

### Error: "KV_REST_API_URL is not defined"

**Problem**: The app can't connect to the database.

**Solution**: 
1. Go to your Vercel project → Settings → Environment Variables
2. Verify that all KV variables are present
3. If missing, reconnect the database from the Storage tab
4. Redeploy

### Can't vote or submit questions

**Problem**: 500 errors when interacting with the app.

**Solution**:
1. Check the Vercel Function Logs: Project → Deployments → Latest → View Function Logs
2. Look for error messages
3. Verify KV database is active in the Storage tab

## Local Development with KV

To test locally with the same Vercel KV database:

1. Go to your Vercel project → Settings → Environment Variables
2. Click **".env.local"** tab to download all variables
3. Copy the KV variables to a `.env` file in your project root:
   ```
   KV_REST_API_URL=https://...
   KV_REST_API_TOKEN=...
   KV_REST_API_READ_ONLY_TOKEN=...
   KV_URL=...
   ```
4. Run `npm run dev`
5. Your local app now uses the same database as production!

## Monitoring Usage

To check your KV usage:

1. Go to Vercel Dashboard → Storage
2. Click on your KV database
3. View **Metrics** to see:
   - Storage used
   - Daily commands used
   - Request history

## Next Steps

- Share your app URL with others!
- Monitor the Storage metrics to ensure you stay within free tier limits
- Consider adding question moderation if needed
- Customize the UI colors and branding

---

**Congratulations!** 🎉 Your PollNext app is now live with persistent storage, completely free on Vercel!

