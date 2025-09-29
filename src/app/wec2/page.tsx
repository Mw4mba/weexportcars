"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import WhoWeAre from './components/WhoWeAre';
// Note: In a production Next.js environment, you would use separate files for
// components and hooks, but here we keep everything in one file as requested.

// --- 1. CONFIGURATION AND UTILITIES ---

const COLORS = {
    light: '#e6e6e6', 
  dark: '#2a3443',
  accent: '#d10e22',
};

const LOGO_URL = 'https://www.weexportcars.africa/wp-content/uploads/2024/04/logo-dark.p';
const NAV_LINKS = ['Home', 'About Us', 'Services', 'Showroom', 'Process', 'Contact'];

const CAROUSEL_SLIDES = [
  {
    image: 'https://placehold.co/800x600/2a3443/e6e6e6?text=The+Best+of+SA+Exports',
    textTitle: 'Exporting Premium Cars, Simplified.',
    textSubtitle: 'Sourcing and shipping luxury vehicles from South Africa to the world, seamlessly and securely.',
  },
  {
    image: 'https://placehold.co/800x600/d10e22/e6e6e6?text=Global+Reach+Expertise',
    textTitle: 'Global Reach, Local Expertise.',
    textSubtitle: 'Trusted logistics, comprehensive insurance, and worldwide delivery handled by professionals.',
  },
  {
    image: 'https://placehold.co/800x600/2a3443/e6e6e6?text=VAT+FREE+Shipping',
    textTitle: 'VAT Free Exporting.',
    textSubtitle: 'Maximize your investment with our VAT-free export process and competitive financing options.',
  },
];

const FEATURED_CARS = [
    { model: 'Mercedes-Benz S-Class', year: 2023, price: 'P.O.A', img: 'https://placehold.co/400x300/a3a3a3/2a3443?text=S-Class' },
    { model: 'Range Rover Velar', year: 2024, price: 'P.O.A', img: 'https://placehold.co/400x300/b3b3b3/2a3443?text=Velar' },
    { model: 'Porsche 911', year: 2022, price: 'P.O.A', img: 'https://placehold.co/400x300/c3c3c3/2a3443?text=911+GT3' },
    { model: 'BMW X7', year: 2023, price: 'P.O.A', img: 'https://placehold.co/400x300/d3d3d3/2a3443?text=BMW+X7' },
];

const PROCESS_STEPS = [
    { id: 'step-1', title: "1. Consultation & Quote", detail: "We discuss your dream car, destination, and provide a transparent, all-inclusive quote, ensuring clarity from the start. This includes all logistics, insurance, and duties assessments." },
    { id: 'step-2', title: "2. Documentation & Purchase", detail: "We meticulously handle all local paperwork, including bank financing assistance, VAT exemption applications, and secure the final purchase of your vehicle, managing complexity for you. Full ownership transfer documentation is prepared." },
    { id: 'step-3', title: "3. Logistics & Delivery", detail: "Expert, fully insured shipping, tracking, and final delivery, right to your selected port or door-to-door location worldwide. We manage customs clearance and final handover for a seamless experience." },
];

// Helper hook for scroll animations (Intersection Observer replacement)
const useScrollAnimation = (rootMargin: string = '0px'): [React.RefObject<HTMLElement>, boolean] => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const callback = useCallback((entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, { rootMargin });
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        // Cleanup function for when the component unmounts
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [callback, rootMargin]);

    return [ref, isVisible] as [React.RefObject<HTMLDivElement>, boolean];
};


// --- 2. COMPONENTS ---

// Shared Button Component
interface AccentButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}
const AccentButton = ({ children, className = '', onClick, style = {}, type = 'button', disabled = false }: AccentButtonProps) => (
    <button
        onClick={onClick}
        className={`px-8 py-3 font-semibold text-white 
                   rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                   transform hover:scale-[1.03] active:scale-[0.98] focus:ring-4 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-red-600 ${className}`}
        style={{ 
            backgroundColor: COLORS.accent, // Default accent background
            ...style // Allow style override for color/background
        }}
        type={type}
        disabled={disabled}
    >
        {children}
    </button>
);

