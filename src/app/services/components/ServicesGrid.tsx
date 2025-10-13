import React from 'react';
import dynamic from 'next/dynamic';
import { services } from '../data/services';
import { COLORS } from '@/components/wec/constants';

// Server Component version - simple static render
function ServicesGridServer() {
  return (
    <section className="py-20" style={{ backgroundColor: COLORS.light }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-lg"
            >
              <div className="p-8 space-y-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center" 
                  style={{ backgroundColor: `${COLORS.accent}10` }}
                >
                  {/* Icon placeholder */}
                  <div className="h-8 w-8" style={{ backgroundColor: COLORS.accent }} />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: COLORS.dark }}>{service.title}</h3>
                <p className="leading-relaxed" style={{ color: COLORS.dark }}>{service.description}</p>
                <p className="text-sm leading-relaxed pt-2 border-t" style={{ color: `${COLORS.dark}99` }}>
                  {service.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dynamic import of client component with animation
const ServicesGridClient = dynamic(
  () => import('./ServicesGridClient'),
  {
    loading: () => <ServicesGridServer />
  }
);

// By default, use server component for initial render
export default ServicesGridClient;