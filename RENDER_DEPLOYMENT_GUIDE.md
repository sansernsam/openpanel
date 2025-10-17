# Deploy LINE Webhook to Render

## 🚀 Quick Deployment Guide

Your LINE webhook is ready to deploy! Here's how to deploy it to Render.

---

## Prerequisites

- ✅ Render account (you already have this)
- ✅ GitHub account
- ✅ Your code pushed to a GitHub repository

---

## Step 1: Push Your Code to GitHub

If you haven't already:

```bash
cd /Volumes/T7/dev/openpanel-cloned
git add .
git commit -m "Add LINE webhook integration"
git push origin main
```

---

## Step 2: Create New Web Service on Render

### 2.1 Go to Render Dashboard
Visit: https://dashboard.render.com/

### 2.2 Create New Web Service
1. Click **"New +"** button
2. Select **"Web Service"**

### 2.3 Connect Repository
1. Click **"Connect GitHub"** or **"Connect GitLab"**
2. Find your repository: `openpanel-cloned`
3. Click **"Connect"**

---

## Step 3: Configure the Service

### Basic Settings

| Field | Value |
|-------|-------|
| **Name** | `openpanel-api` (or your choice) |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | Leave empty or `apps/api` |
| **Runtime** | `Docker` |
| **Dockerfile Path** | `apps/api/Dockerfile` |

### Instance Type
- **Free** tier is fine for testing
- **Starter** ($7/month) for production with more traffic

---

## Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add ALL these variables:

### Required LINE Variables
```bash
LINE_CHANNEL_ID=2007821399
LINE_CHANNEL_SECRET=2b4cb731ba...
LINE_CHANNEL_ACCESS_TOKEN=your_token_here
```

### Other Required Variables
You'll need to add your database and other service credentials. Check your local `.env` file and add:

```bash
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
COOKIE_SECRET=your_cookie_secret
NEXT_PUBLIC_DASHBOARD_URL=your_dashboard_url
API_CORS_ORIGINS=your_allowed_origins
# ... add any other environment variables from your .env file
```

**Important:** Don't commit your `.env` file to git! Only add variables through Render's dashboard.

---

## Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will start building your Docker container
3. Wait for deployment to complete (5-10 minutes)
4. You'll get a URL like: `https://openpanel-api.onrender.com`

---

## Step 6: Update LINE Webhook URL

Once deployed, update your LINE webhook:

1. Go to: https://developers.line.biz/console/channel/2007821399/messaging-api
2. Find **"Webhook settings"**
3. Update **Webhook URL** to:
   ```
   https://your-app-name.onrender.com/webhook/line
   ```
4. Click **"Update"**
5. Click **"Verify"** to test the connection

---

## Step 7: Test Your Webhook

1. Open LINE app
2. Message your **@sammurai** bot
3. Check Render logs:
   - Go to Render dashboard
   - Click on your service
   - Go to **"Logs"** tab
   - You should see: `LINE event received`

---

## 🎯 Alternative: Deploy Only API (Simpler)

If the full monorepo is too complex, you can create a standalone API:

### Option A: Use Existing Domain

If you already have `https://www.cosdentbyslc.com` hosted somewhere:
- Deploy this API to Render
- Get the Render URL (e.g., `https://openpanel-api.onrender.com`)
- Set up a reverse proxy or subdomain to point `/webhook/line` to Render
- OR use Render's custom domain feature

### Option B: Use Render URL Directly
- Deploy to Render
- Get URL: `https://your-app.onrender.com`
- Update LINE webhook to: `https://your-app.onrender.com/webhook/line`

---

## 💡 Tips

### Free Tier Limitations
- Service sleeps after 15 minutes of inactivity
- Wakes up when first request comes (takes ~30 seconds)
- For production, use paid tier ($7/month)

### Keep Service Awake (Free Tier Hack)
Use a service like cron-job.org to ping your service every 10 minutes:
```
https://your-app.onrender.com/healthcheck
```

### Monitor Logs
- Go to Render dashboard → Your service → Logs
- Watch for LINE webhook events in real-time

### Custom Domain
If you want to use `https://www.cosdentbyslc.com`:
1. Go to Render service settings
2. Click **"Custom Domain"**
3. Add your domain
4. Update your DNS records as instructed

---

## 🔧 Troubleshooting

### Build Fails
- Check Render build logs for errors
- Make sure all dependencies are in `package.json`
- Verify Dockerfile path is correct

### Webhook Verification Fails
- Check environment variables are set correctly
- Look at Render logs for errors
- Make sure `LINE_CHANNEL_SECRET` matches LINE Console

### No Events Received
- Verify webhook URL in LINE Console
- Check "Use webhook" is enabled
- Disable auto-reply in LINE Official Account Manager
- Check Render logs for incoming requests

---

## 📊 What Happens After Deployment

```
User messages @sammurai
    ↓
LINE servers
    ↓
https://your-app.onrender.com/webhook/line
    ↓
Your webhook handler processes it
    ↓
Logs appear in Render dashboard
```

---

## 🎉 Next Steps After Deployment

1. Test webhook by messaging your bot
2. Check Render logs to confirm events are received
3. Add reply logic to send messages back (see [LINE_SETUP.md](LINE_SETUP.md))
4. Monitor performance and upgrade to paid tier if needed

---

## 📚 Useful Links

- **Render Dashboard**: https://dashboard.render.com/
- **Render Docs**: https://render.com/docs
- **LINE Developers**: https://developers.line.biz/console/channel/2007821399/messaging-api
- **LINE Webhook Docs**: https://developers.line.biz/en/docs/messaging-api/receiving-messages/

---

## ⚡ Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Select Docker runtime
- [ ] Add environment variables (LINE_CHANNEL_ID, LINE_CHANNEL_SECRET, LINE_CHANNEL_ACCESS_TOKEN, etc.)
- [ ] Deploy and wait for build
- [ ] Get Render URL
- [ ] Update LINE webhook URL
- [ ] Verify webhook in LINE Console
- [ ] Test by messaging bot
- [ ] Check Render logs

Good luck! 🚀
