import { type NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

const apiKey = process.env.GOOGLE_PLACES_API_KEY;

export async function POST(req: NextRequest, res: NextResponse) {
  const variables = await req.json();
  const { location, radius, type } = variables.body;
  if (req.method === 'POST') {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`
      );

      const data = response.data;

      return NextResponse.json({
        status: 200,
        data,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        error: 'An error occurred while getting data from Google Places API.',
      });
    }
  } else {
    return NextResponse.json({
      status: 405,
      error: 'Method not allowed',
    });
  }
}
