'use client';

import dynamic from 'next/dynamic';

// Lazy load FloatingWhatsApp on client side only
const FloatingWhatsApp = dynamic(
  () => import('@/components/ui/FloatingWhatsApp'),
  { 
    ssr: false,
    loading: () => null 
  }
);

export default FloatingWhatsApp;
