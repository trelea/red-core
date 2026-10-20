import {
  extractRequestMeta,
  sendMetaCapiEvents,
  type MetaCapiEventInput,
} from '@/lib/meta-capi';

/**
 * GET /api/track
 * Returns the visitor's IP address and geo headers (when behind Vercel/Cloudflare/proxy)
 * so client-side GTM / GA4 dataLayer events include client_ip and location metadata.
 */
export async function GET(request: Request) {
  const meta = extractRequestMeta(request);
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    undefined;
  const region =
    request.headers.get('x-vercel-ip-country-region') ||
    request.headers.get('cf-region') ||
    undefined;
  const city =
    request.headers.get('x-vercel-ip-city') ||
    request.headers.get('cf-ipcity') ||
    undefined;
  const postalCode =
    request.headers.get('x-vercel-ip-postal-code') ||
    request.headers.get('cf-postal-code') ||
    undefined;
  const latitude =
    request.headers.get('x-vercel-ip-latitude') ||
    request.headers.get('cf-iplatitude') ||
    undefined;
  const longitude =
    request.headers.get('x-vercel-ip-longitude') ||
    request.headers.get('cf-iplongitude') ||
    undefined;
  const asn =
    request.headers.get('x-vercel-ip-as-number') ||
    request.headers.get('cf-asnumber') ||
    undefined;

  return Response.json({
    ip: meta.clientIpAddress || '127.0.0.1',
    userAgent: meta.clientUserAgent,
    country,
    region,
    city,
    postalCode,
    latitude,
    longitude,
    asn,
  });
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (!raw) {
      return Response.json({ ok: true });
    }

    const payload = JSON.parse(raw) as {
      events?: MetaCapiEventInput[];
    };

    if (Array.isArray(payload.events) && payload.events.length > 0) {
      await sendMetaCapiEvents(payload.events, request);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Track endpoint error:', error);
    return Response.json({ ok: false }, { status: 200 });
  }
}
