# Who We Are & Core Offerings Section - Redesign Implementation

## Overview
Redesigned the "Who We Are" and "Core Offerings" sections to be side-by-side, with a new card-based layout for offerings using hero carousel images.

---

## Layout Changes

### Before:
- **Who We Are**: Centered text section
- **Core Offerings**: Three cards in a row with icons and descriptions
- **Separate sections**: Stacked vertically

### After:
- **Who We Are**: Left side (50% width on desktop)
- **Core Offerings**: Right side (50% width on desktop)
- **Side-by-side layout**: Single unified section
- **New card design**: Image-based cards with gradient overlays

---

## Core Offerings Card Design

### Card Features:
1. **Background Images**: Uses hero carousel images
   - SUVs: `/we-export_1.png`
   - Classic/Retro Cars: `/we-export_2.jpg`
   - Export Services: `/we-export_3.jpg`

2. **Dark Gradient**: Bottom gradient overlay
   - From: `black/80` → `black/30` → `transparent`
   - Hover: Intensifies to `black/90`

3. **Title Positioning**: Bottom of card with padding

4. **Hover Effects**:
   - Image: Scales to 110% (`group-hover:scale-110`)
   - Gradient: Darkens for better text contrast
   - "Learn More" text appears with arrow icon
   - Entire card: Scales to 102% with shadow

5. **Interactive Elements**:
   - Clickable links to respective sections
   - Smooth transitions (700ms for image, 300-500ms for others)

---

## Layout Grid

### Desktop Layout:
```
┌─────────────────────┬─────────────────────┐
│   Who We Are        │  Our Core Offerings │
│   (Text content)    │                     │
│                     │  ┌────────┬────────┐│
│                     │  │  SUVs  │Classic ││
│                     │  │        │ /Retro ││
│                     │  └────────┴────────┘│
│                     │  ┌─────────────────┐│
│                     │  │  Export Services││
│                     │  │   (Double Width)││
│                     │  └─────────────────┘│
└─────────────────────┴─────────────────────┘
```

### Card Dimensions:
- **SUVs card**: 1 column, height 192px (h-48)
- **Classic/Retro card**: 1 column, height 192px (h-48)
- **Export Services**: 2 columns (col-span-2), height 256px (h-64)

### Responsive Behavior:
- **Mobile (<1024px)**: Stacks vertically, Who We Are on top
- **Desktop (≥1024px)**: Side-by-side 50/50 split

---

## Code Implementation

### New Component: `WhoWeAreAndOfferings.tsx`

**Key Features:**
```tsx
// Hover state management
const [hoveredCard, setHoveredCard] = useState<string | null>(null);

// Responsive grid
<div className="grid lg:grid-cols-2 gap-16">
  {/* Who We Are - Left */}
  {/* Core Offerings - Right */}
</div>

// Offerings grid layout
<div className="grid grid-cols-2 gap-4">
  {/* SUVs and Classic cards: col-span-1 */}
  {/* Export card: col-span-2 (double width) */}
</div>
```

**Image Optimization:**
```tsx
<Image
  src={offering.image}
  alt={offering.title}
  fill
  className="object-cover transition-transform duration-700 group-hover:scale-110"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

**Gradient Overlay:**
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
```

**Hover "Learn More" Effect:**
```tsx
<div className={`flex items-center gap-2 transition-all duration-300 ${
  hoveredCard === offering.title
    ? 'opacity-100 translate-x-0'
    : 'opacity-0 -translate-x-4'
}`}>
  <span className="text-lg font-semibold">Learn More</span>
  <ArrowRight className="w-6 h-6" />
</div>
```

---

## Files Modified

### 1. **Created**: `src/components/home/WhoWeAreAndOfferings.tsx`
- Combined "Who We Are" and "Core Offerings" sections
- Implemented new card design with image backgrounds
- Added hover effects and "Learn More" interaction

### 2. **Modified**: `src/app/page.tsx`
- Replaced `AboutUsSection` import with `WhoWeAreAndOfferings`
- Updated component usage in render

### 3. **Deprecated** (Not Deleted):
- `src/components/home/AboutUsSection.tsx` - Old component (keep for reference)
- `src/components/wec/WhoWeAre.tsx` - Old component (keep for reference)

---

## Visual Design Details

### Typography:
- **Who We Are Title**: AnimatedTitle component (Bebas Neue + 1° slant)
- **Core Offerings Title**: 4xl font-bold
- **Card Titles**: 2xl font-bold tracking-wide
- **Body Text**: xl text with gray-300 color

### Colors:
- **Background**: `#2a3443` (dark blue-gray)
- **Text**: White and gray-300
- **Accent**: `#d10e22` (red - used in old design, minimal in new)
- **Gradient**: Black with varying opacity

### Spacing:
- **Section Padding**: py-28 (112px vertical)
- **Grid Gap**: gap-16 (64px between Who We Are and Offerings)
- **Card Gap**: gap-4 (16px between cards)
- **Card Padding**: p-6 (24px inside cards)

