const META_TRACKING_ENABLED =
  process.env.META_TRACKING_ENABLED !== 'false' &&
  process.env.NEXT_PUBLIC_META_TRACKING_ENABLED !== 'false';
const IS_DEV = process.env.NODE_ENV === 'development';
const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  process.env.META_PIXEL_ID ||
  '1120187307040000';
const META_CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || '';
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || '';
const GRAPH_API_VERSION = 'v21.0';

export interface MetaUserDataInput {
  email?: string;
  phone?: string;
  fullName?: string;
  fbp?: string;
  fbc?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
}

export interface MetaCapiEventInput {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  customData?: Record<string, unknown>;
  userData?: MetaUserDataInput;
}

export function extractRequestMeta(request: Request): {
  clientIpAddress?: string;
  clientUserAgent?: string;
  country?: string;
  region?: string;
  city?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  asn?: string;
  fbp?: string;
  fbc?: string;
  referer?: string;
} {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIpAddress = forwardedFor
    ? forwardedFor.split(',')[0]?.trim()
    : realIp || '127.0.0.1';

  const clientUserAgent = request.headers.get('user-agent') || undefined;
  const referer = request.headers.get('referer') || undefined;
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

  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader
      .split(';')
      .map((part) => {
        const idx = part.indexOf('=');
        if (idx === -1) return null;
        return [
          part.slice(0, idx).trim(),
          decodeURIComponent(part.slice(idx + 1).trim()),
        ];
      })
      .filter((entry): entry is [string, string] => entry !== null),
  );

  return {
    clientIpAddress,
    clientUserAgent,
    country,
    region,
    city,
    postalCode,
    latitude,
    longitude,
    asn,
    fbp: cookies['_fbp'],
    fbc: cookies['_fbc'],
    referer,
  };
}

/**
 * Sends one or more events to Meta Conversions API (CAPI) with plain form data + server request metadata.
 * Safe no-op if META_TRACKING_ENABLED is false or credentials are not configured.
 */
export async function sendMetaCapiEvents(
  events: MetaCapiEventInput[],
  request?: Request,
): Promise<void> {
  const reqMeta = request ? extractRequestMeta(request) : {};

  if (IS_DEV && events.length > 0) {
    for (const evt of events) {
      console.log(
        `[Tracking][Server] event="${evt.eventName}" id="${evt.eventId}" metaEnabled=${META_TRACKING_ENABLED}`,
        {
          client_ip: reqMeta.clientIpAddress,
          client_user_agent: reqMeta.clientUserAgent,
          ...(evt.customData ?? {}),
          ...(evt.userData ?? {}),
        },
      );
    }
  }

  if (IS_DEV) return;

  if (
    !META_TRACKING_ENABLED ||
    !META_PIXEL_ID ||
    !META_CAPI_ACCESS_TOKEN ||
    events.length === 0
  ) {
    return;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);

  const data = events.map((evt) => {
    const user = evt.userData ?? {};

    const userDataPayload: Record<string, unknown> = {
      client_ip_address: user.clientIpAddress || reqMeta.clientIpAddress,
      client_user_agent: user.clientUserAgent || reqMeta.clientUserAgent,
      fbp: user.fbp || reqMeta.fbp,
      fbc: user.fbc || reqMeta.fbc,
      email: user.email || undefined,
      phone: user.phone || undefined,
      full_name: user.fullName || undefined,
    };

    Object.keys(userDataPayload).forEach((key) => {
      if (userDataPayload[key] === undefined) {
        delete userDataPayload[key];
      }
    });

    const customDataPayload: Record<string, unknown> = {
      client_ip: reqMeta.clientIpAddress,
      client_country: reqMeta.country,
      client_region: reqMeta.region,
      client_city: reqMeta.city,
      client_postal_code: reqMeta.postalCode,
      client_latitude: reqMeta.latitude,
      client_longitude: reqMeta.longitude,
      client_asn: reqMeta.asn,
      ...(evt.customData ?? {}),
    };
    if (user.fullName && !customDataPayload.full_name) {
      customDataPayload.full_name = user.fullName;
    }
    if (user.email && !customDataPayload.email) {
      customDataPayload.email = user.email;
    }
    if (user.phone && !customDataPayload.phone) {
      customDataPayload.phone = user.phone;
    }

    return {
      event_name: evt.eventName,
      event_time: nowSeconds,
      event_id: evt.eventId,
      action_source: 'website',
      event_source_url: evt.eventSourceUrl || reqMeta.referer,
      user_data: userDataPayload,
      custom_data: customDataPayload,
    };
  });

  const body: Record<string, unknown> = { data };
  if (META_TEST_EVENT_CODE) {
    body.test_event_code = META_TEST_EVENT_CODE;
  }

  try {
    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(
      META_CAPI_ACCESS_TOKEN,
    )}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let resBody: unknown = null;
    try {
      resBody = await res.json();
    } catch {
      resBody = await res.text().catch(() => null);
    }

    if (!res.ok) {
      console.error('Meta CAPI error:', res.status, resBody);
    } else {
      console.info('Meta CAPI sent:', resBody);
    }
  } catch (error) {
    console.error('Failed to send Meta CAPI event:', error);
  }
}
