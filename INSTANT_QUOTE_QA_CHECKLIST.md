# Instant Quote Implementation - Manual QA Checklist

## Pre-Deployment: Environment Configuration

### Environment Variables Setup
- [ ] Set `NEXT_PUBLIC_PEAKVEX_WIDGET_SRC` in hosting platform
- [ ] Set `NEXT_PUBLIC_PEAKVEX_COMPANY_SLUG` in hosting platform
- [ ] Verify env vars are set for production environment (not just preview)
- [ ] Test that fallback message shows if env vars are missing (temporarily remove to verify)

**Status**: ⬜ PASS / ⬜ FAIL  
**Notes**: _____________________________________________

---

## Test 1: Instant Quote Page Load (`/instant-quote`)

### Steps:
1. Navigate to: `https://graniteshieldroofing.com/instant-quote`
2. Wait for page to fully load
3. Check browser console for errors

### Expected Results:
- [ ] Page loads without console errors
- [ ] Hero section displays with H1 "Instant Roof Quote in 60 Seconds"
- [ ] Badge shows "No In-Home Sales Pitch • Fast & Accurate • Available Now"
- [ ] Two CTA buttons visible: "Get My Instant Quote" and "Talk to a Roofing Expert"
- [ ] Trust/value bullets section displays (6 items with icons)
- [ ] "How it works" section displays (3 steps)
- [ ] Widget section displays (either widget or fallback message)
- [ ] FAQ section displays (8 questions in accordion)
- [ ] Service area section displays with town names
- [ ] Page matches existing site design (colors, fonts, spacing)

**Status**: ⬜ PASS / ⬜ FAIL  
**Errors Found**: _____________________________________________

---

## Test 2: Widget Integration

### Steps:
1. Navigate to `/instant-quote`
2. Scroll to widget section
3. Verify widget loads (after env vars are configured)
4. If env vars missing, verify fallback message displays

### Expected Results (With Env Vars):
- [ ] Script tag loads: `<script src="..." data-company="...">`
- [ ] Widget renders in `<div id="peakvex-quote">`
- [ ] Widget is interactive and functional
- [ ] Widget form/interface displays correctly
- [ ] No JavaScript errors related to widget

### Expected Results (Without Env Vars):
- [ ] Fallback message displays: "Widget Configuration Required"
- [ ] Fallback shows required env var names
- [ ] Phone/contact CTAs still visible and functional

**Status**: ⬜ PASS / ⬜ FAIL  
**Widget URL Used**: _____________________________________________  
**Company Slug Used**: _____________________________________________  
**Notes**: _____________________________________________

---

## Test 3: Hero Section Scroll Behavior

### Steps:
1. Navigate to `/instant-quote`
2. Click "Get My Instant Quote" button in hero
3. Observe page scroll behavior

### Expected Results:
- [ ] Page smoothly scrolls to widget section (`#peakvex-quote`)
- [ ] Widget section comes into view
- [ ] URL updates to include `#peakvex-quote` hash (optional, browser-dependent)
- [ ] No page jump or layout shift

**Status**: ⬜ PASS / ⬜ FAIL  
**Notes**: _____________________________________________

---

## Test 4: FAQ Accordion Functionality

### Steps:
1. Navigate to `/instant-quote`
2. Scroll to FAQ section
3. Click on each FAQ question (all 8)
4. Test keyboard navigation (Tab to focus, Enter/Space to toggle)

### Expected Results:
- [ ] All 8 FAQs display correctly
- [ ] Clicking question expands/collapses answer
- [ ] Only one FAQ open at a time (accordion behavior)
- [ ] Answers display with proper formatting
- [ ] Keyboard navigation works (Tab → Enter/Space)
- [ ] Screen reader announces state changes (if testing with screen reader)

### FAQ List (Verify All Present):
1. [ ] How accurate is the instant quote?
2. [ ] Is this a final price?
3. [ ] Do I have to schedule an appointment?
4. [ ] What if my roof is complex or has a steep pitch?
5. [ ] What roofing materials are supported?
6. [ ] How long does the final verification take?
7. [ ] Do you offer financing?
8. [ ] Is my information safe?

**Status**: ⬜ PASS / ⬜ FAIL  
**Notes**: _____________________________________________

---

## Test 5: SEO & Metadata Verification

### Steps:
1. View page source of `/instant-quote`
2. Check for metadata tags
3. Check for JSON-LD schema markup
4. Verify canonical URL

### Expected Results:
- [ ] `<title>` tag: "Instant Roof Quote in 60 Seconds | GraniteShield Roofing"
- [ ] `<meta name="description">` contains: "instant quote", "roofing estimate", "satellite measurements"
- [ ] Canonical URL: `https://graniteshieldroofing.com/instant-quote`
- [ ] OpenGraph tags present (`og:title`, `og:description`, `og:url`, `og:type`)
- [ ] Twitter card tags present
- [ ] JSON-LD WebPage schema present
- [ ] JSON-LD FAQPage schema present (with all 8 FAQs)
- [ ] JSON-LD BreadcrumbList schema present

