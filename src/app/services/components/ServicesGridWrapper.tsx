'use client';

import dynamic from 'next/dynamic';

// Import ServicesGridClient with no SSR
const ServicesGridClient = dynamic(
  () => import('./ServicesGridClient'),
  {
    ssr: false,
    loading: () => (
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg animate-pulse h-96"
              />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

export default function ServicesGridWrapper() {
  return <ServicesGridClient />;
}