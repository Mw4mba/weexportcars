import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'gsap',
      '@radix-ui/react-select',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-label',
      'lucide-react'
    ],
  },
  
  // Image optimization - Vercel CDN handles this automatically
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Modern JavaScript output - reduces polyfills for modern browsers
  transpilePackages: [],
  
  // Note: swcMinify is now enabled by default in Next.js 15+
};

export default withBundleAnalyzer(nextConfig);
