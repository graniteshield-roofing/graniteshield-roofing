import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// This specific line forces Vercel to use the correct server for emails
export const runtime = 'nodejs';

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, zip, projectType, timeframe, notes } = body;

    // Send the email
    const data = await resend.emails.send({
      from: 'GraniteShield Leads <onboarding@resend.dev>',
      to: 'info@graniteshieldroofing.com',
      subject: `🔥 New Lead: ${name} - ${projectType}`,
      html: `
        <h1>New Website Lead</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Zip:</strong> ${zip}</p>
        <p><strong>Service:</strong> ${projectType}</p>
        <p><strong>Timeline:</strong> ${timeframe}</p>
        <p><strong>Notes:</strong> ${notes || 'None'}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Lead submission failed:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
