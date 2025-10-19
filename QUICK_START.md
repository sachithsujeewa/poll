# Quick Start - Deploy in 5 Minutes

## ⚠️ Upstash Redis Required!

**Without Upstash Redis, questions won't persist!** Follow Step 3 below to create it (takes 2 minutes).

**Note**: As of June 2025, Vercel uses Upstash Redis from Marketplace (replaces old Vercel KV).

## 🚀 Fastest Path to Deploy

### 1. Push to GitHub (2 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy on Vercel (1 min)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project" → Import your repo
3. Click "Deploy"

### 3. Add Persistent Storage (2 min)
1. In Vercel project → **Storage** tab
2. Click **Create** next to **Upstash** → Select **Redis**
3. Choose **Free tier** → Create
4. Connect to your project (auto-provisioning)
5. **Redeploy** (Deployments tab → ... menu → Redeploy)

### ✅ Done!
Your app is live at `https://your-app.vercel.app` with data that persists forever!

---

## 💻 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Note**: Local dev won't persist data without Redis credentials. To use Upstash Redis locally, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 📊 What You Get (Free)

- ✅ Unlimited traffic
- ✅ Upstash Redis free tier (10K commands/day)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Auto-provisioning via Marketplace

---

## 🔗 Useful Links

- **Full Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Documentation**: [README.md](README.md)
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Vercel KV Docs**: [vercel.com/docs/storage/vercel-kv](https://vercel.com/docs/storage/vercel-kv)

