import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message, senderName, senderEmail } = await req.json();

    if (!to || !message) {
      return NextResponse.json({ error: 'to and message are required' }, { status: 400 });
    }

    const result = await sendEmail({
      to,
      subject: subject || `Message from ${senderName || 'Buyer'} on Haath Marketplace`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h3>New Message Received via Haath Marketplace</h3>
          <p><strong>From:</strong> ${senderName || 'Buyer'} (${senderEmail || 'N/A'})</p>
          <hr />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
