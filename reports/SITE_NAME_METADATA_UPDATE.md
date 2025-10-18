# Site Name Metadata Update - "We Export Cars"

## Date: October 17, 2025

---

## 🎯 Objective

Ensure "We Export Cars" (the primary brand name) is prominently featured in all metadata, titles, and descriptions across the site.

---

## ✅ Updates Made

### 1. Root Layout Metadata (`src/app/layout.tsx`)

**Title Template**:
- ❌ Before: `"%s | We Export Cars Africa"`
- ✅ After: `"%s | We Export Cars"`

**Default Title**:
- ❌ Before: `"We Export Cars Africa | Premium Vehicle Export Services"`
- ✅ After: `"We Export Cars | Premium Vehicle Export Services from Africa"`

**Site Name in Open Graph**:
- ❌ Before: `siteName: "We Export Cars Africa"`
- ✅ After: `siteName: "We Export Cars"`

**Description** (starts with brand name):
- ✅ Now: `"We Export Cars - Expert international vehicle export services..."`

**Added Fields**:
- ✅ `applicationName: "We Export Cars"`
- ✅ `creator: "We Export Cars"`
- ✅ `publisher: "We Export Cars"`
- ✅ `authors: [{ name: "We Export Cars" }]`

**Keywords** (brand name first):
- ✅ Now: `["we export cars", "vehicle export", "car export Africa", ...]`

**Twitter Metadata**:
- ✅ Added: `creator: "@weexportcars"`
- ✅ Added: `site: "@weexportcars"`

---

### 2. About Page (`src/app/about/page.tsx`)

**Open Graph Title**:
- ❌ Before: `"About Us | We Export Cars Africa"`
- ✅ After: `"About Us | We Export Cars"`

**Description**:
- ✅ Now mentions: `"We Export Cars - your trusted partner..."`

---

### 3. Services Page (`src/app/services/page.tsx`)

**Open Graph Title**:
- ❌ Before: `"Our Services | We Export Cars Africa"`
- ✅ After: `"Our Services | We Export Cars"`

**Description**:
- ✅ Now: `"We Export Cars offers comprehensive vehicle export services..."`

---

### 4. Showroom Page (`src/app/showroom/page.tsx`)

**Document Title**:
- ❌ Before: `"Showroom | We Export Cars Africa"`
- ✅ After: `"Showroom | We Export Cars"`

**Meta Description**:
- ✅ Now: `"Browse our premium vehicle showroom at We Export Cars..."`

---

### 5. Car Detail Pages (`src/app/car/[slug]/page.tsx`)

**Open Graph**:
- ❌ Before: `title: "${vehicleName} | We Export Cars Africa"`
- ✅ After: `title: "${vehicleName} | We Export Cars"`
- ✅ Added: `siteName: "We Export Cars"`

**Twitter Cards**:
- ❌ Before: `title: "${vehicleName} | We Export Cars Africa"`
- ✅ After: `title: "${vehicleName} | We Export Cars"`

**Keywords**:
- ✅ Now includes: `"we export cars"` as first keyword

---

### 6. PWA Manifest (`public/site.webmanifest`)

**App Name**:
- ❌ Before: `"name": "We Export Cars Africa"`
- ✅ After: `"name": "We Export Cars"`

**Short Name** (unchanged):
- ✅ Already: `"We Export Cars"`

---

## 📊 Complete Metadata Structure

### Primary Brand Name Placement

**All Page Titles Now Follow**:
```
[Page Name] | We Export Cars
```

**Examples**:
- Home: `"We Export Cars | Premium Vehicle Export Services from Africa"`
- About: `"About Us | We Export Cars"`
- Services: `"Our Services | We Export Cars"`
- Showroom: `"Showroom | We Export Cars"`
- Car Detail: `"2020 Bentley Bentayga | We Export Cars"`

---

### Site Name Consistency

**Where "We Export Cars" Now Appears**:

