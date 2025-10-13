'use client';

import React from 'react';
import { COLORS } from '@/components/wec/constants';
import * as Icons from 'lucide-react';
import { services } from '../data/services';

type Service = typeof services[number];

// Create a client-only intersection observer hook
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Set visible immediately if IntersectionObserver is not available
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Start observing
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const ServiceCard: React.FC<{
  service: Service;
  index: number;
}> = React.memo(({ service, index }) => {
  const { ref, isVisible } = useIntersectionObserver();
  let IconComponent;

  switch (service.icon) {
    case 'Package':
      IconComponent = Icons.Package;
      break;
    case 'Truck':
      IconComponent = Icons.Truck;
      break;
    case 'Shield':
      IconComponent = Icons.Shield;
      break;
    case 'CreditCard':
      IconComponent = Icons.CreditCard;
      break;
    case 'FileCheck':
      IconComponent = Icons.FileCheck;
      break;
    case 'Users':
      IconComponent = Icons.Users;
      break;
    default:
      IconComponent = Icons.Package; // Default icon
  }

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="p-8 space-y-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
          style={{ backgroundColor: `${COLORS.accent}10` }}
        >
          <IconComponent className="h-8 w-8" style={{ color: COLORS.accent }} />
        </div>
        <h3 className="text-2xl font-semibold" style={{ color: COLORS.dark }}>
          {service.title}
        </h3>
        <p className="leading-relaxed" style={{ color: COLORS.dark }}>
          {service.description}
        </p>
        <p
          className="text-sm leading-relaxed pt-2 border-t"
          style={{ color: `${COLORS.dark}99` }}
        >
          {service.details}
        </p>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const ServicesGridClient: React.FC = () => {
  // Initialize as not visible on the server side
  React.useEffect(() => {
    // This runs only on the client side
  }, []);

  return (
    <section className="py-20" style={{ backgroundColor: COLORS.light }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridClient;