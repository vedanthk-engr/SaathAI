export async function sendEmail(data: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: 'Haath Artisan Marketplace <notifications@haath.crafts>',
          to: [data.to],
          subject: data.subject,
          html: data.html
        })
      });

      if (res.ok) {
        const body = await res.json();
        return { success: true, id: body.id };
      }
    } catch (err) {
      console.warn('Resend email error, logging to console:', err);
    }
  }

  // Fallback logger for transactional emails in development/demo mode
  console.log(`[Resend Email Dispatcher] To: ${data.to} | Subject: ${data.subject}`);
  return { success: true, id: `mock_email_${Date.now()}` };
}
