import React from 'react';
import VehicleCard from './VehicleCard';
import { vehicleData } from '@/lib/vehicleData';

const VehicleGrid = () => {
  const [visibleVehicles, setVisibleVehicles] = React.useState<number[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleVehicles((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.vehicle-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicleData.map((vehicle, index) => (
        <div key={index} className="vehicle-card" data-index={index}>
          <VehicleCard vehicle={vehicle} index={index} visible={visibleVehicles.includes(index)} />
        </div>
      ))}
    </div>
  );
};

export default VehicleGrid;
