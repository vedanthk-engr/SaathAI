import { NextRequest, NextResponse } from 'next/server';
import { generateListingFromAI } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, craftFromVision, regionFromVision, materialsFromVision, rawMaterialCost, mode } = body;

    if (!transcript && mode !== 'profile') {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }

    const listing = await generateListingFromAI({
      transcript: transcript || 'Handcrafted traditional artisan work.',
      craftFromVision,
      regionFromVision,
      materialsFromVision,
      rawMaterialCost: Number(rawMaterialCost) || 500,
      mode: mode || 'listing',
    });

    return NextResponse.json(listing);
  } catch (error: any) {
    console.error('Error in /api/ai/generate-listing:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate listing' }, { status: 500 });
  }
}
