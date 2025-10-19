# 🎯 Which Database to Pick in Vercel Storage

## Quick Answer

In the Vercel Storage page, click **"Create"** next to:

### ✅ **Upstash**
**Description**: Serverless DB (Redis, Vector, Queue, Search)

**Then select**: **Redis**

**Free Tier**: Yes (10,000 commands/day)

---

## Why Upstash Redis?

1. ✅ **Compatible**: Works with `@vercel/kv` package (already in your code)
2. ✅ **Free**: 10K commands/day free tier
3. ✅ **Fast**: Redis is blazing fast for key-value storage
4. ✅ **Zero Config**: Auto-provisions and connects environment variables
5. ✅ **Serverless**: Pay-per-request, no idle costs

---

## ❌ Don't Pick These (For This Project)

### Edge Config
- ❌ For configuration data, not dynamic user data
- ❌ Read-only optimized

### Blob
- ❌ For file storage (images, PDFs, etc.)
- ❌ Not for structured data

### Neon / Supabase / Prisma Postgres
- ❌ SQL databases - overkill for simple key-value storage
- ❌ More complex setup

### MotherDuck / Turso
- ❌ Analytics/SQLite databases
- ❌ Not optimized for real-time updates

---

## Step-by-Step

Looking at your screenshot:

```
1. Find "Upstash" in the list
   ├─ Icon: Green/teal icon
   └─ Description: "Serverless DB (Redis, Vector, Queue, Search)"

2. Click "Create" button

3. Select "Redis" option

4. Choose Free tier

5. Name it: "pollnext-redis"

6. Select region: Choose closest to your users

7. Click "Create"

8. Connect to your project (checkbox)

9. Done! Environment variables auto-added
```

---

## After Creation

### Verify It's Working

1. **Check Environment Variables**:
   - Project → Settings → Environment Variables
   - Should see: `KV_REST_API_URL`, `KV_REST_API_TOKEN`

2. **Redeploy**:
   - Deployments → ... → Redeploy

3. **Test**:
   - Submit a question on your live site
   - Check Storage → Upstash Redis → Browse
   - Should see `"questions"` key with data

---

## Technology Note

- **June 2025 Update**: Vercel replaced native "KV" with Marketplace integrations
- **Upstash** is the provider that powered Vercel KV
- **Your code** using `@vercel/kv` package → works perfectly with Upstash
- **No code changes needed** ✅

---

## Free Tier Details

**Upstash Redis Free Tier**:
- 10,000 commands per day
- 256 MB storage
- TLS encryption
- Global replication (optional)
- No time limit

**Perfect for**:
- Question voting apps
- Small to medium traffic
- Testing and development
- Personal projects

**Upgrade if you need**:
- More than 10K operations/day
- Larger storage
- Advanced features

---

**TL;DR**: Click **"Create"** next to **Upstash** → Select **Redis** → Free tier → Done! 🎉

