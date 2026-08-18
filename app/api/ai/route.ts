import { NextResponse } from 'next/server';
import { processBiModelAnalysis } from '@/lib/aiBiModel';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, language } = body;

    const result = await processBiModelAnalysis(prompt || 'Madhubani painting', language || 'English');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Bi-Model AI execution failed', details: error.message },
      { status: 500 }
    );
  }
}
