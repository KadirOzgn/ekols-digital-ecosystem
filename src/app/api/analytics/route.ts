import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// For local development, we can store in a JSON file
const DATA_FILE = path.join(process.cwd(), 'analytics_data.json');

export async function POST(request: Request) {
  try {
    const newEvents = await request.json();

    // In a real app, you'd use a database like Postgres or Redis
    // For this prototype, we'll append to a local file if in dev mode
    if (process.env.NODE_ENV === 'development') {
      let existingData = [];
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        existingData = JSON.parse(fileContent || '[]');
      }
      
      const updatedData = [...existingData, ...newEvents];
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));
    } else {
      // In production, just log it for now
      console.log('Analytics Events Received:', newEvents.length);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
      return NextResponse.json(JSON.parse(fileContent || '[]'));
    }
    return NextResponse.json([]);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}
