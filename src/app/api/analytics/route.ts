import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// For local development, we can store in a JSON file
const DATA_FILE = path.join(process.cwd(), 'analytics_data.json');

export async function POST(request: Request) {
  try {
    const newEvents = await request.json();
    const headers = request.headers;
    
    // Capture location from Vercel headers
    const location = {
      country: headers.get('x-vercel-ip-country') || 'Unknown',
      region: headers.get('x-vercel-ip-country-region') || 'Unknown',
      city: headers.get('x-vercel-ip-city') || 'Unknown',
      latitude: headers.get('x-vercel-ip-latitude') || '0',
      longitude: headers.get('x-vercel-ip-longitude') || '0'
    };

    const eventsWithLocation = newEvents.map((e: any) => ({
      ...e,
      location
    }));

    // For local development, we can store in a JSON file
    if (process.env.NODE_ENV === 'development') {
      let existingData = [];
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        existingData = JSON.parse(fileContent || '[]');
      }
      
      const updatedData = [...existingData, ...eventsWithLocation];
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));
    } else {
      // In production, log it for now
      console.log(`Analytics Events Received from ${location.city}, ${location.country}:`, eventsWithLocation.length);
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
