import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: 'Text input is required' }, { status: 400 });
    }
    const embedding = await generateEmbedding(text);
    return NextResponse.json({ embedding });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate embedding' }, { status: 500 });
  }
}
