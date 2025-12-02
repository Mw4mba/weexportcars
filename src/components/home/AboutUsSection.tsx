"use client";

import React, { memo } from 'react';
import { AnimatedTitle } from './AnimatedTitle';
import { Car, Truck, Star, Globe, Clock, Shield, MapPin, CheckCircle } from 'lucide-react';

const BG_LIGHT_COLOR = '#e6e6e6';
const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';

// Memoize service items to prevent recreation
const SERVICE_ITEMS = [
  { title: "SUVs", icon: Truck, description: "Quality SUVs available for export — inspected and ready for your market." },
  { title: "Classic / Retro Cars", icon: Star, description: "Hand-picked classic and retro vehicles for collectors and enthusiasts." },
  { title: "Export", icon: Globe, description: "Full export services from South Africa to your doorstep, including customs and shipping." }
] as const;

const WHY_CHOOSE_ITEMS = [
  { title: "Speed", detail: "Fastest Transit Times", icon: Clock },
  { title: "Safety", detail: "Zero-Damage Guarantee", icon: Shield },
  { title: "Reach", detail: "100+ Destination Ports", icon: MapPin },
  { title: "Clarity", detail: "Full Transparent Pricing", icon: CheckCircle }
] as const;

const AboutUsSection: React.FC = memo(() => (
  <section id="about" className="py-28 bg-[#2a3443]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Who We Are */}
      <div className="text-center mb-16">
        <AnimatedTitle id="who-we-are" className="text-white">
          Who We Are
        </AnimatedTitle>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            <br/>
         We Export Cars.Africa is a one-stop vehicle exporter specialising in new and quality pre-owned cars from South Africa and the UK.
          We offer a Showroom to Door solution.
          We take you through a step-by-step procedure of acquiring your dream vehicle.
          <br />
          We take the hustle out of vehicle importation process, from police/Interpol clearances to the roadworthy inspections, shipping and logistics as well as insurance and financing
        </p>
      </div>
      {/* Services/Offerings */}
      <div id="services">
  <h3 className="text-4xl font-bold text-white text-center mb-12">Our Core Offerings</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICE_ITEMS.map((item, index) => (
            <div key={item.title} className="p-8 rounded-2xl shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border-t-4 border-[#d10e22]">
              <item.icon size={36} className="text-[#d10e22] mb-4" aria-hidden="true" />
              <h4 className="text-2xl font-semibold text-[#2a3443] mb-3">{item.title}</h4>
              <p className="text-[#2a3443]/80">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <a
            href="#learn-more"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-2xl shadow-[#d10e22]/40 hover:bg-[#b00c1b] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-[#d10e22]/60"
          >
            Learn More
          </a>
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="mt-28">
        <h3 className="text-5xl font-extrabold text-center text-white mb-16 tracking-tighter">
          <Car className="inline-block w-10 h-10 mr-4 text-[#d10e22] animate-pulse" />
          Why Choose US?
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          {WHY_CHOOSE_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center p-6 bg-[#f8fafc] rounded-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="p-4 mb-4 rounded-full bg-[#d10e22]/10 transition-colors duration-300 group-hover:bg-[#d10e22]/20">
                <item.icon size={32} className="text-[#d10e22] transform transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
              </div>
              <h4 className="text-xl font-bold text-[#2a3443] mb-1">{item.title}</h4>
              <p className="text-[#2a3443]/80 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

AboutUsSection.displayName = 'AboutUsSection';

export default AboutUsSection;
