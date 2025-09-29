import React from 'react';
import { AnimatedTitle } from './AnimatedTitle';
import { Car, DollarSign, Clock, Shield, MapPin, CheckCircle } from 'lucide-react';


const BG_LIGHT_COLOR = '#e6e6e6';
const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';

const AboutUsSection: React.FC = () => (
  <section id="about" className="py-28 bg-[#e6e6e6]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Who We Are */}
      <div className="text-center mb-16">
        <AnimatedTitle id="who-we-are">
          Who We Are
        </AnimatedTitle>
        <p className="text-xl text-[#2a3443]/70 max-w-3xl mx-auto leading-relaxed">
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
  <h3 className="text-4xl font-bold text-[#2a3443] text-center mb-12">Our Core Offerings</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[{ title: "VAT-Free Export", icon: DollarSign, description: "Streamlined processes for qualified buyers to purchase vehicles without local sales tax, maximizing your investment." },
            { title: "Bank Financing Support", icon: Clock, description: "Assistance with documentation required for secure international bank financing, ensuring smooth transactions." },
            { title: "Comprehensive Insurance", icon: Shield, description: "All shipments are covered by robust marine and transit insurance policies, protecting your asset every step of the way." }
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-2xl shadow-xl bg-white transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border-t-4 border-[#d10e22]">
              <item.icon size={36} className="text-[#d10e22] mb-4" />
              <h4 className="text-2xl font-semibold text-[#2a3443] mb-3">{item.title}</h4>
              <p className="text-[#2a3443]/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="mt-28">
        <h3 className="text-5xl font-extrabold text-center text-[#2a3443] mb-16 tracking-tighter">
          <Car className="inline-block w-10 h-10 mr-4 text-[#d10e22] animate-pulse" />
          Why Choose Our Global Drive
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[{ title: "Speed", detail: "Fastest Transit Times", icon: Clock },
            { title: "Safety", detail: "Zero-Damage Guarantee", icon: Shield },
            { title: "Reach", detail: "100+ Destination Ports", icon: MapPin },
            { title: "Clarity", detail: "Full Transparent Pricing", icon: CheckCircle }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="p-4 mb-4 rounded-full bg-[#d10e22]/10 transition-colors duration-300 group-hover:bg-[#d10e22]/20">
                <item.icon size={32} className="text-[#d10e22] transform transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h4 className="text-xl font-bold text-[#2a3443] mb-1">{item.title}</h4>
              <p className="text-[#2a3443]/60 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutUsSection;