1. ✅ **Browser Tab Title** - All pages
2. ✅ **Open Graph Site Name** - Social sharing
3. ✅ **Application Name** - PWA metadata
4. ✅ **Creator/Publisher** - SEO metadata
5. ✅ **Authors** - Content attribution
6. ✅ **Keywords** - First keyword in array
7. ✅ **Description** - Starts with brand name
8. ✅ **Twitter Creator** - @weexportcars
9. ✅ **Manifest Name** - PWA configuration

---

## 🔍 SEO Impact

### Search Engine Results

**Google Search Result Example**:
```
We Export Cars | Premium Vehicle Export Services from Africa
https://www.weexportcars.africa
We Export Cars - Expert international vehicle export services 
from Africa. We handle consultation, documentation, logistics...
```

**Key Improvements**:
- ✅ Brand name appears first in title
- ✅ Consistent across all pages
- ✅ "We Export Cars" in description opening
- ✅ Keywords list starts with brand name

---

### Social Media Sharing

**Facebook/LinkedIn Share Preview**:
```
┌─────────────────────────────────────┐
│  [OG Image: We Export Cars Logo]    │
├─────────────────────────────────────┤
│ We Export Cars | Premium Vehicle    │
│ Export Services from Africa         │
├─────────────────────────────────────┤
│ We Export Cars - Expert             │
│ international vehicle export...     │
├─────────────────────────────────────┤
│ 🌐 weexportcars.africa              │
└─────────────────────────────────────┘
```

**Twitter/X Card**:
```
┌─────────────────────────────────────┐
│  [Image: We Export Cars Logo]       │
├─────────────────────────────────────┤
│ We Export Cars | Premium Vehicle... │
│ We Export Cars - Expert...          │
│ From @weexportcars                  │
└─────────────────────────────────────┘
```

---

## 📱 Mobile & PWA

### Add to Home Screen

**Icon Label**: "We Export Cars"

**App Name in Launcher**: "We Export Cars"

**Splash Screen Text**: "We Export Cars"

---

## ✅ Verification

### Build Status
```
✓ Compiled successfully in 6.1s
✓ All 14 pages generated
✓ 0 errors, 0 warnings
```

### Metadata Consistency Check

| Page | Title Format | Includes "We Export Cars" |
|------|--------------|---------------------------|
| Home | ✅ Full title | ✅ Yes (primary) |
| About | ✅ Template | ✅ Yes |
| Services | ✅ Template | ✅ Yes |
| Showroom | ✅ Template | ✅ Yes |
| Car Details | ✅ Template | ✅ Yes |

---

## 🎯 Brand Hierarchy

### Primary Brand Name: "We Export Cars"
- Used in all titles
- Used in all metadata
- Used in PWA configuration
- Used in social media tags

### Secondary Geographic Identifier: "from Africa"
- Added to descriptions where context needed
- Not used in siteName (cleaner)
- Appears in page descriptions

### URL/Domain: "weexportcars.africa"
- Domain includes geographic context
- Complements brand name
- No change needed to URL structure

---

## 📋 Summary of Changes

### Files Modified

1. ✅ `src/app/layout.tsx` - Root metadata
2. ✅ `src/app/about/page.tsx` - About page metadata
3. ✅ `src/app/services/page.tsx` - Services page metadata
4. ✅ `src/app/showroom/page.tsx` - Showroom page metadata
5. ✅ `src/app/car/[slug]/page.tsx` - Dynamic car pages metadata
6. ✅ `public/site.webmanifest` - PWA manifest

### Key Changes Summary

**Title Template**:
- Changed from `"... | We Export Cars Africa"`
- Changed to `"... | We Export Cars"`

**Site Name**:
- Changed from `"We Export Cars Africa"`
- Changed to `"We Export Cars"`

**Brand Prominence**:
- "We Export Cars" now first in keywords
- "We Export Cars" in description openings
- Consistent across all platforms

---

## 🎉 Result

✅ **"We Export Cars" is now the primary site name** across all metadata, titles, and configurations!

**Where Users See It**:
- 🌐 Browser tabs
- 📱 Mobile home screen
- 📊 Search engine results
- 📱 Social media shares
- 💬 Twitter cards
- 🔖 Bookmarks
- 📲 PWA installation

**Consistent Brand Identity**: "We Export Cars" everywhere! 🎊
