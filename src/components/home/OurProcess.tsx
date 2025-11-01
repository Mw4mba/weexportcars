import React, { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
}

const AnimatedSection = ({ children, className }: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom-=100',
          once: true
        }
      }
    );
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};

export default function OurProcess ()  {
    const [activeStep, setActiveStep] = useState(0);
    const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

    const steps = [
        {
            title: "1. Vehicle Sourcing & Inspection",
            description: "It all begins with your request. Whether you have a specific vehicle in mind or need guidance, our procurement specialists tap into our extensive network to find your perfect match. Every potential vehicle undergoes a rigorous, independent multi-point inspection to ensure it meets our exacting standards for quality and condition. You receive a detailed report, complete with photos and history, for full transparency."
        },
        {
            title: "2. Secure Payment & Documentation",
            description: "Once you approve the vehicle, we handle the financial and legal framework. We facilitate secure payment through trusted channels and manage all necessary documentation, including de-registration, police clearance, and export permits. Our team ensures every piece of paperwork is meticulously prepared and compliant with both South African and destination country regulations, eliminating potential delays."
        },
        {
            title: "3. Shipping & Final Delivery",
            description: "The final step is getting your vehicle to you safely. We coordinate professional transportation to the port, secure container or Roll-on/Roll-off (RoRo) shipping, and handle all customs formalities. With comprehensive insurance coverage and real-time tracking, you can have peace of mind as your vehicle makes its journey. We keep you informed until it's ready for collection at your designated port."
        }
    ];
    

    const handleScroll = useCallback(() => {
        const offset = window.innerHeight * 0.4;
        for (let i = stepRefs.length - 1; i >= 0; i--) {
            const step = stepRefs[i].current;
            if (step && step.getBoundingClientRect().top < offset) {
                setActiveStep(i);
                break;
            }
        }
    }, [stepRefs]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <AnimatedSection className="py-20 md:py-32 bg-[#2a3443] text-white">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold">Our Streamlined Export Process</h2>
                    <p className="text-lg text-white/70 mt-4">
                        We've refined car exporting into a three-step journey, designed for your convenience and peace of mind. Follow along as we turn your automotive aspirations into reality.
                    </p>
                </div>

                {/* Cards Layout */}
                <div className="max-w-5xl mx-auto space-y-6">
                    {steps.map((step, index) => (
                        <div 
                            ref={stepRefs[index]} 
                            key={index}
                            className={`rounded-2xl p-8 transition-all duration-500 ${
                                activeStep === index 
                                    ? 'bg-white/10 text-white' 
                                    : 'bg-white/5 text-white'
                            }`}
                        >
                            <div className="flex items-start gap-6">
                                {/* Expandable Red Dot */}
                                <div className="flex-shrink-0 pt-2">
                                    <div 
                                        className={`rounded-full bg-[#d10e22] transition-all duration-500 ${
                                            activeStep === index 
                                                ? 'w-6 h-6 scale-110' 
                                                : 'w-3 h-3'
                                        }`}
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className={`font-bold mb-4 transition-all duration-500 ${
                                        activeStep === index 
                                            ? 'text-3xl md:text-4xl text-[#d10e22]' 
                                            : 'text-2xl md:text-3xl text-white'
                                    }`}>
                                        {step.title}
                                    </h3>
                                    <p className={`leading-relaxed text-base md:text-lg ${
                                        activeStep === index ? 'text-white/90' : 'text-white/70'
                                    }`}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};