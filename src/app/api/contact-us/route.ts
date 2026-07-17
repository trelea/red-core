import React from 'react';
import { ContactUsTemplate } from '@/components/contact-us.template';
import { ConfirmationTemplate } from '@/components/confirmation.template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { fullName, phone, email, callbackDay, callbackTime } = await request.json();

    if (!fullName || !phone || !email || !callbackDay || !callbackTime) {
      return Response.json(
        { error: 'All fields are required.' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Red Core <redcore@redcoreconcrete.com>',
      to: ['redcoreusa@gmail.com'],
      subject: `Free Consultation Request from ${fullName}`,
      react: ContactUsTemplate({ fullName, email, phone, callbackDay, callbackTime })
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Auto-reply to the customer. A failure here must not fail the form —
    // the internal notification already went through.
    const confirmation = await resend.emails.send({
      from: 'Red Core <redcore@redcoreconcrete.com>',
      to: [email],
      replyTo: 'redcoreusa@gmail.com',
      subject: "We've received your project request — REDCORE",
      react: ConfirmationTemplate({ fullName, kind: 'consultation' }),
    });
    if (confirmation.error) {
      console.error('Confirmation email error:', confirmation.error);
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact us error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}
