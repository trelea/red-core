import { ContactUsTemplate } from '@/components/contact-us.template';
import { ConfirmationTemplate } from '@/components/confirmation.template';
import { Resend } from 'resend';
import { sendMetaCapiEvents } from '@/lib/meta-capi';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      fullName,
      phone,
      email,
      callbackDay,
      callbackTime,
      eventId,
      clientContext,
    } = await request.json();
    const resolvedEventId = eventId || `consultation_${Date.now()}`;

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
      react: ContactUsTemplate({
        fullName,
        email,
        phone,
        callbackDay,
        callbackTime,
      }),
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

    // Server-side Meta CAPI with matching event_id (dedupes with browser Pixel).
    try {
      const pageUrl =
        (clientContext && typeof clientContext.page_location === 'string'
          ? clientContext.page_location
          : undefined) || request.url;
      await sendMetaCapiEvents(
        [
          {
            eventName: 'Lead',
            eventId: resolvedEventId,
            eventSourceUrl: pageUrl,
            customData: {
              form_type: 'consultation',
              callback_day: callbackDay,
              callback_time: callbackTime,
              currency: 'USD',
              page_location: pageUrl,
            },
            userData: {
              fullName: fullName || undefined,
              email: email || undefined,
              phone: phone || undefined,
              externalId:
                typeof clientContext?.visitor_id === 'string'
                  ? clientContext.visitor_id
                  : undefined,
              fbp:
                typeof clientContext?.fbp === 'string'
                  ? clientContext.fbp
                  : undefined,
              fbc:
                typeof clientContext?.fbc === 'string'
                  ? clientContext.fbc
                  : undefined,
            },
          },
          {
            eventName: 'form_submission',
            eventId: `${resolvedEventId}_custom`,
            eventSourceUrl: pageUrl,
            customData: {
              form_type: 'consultation',
              callback_day: callbackDay,
              callback_time: callbackTime,
              currency: 'USD',
              page_location: pageUrl,
            },
            userData: {
              fullName: fullName || undefined,
              email: email || undefined,
              phone: phone || undefined,
              externalId:
                typeof clientContext?.visitor_id === 'string'
                  ? clientContext.visitor_id
                  : undefined,
              fbp:
                typeof clientContext?.fbp === 'string'
                  ? clientContext.fbp
                  : undefined,
              fbc:
                typeof clientContext?.fbc === 'string'
                  ? clientContext.fbc
                  : undefined,
            },
          },
        ],
        request,
      );
    } catch {
      // Ignore CAPI errors; do not fail the form submission.
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact us error:', error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    );
  }
}
