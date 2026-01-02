# Production Test Checklist: Instant Quote Page

## Test Date: __________
## Tester: __________

---

## Pre-Test: Environment Configuration Verification

### Frontend Environment Variables (Netlify Dashboard)

Check Netlify Dashboard → Site Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_MEASURE_API_BASE_URL` is set to: `https://YOUR_BACKEND_URL` (canonical name; old name `NEXT_PUBLIC_QUOTE_API_BASE_URL` is deprecated)
- [ ] `NEXT_PUBLIC_MAPBOX_TOKEN` is set (do NOT display value, just confirm exists)

**Status**: ⬜ PASS / ⬜ FAIL
**Notes**: _____________________________________________

---

## Test 1: Page Load

### Steps:
1. Navigate to: https://www.graniteshieldroofing.com/instant-quote
2. Wait for page to fully load

### Expected Results:
- [ ] Page loads without console errors
- [ ] Form displays correctly with all fields:
  - [ ] Street Address input
  - [ ] City input
  - [ ] State input (defaults to "ME")
  - [ ] ZIP Code input
  - [ ] First Name input (optional)
  - [ ] Last Name input (optional)
  - [ ] Email input
  - [ ] Phone input (optional)
  - [ ] Roof type checkboxes (3 options)
  - [ ] Submit button

**Status**: ⬜ PASS / ⬜ FAIL
**Errors Found**: _____________________________________________

---

## Test 2: Form Submission - Valid Data

### Test Data:
- **Street Address**: `123 Main St`
- **City**: `Portland`
- **State**: `ME`
- **ZIP**: `04101`
- **Email**: `test@example.com`
- **Phone**: (leave blank)
- **Roof Types**: Select at least one (e.g., "Asphalt Shingles")

### Steps:
1. Fill in all required fields with test data above
2. Select at least one roof type
3. Click "Get My Instant Estimate" button
4. Observe loading state
5. Wait for results

### Expected Results:
- [ ] Submit button shows loading state (spinner + "Calculating Your Estimate…")
- [ ] Button returns to normal state after response
- [ ] Results card appears with:
  - [ ] Address displayed (normalized format)
  - [ ] Estimated roof size in squares (e.g., "28.5 squares")
  - [ ] Estimated roof size in square feet (e.g., "2,850 sq ft")
  - [ ] Price range(s) for selected roof type(s) showing:
    - [ ] Low price
    - [ ] Mid price (highlighted)
    - [ ] High price
  - [ ] Assumptions/disclaimer section with bullet points

**Status**: ⬜ PASS / ⬜ FAIL
**Errors Found**: _____________________________________________

---

## Test 3: Map Preview

### Steps:
1. After quote results appear, scroll to map section
2. Observe map behavior

### Expected Results (if coordinates available):
- [ ] Map renders in a card container
- [ ] Map is centered on property location
- [ ] Red marker visible at property location
- [ ] Navigation controls (zoom/rotate) visible in top-right
- [ ] Map style is satellite/streets hybrid

### Expected Results (if coordinates NOT available):
- [ ] Friendly fallback message displayed: "Map preview will appear here when location data is available"
- [ ] No broken map tiles or error messages

### Expected Results (if Mapbox token missing):
- [ ] Friendly fallback message: "Map preview unavailable (missing Mapbox token)"
- [ ] No broken map tiles or error messages

**Status**: ⬜ PASS / ⬜ FAIL
**Notes**: Coordinates available? ⬜ YES / ⬜ NO
**Errors Found**: _____________________________________________

---

## Test 4: Network Tab Verification

### Steps:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Clear network log
4. Submit quote form again with test data
5. Look for POST request to `/quote` endpoint

### Expected Results:

**Request:**
- [ ] POST request to: `https://YOUR_BACKEND_URL/quote`
- [ ] Request headers include: `Content-Type: application/json`
- [ ] Request payload includes:
  - [ ] `address`: Full address string
  - [ ] `streetAddress`, `city`, `state`, `zip`: Separate fields
  - [ ] `email`: Test email
  - [ ] `roofTypes`: Array of selected types

**Response:**
- [ ] Status code: `200 OK`
- [ ] Response headers include: `Content-Type: application/json`
- [ ] Response JSON includes:
  - [ ] `normalizedAddress`: String
  - [ ] `coordinates`: Object with `latitude` and `longitude`
  - [ ] `estimatedSquares`: Number
  - [ ] `pricing`: Object with price ranges
  - [ ] `assumptions`: Array of strings

