'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COLORS, PROCESS_STEPS } from './wec/constants';
import { useScrollAnimation } from './wec/useScrollAnimation';
import { IconWrench, IconDocument, IconShip } from './wec/Icons';

/**
 * Mobile Process Section Component
 * Displays the export process in a single-column vertical layout for smaller screens (<1024px)
 * Features:
 * - Centered single-column layout
 * - Scroll-based animation and progress tracking
 * - Vertical timeline with progress indicator
 * - Interactive step highlighting based on scroll position
 */
const ProcessSectionMobile: React.FC = () => {
  const [activeStep, setActiveStep] = useState(PROCESS_STEPS[0].id);
  const processStepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [ref, isVisible] = useScrollAnimation('-150px');
  const activeIndex = PROCESS_STEPS.findIndex(step => step.id === activeStep);
  const stepsCount = PROCESS_STEPS.length;
  const lineProgress = activeIndex === -1 ? 0 : ((activeIndex + 1) / stepsCount) * 100;

  // Stepper/Scroll Logic - tracks which step is in view
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined' && processStepRefs.current) {
      let currentActiveStep = PROCESS_STEPS[0].id;
      const triggerPoint = window.innerHeight * 0.4;
      PROCESS_STEPS.forEach((step) => {
        const element = processStepRefs.current[step.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            currentActiveStep = step.id;
          }
        }
      });
      setActiveStep(currentActiveStep);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const renderProcessIcon = (index: number, className?: string, color?: string) => {
    switch (index) {
      case 0: return <IconWrench className={className} color={color} />;
      case 1: return <IconDocument className={className} color={color} />;
      case 2: return <IconShip className={className} color={color} />;
      default: return null;
    }
  };

  return (
    <section 
      id="process" 
      ref={ref as React.RefObject<HTMLDivElement>} 
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center" 
          style={{ color: COLORS.accent }}
        >
          Our Seamless Export Process
        </h2>
        <p 
          className="text-base sm:text-lg text-center max-w-3xl mx-auto leading-relaxed" 
          style={{ color: COLORS.dark }}
        >
          We break down the complexity of international vehicle exporting into three simple, secure, and fully managed stages.
        </p>

        {/* Timeline Container */}
        <div className="relative pt-12 sm:pt-16 pb-6 sm:pb-8">
          {/* Vertical Timeline Base (Gray) */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full" 
            style={{ 
              top: 0, 
              bottom: 0, 
              backgroundColor: COLORS.dark + '30' 
            }}
          />
          
          {/* Vertical Timeline Progress (Red) */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1.5 rounded-full transition-all duration-700 ease-out" 
            style={{ 
              top: 0, 
              height: `calc(${lineProgress}% - 5px)`, 
              backgroundColor: COLORS.accent, 
              opacity: isVisible ? 1 : 0, 
              transformOrigin: 'top', 
              transitionDelay: '0.5s' 
            }}
          />

          {/* Process Steps */}
          <div className="space-y-8 sm:space-y-16">
            {PROCESS_STEPS.map((step, index) => {
              const isCurrent = step.id === activeStep;
              const isComplete = index < activeIndex;

              return (
                <React.Fragment key={step.id}>
                  <div 
                    id={step.id} 
                    ref={el => { processStepRefs.current[step.id] = el; }}
                    className="relative flex justify-center items-start w-full min-h-[220px]"
                  >
                    {/* Step Card - Centered */}
                    <div
                      className="relative w-[90%] sm:w-[85%] p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-700 ease-in-out transform"
                      style={{
                        backgroundColor: 'white',
                        transform: isCurrent || isComplete 
                          ? 'scale(1.0) translateY(0)' 
                          : 'scale(0.95) translateY(10px)',
                        opacity: isCurrent || isComplete ? 1 : 0.4,
                        border: isCurrent 
                          ? `3px solid ${COLORS.accent}` 
                          : `3px solid ${COLORS.light}`
                      }}
                    >
                      {/* Card Header with Icon */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-4 text-center sm:text-left">
                        <div 
                          className="p-2 rounded-full transition-all duration-500 mb-1 sm:mb-0" 
                          style={{ 
                            backgroundColor: isCurrent || isComplete 
                              ? COLORS.accent 
                              : COLORS.light 
                          }}
                        >
                          {renderProcessIcon(index, 'w-6 h-6', COLORS.dark)}
                        </div>
                        <h3 
                          className="text-lg sm:text-xl md:text-2xl font-bold" 
                          style={{ color: COLORS.dark }}
                        >
                          {step.title}
                        </h3>
                      </div>

                      {/* Card Content - Expands when active */}
                      <div 
                        className="overflow-hidden transition-all duration-700 ease-in-out text-sm sm:text-base" 
                        style={{ 
                          maxHeight: isCurrent || isComplete ? '200px' : '0', 
                          paddingTop: isCurrent || isComplete ? '10px' : '0', 
                          color: COLORS.dark 
                        }}
                      >
                        {step.detail}
                      </div>
                    </div>

                    {/* Center Timeline Checkpoint Dot */}
                    <div 
                      className="absolute left-1/2 top-6 transform -translate-x-1/2 w-4 sm:w-5 h-4 sm:h-5 rounded-full z-10 transition-all duration-500 shadow-lg border-4"
                      style={{ 
                        backgroundColor: isCurrent || isComplete 
                          ? COLORS.accent 
                          : 'white', 
                        borderColor: isCurrent || isComplete 
                          ? COLORS.dark 
                          : COLORS.light, 
                        boxShadow: isCurrent 
                          ? `0 0 0 7px ${COLORS.accent}60` 
                          : 'none' 
                      }}
                    />
                  </div>

                  {/* Spacing dot between steps (mobile only) */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div 
                        className="w-3 h-3 rounded-full transition-all duration-500" 
                        style={{ 
                          backgroundColor: isCurrent || isComplete 
                            ? COLORS.accent + '40' 
                            : COLORS.light 
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSectionMobile;
