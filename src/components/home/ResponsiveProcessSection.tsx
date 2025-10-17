'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the ProcessSection directly (works for both mobile and desktop)
import ProcessSection from '@/components/wec/ProcessSection';

// Lazy load the desktop version for code splitting (optional optimization)
const DesktopProcessSection = dynamic(
  () => import('@/components/wec/ProcessSection'),
  {
    ssr: true, // Keep SSR for SEO
    loading: () => null, // No loading state needed
  }
);

/**
 * Responsive Process Section Component
 * Uses the unified ProcessSection component from /wec for all screen sizes
 * 
 * Performance optimizations:
 * - CSS-based hiding (both rendered, one hidden via CSS)
 * - Desktop version lazy loaded with Next.js dynamic import
 * - No JavaScript-based screen detection needed
 * - Component uses IntersectionObserver for scroll animations
 */
const ResponsiveProcessSection: React.FC = () => {
  return (
    <>
      {/* Mobile/Tablet Version - Visible on screens < 1024px */}
      <div className="block lg:hidden">
        <ProcessSection />
      </div>

      {/* Desktop Version - Visible on screens ≥ 1024px */}
      <div className="hidden lg:block">
        <DesktopProcessSection />
      </div>
    </>
  );
};

export default ResponsiveProcessSection;
