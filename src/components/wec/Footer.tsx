import React from 'react';
import { COLORS } from './constants';
import AccentButton from './AccentButton';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => (
  <footer className="py-12 text-center text-sm" style={{ backgroundColor: COLORS.light, color: COLORS.dark }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p>&copy; {new Date().getFullYear()} We Export Cars Africa. All rights reserved.</p>
      <p className="mt-2 text-xs opacity-70">Designed with Apple Human Design principles and Adobe Spectrum aesthetics.</p>
      <p className="mt-4">
        <a href="#" className="underline hover:text-red-600">Privacy Policy</a> | 
        <a href="#" className="underline hover:text-red-600 ml-4">Terms of Service</a>
      </p>
    </div>
  </footer>
);

export default Footer;