### Schema Validation:
- [ ] Test with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] All schemas validate without errors
- [ ] FAQs are crawlable (visible in rendered HTML, not hidden by accordion)

**Status**: ⬜ PASS / ⬜ FAIL  
**Google Rich Results Test URL**: _____________________________________________  
**Validation Errors**: _____________________________________________

---

## Test 6: Sitemap Inclusion

### Steps:
1. Navigate to: `https://graniteshieldroofing.com/sitemap.xml`
2. Search for "instant-quote"

### Expected Results:
- [ ] `/instant-quote` appears in sitemap
- [ ] URL is correct: `https://graniteshieldroofing.com/instant-quote`
- [ ] Priority is set (should be 0.9)
- [ ] Change frequency is set (should be "monthly")
- [ ] Last modified date is recent

**Status**: ⬜ PASS / ⬜ FAIL  
**Notes**: _____________________________________________

---

## Test 7: CTA Placement - Roofing Service Pages

### Verify "Get Instant Quote" CTA is present on ALL roofing pages:

- [ ] `/services/roof-replacement` - CTA visible and links to `/instant-quote`
- [ ] `/services/standing-seam-metal-roofing` - CTA visible and links correctly
- [ ] `/services/roof-repair` - CTA visible and links correctly
- [ ] `/services/shingle-roofing` - CTA visible and links correctly
- [ ] `/services/roof-inspection` - CTA visible and links correctly
- [ ] `/services/roof-maintenance` - CTA visible and links correctly
- [ ] `/services/emergency-repair` - CTA visible (secondary, phone remains primary)
- [ ] `/services/ice-dam-removal` - CTA visible and links correctly

### CTA Position & Styling:
- [ ] CTA appears in hero section (above the fold)
- [ ] CTA uses `variant="cta"` (blue/primary color)
- [ ] CTA text: "Get Instant Quote"
- [ ] CTA includes ArrowRight icon
- [ ] CTA links to `/instant-quote`
- [ ] CTA button size matches existing buttons (`h-12 px-6`)

**Status**: ⬜ PASS / ⬜ FAIL  
**Pages Missing CTA**: _____________________________________________

---

## Test 8: CTA Placement - Roofing Content Pages

- [ ] `/problems/ice-dams` - CTA visible and links to `/instant-quote`
- [ ] `/roofing-guides` - CTA visible and links to `/instant-quote`

**Status**: ⬜ PASS / ⬜ FAIL  
**Notes**: _____________________________________________

---

## Test 9: Non-Roofing Pages (Should NOT Have CTA)

### Verify "Get Instant Quote" CTA is NOT present on non-roofing pages:

- [ ] `/services/vinyl-siding` - NO "Get Instant Quote" CTA (may have "Get Free Estimate")
- [ ] `/services/metal-siding` - NO "Get Instant Quote" CTA
- [ ] `/services/windows` - NO "Get Instant Quote" CTA
- [ ] `/contact` - NO "Get Instant Quote" CTA
- [ ] `/about` - NO "Get Instant Quote" CTA
- [ ] `/areas` - NO "Get Instant Quote" CTA

**Status**: ⬜ PASS / ⬜ FAIL  
**Pages Incorrectly Showing CTA**: _____________________________________________

---

## Test 10: Mobile Responsiveness

### Device Testing:
Test on multiple devices/browsers:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad/Tablet
- [ ] Desktop (Chrome)
- [ ] Desktop (Firefox)
- [ ] Desktop (Safari)

### Mobile Checks for `/instant-quote`:
- [ ] Hero section stacks properly (buttons vertical on mobile)
- [ ] Trust bullets grid adjusts to 1 column on mobile
- [ ] "How it works" cards stack vertically on mobile
- [ ] Widget section is readable and functional on mobile
- [ ] FAQ accordion works on touch devices
- [ ] Text is readable without zooming
- [ ] Buttons are tap-friendly size (minimum 44x44px)
- [ ] No horizontal scrolling
- [ ] Images (if any) scale appropriately

### Mobile Checks for Service Pages:
- [ ] CTAs stack vertically on mobile where appropriate
- [ ] "Get Instant Quote" button is easily tappable
- [ ] Button text is readable on small screens

**Status**: ⬜ PASS / ⬜ FAIL  
**Device/OS Tested**: _____________________________________________  
**Issues Found**: _____________________________________________

---

## Test 11: Performance

### Lighthouse Audit:
Run Lighthouse audit on `/instant-quote`:

- [ ] Performance score: 90+ (mobile)
- [ ] Performance score: 90+ (desktop)
- [ ] First Contentful Paint (FCP): < 1.8s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Time to Interactive (TTI): < 3.8s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Total Blocking Time (TBT): < 200ms

