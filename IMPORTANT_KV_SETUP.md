# ⚠️ IMPORTANT: Vercel KV Setup Required

## Current Status

✅ Your code is ready to use Vercel KV  
❌ **No KV database exists yet** - You need to create it!

## Why You Don't See "KV" in Storage

**As of June 9, 2025, Vercel KV was replaced with Marketplace Storage integrations.** 

The app code uses `@vercel/kv` which works with **Upstash Redis** (the provider behind Vercel KV).

## What Happens Without KV?

- ❌ Questions **won't save** to the database
- ❌ Data will be **lost on each deployment**
- ⚠️ API errors in production (but app won't crash)

## ✅ Quick Fix: 3 Steps to Enable Persistence

### Step 1: Deploy Your App First
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

Then go to [vercel.com](https://vercel.com) and import your repository.

### Step 2: Create Upstash Redis Database
After deployment:
1. Go to your **Vercel project dashboard**
2. Click **Storage** tab (top navigation)
3. Click **"Create"** next to **Upstash** (Serverless DB)
4. Select **Redis**
5. Choose the **Free tier** plan
6. Name: `pollnext-redis` (or any name)
7. Select region closest to your users
8. Click **"Create"**
9. **Connect** the database to your project (auto-provisioning)

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** menu on latest deployment
3. Select **"Redeploy"**

**OR** just push a new commit:
```bash
git commit --allow-empty -m "Enable KV storage"
git push
```

## ✅ Verification

After redeploying with KV:
1. Visit your site
2. Submit a question
3. Deploy again (make any code change)
4. Visit your site - **question should still be there!**

## 🔍 How to Check Your Redis Database

1. Vercel Dashboard → Your Project → **Storage**
2. Click on your Upstash Redis database
3. Click **"Browse"** or **"Data Browser"** tab to see stored data
4. You should see a key called `"questions"` with your data

## 📊 Your Redis Database Will Contain

```json
{
  "questions": [
    {
      "id": "q_1760771173666_abc123",
      "text": "Your question text here",
      "votes": 5,
      "timestamp": 1760771173666
    }
  ]
}
```

## 🆘 Still Having Issues?

1. **Check Environment Variables**:
   - Project → Settings → Environment Variables
   - Should see: `KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.
   - If missing: Reconnect database from Storage tab

2. **Check Function Logs**:
   - Project → Deployments → Latest → Function Logs
   - Look for Redis/KV-related errors

3. **Verify Database Connection**:
   - Storage → Your Upstash Redis database → Connected Projects
   - Should list your project

---

## 📝 About the Technology Change

- **Old**: Vercel KV (native Vercel service)
- **New**: Upstash Redis via Vercel Marketplace (as of June 9, 2025)
- **Your Code**: Uses `@vercel/kv` package - **still works perfectly!**
- **Compatibility**: 100% compatible - no code changes needed

**Remember**: Without Redis database, your questions will disappear on every deployment! Create it now to enable persistence.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step guide.

