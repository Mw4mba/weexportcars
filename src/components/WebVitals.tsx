'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useState, useEffect, useRef } from 'react';

type Metric = {
  id: string;
  name: string;
  value: number;
};

export function WebVitals() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const metricsRef = useRef<Metric[]>([]);

  useEffect(() => {
    setCurrentUrl(window.location.pathname);
  }, []);

  useReportWebVitals((metric) => {
    setMetrics((prevMetrics) => {
      const existingMetricIndex = prevMetrics.findIndex((m) => m.name === metric.name);
      let newMetrics: Metric[];
      
      if (existingMetricIndex > -1) {
        newMetrics = [...prevMetrics];
        newMetrics[existingMetricIndex] = metric;
      } else {
        newMetrics = [...prevMetrics, metric];
      }
      
      metricsRef.current = newMetrics;
      return newMetrics;
    });

    // Send metrics to API endpoint
    fetch('/api/vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: window.location.pathname,
        metrics: {
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
        },
      }),
    }).catch((error) => {
      console.error('Failed to log web vitals:', error);
    });
  });

  if (metrics.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 text-sm max-w-xs">
      <h2 className="font-bold mb-2">Web Vitals - {currentUrl}</h2>
      <ul className="space-y-1">
        {metrics.map((metric) => (
          <li key={metric.id} className="flex justify-between">
            <span>{metric.name}:</span>
            <span className="font-mono">{Math.round(metric.value * 100) / 100}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-xs text-gray-400">
        Logging to web-vitals-report.jsonl
      </div>
    </div>
  );
}
