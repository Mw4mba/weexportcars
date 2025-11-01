"use client";

import { useRef, memo, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import NextImage from 'next/image';

import { useEffect, useState } from 'react';

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  theme?: 'auto' | 'light' | 'dark';
  focus?: { lat: number; lng: number; zoom?: number } | null;
  animateRoutes?: boolean;
}

// Create a singleton DottedMap instance to share across all WorldMap components
let sharedMapInstance: DottedMap | null = null;
const getSharedMapInstance = () => {
  if (!sharedMapInstance) {
    sharedMapInstance = new DottedMap({ height: 100, grid: "diagonal" });
  }
  return sharedMapInstance;
};

function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  theme = 'light',
  focus = null,
  animateRoutes = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Use shared DottedMap instance across all WorldMap components
  const map = useMemo(() => getSharedMapInstance(), []);

  // Simplified dark mode detection
  const [detectedDark, setDetectedDark] = useState(false);

  useEffect(() => {
    // Only run if theme is 'auto'
    if (theme !== 'auto') return;

    const updateDarkMode = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setDetectedDark(prefersDark || hasDarkClass);
    };

    updateDarkMode();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateDarkMode);

    return () => mediaQuery.removeEventListener('change', updateDarkMode);
  }, [theme]);

  // Determine effective theme (prop overrides detection)
  const effectiveDark = theme === 'dark' ? true : theme === 'light' ? false : detectedDark;

  // Memoize SVG generation
  const svgMap = useMemo(() => 
    map.getSVG({
      radius: 0.22,
      color: effectiveDark ? '#FFFFFF40' : '#00000040',
      shape: 'circle',
      backgroundColor: effectiveDark ? 'black' : 'white',
    }), 
    [map, effectiveDark]
  );

  // Memoize data URL to avoid re-encoding
  const svgDataUrl = useMemo(() => 
    `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`,
    [svgMap]
  );

  // Memoize projection function
  const projectPoint = useCallback((lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }, []);

  // Memoize curve path creation
  const createCurvedPath = useCallback((
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  // Memoize projected points and paths to avoid recalculation
  const projectedDots = useMemo(() => 
    dots.map(dot => ({
      startPoint: projectPoint(dot.start.lat, dot.start.lng),
      endPoint: projectPoint(dot.end.lat, dot.end.lng),
      path: createCurvedPath(
        projectPoint(dot.start.lat, dot.start.lng),
        projectPoint(dot.end.lat, dot.end.lng)
      )
    })),
    [dots, projectPoint, createCurvedPath]
  );

  // Memoize transform calculation
  const transformStyle = useMemo(() => {
    if (!focus || typeof focus.lat !== 'number' || typeof focus.lng !== 'number') {
      return undefined;
    }
    const center = projectPoint(focus.lat, focus.lng);
    const dx = center.x - 400;
    const dy = center.y - 200;
    const txPercent = -(dx / 800) * 100;
    const tyPercent = -(dy / 400) * 100;
    const scale = focus.zoom && focus.zoom > 0 ? focus.zoom : 1;
    return `translate(${txPercent}%, ${tyPercent}%) scale(${scale})`;
  }, [focus, projectPoint]);

  return (
    <div className="w-full aspect-square md:aspect-[2/1] bg-transparent rounded-lg relative font-sans overflow-hidden">
      <NextImage
        src={svgDataUrl}
        alt="world map"
        fill
        className="object-cover pointer-events-none select-none"
        style={transformStyle ? { transform: transformStyle, transformOrigin: '50% 50%' } : undefined}
        draggable={false}
        priority
        unoptimized
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        style={transformStyle ? { transform: transformStyle, transformOrigin: '50% 50%' } : undefined}
      >
        {projectedDots.map((dot, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              d={dot.path}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{
                pathLength: 0,
              }}
              animate={animateRoutes ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: 1,
                delay: 0.5 * i,
                ease: "easeOut",
              }}
            />
          </g>
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {projectedDots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={dot.startPoint.x}
                cy={dot.startPoint.y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={dot.startPoint.x}
                cy={dot.startPoint.y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={dot.endPoint.x}
                cy={dot.endPoint.y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={dot.endPoint.x}
                cy={dot.endPoint.y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

// More efficient memo comparison - avoid JSON.stringify
export default memo(WorldMap, (prev, next) => {
  // Quick checks first (fastest comparisons)
  if (prev.animateRoutes !== next.animateRoutes) return false;
  if (prev.theme !== next.theme) return false;
  if (prev.lineColor !== next.lineColor) return false;
  
  // Check dots array
  if (prev.dots?.length !== next.dots?.length) return false;
  if (prev.dots && next.dots) {
    for (let i = 0; i < prev.dots.length; i++) {
      const prevDot = prev.dots[i];
      const nextDot = next.dots[i];
      if (
        prevDot.start.lat !== nextDot.start.lat ||
        prevDot.start.lng !== nextDot.start.lng ||
        prevDot.end.lat !== nextDot.end.lat ||
        prevDot.end.lng !== nextDot.end.lng
      ) {
        return false;
      }
    }
  }
  
  // Check focus object
  if (prev.focus?.lat !== next.focus?.lat) return false;
  if (prev.focus?.lng !== next.focus?.lng) return false;
  if (prev.focus?.zoom !== next.focus?.zoom) return false;
  
  return true; // Props are equal, don't re-render
});
