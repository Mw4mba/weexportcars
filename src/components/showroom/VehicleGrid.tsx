import React from 'react';
import VehicleCard from './VehicleCard';
import VehicleFilters from './VehicleFilters';
import { vehicleData } from '@/lib/vehicleData';

const VehicleGrid: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  // Filter vehicles based on selected filter
  const filteredVehicles = React.useMemo(() => {
    const filtered = vehicleData.filter(vehicle => {
      const result = (() => {
        switch (selectedFilter) {
          case 'all':
            return true;
          case 'classic':
            return vehicle.tags.includes('Classic');
          case 'new':
            return vehicle.condition === 'New';
          case 'used':
            return vehicle.condition === 'Used';
          case 'low-mileage':
            const mileage = parseInt(vehicle.mileage.replace(/[^0-9]/g, ''));
            return mileage < 50000;
          default:
            return true;
        }
      })();
      return result;
    });
    return filtered;
  }, [selectedFilter]);

  return (
    <>
      <VehicleFilters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle, index) => (
          <div key={vehicle.slug} className="vehicle-card">
            <VehicleCard vehicle={vehicle} index={index} visible={true} />
          </div>
        ))}
      </div>
      {filteredVehicles.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No vehicles found for the selected filter.</p>
        </div>
      )}
    </>
  );
};

export default VehicleGrid;
