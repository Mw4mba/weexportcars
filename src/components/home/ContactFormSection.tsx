"use client"

import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { vehicleData } from '@/lib/vehicleData';
import { countries } from '@/lib/countries';
import { useContactForm } from '@/contexts/ContactFormContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';

const BG_LIGHT_COLOR = '#e6e6e6';
const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';

const ContactFormSection: React.FC = () => {
  const { formData, isFormOpen, setIsFormOpen, setFormData } = useContactForm();
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleSlug = urlParams.get('vehicleSlug');
    const vehicleName = urlParams.get('vehicleName');
    
    if (vehicleSlug && vehicleName) {
      // Auto-fill from URL parameters
      const autoFillData = {
        vehicleSlug,
        vehicleName,
        message: `I am interested in the ${vehicleName}. Please provide more information about this vehicle.`,
      };
      
      setFormData(autoFillData);
      setIsFormOpen(true);
      
      // Clean up URL after a short delay to ensure data is read
      setTimeout(() => {
        window.history.replaceState({}, '', '/#contact');
      }, 100);
    }
  }, [setFormData, setIsFormOpen]);

  // Auto-fill form when vehicle data is provided
  useEffect(() => {
    if (formData.vehicleSlug) {
      setSelectedVehicle(formData.vehicleSlug);
      setMessage(formData.message || '');
      
      if (isFormOpen) {
        // Add a highlight effect to the form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          // Smooth scroll to ensure visibility
          setTimeout(() => {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
          
          contactSection.classList.add('ring-4', 'ring-[#d10e22]/50', 'ring-offset-4');
          setTimeout(() => {
            contactSection.classList.remove('ring-4', 'ring-[#d10e22]/50', 'ring-offset-4');
            setIsFormOpen(false);
          }, 2000);
        }
      }
    }
  }, [formData, isFormOpen, setIsFormOpen]);

  // Get stock vehicles for dropdown
  const stockVehicles = vehicleData.map((vehicle) => ({
    value: vehicle.slug,
    label: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  }));

  return (
    <section 
      id="contact" 
      className="py-28 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/IMG-20251013-WA0011.jpg)',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-white mb-16 text-center tracking-tighter drop-shadow-lg">
          Get Started Today
        </h2>
        <div className="flex justify-center lg:justify-end lg:pr-8 xl:pr-12">
          <div className="w-full lg:w-[45%] xl:w-[42%] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-4 border-[#2a3443]/10">
            {/* Contact Form */}
            <div className="p-8 sm:p-12">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#2a3443] mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 text-[#2a3443] placeholder-[#2a3443]/70 font-medium" 
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#2a3443] mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 text-[#2a3443] placeholder-[#2a3443]/70 font-medium" 
                    required 
                  />
                </div>

                <div>
                  <label htmlFor="vehicle" className="block text-sm font-semibold text-[#2a3443] mb-1">
                    Select Vehicle
                  </label>
                  <Select 
                    key={selectedVehicle || 'empty'} 
                    value={selectedVehicle} 
                    onValueChange={(value) => {
                      setSelectedVehicle(value);
                      if (value !== 'other') {
                        setCustomModel('');
                      }
                    }}
                  >
                    <SelectTrigger className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 text-[#2a3443] font-medium bg-white">
                      <SelectValue placeholder="Select from our stock..." />
                    </SelectTrigger>
                    <SelectContent>
                      {stockVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.value} value={vehicle.value}>
                          {vehicle.label}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other (Please specify)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedVehicle === 'other' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label htmlFor="customModel" className="block text-sm font-semibold text-[#2a3443] mb-1">
                      Specify Vehicle Model
                    </label>
                    <input 
                      type="text" 
                      id="customModel" 
                      name="customModel" 
                      placeholder="e.g., 2023 Tesla Model S" 
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 text-[#2a3443] placeholder-[#2a3443]/70 font-medium" 
                      required 
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-[#2a3443] mb-1">
                    Destination Country
                  </label>
                  <Combobox
                    options={countries}
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                    placeholder="Select country..."
                    searchPlaceholder="Search countries..."
                    emptyText="No country found."
                    className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 text-[#2a3443] font-medium bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#2a3443] mb-1">
                    Additional Details
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    placeholder="Any additional requirements or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 resize-none text-[#2a3443] placeholder-[#2a3443]/70 font-medium"
                  ></textarea>
                </div>

                {/* Submit Button (Red CTA) */}
                <button 
                  type="submit"
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-lg hover:bg-[#b00c1b] transition-all duration-300 focus:ring-4 focus:ring-[#d10e22]/60 transform hover:scale-[1.02]"
                >
                  Submit Request
                </button>
              </form>

              {/* WhatsApp Button */}
              <div className="mt-6 text-center">
                <p className="text-[#2a3443] mb-3 font-medium">...or connect instantly via WhatsApp:</p>
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-xl shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-[1.01]"
                >
                  <MessageSquare className="w-6 h-6 mr-2" /> Talk to an Expert
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
