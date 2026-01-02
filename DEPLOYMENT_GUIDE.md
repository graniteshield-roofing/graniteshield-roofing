# Deployment Guide: GraniteShield Roofing

This guide covers deploying both the frontend (Next.js) and backend (Node/TypeScript API) to production.

## Overview

- **Frontend**: Next.js site → **Netlify**
- **Backend**: Node/TypeScript API → **Render**

---

## Part 1: Backend Deployment (Render)

### Step 1: Deploy to Render

1. **Sign up/Login to Render**
   - Go to https://render.com
   - Sign up or login with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select the `roof-measurement-engine` repository
   - Click "Connect"

3. **Configure Service**
   - **Name**: `roof-measurement-engine` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (root of repo)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid for better performance)

4. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV = production
   MAPBOX_TOKEN = pk.your_actual_token_here
   ENABLE_CACHE = true
   LOG_LEVEL = info
   ```
   
   **Note**: Render will auto-set `PORT` - you don't need to set it manually.

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Wait for deployment to complete (usually 2-5 minutes)

6. **Get Your Backend URL**
   - Once deployed, Render provides a URL like: `https://roof-measurement-engine-xxxx.onrender.com`
   - Copy this URL - you'll need it for the frontend

7. **Test Backend**
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```
   
   Should return:
   ```json
   {
     "status": "ok",
     "timestamp": "...",
     "uptime": 0,
     "environment": "production",
     "cache": { "enabled": true }
   }
   ```

---

## Part 2: Frontend Deployment (Netlify)

### Step 1: Deploy to Netlify

1. **Sign up/Login to Netlify**
   - Go to https://netlify.com
   - Sign up or login with your GitHub account

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Connect GitHub account if needed
   - Select the `graniteshield-roofing` repository
   - Click "Connect"

3. **Configure Build Settings**
   Netlify should auto-detect Next.js from `netlify.toml`, but verify:
   - **Build command**: `npx next build`
   - **Publish directory**: `.next`
   - **Node version**: `18.x` or higher

4. **Set Environment Variables**
   Go to "Site settings" → "Environment variables" → "Add variable":
   
   ```
   NEXT_PUBLIC_MEASURE_API_BASE_URL = https://your-backend-url.onrender.com
   NEXT_PUBLIC_MAPBOX_TOKEN = pk.your_actual_token_here
   ```
   
   **Note:** The canonical environment variable name is `NEXT_PUBLIC_MEASURE_API_BASE_URL`. The old name `NEXT_PUBLIC_QUOTE_API_BASE_URL` is deprecated.
   
   **Important**: Replace `your-backend-url.onrender.com` with the actual URL from Step 1.6 above.

5. **Set Custom Domain (Optional)**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Enter: `www.graniteshieldroofing.com`
   - Follow Netlify's DNS instructions

6. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy
   - Wait for deployment to complete (usually 3-5 minutes)

7. **Test Frontend**
   - Visit: `https://your-site-name.netlify.app/instant-quote`
   - Or your custom domain: `https://www.graniteshieldroofing.com/instant-quote`

---

## Part 3: Security & CORS Configuration

### Backend CORS (Already Updated)

The backend CORS configuration allows:
- ✅ `http://localhost:3000` (local dev)
- ✅ `http://localhost:3001` (local dev)
- ✅ `https://graniteshieldroofing.com`
- ✅ `https://www.graniteshieldroofing.com`
- ✅ `*.vercel.app` (preview deployments)

**Status**: ✅ Already configured in code (committed to repo)

### Mapbox Token Restrictions

1. **Go to Mapbox Dashboard**
   - Visit https://account.mapbox.com/access-tokens/
   - Select your token

2. **Set URL Restrictions**
   Add these allowed URLs:
   - `https://www.graniteshieldroofing.com/*`
   - `https://graniteshieldroofing.com/*`
   - `http://localhost:3000/*`
   - `http://localhost:4000/*`

3. **Save Changes**

---

## Part 4: Testing Production

### Test Checklist

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```
   ✅ Should return `{"status": "ok", ...}`

2. **Frontend Quote Page**
   - Visit: `https://www.graniteshieldroofing.com/instant-quote`
   - ✅ Page loads without errors
   - ✅ Form displays correctly

3. **End-to-End Quote Request**
   - Enter a Maine address (e.g., "123 Main St, Portland, ME 04101")
   - Enter email
   - Select roof types
   - Click "Get My Instant Estimate"
   - ✅ Loading spinner appears
   - ✅ Quote results display with:
     - Estimated squares and sq ft
     - Price ranges for selected roof types
     - Map preview (if coordinates available)
     - Assumptions/disclaimers

4. **Network Check**
   - Open browser DevTools → Network tab
   - Submit quote form
   - ✅ See POST request to `https://your-backend-url.onrender.com/quote`
   - ✅ Response status 200 with JSON data

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV = production
MAPBOX_TOKEN = pk.your_token_here
ENABLE_CACHE = true
LOG_LEVEL = info
PORT = (auto-set by Render)
```

### Frontend (Netlify)
```
NEXT_PUBLIC_MEASURE_API_BASE_URL = https://your-backend-url.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN = pk.your_token_here
```

**Note:** The canonical environment variable name is `NEXT_PUBLIC_MEASURE_API_BASE_URL`. The old name `NEXT_PUBLIC_QUOTE_API_BASE_URL` is deprecated.

---

## Troubleshooting

### Backend Issues

**Build fails:**
- Check Node version (needs >= 18.0.0)
- Verify all dependencies in `package.json`
- Check build logs in Render dashboard

**Health check fails:**
- Verify `PORT` is not manually set (Render sets it)
- Check environment variables are set correctly
- Review Render logs for errors

### Frontend Issues

**Quote request fails:**
- Verify `NEXT_PUBLIC_MEASURE_API_BASE_URL` is set correctly
- Check CORS allows your frontend domain
- Open browser console for CORS errors

**Map doesn't load:**
- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set
- Check Mapbox token URL restrictions
- Check browser console for Mapbox errors

**Build fails:**
- Check Node version (Next.js needs >= 18.0.0)
- Verify all dependencies installed
- Check Netlify build logs

---

## Next Steps After Deployment

1. ✅ Set up custom domain in Netlify (if not done)
2. ✅ Configure SSL (usually automatic)
3. ✅ Test all quote flows end-to-end
4. ✅ Monitor logs for first few days
5. ✅ Set up error tracking (optional: Sentry, etc.)

---

## Support

For issues:
- Check Render logs: Dashboard → Your Service → Logs
- Check Netlify logs: Site → Deploys → Click deploy → Build log
- Check browser console for frontend errors
- Verify environment variables are set correctly