### Effects:
- **Card Hover**: Scale 102%, shadow-2xl
- **Image Hover**: Scale 110% over 700ms
- **Learn More**: Slide in from left with fade (opacity 0→100)
- **Rounded Corners**: rounded-2xl (16px)

---

## Interaction States

### Default State:
- Image at 100% scale
- Gradient from black/80 to transparent
- Title visible at bottom
- "Learn More" hidden (opacity: 0)

### Hover State:
- Image scales to 110%
- Gradient darkens to black/90
- Card scales to 102%
- "Learn More" appears with arrow
- Shadow intensifies

### Active State:
- Maintains hover effects
- Clickable link to respective section

---

## Responsive Breakpoints

### Mobile (<1024px):
```css
.grid.lg:grid-cols-2 {
  grid-template-columns: 1fr;  /* Stacks vertically */
}
```
- Who We Are appears first
- Core Offerings cards below
- Cards maintain 2-column grid (SUVs + Classic)
- Export card spans full width

### Desktop (≥1024px):
```css
.grid.lg:grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);  /* 50/50 split */
}
```
- Side-by-side layout
- Equal width columns
- Gap of 64px between columns

---

## Image Requirements

Ensure these images exist in `/public/`:
- ✅ `/we-export_1.png` - SUVs card background
- ✅ `/we-export_2.jpg` - Classic/Retro card background
- ✅ `/we-export_3.jpg` - Export Services card background

**Recommended Dimensions:**
- SUVs & Classic cards: 800x600px (4:3 ratio)
- Export card: 1600x600px (wider aspect)
- Format: WebP for best performance (Next.js auto-converts)

---

## Performance Optimizations

### Next.js Image Component:
- Automatic image optimization
- Lazy loading below the fold
- Responsive srcset generation
- WebP format conversion

### Sizes Attribute:
```tsx
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
```
- Mobile: Full viewport width
- Tablet: 50% viewport width
- Desktop: 33% viewport width (approximate for 2-col grid)

### Transitions:
- Image: 700ms for smooth zoom
- Gradient: 500ms for smooth darkening
- Learn More: 300ms for quick appearance
- Card: 500ms for hover scale/shadow

---

## Accessibility Considerations

### Semantic HTML:
- `<section>` for main container
- `<a>` for clickable cards (keyboard accessible)
- `<h3>` and `<h4>` for proper heading hierarchy

### Keyboard Navigation:
- Cards are focusable links
- Tab order follows visual flow
- Hover effects also apply on focus

### Screen Readers:
- Alt text on images
- Meaningful link text
- Proper heading structure

### Color Contrast:
- White text on dark gradient: WCAG AAA compliant
- Bold font weights improve readability

---

## Testing Checklist

### Visual Tests:
- [ ] Who We Are and Core Offerings side-by-side on desktop
- [ ] Cards stack properly on mobile
- [ ] Images load correctly
- [ ] Gradients display smoothly
- [ ] Hover effects work on all cards
- [ ] "Learn More" appears on hover

### Interaction Tests:
- [ ] Cards are clickable
- [ ] Links navigate to correct sections
- [ ] Hover state persists until mouse leaves
- [ ] Focus states visible for keyboard users

### Responsive Tests:
- [ ] Test at 320px (small mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (desktop breakpoint)
- [ ] Test at 1920px (large desktop)

### Performance Tests:
- [ ] Images optimize automatically
- [ ] No layout shift on image load
- [ ] Smooth hover transitions
- [ ] No jank or stuttering

---

## Future Enhancements

### Potential Improvements:
1. **Loading States**: Skeleton screens while images load
2. **Animations**: Stagger card entrance animations
3. **Content**: Add descriptions that appear on hover
4. **CTA**: More specific "Learn More" links (e.g., "View SUVs")
5. **Stats**: Add numbers/metrics to offerings (e.g., "500+ SUVs Available")
6. **Icons**: Overlay small icons on cards for visual distinction
7. **Video**: Replace static images with video backgrounds

### Mobile Enhancements:
1. **Touch**: Add touch-specific interactions
2. **Gestures**: Swipe to view next offering
3. **Stacking**: Alternative vertical card layout
4. **Captions**: Always-visible subtitles on mobile

---

## Comparison

### Old Design:
- Icon-based cards with white background
- Descriptions always visible
- Standard hover scale effect
- Static layout

### New Design:
- Image-based cards with photo backgrounds
- Minimal text, title-focused
- Dynamic "Learn More" reveal
- Modern, magazine-style layout
- Better visual hierarchy
- More engaging and interactive

---

## Summary

✅ **Implemented:**
- Side-by-side "Who We Are" and "Core Offerings" layout
- New image-based offering cards
- Hero carousel images as card backgrounds
- Dark gradient overlays
- Hover "Learn More" with arrow icon
- 2-column grid with double-width export card

✅ **Result:**
- Modern, visually striking design
- Better use of screen real estate
- Improved content hierarchy
- More engaging user experience
- Responsive layout for all devices

The new design transforms the section from a text-heavy, icon-based layout into a visually rich, image-driven experience that better showcases the vehicles and services! 🚗✨
