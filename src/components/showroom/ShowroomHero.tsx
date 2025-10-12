import React, { useEffect, useRef, useState } from 'react';

const ShowroomHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
  <div className="w-full h-80 md:h-[36rem] rounded-3xl overflow-hidden shadow-lg relative">
          <img src="/car1.png" alt="Featured car" className="w-full h-full object-cover" />

          <div className={`absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} ref={ref}>
            <div className="p-6 md:p-10 max-w-3xl text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold italic">Showroom</h1>
              <p className="mt-3 text-lg md:text-xl text-[#d10e22] font-bold">Export Ready Cars - Luxury vehicles ready for export</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomHero;
