import { GetAQuoteTemplate } from '@/components/get-a-quote.template';
import { ConfirmationTemplate } from '@/components/confirmation.template';
import { Resend } from 'resend';
import { sendMetaCapiEvents } from '@/lib/meta-capi';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const offer = formData.get('offer') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;
    const callbackDay = formData.get('callbackDay') as string;
    const callbackTime = formData.get('callbackTime') as string;
    const eventId = (formData.get('eventId') as string) || `quote_${Date.now()}`;
    const rawClientContext = formData.get('clientContext') as string | null;
    let clientContext: Record<string, unknown> = {};
    if (rawClientContext) {
      try {
        clientContext = JSON.parse(rawClientContext);
      } catch {
        // ignore invalid json
      }
    }
    const files = formData.getAll('images') as File[];

    if (!fullName || !phone || !email || !callbackDay || !callbackTime) {
      return Response.json(
        { error: 'Name, phone, email and callback preference are required.' },
        { status: 400 },
      );
    }

    if (files.length > 5) {
      return Response.json(
        { error: 'Maximum 5 images allowed.' },
        { status: 400 },
      );
    }

    const attachments = await Promise.all(
      files
        .filter((file) => file.size > 0)
        .map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return {
            filename: file.name,
            content: buffer,
          };
        }),
    );

    const { data, error } = await resend.emails.send({
      from: 'Red Core <redcore@redcoreconcrete.com>',
      to: ['redcoreusa@gmail.com'],
      subject: `New Quote Request from ${fullName}`,
      react: GetAQuoteTemplate({
        fullName,
        phone,
        email,
        offer,
        service,
        message,
        callbackDay,
        callbackTime,
        imageCount: attachments.length,
      }),
      attachments,
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
      react: ConfirmationTemplate({ fullName, kind: 'quote' }),
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
            eventId,
            eventSourceUrl: pageUrl,
            customData: {
              form_type: 'quote',
              service_name: service || undefined,
              offer_name: offer || undefined,
              message: message || undefined,
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
            eventId: `${eventId}_custom`,
            eventSourceUrl: pageUrl,
            customData: {
              form_type: 'quote',
              service_name: service || undefined,
              offer_name: offer || undefined,
              message: message || undefined,
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
    console.error('Get a quote error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}
