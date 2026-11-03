import { extractRequestMeta } from '@/lib/meta-capi';

export interface ResolvedIpLocation {
  ip: string;
  location: string;
}

function isPrivateIp(ip: string): boolean {
  if (!ip) return true;
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') return true;
  if (ip.startsWith('10.')) return true;
  if (ip.startsWith('192.168.')) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return true;
  return false;
}

async function fetchIpGeo(ip: string): Promise<{
  city?: string;
  region?: string;
  country?: string;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=city,regionName,country,status,message`,
      { signal: controller.signal },
    );
    if (!res.ok) return {};
    const data = (await res.json()) as {
      status?: string;
      city?: string;
      regionName?: string;
      country?: string;
    };
    if (data?.status && data.status !== 'success') return {};
    return {
      city: data.city,
      region: data.regionName,
      country: data.country,
    };
  } catch {
    return {};
  } finally {
    clearTimeout(timeout);
  }
}

export async function resolveIpLocation(
  request: Request,
): Promise<ResolvedIpLocation> {
  const meta = extractRequestMeta(request);
  const ip = meta.clientIpAddress || '127.0.0.1';

  if (isPrivateIp(ip)) {
    return { ip, location: 'Local (localhost)' };
  }

  let city = meta.city;
  let region = meta.region;
  let country = meta.country;

  if (!city || !region || !country) {
    const geo = await fetchIpGeo(ip);
    city = city || geo.city;
    region = region || geo.region;
    country = country || geo.country;
  }

  const parts = [city, region, country].filter(Boolean);
  const location = parts.length > 0 ? parts.join(', ') : 'Unknown';

  return { ip, location };
}