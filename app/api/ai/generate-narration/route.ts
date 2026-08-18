import { NextRequest, NextResponse } from 'next/server';
import { generateAudioNarration } from '@/lib/elevenlabs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provenanceNote, artisanName, craftTradition } = body;

    if (!provenanceNote) {
      return NextResponse.json({ error: 'provenanceNote is required' }, { status: 400 });
    }

    const result = await generateAudioNarration({
      provenanceNote,
      artisanName: artisanName || 'Master Artisan',
      craftTradition: craftTradition || 'Indian Heritage Craft'
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/generate-narration:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate audio narration' }, { status: 500 });
  }
}
