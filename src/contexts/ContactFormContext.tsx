'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Vehicle } from '@/lib/vehicleData';

interface ContactFormData {
  vehicleSlug?: string;
  vehicleName?: string;
  message?: string;
}

interface ContactFormContextType {
  formData: ContactFormData;
  setFormData: (data: ContactFormData) => void;
  openContactForm: (vehicle?: Vehicle) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<ContactFormData>({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openContactForm = (vehicle?: Vehicle) => {
    if (vehicle) {
      const vehicleData = {
        vehicleSlug: vehicle.slug,
        vehicleName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        message: `I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Please provide more information about this vehicle.`,
      };
      
      setFormData(vehicleData);
      
      // Check if we're on the homepage
      const isHomePage = window.location.pathname === '/';
      
      if (isHomePage) {
        // Already on homepage, just scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setIsFormOpen(true);
        }
      } else {
        // Navigate to homepage with vehicle data in URL params
        setIsFormOpen(true);
        const params = new URLSearchParams({
          vehicleSlug: vehicle.slug,
          vehicleName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        });
        window.location.href = `/?${params.toString()}#contact`;
      }
    }
  };

  return (
    <ContactFormContext.Provider value={{ formData, setFormData, openContactForm, isFormOpen, setIsFormOpen }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
};
