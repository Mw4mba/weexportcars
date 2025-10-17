# Performance Optimization Analysis – We Export Cars
**Date:** October 17, 2025  
**Based on:** Unlighthouse CI Report (`ci-result.json`)  
**Status:** Analysis Only – No Code Changes

---

## Executive Summary

The Unlighthouse audit reveals a **two-tier performance pattern**:
- **Landing pages** (`/`, `/about`, `/services`) score **0.59–0.63** in Performance
- **Vehicle detail pages** (`/car/*`) score **0.97–0.98** in Performance
- **All pages** achieve **1.0** for SEO and **0.96–1.0** for Best Practices
- **Accessibility** is strong (0.85–0.92) except on vehicle pages (0.84)

**Primary bottleneck:** Heavy Framer Motion animations and hero media loading on landing pages are blocking main thread and delaying LCP.

---

## Critical Performance Issues

### 1. **Hero Components Blocking Main Thread** 🔴 HIGH IMPACT
**Affected Routes:** `/` (0.63), `/about` (0.59), `/services` (0.60)

#### Current Implementation Analysis:

**`src/components/home/Hero2.tsx`** (Homepage Hero)
```tsx
// ISSUE 1: Framer Motion carousel with continuous re-renders
const [index, setIndex] = useState(0);
useEffect(() => {
    const interval = setInterval(() => {
        setIndex(prevIndex => (prevIndex + 1) % heroTextContent.length);
    }, 5000); // Re-renders entire hero every 5 seconds
    return () => clearInterval(interval);
}, []);

// ISSUE 2: Complex motion variants executed on every slide change
const slideVariants = {
    hidden: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: easeInOut } },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, ... }),
};

// ISSUE 3: Priority flag only on first image - subsequent carousel images load as high priority
<Image
    src={heroImageContent[index]}
    priority={index === 0} // Only first image gets priority
    ...
/>
```

**Impact:**
- Every carousel transition triggers layout recalculations and paint
- Framer Motion's runtime (~45kB gzipped) is bundled into the main chunk
- Hero variants execute complex transforms on every slide
- Main thread blocked during 800ms transition animations

**Recommended Optimizations:**
1. **Replace Framer Motion with CSS animations** for hero carousel
   - Use CSS `@keyframes` for slide transitions (eliminates JS overhead)
   - Implement with `transform: translateX()` and `opacity` only (GPU-accelerated)
   - Reduce bundle by ~45kB and eliminate animation frame callbacks

2. **Preload hero images strategically**
   - Add `<link rel="preload" as="image" href="/car1.png">` in layout for first hero image
   - Use `sizes="(max-width: 768px) 100vw, 50vw"` to prevent over-serving
   - Consider reducing image quality from default 75 to 70 for hero images

3. **Defer carousel initialization**
   - Render first static slide immediately on SSR
   - Load carousel logic after initial paint using `requestIdleCallback`
   - Prevents blocking main thread during critical render path

**Example CSS-based approach:**
```tsx
// Replace Framer Motion with pure CSS
const slides = useRef<HTMLDivElement>(null);
const [currentSlide, setCurrentSlide] = useState(0);

// CSS in globals.css
.hero-slide {
  animation: slideIn 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}
```

---

**`src/components/about/AboutHero.tsx`** (About Page Hero)
```tsx
// ISSUE 1: WorldMap component with complex SVG/Canvas rendering
<WorldMap
    dots={[...]} // 4 animated route lines
    animateRoutes={isVisible}
    ...
/>

// ISSUE 2: Multiple IntersectionObserver instances
useEffect(() => {
    const obs = new IntersectionObserver(...);
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
}, []); // One observer just for visibility
```

**Impact:**
- WorldMap is lazy-loaded but still executes heavy canvas/SVG animations on scroll
- Each dot/line animates independently, creating multiple animation frames
- Observer fires frequently as user scrolls near threshold

**Recommended Optimizations:**
1. **Reduce WorldMap animation complexity**
   - Limit to 2 primary routes instead of 4
   - Use `prefers-reduced-motion` media query to disable animations entirely for users who prefer it
   - Consider static image fallback for mobile devices (<768px)

2. **Consolidate IntersectionObserver usage**
   - Create a single shared observer context in layout
   - Components subscribe to central observer rather than creating individual instances
   - Reduces main thread work from multiple simultaneous observers

3. **Inline critical text styles**
   - Extract the hero title/subtitle CSS and inline in `<style>` tag
   - Prevents FOUC (Flash of Unstyled Content) while Tailwind CSS loads

