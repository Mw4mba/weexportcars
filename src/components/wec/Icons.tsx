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

export const IconCar = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM2 12l2-5h16l2 5m-20 0h20m-20 0v5a2 2 0 002 2h16a2 2 0 002-2v-5"/>
    </svg>
);

export const IconSearch = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const IconReceipt = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
);

export const IconCheckCircle = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const IconClipboard = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);

export const IconTruck = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h2a1 1 0 001-1m0 0h1a1 1 0 001-1v-1a1 1 0 00-1-1h-1m-6 0h6" />
    </svg>
);

export const IconPackage = ({ className = 'w-6 h-6', color = COLORS.dark }: { className?: string; color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

