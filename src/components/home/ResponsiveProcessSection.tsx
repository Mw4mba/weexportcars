'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import mobile version directly for immediate render
import ProcessSectionMobile from '@/components/ProcessSectionMobile';

// Lazy load the desktop version for code splitting
const ProcessSectionDesktop = dynamic(
  () => import('@/components/ProcessSectionDesktop'),
  {
    ssr: true, // Keep SSR for SEO
    loading: () => null, // No loading state needed
  }
);

/**
 * Responsive Process Section Component
 * Displays different layouts based on screen size:
 * - Mobile/Tablet (<1024px): Single-column centered layout
 * - Desktop (≥1024px): Zigzag timeline layout with alternating left/right cards
 * 
 * Performance optimizations:
 * - CSS-based hiding (both rendered, one hidden via CSS)
 * - Desktop version lazy loaded with Next.js dynamic import
 * - No JavaScript-based screen detection needed
 * - Both components use IntersectionObserver for scroll animations
 * - Scroll-based progress tracking with animated timeline
 */
const ResponsiveProcessSection: React.FC = () => {
  return (
    <>
      {/* Mobile/Tablet Version - Visible on screens < 1024px */}
      <div className="block lg:hidden">
        <ProcessSectionMobile />
      </div>

      {/* Desktop Version - Visible on screens ≥ 1024px */}
      <div className="hidden lg:block">
        <ProcessSectionDesktop />
      </div>
    </>
  );
};

export default ResponsiveProcessSection;
