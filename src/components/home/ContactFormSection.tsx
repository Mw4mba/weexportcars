import React from 'react';
import { MessageSquare } from 'lucide-react';


const BG_LIGHT_COLOR = '#e6e6e6';
const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';

const ContactFormSection: React.FC = () => (
  <section id="contact" className="py-28 bg-[#e6e6e6]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-5xl font-extrabold text-[#2a3443] mb-16 text-center tracking-tighter">
        Get Started Today
      </h2>
  <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#2a3443]/10">
        {/* Left: Contact Form */}
        <div className="p-8 sm:p-12">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#2a3443] mb-1">Full Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" 
                className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 text-[#2a3443] placeholder-[#2a3443]/70 font-medium" required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2a3443] mb-1">Email Address</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" 
                className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 text-[#2a3443] placeholder-[#2a3443]/70 font-medium" required 
              />
            </div>
            <div>
              <label htmlFor="carDetails" className="block text-sm font-semibold text-[#2a3443] mb-1">Car Details & Destination</label>
              <textarea id="carDetails" name="carDetails" rows={4} placeholder="Year, Make, Model, and target country..."
                className="w-full px-4 py-3 border border-[#2a3443]/30 rounded-lg focus:ring-2 focus:ring-[#d10e22] focus:border-[#d10e22] transition duration-150 resize-none text-[#2a3443] placeholder-[#2a3443]/70 font-medium" required
              ></textarea>
            </div>
            {/* Submit Button (Red CTA) */}
            <button type="submit"
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-[#d10e22] rounded-xl shadow-lg hover:bg-[#b00c1b] transition-all duration-300 focus:ring-4 focus:ring-[#d10e22]/60"
            >
              Submit Request
            </button>
          </form>
          {/* WhatsApp Button */}
          <div className="mt-6 text-center">
            <p className="text-[#2a3443] mb-3 font-medium">...or connect instantly via WhatsApp:</p>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-xl shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-[1.01]"
            >
              <MessageSquare className="w-6 h-6 mr-2" /> Talk to an Expert
            </a>
          </div>
        </div>
        {/* Right: Car Image */}
        {/* You can add the right image here if needed */}
      </div>
    </div>
  </section>
);

export default ContactFormSection;
