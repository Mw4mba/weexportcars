'use client';
import React from 'react';
import { Label } from '@/components/ui/label';

const CustomRadio = ({ id, checked }: { id: string; checked: boolean }) => (
  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 mr-1.5 sm:mr-2
    ${checked 
      ? 'border-[#d10e22] bg-gradient-to-r from-[#d10e22] to-[#b00c1b] sm:scale-125' 
      : 'border-gray-300 bg-white'
    }`}>
    <div className={`w-full h-full rounded-full transition-all duration-300
      ${checked ? 'scale-75 bg-white' : 'scale-0'}`} />
  </div>
);

const filters = [
  { value: 'all', label: 'All Cars' },
  { value: 'classic', label: 'Classic' },
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'low-mileage', label: 'Low Mileage' },
];

interface VehicleFiltersProps {
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="w-full py-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {filters.map((filter) => (
          <div key={filter.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={filter.value}
              id={filter.value}
              checked={selectedFilter === filter.value}
              onChange={() => onFilterChange(filter.value)}
              className="hidden"
            />
            <Label
              htmlFor={filter.value}
              className={`flex items-center px-3 sm:px-6 py-2 sm:py-3 rounded-full cursor-pointer transition-all duration-300 text-base sm:text-lg
                ${selectedFilter === filter.value 
                  ? 'text-[#d10e22] border-[#d10e22] shadow-[0_0_20px_rgba(209,14,34,0.3)]'
                  : 'text-[#2a3443] border-gray-200'
                }
                hover:text-[#d10e22]
                bg-white font-medium text-lg
                border-2 hover:border-[#d10e22]
                hover:shadow-[0_0_20px_rgba(209,14,34,0.2)]`}
            >
              <CustomRadio id={filter.value} checked={selectedFilter === filter.value} />
              {filter.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleFilters;