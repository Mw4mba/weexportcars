import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';

type Props = {
  phone?: string; // E.164 or local number, e.g. +1234567890
  message?: string;
};

const FloatingWhatsApp: React.FC<Props> = ({ phone = '+27100859932', message = 'Hello we export cars' }) => {
  const href = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div aria-hidden="false">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed left-4 bottom-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <IoLogoWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