**Status**: ⬜ PASS / ⬜ FAIL
**Errors Found**: _____________________________________________

---

## Test 5: Error Handling

### Test 5a: Network Error Simulation
*Note: Use browser DevTools → Network → Throttling → Offline, or disable backend temporarily*

### Steps:
1. Disconnect network or stop backend service
2. Submit quote form
3. Observe error handling

### Expected Results:
- [ ] Friendly error message displayed: "We couldn't generate an instant quote right now, but we've received your info and will follow up with an exact price."
- [ ] Form remains functional (not broken)
- [ ] No unhandled JavaScript errors in console

**Status**: ⬜ PASS / ⬜ FAIL

---

### Test 5b: Invalid Address
### Steps:
1. Enter invalid/non-existent address (e.g., "9999 Fake St, Portland, ME 99999")
2. Submit form
3. Observe behavior

### Expected Results:
- [ ] Either:
  - [ ] Error message displayed (if backend returns 404/400)
  - [ ] OR quote returns with assumptions noting address issues
- [ ] Page does not crash
- [ ] Form remains functional

**Status**: ⬜ PASS / ⬜ FAIL

---

## Test 6: CORS Verification

### Steps:
1. Open browser DevTools → Console
2. Submit quote form
3. Check for CORS errors

### Expected Results:
- [ ] No CORS errors in console
- [ ] No "Access-Control-Allow-Origin" errors
- [ ] Network request completes successfully

**Common CORS Error to Watch For:**
```
Access to fetch at 'https://backend-url/quote' from origin 'https://www.graniteshieldroofing.com' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Status**: ⬜ PASS / ⬜ FAIL
**Errors Found**: _____________________________________________

---

## Test 7: Form Validation

### Test 7a: Required Fields
### Steps:
1. Leave required fields empty (address, city, state, zip, email)
2. Click submit

### Expected Results:
- [ ] Validation errors appear below empty fields
- [ ] Form does not submit
- [ ] Submit button does not show loading state

**Status**: ⬜ PASS / ⬜ FAIL

---

### Test 7b: Invalid Email
### Steps:
1. Enter invalid email (e.g., "not-an-email")
2. Fill other required fields
3. Click submit

### Expected Results:
- [ ] Email validation error appears
- [ ] Form does not submit

**Status**: ⬜ PASS / ⬜ FAIL

---

### Test 7c: Invalid ZIP
### Steps:
1. Enter invalid ZIP (e.g., "123" or "12345-123")
2. Fill other required fields
3. Click submit

### Expected Results:
- [ ] ZIP validation error appears (must be 5 digits)
- [ ] Form does not submit

**Status**: ⬜ PASS / ⬜ FAIL

---

## Test 8: Responsive Design

### Steps:
1. Test on desktop (1920x1080 or similar)
2. Test on tablet (768px width)
3. Test on mobile (375px width)

### Expected Results:
- [ ] Form fields stack appropriately on mobile
- [ ] Map preview resizes correctly
- [ ] Results cards layout properly
- [ ] All text readable
- [ ] Buttons/touch targets appropriately sized

**Status**: ⬜ PASS / ⬜ FAIL
**Issues Found**: _____________________________________________

---

## Final Test Summary

### Overall Status: ⬜ PASS / ⬜ FAIL / ⬜ PASS WITH ISSUES

### Critical Issues (Block Production):
_____________________________________________
_____________________________________________

### Minor Issues (Non-Blocking):
_____________________________________________
_____________________________________________

### Backend URL Used:
`https://____________________________________`

### Test Completion Time:
Start: ___________ End: ___________

### Notes:
_____________________________________________
_____________________________________________

---

## Quick Test Script (For Automated Testing)

```bash
# Backend Health Check
curl https://YOUR_BACKEND_URL/health

# Expected: {"status":"ok","timestamp":"...","uptime":0,"environment":"production","cache":{"enabled":true}}

# Test Quote Endpoint
curl -X POST https://YOUR_BACKEND_URL/quote \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main St, Portland, ME 04101",
    "email": "test@example.com",
    "roofTypes": ["asphalt"],
    "streetAddress": "123 Main St",
    "city": "Portland",
    "state": "ME",
    "zip": "04101"
  }'

# Expected: JSON response with coordinates, estimatedSquares, pricing, etc.
```

