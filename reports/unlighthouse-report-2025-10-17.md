# Unlighthouse Audit – 17 Oct 2025

_Source:_ `unlighthouse-ci --site weexportcars.vercel.app --reporter json`

## Scorecard
| Route | Performance | Accessibility | Best Practices | SEO | Overall | Primary Implementation Areas |
|-------|-------------|---------------|----------------|-----|--------|-----------------------------|
| `/` | 0.63 | 0.85 | 1.00 | 1.00 | 0.87 | `src/app/page.tsx`, `src/components/home/Hero2.tsx`, `ResponsiveProcessSection.tsx`, `ContactFormSection.tsx`
| `/about` | 0.59 | 0.92 | 1.00 | 1.00 | 0.88 | `src/app/about/page.tsx`, `src/components/about/AboutHero.tsx`
| `/services` | 0.60 | 0.92 | 1.00 | 1.00 | 0.88 | `src/app/services/page.tsx`, `src/app/services/components/ServicesHero.tsx`, `ServicesGridWrapper.tsx`
| `/showroom` | 0.74 | 0.90 | 1.00 | 1.00 | 0.91 | `src/app/showroom/page.tsx`, `src/components/showroom/*`
| `/car/*` (sampled slugs) | 0.97–0.98 | 0.84 | 0.96 | 1.00 | 0.94–0.95 | `src/app/car/[slug]/page.tsx`, `src/components/car/*`

_Overall observations_: Core informational pages lag in Performance (0.59–0.63) while transactional detail routes are healthy (≥0.97). Accessibility is consistently strong except on vehicle detail pages (0.84).

## Priority Recommendations
1. **Reduce Largest Contentful Paint on `/`, `/about`, `/services`**  
   - Audit hero media loading in `Hero2.tsx`, `AboutHero.tsx`, and `ServicesHero.tsx`. Confirm that only above-the-fold assets use `priority`. Convert background images to responsive `<Image>` components using `fill` + `sizes` and consider slightly lowering quality to trim transfer size.  
   - Extract critical CSS for the first viewport (hero typography, call-to-action buttons) and inline via `next/font` or a small `<style>` block to avoid layout flashes.  
   - Defer non-essential scripts: review client hooks such as `useScrollAnimation` and verify they are wrapped in `next/dynamic` with `ssr: false` only when required.

2. **Limit main-thread work on landing pages**  
   - Inspect imported animation libraries (e.g., Framer Motion via `AnimatedTitle.tsx`). For static hero sections, prefer CSS keyframes or reduce intersection observers to throttle work.  
   - Ensure `Client` components under `src/components/home/` execute DOM-heavy logic inside `useEffect` with guards for reduced motion.

3. **Improve accessibility on vehicle detail pages**  
   - Within `src/components/car/ImageGallery.tsx`, validate contrast ratios for captions and ensure each thumbnail has descriptive `alt` attributes.  
   - Check heading hierarchy in `src/app/car/[slug]/page.tsx`—each section should progress sequentially (H1 → H2/H3) to lift Lighthouse Accessibility beyond 0.9.

4. **Optimize Showroom media delivery**  
   - The `/showroom` route likely serves multiple images inside car cards. Confirm lazy loading via `<Image loading="lazy">` is active and that the grid uses `sizes` to prevent overserving on mobile.  
   - Consider prefetching only the first page of inventory; defer subsequent data requests until interaction.

## Supporting Actions
- Capture detailed Lighthouse JSON for `/`, `/about`, and `/services` to pinpoint exact LCP candidates and long tasks.
- Re-run bundle analysis (`next build --analyze`) ensuring hero sections are not pulling large optional modules into the landing bundle.
- Use the existing Vercel Speed Insights integration in `src/app/layout.tsx` to validate field improvements.

## Follow-up
- After implementing optimizations, rerun `unlighthouse-ci` and update this report.  
- Store raw reports (`.unlighthouse/ci-result.json`) alongside this file for auditing history.  
- Consider automating CI audit (see `.github/workflows/unlighthouse-audit.yml`) to track regressions per commit.