---

**`src/app/services/components/ServicesHero.tsx`** (Services Page Hero)
```tsx
// ISSUE: Dynamic import with immediate load trigger
const [shouldLoadMap, setShouldLoadMap] = useState(false);

useEffect(() => {
    setShouldLoadMap(true); // Loads WorldMap immediately on mount
}, []);
```

**Impact:**
- WorldMap loads synchronously on mount, blocking main thread
- Similar animation overhead as AboutHero

**Recommended Optimizations:**
1. **Defer WorldMap until user interaction**
   - Load only when hero is in viewport (use existing `isVisible` state)
   - Skip WorldMap entirely on mobile devices and use gradient background

2. **Memoize dots array outside component**
   - Currently wrapped in `useMemo()` but still recalculates on every render
   - Move to module-level constant to eliminate memo overhead

---

### 2. **Showroom Gallery Loading Strategy** 🟡 MEDIUM IMPACT
**Affected Route:** `/showroom` (0.74)

#### Current Implementation:

**`src/components/showroom/VehicleGrid.tsx`**
```tsx
// ISSUE: All vehicle cards render immediately
{filteredVehicles.map((vehicle, index) => (
  <div key={vehicle.slug} className="vehicle-card">
    <VehicleCard vehicle={vehicle} index={index} visible={true} />
  </div>
))}
```

**`src/components/showroom/VehicleCard.tsx`**
```tsx
// ISSUE: Vehicle images use lazy loading but all cards are in DOM
<img 
    src={vehicle.image} 
    loading="lazy" // Browser lazy loading
    decoding="async"
    className="..." 
/>
```

**Impact:**
- All 6 vehicle cards render on initial page load (even if below fold)
- Each card contains a high-res image, even though `loading="lazy"` is set
- Browser still parses and renders all card markup, delaying LCP

**Recommended Optimizations:**
1. **Implement virtualized/paginated loading**
   - Show first 3 cards immediately (above the fold)
   - Load remaining cards when user scrolls to 80% of page
   - Use `react-window` or `react-virtual` for large inventories

2. **Upgrade `<img>` tags to Next.js `<Image>`**
   - Convert VehicleCard to use `<Image>` component
   - Enable automatic WebP/AVIF conversion (already configured in `next.config.ts`)
   - Use `placeholder="blur"` with low-quality image placeholders (LQIP)

3. **Defer filter logic**
   - Move `VehicleFilters` into a separate chunk with `next/dynamic`
   - Load filter UI only after initial gallery renders

**Example virtualization:**
```tsx
import dynamic from 'next/dynamic';

const VehicleCard = dynamic(() => import('./VehicleCard'), {
  loading: () => <CardSkeleton />
});

const visibleCount = useInView() ? filteredVehicles.length : 3;
const visibleVehicles = filteredVehicles.slice(0, visibleCount);
```

---

### 3. **Framer Motion Bundle Size** 🟡 MEDIUM IMPACT
**Affected:** All pages using animations

#### Current Usage:
```bash
# Grep results show Framer Motion used in:
- src/components/home/Hero2.tsx (carousel animations)
- src/components/home/navigation.tsx (mobile menu)
- src/components/home/OurProcess.tsx (scroll animations)
- Additional components (ProcessSectionDesktop, etc.)
```

**Impact:**
- Framer Motion adds **~45kB gzipped** to main bundle
- Used for relatively simple animations (slide, fade, scale)
- Most animations could be CSS-only

**Recommended Optimizations:**
1. **Replace Framer Motion with CSS for simple animations**
   - Hero carousel: CSS `@keyframes` + `animation`
   - Mobile menu: CSS `transition` + conditional classes
   - Fade/slide effects: CSS `transform` + `opacity`
   - Reduces bundle by up to 45kB

2. **For complex animations, use lighter alternatives**
   - `react-spring` (~27kB) for physics-based animations
   - `motion/mini` (minimal Framer Motion build, ~15kB)
   - Pure CSS with `will-change` hints for GPU acceleration

3. **Lazy load animation-heavy components**
   - Already done for `ProcessSectionDesktop`
   - Apply same pattern to `Hero2` (render static hero first, then hydrate animations)

**CSS-only alternative example:**
```css
/* Replace Framer Motion's slideVariants */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

.hero-carousel-item {
  animation: slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity; /* GPU hint */
}
```

---

### 4. **Image Gallery Accessibility & Performance** 🟢 LOW IMPACT
**Affected Route:** `/car/*` (Accessibility: 0.84)

