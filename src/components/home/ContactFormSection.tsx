"use client"

import React, { useState, useEffect } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
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

interface ContactFormSectionProps {
  backgroundImage?: string;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({ backgroundImage }) => {
  const { formData, isFormOpen, setIsFormOpen, setFormData } = useContactForm();
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Find the full country name from the country code
    const countryName = countries.find(c => c.value === selectedCountry)?.label || selectedCountry;

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      vehicle: selectedVehicle || 'Not specified',
      customModel: customModel,
      country: countryName,
      message: message,
      honeypot: formData.get('honeypot') as string, // Anti-bot field
    };

    // Basic client-side validation
    if (!data.name || !data.email || !data.country) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setSubmitMessage(result.message || 'Your inquiry has been sent successfully!');

      // Reset form after 4 seconds
      setTimeout(() => {
        form.reset();
        setSelectedVehicle('');
        setCustomModel('');
        setSelectedCountry('');
        setMessage('');
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 4000);

    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-28 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backgroundImage || '/cars/2025Prado/IMG-20251013-WA0011.jpg'})`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="max-w-7xl lg:max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-5xl font-extrabold text-white mb-16 text-center tracking-tighter drop-shadow-lg">
          Get Started Today
        </h2>
        <div className="flex justify-center lg:justify-end lg:pr-[5%] xl:pr-[8%]">
          <div className="w-full max-w-md lg:max-w-none lg:w-[32vw] xl:w-[28vw] 2xl:w-[26vw] bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Contact Form */}
            <div className="p-8 sm:p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Honeypot field - hidden from users, visible to bots */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#2a3443] mb-1">
                    Full Name <span className="text-[#d10e22]">*</span>
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
                    Email Address <span className="text-[#d10e22]">*</span>
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
                    Destination Country <span className="text-[#d10e22]">*</span>
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

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border-2 border-green-400 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <p className="text-green-800 font-bold flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Message sent successfully!
                    </p>
                    <p className="text-green-700 text-sm mt-1">{submitMessage}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border-2 border-red-400 rounded-lg animate-in fade-in slide-in-from-top-2">
                    <p className="text-red-800 font-bold flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Failed to send message
                    </p>
                    <p className="text-red-700 text-sm mt-1">{submitMessage}</p>
                  </div>
                )}

                {/* Submit Button (Red CTA) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-lg hover:bg-[#b00c1b] transition-all duration-300 focus:ring-4 focus:ring-[#d10e22]/60 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send'}
                </button>
              </form>

              {/* WhatsApp Button */}
              <div className="mt-6 text-center">
                <p className="text-[#2a3443] mb-3 font-medium">...or connect instantly via WhatsApp:</p>
                <a
                  href="https://wa.me/27100859932?text=Hello%20we%20export%20cars"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
                  title="Talk to an Expert on WhatsApp"
                  aria-label="Contact us on WhatsApp"
                >
                  <IoLogoWhatsapp className="w-7 h-7" />
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
