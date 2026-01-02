# Quick Production Verification Guide

Since I cannot directly access your production URLs, here's a verification guide you can run yourself.

## ✅ Code Configuration Verification (Completed)

I've verified the codebase configuration:

### Environment Variable Usage
- ✅ `lib/api/quote.ts` reads from `process.env.NEXT_PUBLIC_MEASURE_API_BASE_URL` (canonical name; old name `NEXT_PUBLIC_QUOTE_API_BASE_URL` is deprecated)
- ✅ `components/QuoteMapPreview.tsx` reads from `process.env.NEXT_PUBLIC_MAPBOX_TOKEN` (no hard-coded tokens)
- ✅ Fallback to `http://localhost:4000` only exists in code as a development default
- ✅ No hard-coded Mapbox tokens found in codebase
- ✅ No hard-coded production API URLs found

**Status**: Code is correctly configured to use environment variables.

---

## 🔍 Manual Production Testing Steps

### Step 1: Verify Environment Variables (Netlify Dashboard)

1. Go to https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Verify these variables are set:
   - [ ] `NEXT_PUBLIC_MEASURE_API_BASE_URL` = `https://YOUR_BACKEND_URL` (canonical name)
   - [ ] `NEXT_PUBLIC_MAPBOX_TOKEN` = `pk.your_token` (exists, don't display value)

**If variables are missing or incorrect:**
- Add/update them in Netlify
- Trigger a new deployment (or wait for next commit)

---

### Step 2: Test Backend Health (Command Line)

```bash
curl https://YOUR_BACKEND_URL/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-XX...",
  "uptime": 123,
  "environment": "production",
  "cache": { "enabled": true }
}
```

**If this fails:**
- Backend is not running or URL is incorrect
- Check Render dashboard for service status

---

### Step 3: Test Quote Endpoint (Command Line)

```bash
curl -X POST https://YOUR_BACKEND_URL/quote \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.graniteshieldroofing.com" \
  -d '{
    "address": "123 Main St, Portland, ME 04101",
    "email": "test@example.com",
    "roofTypes": ["asphalt"],
    "streetAddress": "123 Main St",
    "city": "Portland",
    "state": "ME",
    "zip": "04101"
  }'
```

**Expected Response:**
- Status: 200 OK
- JSON with: `normalizedAddress`, `coordinates`, `estimatedSquares`, `pricing`, `assumptions`

**If you see CORS errors:**
- Backend CORS config needs to include your frontend domain
- Should already be configured, but verify in `src/server.ts`

---

### Step 4: Browser Testing (Critical)

1. **Open Production Page**
   - Navigate to: https://www.graniteshieldroofing.com/instant-quote
   - Open browser DevTools (F12) → Console tab

2. **Check for Initial Errors**
   - [ ] No red errors in console
   - [ ] Page loads completely
   - [ ] Form displays correctly

3. **Submit Test Quote**
   - Fill form:
     - Street: `123 Main St`
     - City: `Portland`
     - State: `ME`
     - ZIP: `04101`
     - Email: `test@example.com`
     - Select at least one roof type
   - Click "Get My Instant Estimate"

4. **Verify Network Request**
   - Open DevTools → Network tab
   - Filter: "quote" or "XHR"
   - Look for POST request to `/quote`
   - [ ] Status: 200
   - [ ] Response contains JSON with quote data

5. **Verify UI Response**
   - [ ] Loading spinner appears during request
   - [ ] Results card appears after response
   - [ ] Shows: squares, sq ft, price ranges
   - [ ] Map preview renders (or shows graceful fallback)

---

## 🚨 Common Issues & Solutions

### Issue: "Failed to get quote" Error

**Possible Causes:**
1. `NEXT_PUBLIC_MEASURE_API_BASE_URL` not set in Netlify
2. Backend URL incorrect in env var
3. Backend service down
4. CORS misconfiguration

**Debug Steps:**
- Check Netlify env vars are set correctly
- Verify backend health endpoint works
- Check browser console for actual error message
- Check Network tab for failed request details

---

### Issue: Map Not Loading

**Possible Causes:**
1. `NEXT_PUBLIC_MAPBOX_TOKEN` not set
2. Mapbox token URL restrictions blocking your domain
3. Coordinates missing from backend response

**Debug Steps:**
- Verify env var is set in Netlify
- Check Mapbox dashboard for URL restrictions
- Check browser console for Mapbox errors
- Verify backend response includes `coordinates` field

---

### Issue: CORS Error in Console

**Error Message:**
```
Access to fetch at 'https://backend-url/quote' from origin 'https://www.graniteshieldroofing.com' 
has been blocked by CORS policy
```

**Solution:**
- Backend CORS needs to include `https://www.graniteshieldroofing.com`
- Should already be configured, but verify backend code has this origin
- Restart backend service after CORS changes

---

### Issue: 404 or 502 from Backend

**Possible Causes:**
1. Backend URL incorrect
2. Backend service crashed
3. Backend route path incorrect

**Debug Steps:**
- Test backend health endpoint directly
- Check Render logs for errors
- Verify backend service is running in Render dashboard

---

## ✅ Final Verification Checklist

After testing, confirm:

- [ ] Page loads without console errors
- [ ] Form submission succeeds (200 response)
- [ ] Quote results display correctly
- [ ] Map preview works (or shows graceful fallback)
- [ ] No CORS errors
- [ ] Network requests go to correct backend URL
- [ ] All environment variables are set correctly

---

## 📋 Quick Test Script

I've created `test-production.sh` that you can run from command line:

```bash
chmod +x test-production.sh
./test-production.sh https://YOUR_BACKEND_URL
```

This will test:
1. Backend health endpoint
2. Quote endpoint with sample data
3. CORS headers

---

## 📝 Testing Checklist Document

See `PRODUCTION_TEST_CHECKLIST.md` for a comprehensive manual testing checklist you can print and fill out.

