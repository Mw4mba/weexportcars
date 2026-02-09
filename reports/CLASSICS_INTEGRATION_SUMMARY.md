# Pinnacle Classics Integration — Changes Summary

## Overview
Integrated Pinnacle Classics branding and content across the site, linking to https://pinnacle-classics.vercel.app.

---

## 1. Hero Carousel (`src/components/home/Hero2.tsx`)

- **New slide added (2nd position):** Features `new-footer-image.png` as the carousel image.
- **Text content:** Top subtitle "Exporting Classic Cars" (blue #3185AA), heading "Bring You the Best of Classic Cars", and descriptive body text.
- **View Classics button:** Blue (#3185AA) button appears on hover over the image, linking externally to Pinnacle Classics.
- **pcLogo.png overlay:** Displayed in the bottom-left of the hero image on the classics slide.
- **Per-slide customization:** The `heroTextContent` array now supports `topSubtitle`, `topSubtitleColor`, `galleryButtonText`, `galleryButtonColor`, `galleryButtonHref`, and `imageLogo` per slide.

## 2. Classics Section (`src/components/home/ClassicsSection.tsx`) — NEW

- **Placement:** Above the Testimonials section on the home page.
- **Layout:** Two-column — text on the left, image on the right.
- **Title:** "Looking for" (grey) / "Classics?" (blue #3185AA).
- **Body text:** Describes the classic car collection and global distribution network.
- **View Classics button:** Blue, links to Pinnacle Classics.
- **Image:** `retro-gwagon.png` displayed with `object-contain` (no clipping, no shadow).
- **pcLogo.png:** Overlaid on the bottom-right of the G-Wagon image (180×180).
- **Alignment:** Image side pushed down with `lg:mt-24` so it aligns with the body text start.

## 3. Navigation (`src/components/home/navigation.tsx`)

- **Desktop nav:** Blue "Classics" link added between Gallery and Testimonials, linking to Pinnacle Classics (opens in new tab).
- **Mobile nav:** Same blue "Classics" link added in the mobile menu.

## 4. Footer (`src/components/home/footer.tsx`)

- **New "Our Classics" column** added (grid expanded from 3 to 4 columns).
- **pctTextLogo.PNG** displayed with original colors, linking to Pinnacle Classics.

## 5. Home Page (`src/app/page.tsx`)

- Imported and placed `ClassicsSection` between `ResponsiveProcessSection` and `TestimonialsSection`.

---

## Assets Used (from `public/cars/classics/`)
| File | Usage |
|------|-------|
| `new-footer-image.png` | Hero carousel slide image |
| `pcLogo.png` | Hero slide overlay, Classics section overlay |
| `retro-gwagon.png` | Classics section right-side image |
| `pctTextLogo.PNG` | Footer "Our Classics" column |

## External Link
All "Classics" references link to: **https://pinnacle-classics.vercel.app**
