# Home Page Performance Diagnostics - Action Plan

## Date: October 17, 2025

---

## 🔍 Current Issues (Home Page)

| Issue | Current Value | Target | Priority |
|-------|---------------|--------|----------|
| **JavaScript Execution Time** | 4.8s | <2.5s | 🔴 Critical |
| **Main-Thread Work** | 6.0s | <3.0s | 🔴 Critical |
| **Largest Contentful Paint** | 6,570ms | <2,500ms | 🔴 Critical |
| **Legacy JavaScript** | 11 KiB | 0 KiB | 🟡 Medium |
| **Unused JavaScript** | 77 KiB | <20 KiB | 🟠 High |

---

## 📋 Action Plan

### Priority 1: Reduce Unused JavaScript (77 KiB → <20 KiB)

#### Current Status
We've already reduced unused JS from 80 KiB to 77 KiB. Need to remove 57 KiB more.

#### Actions Needed:

1. **Audit Home Page Components**
   - Check Hero2.tsx for more unused imports
   - Review Showroom.tsx for heavy dependencies
   - Analyze OurProcess.tsx for optimization

2. **Lazy Load Heavy Components**
   - ContactFormSection (likely heavy with form libraries)
   - InternationalMap (map libraries can be large)
   - Footer (if not above fold)

3. **Code Split Large Libraries**
   - Framer Motion animations
   - Radix UI components
   - Form validation libraries

---

### Priority 2: Optimize Largest Contentful Paint (6,570ms → <2,500ms)

#### Likely LCP Element
Based on home page structure, probably:
- Hero2 carousel images
- Main hero heading
- Large background images

#### Actions Needed:

1. **Optimize Hero Images**
   - Ensure `priority` prop on first image
   - Use `sizes` attribute correctly
   - Preload critical hero image
   - Consider using `fetchpriority="high"`

2. **Reduce Render-Blocking Resources**
   - Inline critical CSS for above-fold content
   - Defer non-critical JavaScript
   - Move analytics scripts to after page load

3. **Optimize Web Fonts**
   - Add font-display: swap
   - Preload critical fonts
   - Subset fonts if possible

---

### Priority 3: Reduce JavaScript Execution Time (4.8s → <2.5s)

#### Actions Needed:

1. **Defer Heavy Animations**
   - Move Framer Motion animations to user interaction
   - Use CSS animations for simple effects
   - Lazy load complex animations

2. **Optimize Component Initialization**
   - Use React.memo for expensive components
   - Implement virtualization for long lists
   - Debounce expensive operations

3. **Remove Duplicate Code**
   - Check for duplicate dependencies
   - Consolidate similar functions
   - Remove development-only code

---

### Priority 4: Minimize Main-Thread Work (6.0s → <3.0s)

#### Actions Needed:

1. **Identify Long Tasks**
   - Break up long JavaScript tasks
   - Use Web Workers for heavy computations
   - Implement progressive rendering

2. **Optimize Third-Party Scripts**
   - Load Google Analytics asynchronously
   - Defer WhatsApp widget
   - Lazy load social media embeds

3. **Reduce Layout Shifts**
   - Define image dimensions
   - Reserve space for dynamic content
   - Use CSS containment

---

### Priority 5: Avoid Legacy JavaScript (11 KiB)

#### Actions Needed:

1. **Update Browserslist**
   - Target modern browsers only
   - Remove IE11 polyfills
   - Update babel config

2. **Use Modern Syntax**
   - ES2020+ features
   - Native async/await
   - Optional chaining

---

## 🎯 Implementation Order

### Phase 1: Quick Wins (Today)
1. ✅ Lazy load ContactFormSection
2. ✅ Lazy load InternationalMap
3. ✅ Optimize Hero2 images with priority
4. ✅ Defer FloatingWhatsApp widget
5. ✅ Update browserslist configuration

### Phase 2: Component Optimization (This Session)
1. ✅ Audit and remove unused imports from all home components
2. ✅ Implement React.memo on expensive components
3. ✅ Add code splitting for heavy libraries
4. ✅ Optimize Framer Motion usage

### Phase 3: Advanced Optimization (Next)
1. Implement font optimization
2. Add resource hints (preconnect, prefetch)
3. Optimize third-party scripts
4. Implement progressive rendering

---

## 📊 Expected Improvements

| Metric | Current | After Phase 1 | After Phase 2 | Target |
|--------|---------|---------------|---------------|--------|
| **JS Execution** | 4.8s | 3.8s | 2.8s | <2.5s |
| **Main-Thread** | 6.0s | 4.5s | 3.5s | <3.0s |
| **LCP** | 6,570ms | 4,500ms | 2,800ms | <2,500ms |
| **Unused JS** | 77 KiB | 45 KiB | 18 KiB | <20 KiB |
| **Legacy JS** | 11 KiB | 0 KiB | 0 KiB | 0 KiB |

---

## 🔧 Technical Details

### Files to Modify:
1. `src/app/page.tsx` - Add lazy loading
2. `src/components/home/Hero2.tsx` - Optimize images
3. `src/components/home/ContactFormSection.tsx` - Lazy load
4. `src/components/home/InternationalMap.tsx` - Lazy load
5. `next.config.ts` - Update browserslist
6. `package.json` - Add browserslist config

---

**Status**: 📝 Action Plan Created - Ready to Implement
**Priority**: 🔴 Critical
**Estimated Time**: 2-3 hours for all phases
