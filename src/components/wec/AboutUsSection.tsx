import React from 'react';
import { COLORS } from './constants';
import AnimatedTitle from './AnimatedTitle';
import AccentButton from './AccentButton';
import { IconMoney, IconBank, IconShield, IconLock, IconClock, IconGlobe } from './Icons';

const AboutUsSection: React.FC = () => {
  const offerings = [
    'VAT Free Export',
    'Bank Financing Assistance',
    'Comprehensive Insurance',
  ];
  const renderKeyOfferingIcon = (offering: string, className?: string, color?: string) => {
    switch (offering) {
      case 'VAT Free Export': return <IconMoney className={className} color={color} />;
      case 'Bank Financing Assistance': return <IconBank className={className} color={color} />;
      case 'Comprehensive Insurance': return <IconShield className={className} color={color} />;
      default: return null;
    }
  };
  const items = [
    { iconKey: 'Lock', title: 'Security First', detail: 'Every transaction is protected and transparent.' },
    { iconKey: 'Clock', title: 'Efficiency', detail: 'Our streamlined process minimizes delivery time.' },
    { iconKey: 'Globe', title: 'Global Network', detail: 'Access to exclusive inventory and routes.' },
  ];
  const renderWhyChooseIcon = (key: string, className?: string, color?: string) => {
    switch(key) {
      case 'Lock': return <IconLock className={className} color={color} />;
      case 'Clock': return <IconClock className={className} color={color} />;
      case 'Globe': return <IconGlobe className={className} color={color} />;
      default: return null;
    }
  };
  // ...existing code for useScrollAnimation and section rendering...
  // Internal scroll handler for button
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.replace(/\s+/g, '-').toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // ...rest of AboutUsSection implementation...
  return null; // Placeholder, to be replaced with the full section code.
};

export default AboutUsSection;
