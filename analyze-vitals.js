const fs = require('fs');
const path = require('path');

// Read the JSONL file
const logPath = path.join(process.cwd(), 'web-vitals-report.jsonl');

if (!fs.existsSync(logPath)) {
  console.error('No web-vitals-report.jsonl file found. Please run the app and navigate through pages to collect data.');
  process.exit(1);
}

const fileContent = fs.readFileSync(logPath, 'utf-8');
const lines = fileContent.trim().split('\n');

// Parse all entries
const entries = lines.map(line => JSON.parse(line));

// Group by URL
const byUrl = {};
entries.forEach(entry => {
  if (!byUrl[entry.url]) {
    byUrl[entry.url] = [];
  }
  byUrl[entry.url].push(entry);
});

// Aggregate metrics
console.log('\n========================================');
console.log('WEB VITALS PERFORMANCE ANALYSIS');
console.log('========================================\n');

console.log(`Total measurements: ${entries.length}`);
console.log(`Pages analyzed: ${Object.keys(byUrl).length}`);
console.log(`Time range: ${entries[0].timestamp} to ${entries[entries.length - 1].timestamp}\n`);

// Metric thresholds (Core Web Vitals)
const thresholds = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 },   // Interaction to Next Paint
};

function getRating(metricName, value) {
  if (!thresholds[metricName]) return 'N/A';
  if (value <= thresholds[metricName].good) return 'GOOD ✓';
  if (value <= thresholds[metricName].needsImprovement) return 'NEEDS IMPROVEMENT ⚠';
  return 'POOR ✗';
}

// Analyze each page
for (const [url, pageEntries] of Object.entries(byUrl)) {
  console.log('----------------------------------------');
  console.log(`Page: ${url}`);
  console.log('----------------------------------------');
  
  // Collect all metrics for this page
  const metricsByName = {};
  pageEntries.forEach(entry => {
    const { name, value } = entry.metrics;
    if (!metricsByName[name]) {
      metricsByName[name] = [];
    }
    metricsByName[name].push(value);
  });
  
  // Calculate statistics for each metric
  for (const [metricName, values] of Object.entries(metricsByName)) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const sorted = [...values].sort((a, b) => a - b);
    const p75 = sorted[Math.floor(sorted.length * 0.75)];
    
    const rating = getRating(metricName, p75);
    
    console.log(`\n${metricName}:`);
    console.log(`  Average: ${avg.toFixed(2)}`);
    console.log(`  Min: ${min.toFixed(2)}`);
    console.log(`  Max: ${max.toFixed(2)}`);
    console.log(`  P75: ${p75.toFixed(2)} - ${rating}`);
    console.log(`  Samples: ${values.length}`);
  }
  
  console.log('');
}

// Overall summary
console.log('\n========================================');
console.log('RECOMMENDATIONS');
console.log('========================================\n');

// Collect all metrics across all pages
const allMetrics = {};
entries.forEach(entry => {
  const { name, value } = entry.metrics;
  if (!allMetrics[name]) {
    allMetrics[name] = [];
  }
  allMetrics[name].push(value);
});

const recommendations = [];

for (const [metricName, values] of Object.entries(allMetrics)) {
  const sorted = [...values].sort((a, b) => a - b);
  const p75 = sorted[Math.floor(sorted.length * 0.75)];
  const rating = getRating(metricName, p75);
  
  if (rating.includes('POOR')) {
    recommendations.push({
      metric: metricName,
      value: p75,
      priority: 'HIGH',
      suggestions: getRecommendations(metricName),
    });
  } else if (rating.includes('NEEDS IMPROVEMENT')) {
    recommendations.push({
      metric: metricName,
      value: p75,
      priority: 'MEDIUM',
      suggestions: getRecommendations(metricName),
    });
  }
}

if (recommendations.length === 0) {
  console.log('✓ All metrics are performing well! No critical issues found.');
} else {
  recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.metric} - Priority: ${rec.priority}`);
    console.log(`   Current P75: ${rec.value.toFixed(2)}`);
    console.log(`   Suggestions:`);
    rec.suggestions.forEach(suggestion => {
      console.log(`   - ${suggestion}`);
    });
    console.log('');
  });
}

function getRecommendations(metricName) {
  const suggestions = {
    LCP: [
      'Optimize and compress images (use WebP/AVIF formats)',
      'Implement lazy loading for images below the fold',
      'Use a CDN for static assets',
      'Reduce render-blocking resources',
      'Optimize server response times',
    ],
    FCP: [
      'Minimize main thread work',
      'Reduce JavaScript bundle size',
      'Eliminate render-blocking resources',
      'Use code splitting and dynamic imports',
    ],
    CLS: [
      'Add size attributes to images and videos',
      'Avoid inserting content above existing content',
      'Use transform animations instead of properties that trigger layout',
      'Preload fonts to avoid FOIT/FOUT',
    ],
    FID: [
      'Minimize JavaScript execution time',
      'Break up long tasks',
      'Use a web worker for heavy computations',
      'Reduce third-party code impact',
    ],
    INP: [
      'Optimize event handlers',
      'Avoid long tasks that block the main thread',
      'Use CSS containment',
      'Debounce expensive operations',
    ],
    TTFB: [
      'Optimize server performance',
      'Use a CDN',
      'Implement caching strategies',
      'Consider edge rendering',
      'Optimize database queries',
    ],
  };
  
  return suggestions[metricName] || ['Investigate specific bottlenecks for this metric'];
}

console.log('\n========================================');
console.log('To collect more data, navigate through your app.');
console.log('To clear data, delete web-vitals-report.jsonl');
console.log('========================================\n');
