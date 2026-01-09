# PeakVex Instant Quote Landing Page - Design Specification

## Overview

This document outlines the design specification for a perfect, Apple-level aesthetic, mobile-first landing page for the PeakVex instant roof quote tool integrated into GraniteShield Roofing.

## Design Philosophy

The page should embody Apple's design principles: **simplicity, clarity, and focus**. Every element should serve a purpose, with generous whitespace and a clear visual hierarchy that guides users to the single action: entering their address.

---

## Mobile-First Layout (Priority)

### Screen 1: Hero + Address Input (Above the Fold)

```
┌─────────────────────────────────┐
│  [Logo - Small, Top Left]       │
│                                 │
│                                 │
│     Get Your Roof Price         │
│        in 60 Seconds            │
│                                 │
│   No appointment. No waiting.   │
│   Just enter your address.      │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🏠 Enter your Maine       │  │
│  │    address...             │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │    GET INSTANT QUOTE  →   │  │
│  └───────────────────────────┘  │
│                                 │
│   ⭐⭐⭐⭐⭐ 5.0 (47 reviews)    │
│                                 │
└─────────────────────────────────┘
```

**Key Elements:**
1. **Headline**: Large, bold, single line - "Get Your Roof Price in 60 Seconds"
2. **Subheadline**: Soft gray, addresses objections - "No appointment. No waiting."
3. **Address Input**: Large touch target (56px height), prominent placeholder
4. **CTA Button**: Full-width, high contrast (amber/gold), "GET INSTANT QUOTE"
5. **Trust Signal**: Star rating immediately visible

### Screen 2: How It Works (Scroll)

```
┌─────────────────────────────────┐
│                                 │
│       How It Works              │
│                                 │
│   ┌─────────────────────────┐   │
│   │  📍  Enter Address      │   │
│   │  We find your property  │   │
│   └─────────────────────────┘   │
│            ↓                    │
│   ┌─────────────────────────┐   │
│   │  🛰️  Satellite Measure  │   │
│   │  LiDAR-accurate sizing  │   │
│   └─────────────────────────┘   │
│            ↓                    │
│   ┌─────────────────────────┐   │
│   │  💰  See Your Price     │   │
│   │  Transparent packages   │   │
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Design Notes:**
- Vertical flow with connecting lines
- Icons should be simple, monoline style
- Each step is a card with subtle shadow
- Animation: Steps fade in sequentially on scroll

### Screen 3: Trust & Social Proof

```
┌─────────────────────────────────┐
│                                 │
│   "Got my quote in under a      │
│    minute. Couldn't believe     │
│    how accurate it was."        │
│                                 │
│    — Sarah M., Portland         │
│                                 │
│  ─────────────────────────────  │
│                                 │
│   ✓ Owner-Operated Quality      │
│   ✓ 5.0 Star Rating             │
│   ✓ Licensed & Insured          │
│   ✓ 200+ Roofs Installed        │
│                                 │
└─────────────────────────────────┘
```

### Screen 4: Final CTA (Sticky on Mobile)

```
┌─────────────────────────────────┐
│                                 │
│     Ready for Your Quote?       │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🏠 Enter your address...  │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │    GET INSTANT QUOTE  →   │  │
│  └───────────────────────────┘  │
│                                 │
│   Or call: (207) 303-4795       │
│                                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 📞 Call  │  GET QUOTE →        │  ← Sticky bottom bar
└─────────────────────────────────┘
```

---

## Visual Design Specifications

### Typography (Apple-Inspired)

| Element | Font | Size (Mobile) | Size (Desktop) | Weight |
|---------|------|---------------|----------------|--------|
| Hero Headline | Inter | 32px | 56px | 700 (Bold) |
| Subheadline | Inter | 16px | 20px | 400 (Regular) |
| Body Text | Inter | 16px | 18px | 400 (Regular) |
| Button Text | Inter | 18px | 18px | 600 (Semibold) |
| Labels | Inter | 14px | 14px | 500 (Medium) |

### Color Palette

| Use | Color | Hex |
|-----|-------|-----|
| Primary Background | White | #FFFFFF |
| Secondary Background | Light Gray | #F8FAFC |
| Primary Text | Slate 900 | #0F172A |
| Secondary Text | Slate 600 | #475569 |
| Primary CTA | Amber 400 | #FBBF24 |
| CTA Hover | Amber 500 | #F59E0B |
| CTA Text | Slate 900 | #0F172A |
| Accent | Blue 600 | #2563EB |
| Success | Green 500 | #22C55E |
| Border | Slate 200 | #E2E8F0 |

### Spacing System

- Base unit: 4px
- Section padding: 64px (mobile), 96px (desktop)
- Element spacing: 16px, 24px, 32px
- Card padding: 24px
- Input height: 56px (large touch target)
- Button height: 56px

### Shadows & Effects

```css
/* Card shadow */
box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);

