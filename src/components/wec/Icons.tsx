import React from 'react';
import { COLORS } from './constants';

export const IconMoney = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6m6 0a9 9 0 110-18 9 9 0 010 18z"/>
    </svg>
);

export const IconBank = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12H3m18 0l-3-3m3 3l-3 3M3 12l3-3m-3 3l3 3m13-3c0 2.21-3.582 4-8 4s-8-1.79-8-4 3.582-4 8-4 8 1.79 8 4zM2 12c0 1.25.5 2.45 1.5 3.33m19-3.33c0 1.25-.5 2.45-1.5 3.33M4 16h16M4 20h16"/>
    </svg>
);

export const IconShield = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const IconLock = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6-8a5 5 0 0110 0v1h2a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2v-1z" />
    </svg>
);

export const IconClock = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const IconGlobe = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10a8 8 0 10-16 0c0 6 8 10 8 10zM12 2a10 10 0 00-10 10 10 10 0 1020 0A10 10 0 0012 2zM2.05 12h19.9M12 2.05v19.9"/>
    </svg>
);

export const IconWrench = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.54 22h1.42A2.08 2.08 0 0015 19.92V4.08A2.08 2.08 0 0012.96 2h-1.42A2.08 2.08 0 009.5 4.08v15.84A2.08 2.08 0 0011.54 22zM12 10V4m0 8v6M9.5 7h5M9.5 17h5M6 12h3M15 12h3M11 2h2"/>
    </svg>
);

export const IconDocument = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-6-8h6m-3 12a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3h-4"/>
    </svg>
);

export const IconShip = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 19.5L14.5 5.25m5.75 0l-.82 1.429M6.5 19.5h11a2 2 0 002-2v-4a2 2 0 00-2-2h-11a2 2 0 00-2 2v4a2 2 0 002 2zm3-4.5h2m-2 4.5h2m-6-4.5h2m-2 4.5h2M15.5 15h2M15.5 19.5h2"/>
    </svg>
);
