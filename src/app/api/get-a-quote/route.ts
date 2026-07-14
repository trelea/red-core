import { GetAQuoteTemplate } from '@/components/get-a-quote.template';
import { ConfirmationTemplate } from '@/components/confirmation.template';
import { Resend } from 'resend';

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
      subject: "We've received your request — Red Core",
      react: ConfirmationTemplate({ fullName, kind: 'quote' }),
    });
    if (confirmation.error) {
      console.error('Confirmation email error:', confirmation.error);
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
