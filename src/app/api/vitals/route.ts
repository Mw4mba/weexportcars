import { NextRequest, NextResponse } from 'next/server';
import { appendFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Clone the request to read body safely
    const clonedRequest = request.clone();
    const text = await clonedRequest.text();
    
    // Check if body is empty
    if (!text || text.trim() === '') {
      return NextResponse.json({ success: false, error: 'Empty request body' }, { status: 400 });
    }
    
    // Parse JSON safely
    let metrics;
    try {
      metrics = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Body:', text);
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }
    
    // Create a log entry with timestamp
    const logEntry = {
      timestamp: new Date().toISOString(),
      url: metrics.url,
      metrics: metrics.metrics,
    };
    
    // Append to a JSON Lines file (each line is a JSON object) - using async file write
    const logPath = join(process.cwd(), 'web-vitals-report.jsonl');
    await appendFile(logPath, JSON.stringify(logEntry) + '\n');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging web vitals:', error);
    return NextResponse.json({ success: false, error: 'Failed to log metrics' }, { status: 500 });
  }
}
