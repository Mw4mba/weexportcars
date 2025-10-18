# Quick Fix Reference Card
**Performance Optimization Cheat Sheet**

---

## 🚨 MOST IMPORTANT FIRST

### Test Production Build (2 minutes)
```bash
npm run build
npm start
# Visit http://localhost:3000
# Navigate through app
npm run analyze-vitals
```
**Why:** Dev server adds 2000ms+ overhead. This shows real performance.

---

## ⚡ Phase 1: Quick Wins (30 min total)

### 1. Static Generation (5 min)
**File:** `src/app/car/[slug]/page.tsx`

Add these lines at the bottom:
```typescript
export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
```

### 2. Lazy Load FloatingWhatsApp (5 min)
**File:** `src/app/layout.tsx`

Replace:
```typescript
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
```

With:
```typescript
import dynamic from 'next/dynamic';
const FloatingWhatsApp = dynamic(
  () => import('@/components/ui/FloatingWhatsApp'),
  { ssr: false }
);
```

### 3. Lazy Load Footer (5 min)
**File:** `src/app/layout.tsx`

Replace:
```typescript
import Footer from '@/components/home/footer';
```

With:
```typescript
const Footer = dynamic(() => import('@/components/home/footer'));
```

### 4. Priority Hero Image (5 min)
**File:** `src/components/home/Hero2.tsx`

Find the Image component and add:
```typescript
<Image
  src={currentImage}
  alt="Hero"
  priority={true}  // ← ADD THIS LINE
  fill
  // ... rest of props
/>
```

### 5. Resource Hints (10 min)
**File:** `src/app/layout.tsx`

Add inside the `<html>` tag:
```typescript
<html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  </head>
  <body>...</body>
</html>
```

---

## 🎯 Phase 2: Optimizations (2 hours)

### 1. Bundle Optimization (15 min)
**File:** `next.config.ts`

Replace entire file:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      '@radix-ui/react-select',
      '@radix-ui/react-dialog',
      'lucide-react'
    ],
  },
};

export default nextConfig;
```

### 2. Optimize API File Writing (10 min)
**File:** `src/app/api/vitals/route.ts`

Replace `appendFileSync` with:
```typescript
import { appendFile } from 'fs/promises';

// In POST function:
await appendFile(logPath, JSON.stringify(logEntry) + '\n');
```

### 3. Add Static Generation to Home (5 min)
**File:** `src/app/page.tsx`

Add at bottom:
```typescript
export const dynamic = 'force-static';
export const revalidate = 3600;
```

---

## 📊 Expected Results

| Phase | TTFB | FCP | Status |
|-------|------|-----|--------|
| Current (Dev) | 6328ms | 8172ms | ❌ |
| Production Build | ~2500ms | ~4000ms | 🟡 |
| + Phase 1 | ~1000ms | ~2500ms | 🟡 |
| + Phase 2 | <800ms | <1800ms | ✅ |

---

## ✅ Testing Checklist

After each change:
```bash
npm run build
npm start
# Navigate app
npm run analyze-vitals
```

Look for:
- [ ] TTFB decreasing
- [ ] FCP decreasing
- [ ] No new errors in console
- [ ] Pages still work correctly

---

## 🆘 If Something Breaks

1. **Build fails?**
   - Check syntax in files you edited
   - Look for missing imports

2. **Page doesn't load?**
   - Check browser console for errors
   - Verify dynamic imports have correct paths

3. **Images missing?**
   - Make sure Image component has proper src
   - Check priority only on above-fold images

4. **Want to undo a change?**
   ```bash
   git checkout -- <filename>
   ```

---

## 💡 Pro Tips

1. **Do one fix at a time** - easier to debug
2. **Test after each change** - catch issues early
3. **Keep dev server running** - faster iteration
4. **Use browser DevTools** - see network waterfall
5. **Check bundle size** - run `npm run build` to see stats

---

## 🎯 Success Metrics

You'll know it's working when:
- ✅ Build shows smaller bundle sizes
- ✅ Pages load faster visually
- ✅ analyze-vitals shows improvement
- ✅ No console errors
- ✅ All features still work

---

## 📚 Reference Docs

- **Full details:** `CRITICAL_PERFORMANCE_FIXES.md`
- **Error analysis:** `DEV_SERVER_ERROR_ANALYSIS.md`
- **Overview:** `PERFORMANCE_ANALYSIS_SUMMARY.md`

---

## 🚀 Start Here

```bash
# 1. Test current production performance
npm run build && npm start

# 2. Check vitals (after navigating)
npm run analyze-vitals

# 3. Apply Phase 1 fixes (above)

# 4. Test again
npm run build && npm start

# 5. Check improvement
npm run analyze-vitals
```

**Goal:** Get TTFB < 800ms and FCP < 1800ms ✅
