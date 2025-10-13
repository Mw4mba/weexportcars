'use client';

import React from 'react';
import { COLORS } from '@/components/wec/constants';

const ServicesIntro: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: COLORS.dark }}>
            Comprehensive Vehicle Export Services
          </h2>
          <p className="text-lg leading-relaxed mb-4" style={{ color: COLORS.dark }}>
            With our roots in South Africa and strong international connections, we excel in exporting all types of vehicles globally. Whether you're looking for a modern car or a rare classic, our comprehensive service makes acquiring your desired vehicle simple and secure, no matter where you are.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: COLORS.dark }}>
            From everyday vehicles to cherished classics, we handle every aspect of your car's journey. Our trusted team manages inspections, documentation, shipping and delivery, ensuring your vehicle reaches you safely and smoothly anywhere in the world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntro;