import { createHash } from 'crypto';

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
const GRAPH_API_VERSION = 'v25.0';

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
  /** Unix timestamp (seconds) when the event actually occurred. Defaults to now. */
  eventTime?: number;
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
function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function normalizeEmail(value?: string): string | undefined {
  const v = value?.trim().toLowerCase();
  return v || undefined;
}

function normalizePhone(value?: string): string | undefined {
  let v = value?.replace(/\D/g, '');
  if (!v) return undefined;
  // Meta requires a country code. Assume US (1) for 10-digit numbers.
  if (v.length === 10) v = `1${v}`;
  return v || undefined;
}

function normalizeCity(value?: string): string | undefined {
  const v = value?.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return v || undefined;
}

function normalizeState(value?: string): string | undefined {
  if (!value) return undefined;
  const v = value.trim().toLowerCase();
  if (/^[a-z]{2}$/.test(v)) return v;
  const cleaned = v.replace(/[^a-z0-9]/g, '');
  return cleaned || undefined;
}

function normalizeCountry(value?: string): string | undefined {
  if (!value) return undefined;
  const v = value.trim().toLowerCase().replace(/[^a-z]/g, '');
  return v ? v.slice(0, 2) : undefined;
}

function normalizeZip(value?: string): string | undefined {
  if (!value) return undefined;
  const digits = value.replace(/\D/g, '');
  if (!digits) return undefined;
  // US: keep first 5 digits.
  return digits.slice(0, 5);
}

function splitName(value?: string): { fn?: string; ln?: string } {
  const parts = (value || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  return {
    fn: parts[0],
    ln: parts.length > 1 ? parts.slice(1).join(' ') : undefined,
  };
}

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

    const emailNorm = normalizeEmail(user.email);
    const phoneNorm = normalizePhone(user.phone);
    const { fn: firstName, ln: lastName } = splitName(user.fullName);

    const userDataPayload: Record<string, unknown> = {
      client_ip_address: user.clientIpAddress || reqMeta.clientIpAddress,
      client_user_agent: user.clientUserAgent || reqMeta.clientUserAgent,
      fbp: user.fbp || reqMeta.fbp,
      fbc: user.fbc || reqMeta.fbc,
      em: emailNorm ? [sha256(emailNorm)] : undefined,
      ph: phoneNorm ? [sha256(phoneNorm)] : undefined,
      fn: firstName ? [sha256(firstName)] : undefined,
      ln: lastName ? [sha256(lastName)] : undefined,
      ct: (() => {
        const n = normalizeCity(reqMeta.city);
        return n ? [sha256(n)] : undefined;
      })(),
      st: (() => {
        const n = normalizeState(reqMeta.region);
        return n ? [sha256(n)] : undefined;
      })(),
      country: (() => {
        const n = normalizeCountry(reqMeta.country);
        return n ? [sha256(n)] : undefined;
      })(),
      zp: (() => {
        const n = normalizeZip(reqMeta.postalCode);
        return n ? [sha256(n)] : undefined;
      })(),
    };

    Object.keys(userDataPayload).forEach((key) => {
      if (userDataPayload[key] === undefined) {
        delete userDataPayload[key];
      }
    });

    const filteredCustomData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(evt.customData ?? {})) {
      // PII belongs in user_data, not custom_data.
      if (key === 'full_name' || key === 'phone' || key === 'email') continue;
      filteredCustomData[key] = value;
    }

    const customDataPayload: Record<string, unknown> = {
      client_ip: reqMeta.clientIpAddress,
      client_country: reqMeta.country,
      client_region: reqMeta.region,
      client_city: reqMeta.city,
      client_postal_code: reqMeta.postalCode,
      client_latitude: reqMeta.latitude,
      client_longitude: reqMeta.longitude,
      client_asn: reqMeta.asn,
      ...filteredCustomData,
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

    const resolvedEventSourceUrl =
      evt.eventSourceUrl ||
      (typeof evt.customData?.page_location === 'string'
        ? (evt.customData.page_location as string)
        : undefined) ||
      (typeof filteredCustomData.page_location === 'string'
        ? (filteredCustomData.page_location as string)
        : undefined) ||
      reqMeta.referer;

    return {
      event_name: evt.eventName,
      event_time: evt.eventTime ? Math.floor(evt.eventTime) : nowSeconds,
      event_id: evt.eventId,
      action_source: 'website',
      event_source_url: resolvedEventSourceUrl,
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
