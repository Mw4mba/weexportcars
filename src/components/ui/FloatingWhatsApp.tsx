import React from 'react';
import { MessageSquare } from 'lucide-react';

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
        className="fixed left-4 bottom-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg transition-transform transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageSquare className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