/* Elevated card */
box-shadow: 0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05);

/* Input focus */
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
```

### Animations

```css
/* Fade in on scroll */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button hover */
transition: all 0.2s ease;
transform: translateY(-1px);

/* Input focus */
transition: border-color 0.2s ease, box-shadow 0.2s ease;
```

---

## Component Specifications

### Address Input Component

```tsx
<div className="relative">
  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
    <MapPin className="h-5 w-5" />
  </div>
  <input
    type="text"
    placeholder="Enter your Maine address..."
    className="
      w-full h-14 pl-12 pr-4
      text-lg
      border-2 border-slate-200
      rounded-xl
      focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
      transition-all duration-200
      placeholder:text-slate-400
    "
  />
</div>
```

### Primary CTA Button

```tsx
<button className="
  w-full h-14
  bg-amber-400 hover:bg-amber-500
  text-slate-900 font-semibold text-lg
  rounded-xl
  flex items-center justify-center gap-2
  transition-all duration-200
  hover:shadow-lg hover:-translate-y-0.5
  active:translate-y-0
">
  Get Instant Quote
  <ArrowRight className="h-5 w-5" />
</button>
```

### Trust Badge Row

```tsx
<div className="flex items-center justify-center gap-1 text-amber-500">
  {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-current" />)}
  <span className="ml-2 text-slate-600 font-medium">5.0 (47 reviews)</span>
</div>
```

---

## SEO Optimizations for Landing Page

### Meta Tags

```tsx
export const metadata: Metadata = {
  title: 'Instant Roof Quote | Get Your Price in 60 Seconds | GraniteShield',
  description: 'Get an instant, accurate roof quote for your Maine home. No appointment needed. Enter your address and see pricing in under 60 seconds. Powered by LiDAR technology.',
  keywords: [
    'instant roof quote Maine',
    'roof price calculator',
    'roof cost estimator',
    'online roof quote',
    'roofing estimate Maine',
    'how much does roof cost Maine',
  ],
};
```

### Schema Markup

```json
{
  "@type": "SoftwareApplication",
  "name": "PeakVex Instant Roof Quote",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## Mobile Optimizations

### Touch Targets
- All interactive elements: minimum 44x44px
- Buttons: 56px height
- Input fields: 56px height
- Adequate spacing between touch targets (8px minimum)

### Performance
- Lazy load below-fold content
- Optimize images with next/image
- Preload critical fonts
- Minimize JavaScript bundle

### Gestures
- Swipe-friendly testimonial carousel
- Pull-to-refresh disabled (prevents accidental refresh)
- Smooth scroll behavior

### Viewport Considerations
- Safe area insets for notched devices
- Sticky CTA bar accounts for home indicator
- Keyboard-aware layout (input stays visible)

---

## A/B Testing Recommendations

### Headlines to Test
1. "Get Your Roof Price in 60 Seconds" (Current)
2. "How Much Will Your New Roof Cost?"
3. "Free Instant Roof Estimate"
4. "See Your Roof Price Now"

### CTA Variations
1. "Get Instant Quote" (Current)
2. "See My Price"
3. "Calculate My Estimate"
4. "Get Free Quote"

### Trust Elements to Test
- Star rating position (above vs below input)
- Number of trust badges
- Testimonial presence on mobile

---

## Implementation Checklist

- [ ] Mobile-first responsive layout
- [ ] Address autocomplete (Maine-focused)
- [ ] Loading state with skeleton
- [ ] Error handling with retry
- [ ] Success animation
- [ ] Analytics tracking (form start, submit, success)
- [ ] Schema markup
- [ ] Meta tags optimized
- [ ] Core Web Vitals optimized
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Cross-browser testing
- [ ] Device testing (iOS Safari, Android Chrome)

---

## File Location

The instant quote page is located at:
- **Page**: `/app/instant-quote/page.tsx`
- **Client Component**: `/app/instant-quote/instant-quote-client.tsx`
- **Components**: `/app/instant-quote/components/`

The existing implementation should be enhanced following these specifications while maintaining the current functionality.