#### Current Implementation:

**`src/components/car/ImageGallery.tsx`**
```tsx
// ISSUE 1: Generic alt text
<Image 
  src={image} 
  alt={`Thumbnail ${index + 1}`} // Not descriptive
  ...
/>

// ISSUE 2: All thumbnails loaded eagerly (only first 3 should be)
loading={index > 2 ? 'lazy' : 'eager'}
```

**Impact:**
- Screen readers announce "Thumbnail 1, Thumbnail 2" (not helpful)
- First 3 thumbnails load eagerly, but may not all be above fold on mobile
- Accessibility score penalized for non-descriptive alt text

**Recommended Optimizations:**
1. **Improve alt text descriptiveness**
   ```tsx
   alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} - View ${index + 1}`}
   ```

2. **Optimize thumbnail loading**
   - Load only the main image with `priority`
   - Load first 2 thumbnails eagerly, rest lazy
   - Use `sizes="96px"` (already implemented ✓)

3. **Add ARIA labels to navigation buttons**
   ```tsx
   <button
     onClick={handlePrevious}
     aria-label="Previous image"
     ...
   ```

4. **Improve color contrast on image counter**
   - Current: `bg-black/60 text-white` (may not meet WCAG AAA)
   - Test contrast ratio and adjust if needed

---

## Secondary Optimization Opportunities

### 5. **AnimatedTitle Component** 🟢 LOW IMPACT
**File:** `src/components/home/AnimatedTitle.tsx`

```tsx
// ISSUE: Uses IntersectionObserver for every title instance
export const AnimatedTitle: React.FC<AnimatedTitleProps> = memo(({ ... }) => {
  const [ref, isVisible] = useScrollAnimation('0px');
  ...
});
```

**Recommendation:**
- Replace with CSS-only `scroll-snap` or `animation-timeline` (modern browsers)
- Use single shared observer context for all animated elements
- Consider removing animation entirely for titles (minimal UX benefit vs. performance cost)

---

### 6. **Font Loading Strategy** ✅ OPTIMIZED
**File:** `src/app/layout.tsx`

```tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // ✓ Already optimized
});
```

**Status:** Already using `font-display: swap` to prevent FOIT (Flash of Invisible Text).  
**No further action needed.**

---

### 7. **Bundle Analyzer Configuration** ✅ READY
**File:** `next.config.ts`

```tsx
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
```

**Status:** Bundle analyzer already configured.  
**Action:** Run `ANALYZE=true npm run build` to visualize bundle composition and identify large dependencies.

---

## Prioritized Implementation Roadmap

### Phase 1: Quick Wins (1–2 days)
**Target: Lift Performance scores from 0.59–0.63 → 0.75–0.80**

1. ✅ Replace Framer Motion carousel in `Hero2.tsx` with CSS animations
   - Expected impact: -45kB bundle, +10–15 performance points
   - Files: `src/components/home/Hero2.tsx`, `src/app/globals.css`

2. ✅ Preload first hero image in layout
   - Add `<link rel="preload" as="image" href="/car1.png">` in `layout.tsx`
   - Expected impact: -200ms LCP

3. ✅ Reduce WorldMap animation complexity in hero components
   - Limit to 2 routes, disable on mobile
   - Files: `AboutHero.tsx`, `ServicesHero.tsx`

4. ✅ Defer WorldMap loading until viewport intersection
   - Change `shouldLoadMap` trigger from mount to `isVisible`
   - Expected impact: -100ms TTI (Time to Interactive)

---

### Phase 2: Structural Improvements (3–5 days)
**Target: Lift Performance scores to 0.85–0.90**

1. ✅ Implement virtualized loading for Showroom
   - Show 3 cards initially, load more on scroll
   - Files: `VehicleGrid.tsx`, `VehicleCard.tsx`

2. ✅ Convert VehicleCard `<img>` to Next.js `<Image>`
   - Enable WebP/AVIF formats
   - Add blur placeholders
   - Files: `VehicleCard.tsx`

3. ✅ Consolidate IntersectionObserver usage
   - Create shared observer context provider
   - Refactor `useScrollAnimation`, `AnimatedTitle`, hero components
   - Files: `src/contexts/IntersectionContext.tsx` (new)

4. ✅ Extract critical CSS for hero sections
   - Inline hero title/CTA styles in `<style>` tags
   - Files: `layout.tsx`, hero components

---

### Phase 3: Fine-Tuning (2–3 days)
**Target: Achieve 0.90+ Performance across all landing pages**

1. ✅ Accessibility improvements
   - Enhance alt text in `ImageGallery.tsx`
   - Add ARIA labels to gallery controls
   - Verify color contrast ratios

2. ✅ Font subsetting
   - Reduce Google Fonts payload by subsetting to used glyphs
   - Consider self-hosting fonts for faster delivery

3. ✅ Optimize third-party scripts
   - Audit Speed Insights integration (already lean)
   - Defer FloatingWhatsApp until user interaction

4. ✅ HTTP/2 Server Push or Early Hints
   - Configure Vercel to push critical resources
   - Requires Vercel config adjustment

---

## Monitoring & Validation Plan

1. **Baseline Metrics** (Already captured)
   - Homepage: Performance 0.63, Accessibility 0.85
   - About: Performance 0.59, Accessibility 0.92
   - Services: Performance 0.60, Accessibility 0.92
   - Showroom: Performance 0.74, Accessibility 0.90
   - Car Details: Performance 0.97–0.98, Accessibility 0.84

2. **Implementation Checkpoints**
   - After each phase, run `unlighthouse-ci` and compare scores
   - Update `reports/unlighthouse-report-2025-10-17.md` with delta
   - Track bundle size changes via `ANALYZE=true npm run build`

3. **Real User Monitoring**
   - Continue using Vercel Speed Insights (already integrated)
   - Monitor Core Web Vitals: LCP, FID, CLS
   - Set alerts for regressions (Vercel dashboard)

4. **A/B Testing (Optional)**
   - Test CSS-only hero vs. Framer Motion hero with 50/50 traffic split
   - Measure engagement metrics (time on page, bounce rate)
   - Use Vercel Analytics for insights

---

## Code Impact Summary (No Changes Made)

### Files Requiring Modification (Phase 1)
- `src/components/home/Hero2.tsx` – Replace Framer Motion carousel
- `src/app/globals.css` – Add CSS keyframes
- `src/app/layout.tsx` – Add image preload link
- `src/components/about/AboutHero.tsx` – Reduce WorldMap routes, defer loading
- `src/app/services/components/ServicesHero.tsx` – Defer WorldMap loading

### Files Requiring Modification (Phase 2)
- `src/components/showroom/VehicleGrid.tsx` – Virtualized rendering
- `src/components/showroom/VehicleCard.tsx` – Convert to Next.js Image
- `src/contexts/IntersectionContext.tsx` – New shared observer (create)
- `src/components/home/AnimatedTitle.tsx` – Refactor to use shared observer
- `src/components/home/useScrollAnimation.ts` – Refactor to use shared observer

### Files Requiring Modification (Phase 3)
- `src/components/car/ImageGallery.tsx` – Accessibility improvements
- `vercel.json` – HTTP/2 Push configuration (create if needed)

---

## Expected Performance Outcomes

| Page | Current Perf | Phase 1 Target | Phase 2 Target | Phase 3 Target |
|------|--------------|----------------|----------------|----------------|
| `/` (Home) | 0.63 | 0.78 | 0.87 | 0.92 |
| `/about` | 0.59 | 0.75 | 0.84 | 0.90 |
| `/services` | 0.60 | 0.76 | 0.85 | 0.91 |
| `/showroom` | 0.74 | 0.80 | 0.88 | 0.93 |
| `/car/*` | 0.97 | 0.97 | 0.98 | 0.99 |

**Total Bundle Size Reduction:** ~50–60kB gzipped (primarily Framer Motion removal)  
**Estimated LCP Improvement:** -300ms to -500ms on landing pages  
**Accessibility Lift:** +5–8 points on vehicle detail pages

---

## Additional Resources

- **Unlighthouse JSON Report:** `.unlighthouse/ci-result.json`
- **Bundle Analyzer:** Run `ANALYZE=true npm run build` then open `.next/analyze/client.html`
- **Vercel Speed Insights:** https://vercel.com/dashboard → Project → Analytics
- **Chrome DevTools Performance Profile:** Capture before/after for comparison

---

## Notes

- **Image format conversion** (WebP/AVIF) is already configured in `next.config.ts` but requires converting `<img>` tags to `<Image>` components to take effect
- **Browserslist** targets modern browsers (Chrome 90+, Safari 14+) which is optimal for reduced polyfill overhead
- **SWC minifier** is enabled, providing ~10% better compression than Terser
- **No breaking changes required** – all optimizations are backward-compatible

---

**Report Generated:** October 17, 2025  
**Next Review:** After Phase 1 implementation (recommended: Oct 24, 2025)