// Animated Section Title Component
interface AnimatedTitleProps {
    id: string;
    children: React.ReactNode;
}
export const AnimatedTitle = ({ id, children }: AnimatedTitleProps) => {
    const [ref, isVisible] = useScrollAnimation('0px');
    return (
        <h2 
            id={id}
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`text-6xl md:text-8xl lg:text-[120px] font-extrabold 
                        tracking-tighter transform transition-all duration-1000 
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ 
                color: COLORS.dark, 
                lineHeight: '0.85', 
                fontFamily: 'Inter, sans-serif' 
            }}
        >
            {children}
        </h2>
    );
};

// --- SVG Icons (Sleek Look) ---

// Key Offerings Icons
const IconMoney = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6m6 0a9 9 0 110-18 9 9 0 010 18z"/>
    </svg>
);

const IconBank = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12H3m18 0l-3-3m3 3l-3 3M3 12l3-3m-3 3l3 3m13-3c0 2.21-3.582 4-8 4s-8-1.79-8-4 3.582-4 8-4 8 1.79 8 4zM2 12c0 1.25.5 2.45 1.5 3.33m19-3.33c0 1.25-.5 2.45-1.5 3.33M4 16h16M4 20h16"/>
    </svg>
);

const IconShield = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Why Choose Us Icons
const IconLock = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6-8a5 5 0 0110 0v1h2a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2v-1z" />
    </svg>
);

const IconClock = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const IconGlobe = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10a8 8 0 10-16 0c0 6 8 10 8 10zM12 2a10 10 0 00-10 10 10 10 0 1020 0A10 10 0 0012 2zM2.05 12h19.9M12 2.05v19.9"/>
    </svg>
);

// Process Steps Icons
const IconWrench = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.54 22h1.42A2.08 2.08 0 0015 19.92V4.08A2.08 2.08 0 0012.96 2h-1.42A2.08 2.08 0 009.5 4.08v15.84A2.08 2.08 0 0011.54 22zM12 10V4m0 8v6M9.5 7h5M9.5 17h5M6 12h3M15 12h3M11 2h2"/>
    </svg>
);

const IconDocument = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-6-8h6m-3 12a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10a3 3 0 013 3v7a3 3 0 01-3 3h-4"/>
    </svg>
);

const IconShip = ({ className = 'w-6 h-6', color = COLORS.dark }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 19.5L14.5 5.25m5.75 0l-.82 1.429M6.5 19.5h11a2 2 0 002-2v-4a2 2 0 00-2-2h-11a2 2 0 00-2 2v4a2 2 0 002 2zm3-4.5h2m-2 4.5h2m-6-4.5h2m-2 4.5h2M15.5 15h2M15.5 19.5h2"/>
    </svg>
);


// --- 3. MAIN APP COMPONENT ---

type ProcessStep = typeof PROCESS_STEPS[number];
type ProcessStepRefs = { [key: string]: HTMLDivElement | null };
const App = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
    const processStepRefs = useRef<ProcessStepRefs>({});

    // 3.1. Hero Carousel Logic (Synchronized)
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex(prevIndex => (prevIndex + 1) % CAROUSEL_SLIDES.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // 3.2. Stepper/Scroll Logic (Active Step Tracking)
    const handleScroll = useCallback(() => {
        if (processStepRefs.current) {
            let currentActiveStep = PROCESS_STEPS[0].id;
            // Define the trigger point: 40% from the top of the viewport
            const triggerPoint = window.innerHeight * 0.4;
            PROCESS_STEPS.forEach((step: { id: string }) => {
                const element = processStepRefs.current[step.id];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= triggerPoint) {
                        if (rect.bottom >= triggerPoint) {
                            currentActiveStep = step.id;
                        } else {
                            currentActiveStep = step.id;
                        }
                    }
                }
            });
            setActiveStep(currentActiveStep);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Initial check on load
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // 3.3. Scroll to Section Handler
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id.toLowerCase().replace(/\s/g, '-'));
        if (element) {
            const offset = 80; 
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // 3.4. Initial Load Animation
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Simple onload animation for the whole layout
        setIsLoaded(true); 
    }, []);

    // Helper function to render the correct icon for Key Offerings
    const renderKeyOfferingIcon = (offering: string, className: string, color: string) => {
        switch (offering) {
            case 'VAT Free Export': return <IconMoney className={className} color={color} />;
            case 'Bank Financing Assistance': return <IconBank className={className} color={color} />;
            case 'Comprehensive Insurance': return <IconShield className={className} color={color} />;
            default: return null;
        }
    }

    // Helper function to render the correct icon for Why Choose Us
    const renderWhyChooseIcon = (key: string, className: string, color: string) => {
        switch(key) {
            case 'Lock': return <IconLock className={className} color={color} />;
            case 'Clock': return <IconClock className={className} color={color} />;
            case 'Globe': return <IconGlobe className={className} color={color} />;
            default: return null;
        }
    }
    
    // Helper function to render the correct icon for Process Steps
    const renderProcessIcon = (index: number, className: string, color: string) => {
        switch (index) {
            case 0: return <IconWrench className={className} color={color} />;
            case 1: return <IconDocument className={className} color={color} />;
            case 2: return <IconShip className={className} color={color} />;
            default: return null;
        }
    }


    // --- 4. RENDER SECTIONS ---

    // 4.1. Navbar
    const Navbar = () => (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 shadow-lg`}
            style={{ backgroundColor: COLORS.light }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                {/* Logo */}
                <div 
                    className={`transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                >
                    <img 
                        src={LOGO_URL} 
                        alt="We Export Cars Africa Logo" 
                        className="h-8 md:h-10 cursor-pointer"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/200x40/e6e6e6/2a3443?text=WEC+Logo" }}
                    />
                </div>
                
                {/* Nav Links (Hidden on Mobile, shown on MD) */}
                <nav className="hidden md:flex space-x-8">
                    {NAV_LINKS.map(link => (
                        <button 
                            key={link}
                            onClick={() => scrollToSection(link)}
                            className={`text-base font-medium transition-colors duration-200 
                                        hover:text-red-600 focus:outline-none focus:ring-2 
                                        focus:ring-offset-2 focus:ring-red-600 rounded-md`}
                            style={{ color: COLORS.dark }}
                        >
                            {link}
                        </button>
                    ))}
                </nav>

                {/* Mobile Menu Icon (Placeholder for functionality) */}
                <button className="md:hidden p-2 rounded-lg" style={{ color: COLORS.dark }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
        </header>
    );

    // 4.2. Hero Section
    const HeroSection = () => {
        const currentSlide = CAROUSEL_SLIDES[slideIndex];
        return (
            <section 
                id="home" 
                className="pt-32 pb-20 min-h-screen flex items-center" 
                style={{ backgroundColor: COLORS.light }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Right: Image Carousel (On top for mobile) */}
                        <div className="order-1 lg:order-2 relative w-full h-[300px] md:h-[500px] shadow-2xl rounded-3xl overflow-hidden">
                            {CAROUSEL_SLIDES.map((slide, index) => (
                                <img
                                    key={index}
                                    src={slide.image}
                                    alt={slide.textTitle}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out rounded-3xl
                                        ${index === slideIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                                />
                            ))}
                        </div>

                        {/* Left: Text Carousel & Button (Under image for mobile) */}
                        <div className="order-2 lg:order-1 space-y-8">
                            {/* Text Carousel */}
                            <div className="h-40 overflow-hidden relative">
                                {CAROUSEL_SLIDES.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute w-full transition-all duration-1000 ease-in-out space-y-4 
                                            ${index === slideIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                                    >
                                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: COLORS.accent }}>
                                            {slide.textTitle}
                                        </h1>
                                        <p className="text-xl md:text-2xl font-light" style={{ color: COLORS.dark }}>
                                            {slide.textSubtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Export My Car Button */}
                            <AccentButton onClick={() => scrollToSection('contact-form')} className="mt-8">
                                Export My Car
                            </AccentButton>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // 4.3. About Us Section
    const AboutUsSection = () => (
        <section id="about-us" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: COLORS.light }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                {/* Who We Are */}
                <WhoWeAre className="space-y-12" />

                {/* Offerings Section */}
                <div className="space-y-12 p-8 md:p-16 rounded-3xl shadow-2xl" style={{ backgroundColor: 'white' }}>
                    <h3 className="text-4xl font-extrabold" style={{ color: COLORS.accent }}>Our Key Offerings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['VAT Free Export', 'Bank Financing Assistance', 'Comprehensive Insurance'].map((offering, index) => (
                            <div 
                                key={index} 
                                className="p-6 rounded-2xl transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
                                style={{ border: `1px solid ${COLORS.light}` }}
                            >
                                {/* UPDATED: Replaced Car Emoji with relevant SVG icons */}
                                <div className="text-3xl font-bold mb-4 flex items-center space-x-3" style={{ color: COLORS.dark }}>
                                    {renderKeyOfferingIcon(offering, "w-8 h-8 transition-transform duration-500 hover:rotate-6", COLORS.accent)}
                                    <span className="text-2xl font-bold" style={{ color: COLORS.dark }}>{offering}</span>
                                </div>

                                <p className="text-sm" style={{ color: COLORS.dark }}>
                                    {offering === 'VAT Free Export' && "Legally maximize your export savings by facilitating VAT exclusion on eligible vehicle purchases."}
                                    {offering === 'Bank Financing Assistance' && "We connect you with trusted partners for favorable international financing tailored to your needs."}
                                    {offering === 'Comprehensive Insurance' && "Full-coverage marine and transit insurance to protect your investment until it reaches its final destination."}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 text-center">
                        <AccentButton onClick={() => scrollToSection('process')}>
                            Learn More About Our Process
                        </AccentButton>
                    </div>
                </div>

                {/* Why Choose Us */}
                <WhyChooseUs />
            </div>
        </section>
    );

    // Why Choose Us Sub-Component with Car Theme
    const WhyChooseUs = () => {
        const [ref, isVisible] = useScrollAnimation('-150px');
        const items = [
            // UPDATED: Replaced emojis with iconKey strings
            { iconKey: 'Lock', title: 'Security First', detail: 'Every transaction is protected and transparent.' },
            { iconKey: 'Clock', title: 'Efficiency', detail: 'Our streamlined process minimizes delivery time.' },
            { iconKey: 'Globe', title: 'Global Network', detail: 'Access to exclusive inventory and routes.' },
        ];
        
        return (
            <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-12 text-center pt-16">
                <h3 className="text-5xl font-extrabold tracking-tight" style={{ color: COLORS.dark }}>
                    Why Choose Us?
                </h3>
                
                {/* Visual element simulating a car gauge/speedometer for animation */}
                <div className="flex justify-center items-center relative py-12">
                    {/* The track */}
                    <div className={`w-full max-w-4xl h-4 rounded-full bg-gray-300 relative transition-all duration-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}>
                        {/* The fill/progress (Red line) */}
                        <div 
                            className={`absolute left-0 h-full rounded-full transition-all duration-2000 ease-out`} 
                            style={{ 
                                backgroundColor: COLORS.accent, 
                                width: isVisible ? '100%' : '0%',
                                transformOrigin: 'left',
                            }}
                        ></div>
                        
                        {/* Indicator Points (The 3 reasons) */}
                        {items.map((item, index) => (
                            <div 
                                key={index}
                                className={`absolute top-1/2 -translate-y-1/2 transform transition-all duration-1000 delay-${index * 300} ease-out`}
                                style={{ 
                                    left: `${(index + 1) * 25}%`, // 25%, 50%, 75% positions
                                    opacity: isVisible ? 1 : 0,
                                    transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`,
                                    transitionDelay: `${index * 0.4}s`
                                }}
                            >
                                <div className="p-3 rounded-full shadow-lg" style={{ backgroundColor: 'white', border: `4px solid ${COLORS.dark}` }}>
                                    {/* UPDATED: Render sleek SVG icon */}
                                    {renderWhyChooseIcon(item.iconKey, "w-7 h-7", COLORS.dark)}
                                </div>
                                <div className={`mt-4 text-sm font-semibold transition-all duration-500 delay-${index * 400}`} style={{ color: COLORS.dark }}>
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-10">
                    {items.map((item, index) => (
                        <div 
                            key={index} 
                            className={`p-6 rounded-2xl text-center transform transition-all duration-1000 
                                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ 
                                backgroundColor: `rgba(255, 255, 255, 0.9)`, 
                                transitionDelay: `${index * 0.3 + 0.5}s`,
                                border: `1px solid ${COLORS.dark}20`,
                            }}
                        >
                            <h4 className="text-xl font-bold mb-2" style={{ color: COLORS.accent }}>{item.title}</h4>
                            <p className="text-sm" style={{ color: COLORS.dark }}>{item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 4.4. Showroom Section
    const ShowroomSection = () => {
        const [currentCarIndex, setCurrentCarIndex] = useState(0);
        
        // Autoplaying Carousel Logic
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentCarIndex(prevIndex => (prevIndex + 1) % FEATURED_CARS.length);
            }, 4000); 
            return () => clearInterval(interval);
        }, []);
        
        return (
            <section id="showroom" className="py-24 md:py-32" style={{ backgroundColor: COLORS.dark }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    <h2 className="text-5xl font-extrabold text-center" style={{ color: COLORS.light }}>
                        Featured Showroom
                    </h2>
                    
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentCarIndex * 100}%)` }}
                        >
                            {FEATURED_CARS.map((car, index) => (
                                <div 
                                    key={index} 
                                    className="min-w-full p-8 md:p-16 flex flex-col md:flex-row items-center gap-10"
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <div className="w-full md:w-1/2">
                                        <img 
                                            src={car.img} 
                                            alt={car.model} 
                                            className="w-full h-auto object-cover rounded-2xl shadow-xl"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-4" style={{ color: COLORS.dark }}>
                                        <p className="text-sm font-semibold text-gray-500">{car.year} Model</p>
                                        <h3 className="text-4xl font-bold" style={{ color: COLORS.accent }}>{car.model}</h3>
                                        <p className="text-xl font-light">Price: {car.price}</p>
                                        <p className="max-w-md">
                                            A hand-selected premium vehicle, expertly vetted and ready for global transport. Explore the best of South African inventory.
                                        </p>
                                        {/* FIX: Use inline style to set dark background and white text explicitly, overriding AccentButton defaults */}
                                        <AccentButton 
                                            className="mt-4 hover:bg-black"
                                            style={{ backgroundColor: COLORS.dark, color: COLORS.light }}
                                            onClick={() => {}}
                                        >
                                            View Details
                                        </AccentButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* More Button */}
                        <div className="absolute bottom-8 right-8">
                            {/* FIX: Use inline style to set white background and dark text explicitly, overriding AccentButton defaults */}
                            <AccentButton 
                                className="bg-white hover:bg-gray-100 shadow-lg border border-gray-200"
                                style={{ backgroundColor: 'white', color: COLORS.dark }}
                                onClick={() => {}}
                            >
                                More Inventory
                            </AccentButton>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // 4.5. Our Process Section (Flowchart/Timeline) - NEW IMPLEMENTATION
    const ProcessSection = () => {
        const [ref, isVisible] = useScrollAnimation('-150px');
        
        const activeIndex = PROCESS_STEPS.findIndex(step => step.id === activeStep);
        const stepsCount = PROCESS_STEPS.length;
        const lineProgress = activeIndex === -1 ? 0 : ((activeIndex + 1) / stepsCount) * 100;

        return (
            <section id="process" ref={ref} className="py-24 md:py-32" style={{ backgroundColor: COLORS.light }}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <h2 className="text-5xl font-extrabold text-center" style={{ color: COLORS.dark }}>
                        Our Seamless Export Process
                    </h2>
                    <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed" style={{ color: COLORS.dark }}>
                        We break down the complexity of international vehicle exporting into three simple, secure, and fully managed stages.
                    </p>

                    <div className="relative pt-16 pb-8">
                        {/* Vertical Flowchart Line (Base) */}
                        <div 
                            className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full" 
                            style={{ top: 0, bottom: 0, backgroundColor: COLORS.dark + '30' }}
                        ></div>

                        {/* Vertical Flowchart Line (Progress) */}
                        <div 
                            className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full transition-all duration-700 ease-out" 
                            style={{ 
                                top: 0, 
                                height: `calc(${lineProgress}% - 5px)`, // Calculated height based on active step
                                backgroundColor: COLORS.accent,
                                opacity: isVisible ? 1 : 0,
                                transformOrigin: 'top',
                                transitionDelay: '0.5s', // Delay to ensure base line is visible first
                            }}
                        ></div>

                        {/* Process Steps */}
                        <div className="space-y-24">
                            {PROCESS_STEPS.map((step, index) => {
                                const isCurrent = step.id === activeStep;
                                const isComplete = index < activeIndex;

                                return (
                                    <div 
                                        key={step.id}
                                        id={step.id}
                                        ref={el => { processStepRefs.current[step.id] = el; }}
                                        // The main container for the step
                                        className="relative flex justify-between items-start w-full min-h-[300px] sm:min-h-[200px]"
                                    >
                                        {/* Step Content Container (Expands) */}
                                        <div 
                                            className={`relative w-[45%] p-6 rounded-2xl shadow-xl transition-all duration-700 ease-in-out transform`}
                                            style={{ 
                                                backgroundColor: 'white',
                                                // Alternate left/right based on index (index 0, 2 are left; 1 is right)
                                                marginLeft: index % 2 === 0 ? '0' : '55%',
                                                // Visual size change based on state
                                                transform: isCurrent || isComplete ? 'scale(1.0) translateY(0)' : 'scale(0.95) translateY(10px)',
                                                opacity: isCurrent || isComplete ? 1 : 0.4,
                                                border: isCurrent ? `3px solid ${COLORS.accent}` : `3px solid ${COLORS.light}`
                                            }}
                                        >
                                            {/* Header */}
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div 
                                                    className="p-2 rounded-full transition-all duration-500"
                                                    style={{ backgroundColor: isCurrent || isComplete ? COLORS.accent : COLORS.light }}
                                                >
                                                    {renderProcessIcon(index, "w-6 h-6", isCurrent || isComplete ? 'white' : COLORS.dark)}
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold" style={{ color: COLORS.dark }}>
                                                    {step.title}
                                                </h3>
                                            </div>

                                            {/* Detail Content (Revealed/Condensed) */}
                                            <div 
                                                className="overflow-hidden transition-all duration-700 ease-in-out"
                                                style={{ 
                                                    maxHeight: isCurrent || isComplete ? '200px' : '0', 
                                                    paddingTop: isCurrent || isComplete ? '10px' : '0',
                                                    color: COLORS.dark
                                                }}
                                            >
                                                <p className="text-sm md:text-base leading-relaxed">
                                                    {step.detail}
                                                </p>
                                            </div>

                                            {/* Arrow Indicator (Tailwind only supports left/right) */}
                                            <div 
                                                className={`absolute w-0 h-0 border-transparent border-[10px] top-6 transition-opacity duration-500`}
                                                style={{
                                                    // Arrow is always facing the centerline
                                                    right: index % 2 === 0 ? '-20px' : 'auto', 
                                                    left: index % 2 !== 0 ? '-20px' : 'auto',
                                                    borderLeftColor: index % 2 === 0 ? 'white' : 'transparent',
                                                    borderRightColor: index % 2 !== 0 ? 'white' : 'transparent',
                                                    opacity: isCurrent || isComplete ? 1 : 0.5,
                                                }}
                                            ></div>
                                        </div>
                                        
                                        {/* Flowchart Connector Dot */}
                                        <div 
                                            className={`absolute left-1/2 top-10 transform -translate-x-1/2 w-5 h-5 rounded-full z-10 
                                                        transition-all duration-500 shadow-lg`}
                                            style={{ 
                                                backgroundColor: isCurrent || isComplete ? COLORS.accent : 'white',
                                                border: isCurrent || isComplete ? `4px solid ${COLORS.dark}` : `4px solid ${COLORS.light}`,
                                                // Active pulse effect
                                                boxShadow: isCurrent ? `0 0 0 7px ${COLORS.accent}60` : 'none',
                                            }}
                                        ></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // 4.6. Contact Form Section
    const ContactFormSection = () => {
        const [formData, setFormData] = useState<{ [key: string]: string }>({ name: '', email: '', car: '', message: '' });
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [captchaInput, setCaptchaInput] = useState('');
        const captchaValue = '7A2B'; // Simple fixed captcha for simulation

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (captchaInput.toUpperCase() !== captchaValue) {
                console.error("Captcha verification failed.");
                alert("Please enter the correct Captcha code.");
                return;
            }
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                console.log('Form Submitted:', formData);
                alert('Thank you! Your inquiry has been sent.');
                setFormData({ name: '', email: '', car: '', message: '' });
                setCaptchaInput('');
                setIsSubmitting(false);
            }, 1500);
        };
        
        const openWhatsApp = () => {
            const message = `Hello WEC Africa, I am interested in exporting my car. My name is ${formData.name}.`;
            window.open(`https://wa.me/27712345678?text=${encodeURIComponent(message)}`, '_blank');
        };

        return (
            <section id="contact-form" className="py-24 md:py-32" style={{ backgroundColor: COLORS.dark }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl font-extrabold text-center mb-16" style={{ color: COLORS.light }}>
                        Ready to Export?
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch p-8 md:p-12 rounded-3xl shadow-2xl" style={{ backgroundColor: 'white' }}>
                        
                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-3xl font-bold" style={{ color: COLORS.dark }}>Get A Quote</h3>
                            
                            {/* Form Fields */}
                            {['name', 'email', 'car'].map(field => (
                                <input
                                    key={field}
                                    type={field === 'email' ? 'email' : 'text'}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field === 'car' ? ' Model (e.g., BMW X5 2022)' : '')}
                                    required
                                    className="w-full p-3 rounded-xl border-2 focus:border-red-600 focus:ring-0"
                                    style={{ borderColor: COLORS.light, color: COLORS.dark }}
                                />
                            ))}
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message / Specific Requirements..."
                                rows={4}
                                className="w-full p-3 rounded-xl border-2 focus:border-red-600 focus:ring-0"
                                style={{ borderColor: COLORS.light, color: COLORS.dark }}
                            ></textarea>

                            {/* Captcha */}
                            <div className="flex space-x-4 items-center">
                                <div 
                                    className="px-4 py-2 font-mono text-xl tracking-widest rounded-lg select-none" 
                                    style={{ backgroundColor: COLORS.light, color: COLORS.dark }}
                                >
                                    {captchaValue}
                                </div>
                                <input
                                    type="text"
                                    value={captchaInput}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaptchaInput(e.target.value)}
                                    placeholder="Enter Code"
                                    maxLength={4}
                                    required
                                    className="flex-grow p-3 rounded-xl border-2 focus:border-red-600 focus:ring-0"
                                    style={{ borderColor: COLORS.light, color: COLORS.dark }}
                                />
                            </div>

                            <AccentButton type="submit" className="w-full" disabled={isSubmitting} onClick={() => {}}>
                                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                            </AccentButton>
                        </form>
                        
                        {/* Image and WhatsApp */}
                        <div className="flex flex-col space-y-6">
                            <img 
                                src="https://placehold.co/800x600/2a3443/e6e6e6?text=Ready+to+Ship+Vehicle" 
                                alt="Car next to Contact Form" 
                                className="w-full h-auto object-cover rounded-3xl shadow-xl flex-grow"
                            />
                            {/* FIX: Use inline style to set the required green background, overriding AccentButton default */}
                            <AccentButton onClick={openWhatsApp} className="w-full flex items-center justify-center space-x-2"
                                style={{ backgroundColor: '#25D366' }}
                            >
                                {/* Simple SVG for WhatsApp icon */}
                                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.52 3.42 1.51 4.86l-1.57 5.75 5.86-1.53c1.37.75 2.91 1.14 4.11 1.14h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm0 18.06c-1.35 0-2.73-.39-3.96-1.14l-.28-.15-2.92.76.77-2.83-.18-.29c-.64-1.03-.98-2.2-.98-3.41 0-4.52 3.69-8.21 8.21-8.21 4.52 0 8.21 3.69 8.21 8.21s-3.69 8.21-8.21 8.21zm4.84-6.85l-.26-.14c-.81-.4-1.19-.6-1.63-.83-.16-.08-.3-.15-.43-.2-.3-.11-.63-.2-.93-.2s-.88.11-1.34.56c-.53.51-.81.67-1.11.96-.34.34-.69.34-1.3.16-.94-.28-2.09-.84-3.05-1.92-.78-.85-1.32-1.93-1.68-2.98-.18-.54-.05-.84.09-.96s.33-.29.49-.44c.16-.16.34-.37.5-.54.16-.18.23-.33.34-.51.11-.18.17-.38.23-.52.06-.15.03-.28-.01-.39s-.35-.27-.7-.67c-.32-.38-.69-.9-.94-1.18-.21-.24-.46-.46-.66-.69s-.42-.37-.73-.37c-.31 0-.67.09-1.02.43-.37.37-.8.95-.8 1.83 0 .76.28 1.48.56 2.05.37.75.76 1.41 1.25 1.95 1.09 1.19 2.37 2.08 3.77 2.68 1.25.53 2.52.82 3.7.82.95 0 1.63-.26 2.21-.49.77-.32 1.54-.93 2.08-1.57.19-.24.34-.51.46-.8.12-.29.18-.59.18-.89 0-.4-.14-.7-.28-.84z"/></svg>
                                <span>WhatsApp Us Now</span>
                            </AccentButton>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    // 4.7. Footer
    const Footer: React.FC = () => {
        return (
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
    };

    // --- 5. MAIN RETURN ---

    return (
        // Root container for the application
        <div 
            className="min-h-screen font-sans antialiased overflow-x-hidden" 
            style={{ backgroundColor: COLORS.light, transition: 'background-color 0.5s' }}
        >
            {/* FIX: Changed non-standard <style jsx global> to standard <style> tag to remove React warning. */}
            <style>{`
                /* Global Styles for smooth scrolling and font */
                html {
                    scroll-behavior: smooth;
                    font-family: 'Inter', sans-serif;
                }
                
                /* Simple alert modal style */
                .alert-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 30px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                    text-align: center;
                    border: 2px solid ${COLORS.accent};
                }
            `}</style>

            <Navbar />

            <main className="pt-20">
                <HeroSection />
                <AboutUsSection />
                <ShowroomSection />
                {/* UPDATED: Using the new animated ProcessSection 
                    The minimum height on the steps in ProcessSection is important 
                    to ensure enough scroll distance between them for the animation.
                */}
                <ProcessSection />
                <ContactFormSection />
            </main>
            
            <Footer />

            {/* Custom Alert Modal Implementation (Replaces standard alert()) */}
            {/* Alert override moved to useEffect below to avoid returning void in JSX */}
        </div>
    );
};

export default App;
// Custom alert override using useEffect to avoid returning void in JSX
if (typeof window !== 'undefined') {
    window.alert = (message) => {
        const modal = document.createElement('div');
        modal.className = 'alert-modal';
        modal.innerHTML = `
            <p class="text-lg font-semibold mb-4" style="color: ${COLORS.dark};">${message}</p>
            <button id="alert-ok-button" class="px-6 py-2 rounded-lg text-white font-medium" style="background-color: ${COLORS.accent};">OK</button>
        `;
        document.body.appendChild(modal);
        const okBtn = document.getElementById('alert-ok-button');
        if (okBtn) {
            okBtn.onclick = () => {
                document.body.removeChild(modal);
            };
        }
    };
}
