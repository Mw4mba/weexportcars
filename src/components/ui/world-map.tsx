"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

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

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  theme = 'light',
  focus = null,
  animateRoutes = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  // Detect dark mode on the client without relying on `next-themes`.
  const [detectedDark, setDetectedDark] = useState(false);

  useEffect(() => {
    const detect = () => {
      try {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const hasDarkClass = document.documentElement.classList.contains('dark');
  setDetectedDark(Boolean(prefersDark || hasDarkClass));
      } catch (e) {
  setDetectedDark(false);
      }
    };

    detect();
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => setDetectedDark(Boolean(e.matches));
    if (mq && mq.addEventListener) {
      mq.addEventListener('change', handler);
    } else if (mq && (mq as any).addListener) {
      // older browsers
      (mq as any).addListener(handler);
    }

    return () => {
      if (mq && mq.removeEventListener) {
        mq.removeEventListener('change', handler);
      } else if (mq && (mq as any).removeListener) {
        (mq as any).removeListener(handler);
      }
    };
  }, []);

  // Determine effective theme (prop overrides detection)
  const effectiveDark = theme === 'dark' ? true : theme === 'light' ? false : detectedDark;

  const svgMap = map.getSVG({
    radius: 0.22,
    color: effectiveDark ? '#FFFFFF40' : '#00000040',
    shape: 'circle',
    backgroundColor: effectiveDark ? 'black' : 'white',
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Compute transform to center focus point, if provided.
  let transformStyle: string | undefined = undefined;
  if (focus && typeof focus.lat === 'number' && typeof focus.lng === 'number') {
    const center = projectPoint(focus.lat, focus.lng);
    const dx = center.x - 400; // positive means focus is to the right
    const dy = center.y - 200; // positive means focus is below
    const txPercent = -(dx / 800) * 100; // negative moves map left
    const tyPercent = -(dy / 400) * 100; // negative moves map up
    const scale = focus.zoom && focus.zoom > 0 ? focus.zoom : 1;
    transformStyle = `translate(${txPercent}%, ${tyPercent}%) scale(${scale})`;
  }

  return (
    <div className="w-full aspect-square md:aspect-[2/1] bg-transparent rounded-lg relative font-sans overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full object-cover pointer-events-none select-none"
        style={transformStyle ? { transform: transformStyle, transformOrigin: '50% 50%' } : undefined}
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        style={transformStyle ? { transform: transformStyle, transformOrigin: '50% 50%' } : undefined}
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
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
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
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
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
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
