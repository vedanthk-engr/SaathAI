import { NextRequest, NextResponse } from 'next/server';
import { transcribeAudio } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    let audioBuffer: Buffer;
    let mimeType = 'audio/webm';

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as Blob | null;
      if (!file) {
        return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
      }
      const arrayBuffer = await file.arrayBuffer();
      audioBuffer = Buffer.from(arrayBuffer);
      mimeType = file.type || 'audio/webm';
    } else {
      const body = await req.json();
      if (!body.audioBase64) {
        return NextResponse.json({ error: 'audioBase64 is required' }, { status: 400 });
      }
      const base64Data = body.audioBase64.replace(/^data:audio\/\w+;base64,/, '');
      audioBuffer = Buffer.from(base64Data, 'base64');
      mimeType = body.mimeType || 'audio/webm';
    }

    const result = await transcribeAudio(audioBuffer, mimeType);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/transcribe:', error);
    return NextResponse.json({ error: error.message || 'Failed to transcribe audio' }, { status: 500 });
  }
}