### Script Loading:
- [ ] Widget script loads with `afterInteractive` strategy
- [ ] Script does not block page rendering
- [ ] No render-blocking resources
- [ ] Console shows no performance warnings

**Status**: ⬜ PASS / ⬜ FAIL  
**Lighthouse Scores**:
- Performance: _____
- Accessibility: _____
- Best Practices: _____
- SEO: _____

**Notes**: _____________________________________________

---

## Test 12: Accessibility

### Keyboard Navigation:
- [ ] Tab key moves through all interactive elements in logical order
- [ ] Focus indicators visible (outline on focused elements)
- [ ] Enter/Space activates buttons and accordion items
- [ ] All interactive elements are keyboard accessible
- [ ] No keyboard traps

### Screen Reader (if testing):
- [ ] Page title announced correctly
- [ ] Heading hierarchy announced (H1 → H2 → H3)
- [ ] Button text is descriptive
- [ ] Accordion states announced (expanded/collapsed)
- [ ] Form inputs (if widget has them) have labels

### Visual Accessibility:
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Text is readable at 200% zoom
- [ ] Focus indicators are visible
- [ ] No content relies solely on color to convey information

### ARIA Labels:
- [ ] Accordion has proper ARIA attributes (handled by Radix UI)
- [ ] Buttons have accessible text
- [ ] Interactive elements have proper roles

**Status**: ⬜ PASS / ⬜ FAIL  
**Screen Reader Used**: _____________________________________________  
**Issues Found**: _____________________________________________

---

## Test 13: Internal Linking

### Verify Links on `/instant-quote`:
- [ ] Links to roofing services work correctly:
  - [ ] Link to `/services/roof-replacement`
  - [ ] Link to `/services/roof-repair`
  - [ ] Link to `/services/shingle-roofing`
  - [ ] Link to `/services/standing-seam-metal-roofing`
  - [ ] Link to `/services/roof-inspection`
- [ ] "Talk to a Roofing Expert" links to phone number
- [ ] Service area section links work (if any)

### Verify Links TO `/instant-quote`:
- [ ] All roofing service pages link to `/instant-quote` correctly
- [ ] All roofing content pages link to `/instant-quote` correctly
- [ ] Links use proper Next.js `<Link>` component (client-side navigation)

**Status**: ⬜ PASS / ⬜ FAIL  
**Broken Links**: _____________________________________________

---

## Test 14: Content Accuracy

### Verify Content Matches Requirements:
- [ ] H1 says "Instant Roof Quote in 60 Seconds"
- [ ] Subheading emphasizes comfort of home, no long sales process
- [ ] Mentions satellite-based measurements
- [ ] Clearly states final price requires verification
- [ ] Service areas pulled from existing config (not invented)
- [ ] Tone matches existing site voice
- [ ] No placeholder text remains
- [ ] All copy is professional and accurate

**Status**: ⬜ PASS / ⬜ FAIL  
**Content Issues**: _____________________________________________

---

## Test 15: Error Handling

### Test Scenarios:
- [ ] Page loads correctly if widget script fails to load
- [ ] Page loads correctly if env vars are missing (shows fallback)
- [ ] No console errors on page load
- [ ] No console errors when interacting with page
- [ ] Widget errors don't break the page
- [ ] Network errors handled gracefully

**Status**: ⬜ PASS / ⬜ FAIL  
**Errors Found**: _____________________________________________

---

## Test 16: Analytics Tracking (If Applicable)

### If Analytics is Set Up:
- [ ] Track "Get Instant Quote" button clicks
- [ ] Event name: `cta_instant_quote_click` (or as configured)
- [ ] Verify events fire on all CTA buttons
- [ ] Events include proper context (page, button location)

**Status**: ⬜ PASS / ⬜ FAIL / ⬜ N/A (no analytics)  
**Analytics Tool Used**: _____________________________________________  
**Event Tracking Verified**: _____________________________________________

---

## Final Sign-Off

### Overall Status:
- [ ] All tests passed
- [ ] Ready for production deployment
- [ ] Widget environment variables configured
- [ ] Documentation reviewed
- [ ] Stakeholder approval received (if required)

**Tester Name**: _____________________________________________  
**Test Date**: _____________________________________________  
**Final Status**: ⬜ APPROVED / ⬜ NEEDS FIXES

**Notes/Issues to Address**: 
_____________________________________________
_____________________________________________
_____________________________________________

---

## Post-Deployment Verification

After deployment, verify:
- [ ] Production URL works: `https://graniteshieldroofing.com/instant-quote`
- [ ] Widget loads with production env vars
- [ ] All CTAs link correctly in production
- [ ] No console errors in production
- [ ] Performance is acceptable in production
- [ ] SEO metadata visible in production (check source code)

**Production Status**: ⬜ VERIFIED / ⬜ ISSUES FOUND  
**Production URL**: _____________________________________________  
**Production Issues**: _____________________________________________
