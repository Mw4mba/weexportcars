'use client';
import React, { Suspense } from 'react';
import VehicleGrid from './VehicleGrid';

const VehicleGridWrapper: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d10e22]"></div>
      </div>
    }>
      <VehicleGrid />
    </Suspense>
  );
};

export default VehicleGridWrapper;
