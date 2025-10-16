'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the mobile version directly (smaller, simpler)
import MobileProcessSection from '@/components/wec/ProcessSection';

// Lazy load the desktop version (more complex, heavier)
const DesktopProcessSection = dynamic(
  () => import('@/app/wec2/components/ProcessSection'),
  {
    ssr: true, // Keep SSR for SEO
    loading: () => null, // No loading state needed
  }
);

/**
 * Responsive Process Section Component
 * - Mobile/Tablet (< 1024px): Uses simplified ProcessSection from /wec
 * - Desktop (≥ 1024px): Uses enhanced ProcessSection from /wec2
 * 
 * Performance optimizations:
 * - CSS-based hiding (both rendered, one hidden via CSS)
 * - Desktop version lazy loaded with Next.js dynamic import
 * - No JavaScript-based screen detection needed
 * - Both components share same IntersectionObserver patterns
 */
const ResponsiveProcessSection: React.FC = () => {
  return (
    <>
      {/* Mobile/Tablet Version - Visible on screens < 1024px */}
      <div className="block lg:hidden">
        <MobileProcessSection />
      </div>

      {/* Desktop Version - Visible on screens ≥ 1024px */}
      <div className="hidden lg:block">
        <DesktopProcessSection />
      </div>
    </>
  );
};

export default ResponsiveProcessSection;
