import React, { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
}
const AnimatedSection = ({ children, className }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
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

                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    {/* Sticky Stepper */}
                    <div className="md:w-1/3 md:sticky md:top-32 self-start">
                        <div className="flex md:flex-col gap-4">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-center gap-4 transition-opacity duration-300"
                                     style={{ opacity: activeStep === index ? 1 : 0.4 }}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-colors duration-300 ${activeStep === index ? 'bg-[#d10e22]' : 'bg-white/20'}`}>
                                        {index + 1}
                                    </div>
                                    <h3 className="text-lg font-semibold hidden md:block">{step.title.split('. ')[1]}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Steps Content */}
                    <div className="md:w-2/3">
                        <div className="space-y-24">
                            {steps.map((step, index) => (
                                <div ref={stepRefs[index]} key={index}>
                                    <h3 className="text-3xl font-bold text-[#d10e22] mb-4">{step.title}</h3>
                                    <p className="text-white/80 leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};