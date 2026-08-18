import { NextRequest, NextResponse } from 'next/server';
import { analyzePhotoWithVision } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    let imageUrl = '';
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as Blob | null;
      if (!file) {
        return NextResponse.json({ error: 'No photo provided' }, { status: 400 });
      }
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;
    } else {
      const body = await req.json();
      imageUrl = body.imageUrl || body.imageBase64 || '';
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image file or URL is required' }, { status: 400 });
    }

    const result = await analyzePhotoWithVision(imageUrl);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/ai/analyze-photo:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze photo' }, { status: 500 });
  }
}
