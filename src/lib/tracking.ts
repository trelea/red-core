'use client';

const META_TRACKING_ENABLED =
  process.env.META_TRACKING_ENABLED === 'true' ||
  process.env.NEXT_PUBLIC_META_TRACKING_ENABLED === 'true';
const IS_DEV = process.env.NODE_ENV === 'development';

export interface UserContactInfo {
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface UnifiedEventOptions {
  /** Custom event name (used across GTM/GA4, Meta Pixel, and Meta CAPI) */
  event: string;
  /** Optional GA4 standard event name (e.g. 'generate_lead', 'contact', 'view_item', 'select_content', 'form_start') */
  ga4StandardEvent?: string;
  /** Optional Meta standard event name (e.g. 'PageView', 'Lead', 'Contact', 'ViewContent', 'InitiateCheckout') */
  metaStandardEvent?: string;
  /** Event parameters sent to all 3 tools */
  params?: Record<string, unknown>;
  /** Optional contact info for server-side SHA-256 hashing in Meta CAPI */
  userData?: UserContactInfo;
  /** Optional pre-generated event ID (for deduplicating with form API routes) */
  eventId?: string;
  /** Use navigator.sendBeacon (ideal for page unload / abandonment / dwell time events) */
  useBeacon?: boolean;
  /** Skip calling /api/track when the form API route already sent CAPI directly */
  skipCapiEndpoint?: boolean;
}

export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function getFbc(): string | undefined {
  const existing = getCookie('_fbc');
  if (existing) return existing;
  if (typeof window === 'undefined') return undefined;
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');
  if (!fbclid) return undefined;
  return `fb.1.${Date.now()}.${fbclid}`;
}

interface ClientEnvironmentContext {
  // Network & Geo (Server + Browser Network Information API)
  client_ip?: string;
  client_country?: string;
  client_region?: string;
  client_city?: string;
  client_postal_code?: string;
  client_latitude?: string;
  client_longitude?: string;
  client_asn?: string;
  connection_effective_type?: string;
  connection_type?: string;
  connection_downlink_mbps?: number;
  connection_rtt_ms?: number;
  connection_save_data?: boolean;
  online_status: boolean;

  // Browser, OS, Device Model & Client Hints
  user_agent: string;
  browser_name: string;
  browser_version: string;
  os_name: string;
  os_version: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  device_vendor: string;
  device_model: string;
  platform: string;
  cpu_architecture?: string;
  cpu_bitness?: string;

  // Hardware, CPU, RAM, GPU, Touch & Battery
  cpu_cores?: number;
  device_memory_gb?: number;
  gpu_vendor?: string;
  gpu_renderer?: string;
  touch_support: boolean;
  max_touch_points: number;
  battery_level_percent?: number;
  battery_charging?: boolean;

  // Display, Screen & Preferences
  screen_resolution: string;
  screen_available_resolution: string;
  viewport_size: string;
  device_pixel_ratio: number;
  color_depth?: number;
  screen_orientation?: string;
  color_scheme_preference: 'dark' | 'light';
  reduced_motion_preference: boolean;

  // Locale, Time, Capabilities & Bot Detection
  language: string;
  languages: string;
  timezone: string;
  timezone_offset_minutes: number;
  cookies_enabled: boolean;
  do_not_track?: string;
  is_automated_webdriver: boolean;
  pdf_viewer_enabled?: boolean;

  // Visitor, Session & Attribution
  visitor_id: string;
  session_id: string;
  visit_count: number;
  is_returning_visitor: boolean;
  first_visit_at: string;
  landing_page: string;
  referrer: string;
  initial_referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

let cachedIpInfo: {
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  asn?: string;
} = {};

let cachedClientHints: {
  architecture?: string;
  bitness?: string;
  model?: string;
  platformVersion?: string;
  fullVersionList?: string;
} = {};

let cachedBatteryInfo: {
  levelPercent?: number;
  charging?: boolean;
} = {};

let cachedGpuInfo: {
  vendor?: string;
  renderer?: string;
} | null = null;

let ipFetchPromise: Promise<void> | null = null;

/**
 * Live session store for any form/contact data the user types or submits.
 * Automatically merged into EVERY single event across the entire site.
 */
export interface SessionFormContext {
  full_name?: string;
  phone?: string;
  email?: string;
  service_name?: string;
  offer_name?: string;
  message?: string;
  callback_day?: string;
  callback_time?: string;
}

let cachedFormContext: SessionFormContext = {};

export function updateSessionFormContext(
  partial: Partial<SessionFormContext>,
): void {
  if (typeof window === 'undefined') return;
  try {
    const existingRaw = sessionStorage.getItem('rc_form_context');
    const existing: SessionFormContext = existingRaw
      ? JSON.parse(existingRaw)
      : {};
    const merged: SessionFormContext = {
      ...existing,
      ...cachedFormContext,
    };
    for (const [k, v] of Object.entries(partial)) {
      if (v !== undefined && v !== '') {
        (merged as Record<string, unknown>)[k] = v;
      }
    }
    cachedFormContext = merged;
    sessionStorage.setItem('rc_form_context', JSON.stringify(merged));
  } catch {
    cachedFormContext = { ...cachedFormContext, ...partial };
  }
}

function getSessionFormContext(): SessionFormContext {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem('rc_form_context');
    if (raw) {
      cachedFormContext = { ...JSON.parse(raw), ...cachedFormContext };
    }
  } catch {
    // ignore
  }
  return cachedFormContext;
}

function getGpuInfo(): { vendor?: string; renderer?: string } {
  if (cachedGpuInfo !== null) return cachedGpuInfo;
  if (typeof document === 'undefined') {
    cachedGpuInfo = {};
    return cachedGpuInfo;
  }
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
      (canvas.getContext(
        'experimental-webgl',
      ) as WebGLRenderingContext | null);
    if (!gl) {
      cachedGpuInfo = {};
      return cachedGpuInfo;
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      cachedGpuInfo = {
        vendor:
          (gl.getParameter(
            debugInfo.UNMASKED_VENDOR_WEBGL,
          ) as string | null) || undefined,
        renderer:
          (gl.getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL,
          ) as string | null) || undefined,
      };
    } else {
      cachedGpuInfo = {
        vendor: (gl.getParameter(gl.VENDOR) as string | null) || undefined,
        renderer: (gl.getParameter(gl.RENDERER) as string | null) || undefined,
      };
    }
  } catch {
    cachedGpuInfo = {};
  }
  return cachedGpuInfo;
}

/** Fetches visitor IP, geo headers, high-entropy UA client hints, and battery status once per session */
export function initClientTrackingContext(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (ipFetchPromise) return ipFetchPromise;

  // 1. Capture UTM / ad click params & initial landing metadata
  try {
    const sp = new URLSearchParams(window.location.search);
    const keys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'fbclid',
    ];
    for (const k of keys) {
      const val = sp.get(k);
      if (val) sessionStorage.setItem(`rc_${k}`, val);
    }
    if (!sessionStorage.getItem('rc_landing_page')) {
      sessionStorage.setItem('rc_landing_page', window.location.pathname);
    }
    if (!sessionStorage.getItem('rc_initial_referrer')) {
      sessionStorage.setItem('rc_initial_referrer', document.referrer || 'direct');
    }
  } catch {
    // ignore storage errors
  }

  // 2. High-Entropy User-Agent Client Hints (Chromium browsers)
  const navAny = navigator as Navigator & {
    userAgentData?: {
      getHighEntropyValues?: (
        hints: string[],
      ) => Promise<Record<string, unknown>>;
    };
    getBattery?: () => Promise<{
      level: number;
      charging: boolean;
      addEventListener?: (type: string, cb: () => void) => void;
    }>;
  };

  const hintsPromise =
    navAny.userAgentData &&
    typeof navAny.userAgentData.getHighEntropyValues === 'function'
      ? navAny.userAgentData
          .getHighEntropyValues([
            'architecture',
            'bitness',
            'model',
            'platformVersion',
            'fullVersionList',
          ])
          .then((hints) => {
            cachedClientHints = {
              architecture:
                (hints.architecture as string | undefined) || undefined,
              bitness: (hints.bitness as string | undefined) || undefined,
              model: (hints.model as string | undefined) || undefined,
              platformVersion:
                (hints.platformVersion as string | undefined) || undefined,
            };
          })
          .catch(() => {})
      : Promise.resolve();

  // 3. Battery Status API
  const batteryPromise =
    typeof navAny.getBattery === 'function'
      ? navAny
          .getBattery()
          .then((battery) => {
            const update = () => {
              cachedBatteryInfo = {
                levelPercent: Math.round(battery.level * 100),
                charging: battery.charging,
              };
            };
            update();
            battery.addEventListener?.('levelchange', update);
            battery.addEventListener?.('chargingchange', update);
          })
          .catch(() => {})
      : Promise.resolve();

  // 4. Server IP & Geo Headers
  const ipPromise = fetch('/api/track', { method: 'GET', cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && typeof data === 'object') {
        cachedIpInfo = {
          ip: data.ip,
          country: data.country,
          region: data.region,
          city: data.city,
          postalCode: data.postalCode,
          latitude: data.latitude,
          longitude: data.longitude,
          asn: data.asn,
        };
      }
    })
    .catch(() => {});

  ipFetchPromise = Promise.all([
    ipPromise,
    hintsPromise,
    batteryPromise,
  ]).then(() => {});

  return ipFetchPromise;
}

function parseBrowserOsAndDevice(ua: string): {
  browser_name: string;
  browser_version: string;
  os_name: string;
  os_version: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  device_model: string;
} {
  let browser_name = 'Unknown';
  let browser_version = '';

  const edgeMatch = ua.match(/Edg\/([\d.]+)/i);
  const operaMatch = ua.match(/(?:OPR|Opera)\/([\d.]+)/i);
  const chromeMatch = ua.match(/(?:Chrome|CriOS)\/([\d.]+)/i);
  const firefoxMatch = ua.match(/(?:Firefox|FxiOS)\/([\d.]+)/i);
  const safariMatch = ua.match(/Version\/([\d.]+).*Safari/i);

  if (edgeMatch) {
    browser_name = 'Edge';
    browser_version = edgeMatch[1];
  } else if (operaMatch) {
    browser_name = 'Opera';
    browser_version = operaMatch[1];
  } else if (chromeMatch && !/Chromium/i.test(ua)) {
    browser_name = 'Chrome';
    browser_version = chromeMatch[1];
  } else if (firefoxMatch) {
    browser_name = 'Firefox';
    browser_version = firefoxMatch[1];
  } else if (safariMatch) {
    browser_name = 'Safari';
    browser_version = safariMatch[1];
  }

  let os_name = 'Unknown';
  let os_version = cachedClientHints.platformVersion || '';

  const iosMatch = ua.match(/OS ([\d_]+) like Mac OS X/i);
  const androidMatch = ua.match(/Android ([\d.]+)/i);
  const winMatch = ua.match(/Windows NT ([\d.]+)/i);
  const macMatch = ua.match(/Mac OS X ([\d_]+)/i);

  if (/iPhone|iPad|iPod/i.test(ua)) {
    os_name = 'iOS';
    if (!os_version && iosMatch) os_version = iosMatch[1].replace(/_/g, '.');
  } else if (androidMatch) {
    os_name = 'Android';
    if (!os_version) os_version = androidMatch[1];
  } else if (winMatch) {
    os_name = 'Windows';
    if (!os_version) os_version = winMatch[1];
  } else if (macMatch) {
    os_name = 'macOS';
    if (!os_version) os_version = macMatch[1].replace(/_/g, '.');
  } else if (/Linux/i.test(ua)) {
    os_name = 'Linux';
  }

  let device_type: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) {
    device_type = 'tablet';
  } else if (
    /Mobile|iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini/i.test(
      ua,
    )
  ) {
    device_type = 'mobile';
  }

  let device_model = cachedClientHints.model || '';
  if (!device_model) {
    if (/iPhone/i.test(ua)) device_model = 'iPhone';
    else if (/iPad/i.test(ua)) device_model = 'iPad';
    else if (/Macintosh/i.test(ua)) device_model = 'Mac';
    else {
      const androidModel = ua.match(/Android [\d.]+;\s*([^;)]+?)(?:\s+Build\/|\))/i);
      if (androidModel?.[1]) {
        device_model = androidModel[1].trim();
      } else {
        device_model = device_type === 'desktop' ? 'PC / Desktop' : 'Mobile Device';
      }
    }
  }

  return {
    browser_name,
    browser_version,
    os_name,
    os_version,
    device_type,
    device_model,
  };
}

function getVisitorAndSessionMetrics(): {
  visitor_id: string;
  session_id: string;
  visit_count: number;
  is_returning_visitor: boolean;
  first_visit_at: string;
} {
  let visitor_id = 'visitor_unknown';
  let session_id = 'session_unknown';
  let visit_count = 1;
  let first_visit_at = new Date().toISOString();

  try {
    const existingVisitor = localStorage.getItem('rc_visitor_id');
    if (existingVisitor) {
      visitor_id = existingVisitor;
    } else {
      visitor_id = generateEventId();
      localStorage.setItem('rc_visitor_id', visitor_id);
    }

    const existingFirstVisit = localStorage.getItem('rc_first_visit_at');
    if (existingFirstVisit) {
      first_visit_at = existingFirstVisit;
    } else {
      localStorage.setItem('rc_first_visit_at', first_visit_at);
    }

    const existingSession = sessionStorage.getItem('rc_session_id');
    if (existingSession) {
      session_id = existingSession;
      visit_count =
        parseInt(localStorage.getItem('rc_visit_count') || '1', 10) || 1;
    } else {
      session_id = generateEventId();
      sessionStorage.setItem('rc_session_id', session_id);
      const prevCount =
        parseInt(localStorage.getItem('rc_visit_count') || '0', 10) || 0;
      visit_count = prevCount + 1;
      localStorage.setItem('rc_visit_count', String(visit_count));
    }
  } catch {
    // ignore storage errors
  }

  return {
    visitor_id,
    session_id,
    visit_count,
    is_returning_visitor: visit_count > 1,
    first_visit_at,
  };
}

function getStoredParam(key: string): string | undefined {
  try {
    return sessionStorage.getItem(`rc_${key}`) || undefined;
  } catch {
    return undefined;
  }
}

export function getClientEnvironmentContext(): ClientEnvironmentContext {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const {
    browser_name,
    browser_version,
    os_name,
    os_version,
    device_type,
    device_model,
  } = parseBrowserOsAndDevice(ua);

  const navAny =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & {
          deviceMemory?: number;
          pdfViewerEnabled?: boolean;
          connection?: {
            effectiveType?: string;
            type?: string;
            downlink?: number;
            rtt?: number;
            saveData?: boolean;
          };
        })
      : undefined;

  const conn = navAny?.connection;
  const gpu = getGpuInfo();
  const visitorMetrics = getVisitorAndSessionMetrics();

  const screen_resolution =
    typeof window !== 'undefined' && window.screen
      ? `${window.screen.width}x${window.screen.height}`
      : '';
  const screen_available_resolution =
    typeof window !== 'undefined' && window.screen
      ? `${window.screen.availWidth}x${window.screen.availHeight}`
      : '';
  const viewport_size =
    typeof window !== 'undefined'
      ? `${window.innerWidth}x${window.innerHeight}`
      : '';
  const device_pixel_ratio =
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const color_depth =
    typeof window !== 'undefined' && window.screen
      ? window.screen.colorDepth
      : undefined;
  const screen_orientation =
    typeof window !== 'undefined' && window.screen?.orientation
      ? window.screen.orientation.type
      : undefined;

  const color_scheme_preference: 'dark' | 'light' =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  const reduced_motion_preference =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const max_touch_points =
    typeof navigator !== 'undefined' ? navigator.maxTouchPoints || 0 : 0;
  const touch_support =
    max_touch_points > 0 ||
    (typeof window !== 'undefined' && 'ontouchstart' in window);

  const language =
    typeof navigator !== 'undefined' ? navigator.language || '' : '';
  const languages =
    typeof navigator !== 'undefined' && Array.isArray(navigator.languages)
      ? navigator.languages.join(',')
      : language;
  const timezone =
    typeof Intl !== 'undefined'
      ? Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      : '';

  return {
    // Network & Geo
    client_ip: cachedIpInfo.ip,
    client_country: cachedIpInfo.country,
    client_region: cachedIpInfo.region,
    client_city: cachedIpInfo.city,
    client_postal_code: cachedIpInfo.postalCode,
    client_latitude: cachedIpInfo.latitude,
    client_longitude: cachedIpInfo.longitude,
    client_asn: cachedIpInfo.asn,
    connection_effective_type: conn?.effectiveType,
    connection_type: conn?.type,
    connection_downlink_mbps: conn?.downlink,
    connection_rtt_ms: conn?.rtt,
    connection_save_data: conn?.saveData,
    online_status:
      typeof navigator !== 'undefined' ? navigator.onLine : true,

    // Browser, OS, Device Model & Client Hints
    user_agent: ua,
    browser_name,
    browser_version,
    os_name,
    os_version,
    device_type,
    device_vendor:
      typeof navigator !== 'undefined' ? navigator.vendor || '' : '',
    device_model,
    platform:
      typeof navigator !== 'undefined' ? navigator.platform || '' : '',
    cpu_architecture: cachedClientHints.architecture,
    cpu_bitness: cachedClientHints.bitness,

    // Hardware, CPU, RAM, GPU, Touch & Battery
    cpu_cores:
      typeof navigator !== 'undefined'
        ? navigator.hardwareConcurrency
        : undefined,
    device_memory_gb: navAny?.deviceMemory,
    gpu_vendor: gpu.vendor,
    gpu_renderer: gpu.renderer,
    touch_support,
    max_touch_points,
    battery_level_percent: cachedBatteryInfo.levelPercent,
    battery_charging: cachedBatteryInfo.charging,

    // Display, Screen & Preferences
    screen_resolution,
    screen_available_resolution,
    viewport_size,
    device_pixel_ratio,
    color_depth,
    screen_orientation,
    color_scheme_preference,
    reduced_motion_preference,

    // Locale, Time, Capabilities & Bot Detection
    language,
    languages,
    timezone,
    timezone_offset_minutes: new Date().getTimezoneOffset(),
    cookies_enabled:
      typeof navigator !== 'undefined' ? navigator.cookieEnabled : true,
    do_not_track:
      typeof navigator !== 'undefined'
        ? navigator.doNotTrack || undefined
        : undefined,
    is_automated_webdriver:
      typeof navigator !== 'undefined' ? Boolean(navigator.webdriver) : false,
    pdf_viewer_enabled: navAny?.pdfViewerEnabled,

    // Visitor, Session & Attribution
    ...visitorMetrics,
    landing_page:
      getStoredParam('landing_page') ||
      (typeof window !== 'undefined' ? window.location.pathname : '/'),
    referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
    initial_referrer: getStoredParam('initial_referrer') || 'direct',
    utm_source: getStoredParam('utm_source'),
    utm_medium: getStoredParam('utm_medium'),
    utm_campaign: getStoredParam('utm_campaign'),
    utm_term: getStoredParam('utm_term'),
    utm_content: getStoredParam('utm_content'),
    gclid: getStoredParam('gclid'),
    fbclid: getStoredParam('fbclid'),
  };
}

/**
 * Core unified dispatcher:
 * 1) Pushes custom + standard events to GTM `window.dataLayer` (feeds GA4 & Google Ads)
 * 2) Fires Meta Pixel (`window.fbq`) in browser with `{ eventID }`
 * 3) Sends to `/api/track` (Server-side Meta CAPI) with the exact same `eventId`:
 *    - If Pixel is active: Meta deduplicates Browser + Server by `event_id`
 *    - If Pixel is blocked by AdBlocker/Brave/ITP: Server CAPI automatically acts as fallback
 */
export function trackUnifiedEvent(options: UnifiedEventOptions): string {
  const eventId = options.eventId || generateEventId();
  if (typeof window === 'undefined') return eventId;

  const pagePath = window.location.pathname;
  const pageUrl = window.location.href;
  const clientEnv = getClientEnvironmentContext();
  const sessionForm = getSessionFormContext();
  const baseParams: Record<string, unknown> = {
    page_path: pagePath,
    page_location: pageUrl,
    ...clientEnv,
    ...sessionForm,
    ...options.params,
  };

  if (IS_DEV) {
    console.log(
      `%c[Tracking]%c ${options.event}`,
      'background:#c70017;color:#fff;padding:2px 6px;border-radius:4px;font-weight:bold;',
      'font-weight:bold;color:#1E2C32;',
      {
        eventId,
        customEvent: options.event,
        ga4StandardEvent: options.ga4StandardEvent ?? null,
        metaStandardEvent: options.metaStandardEvent ?? null,
        metaTrackingEnabled: META_TRACKING_ENABLED,
        params: baseParams,
      },
    );
  }

  // 1. GTM dataLayer -> Google Ads & GA4
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: options.event,
    event_id: eventId,
    ...baseParams,
  });

  if (
    options.ga4StandardEvent &&
    options.ga4StandardEvent !== options.event
  ) {
    window.dataLayer.push({
      event: options.ga4StandardEvent,
      event_id: `${eventId}_ga4`,
      custom_event_name: options.event,
      ...baseParams,
    });
  }

  // Only run Meta Pixel + Meta CAPI when META_TRACKING_ENABLED is true (or in dev mode for server terminal logging)
  if (!META_TRACKING_ENABLED && !IS_DEV) {
    return eventId;
  }

  // 2. Meta Pixel (Browser) — Standard + Custom event with eventID for CAPI deduplication
  const pixelAvailable =
    META_TRACKING_ENABLED && typeof window.fbq === 'function';
  const customEventId = `${eventId}_custom`;

  if (META_TRACKING_ENABLED && pixelAvailable && window.fbq) {
    if (options.metaStandardEvent) {
      window.fbq('track', options.metaStandardEvent, baseParams, {
        eventID: eventId,
      });
    }
    if (options.event !== options.metaStandardEvent) {
      window.fbq('trackCustom', options.event, baseParams, {
        eventID: customEventId,
      });
    }
  }

  if (options.skipCapiEndpoint) {
    return eventId;
  }

  // 3. Server-side Meta CAPI (/api/track) — always sent with matching event_id
  // Deduplicates when Pixel succeeded; acts as 100% fallback when Pixel is blocked
  const capiEvents: Array<{
    eventName: string;
    eventId: string;
    eventSourceUrl: string;
    customData: Record<string, unknown>;
    userData?: Record<string, string | undefined>;
  }> = [];

  const userPayload = {
    fullName:
      options.userData?.fullName || sessionForm.full_name || undefined,
    email: options.userData?.email || sessionForm.email || undefined,
    phone: options.userData?.phone || sessionForm.phone || undefined,
    fbp: getCookie('_fbp'),
    fbc: getFbc(),
  };

  if (options.metaStandardEvent) {
    capiEvents.push({
      eventName: options.metaStandardEvent,
      eventId,
      eventSourceUrl: pageUrl,
      customData: {
        ...baseParams,
        pixel_loaded: pixelAvailable,
      },
      userData: userPayload,
    });
  }

  if (options.event !== options.metaStandardEvent) {
    capiEvents.push({
      eventName: options.event,
      eventId: customEventId,
      eventSourceUrl: pageUrl,
      customData: {
        ...baseParams,
        pixel_loaded: pixelAvailable,
      },
      userData: userPayload,
    });
  }

  const body = JSON.stringify({ events: capiEvents });

  try {
    if (
      options.useBeacon &&
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function'
    ) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {
        // Ignore network errors on client tracking
      });
    }
  } catch {
    // Ignore errors
  }

  return eventId;
}

// ============================================================================
// High-Level Tracking Helpers (Used Across Components)
// ============================================================================

/** 1. Page View (every route navigation) */
export function trackPageView(pagePath?: string): void {
  trackUnifiedEvent({
    event: 'page_view',
    metaStandardEvent: 'PageView',
    params: {
      page_path:
        pagePath ??
        (typeof window !== 'undefined' ? window.location.pathname : '/'),
      page_title: typeof document !== 'undefined' ? document.title : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    },
  });
}

/** 2. Service Page View (/core-drilling, /slab-cutting, etc.) */
export function trackViewService(serviceName: string, pagePath: string): void {
  trackUnifiedEvent({
    event: 'view_service',
    ga4StandardEvent: 'view_item',
    metaStandardEvent: 'ViewContent',
    params: {
      service_name: serviceName,
      content_name: serviceName,
      content_category: 'service_page',
      page_path: pagePath,
    },
  });
}

/** 3. Service Card Button Click ("View services" in OurServices section) */
export function trackServiceCardClick(
  serviceName: string,
  destinationUrl: string,
): void {
  trackUnifiedEvent({
    event: 'service_card_click',
    ga4StandardEvent: 'select_content',
    metaStandardEvent: 'ViewContent',
    params: {
      content_type: 'service_card',
      service_name: serviceName,
      content_name: serviceName,
      destination_url: destinationUrl,
    },
  });
}

/** 4. Open "Get a Quote" Modal */
export function trackQuoteModalOpen(triggerLocation = 'unknown'): void {
  trackUnifiedEvent({
    event: 'quote_modal_open',
    metaStandardEvent: 'InitiateCheckout',
    params: {
      trigger_location: triggerLocation,
      content_name: 'Get a Same-Day Quote Modal',
    },
  });
}

/** 5. Form Start (first field focus/input in Quote or Consultation form) */
export function trackFormStart(formType: 'quote' | 'consultation'): void {
  trackUnifiedEvent({
    event: 'form_start',
    ga4StandardEvent: 'form_start',
    params: {
      form_type: formType,
    },
  });
}

/** 6. Form Field Interaction (selecting service, offer, or typing fields) */
export function trackFormFieldChange(
  formType: 'quote' | 'consultation',
  fieldName: string,
  fieldValue: string | number,
): void {
  if (typeof fieldValue === 'string') {
    if (fieldName === 'fullName' || fieldName === 'contactName')
      updateSessionFormContext({ full_name: fieldValue });
    else if (fieldName === 'phone' || fieldName === 'contactPhone')
      updateSessionFormContext({ phone: fieldValue });
    else if (fieldName === 'email' || fieldName === 'contactEmail')
      updateSessionFormContext({ email: fieldValue });
    else if (fieldName === 'offer')
      updateSessionFormContext({ offer_name: fieldValue });
    else if (fieldName === 'service')
      updateSessionFormContext({ service_name: fieldValue });
    else if (fieldName === 'message')
      updateSessionFormContext({ message: fieldValue });
  }
  trackUnifiedEvent({
    event: 'form_field_change',
    params: {
      form_type: formType,
      field_name: fieldName,
      field_value: fieldValue,
    },
  });
}

/** 7. Form Step 2: Callback Day/Time Picker Opened (with plain form fields) */
export function trackFormCallbackStepOpen(
  formType: 'quote' | 'consultation',
  formValues?: {
    fullName?: string;
    phone?: string;
    email?: string;
    offer?: string;
    service?: string;
    message?: string;
  },
): void {
  if (formValues) {
    updateSessionFormContext({
      full_name: formValues.fullName,
      phone: formValues.phone,
      email: formValues.email,
      offer_name: formValues.offer,
      service_name: formValues.service,
      message: formValues.message,
    });
  }
  trackUnifiedEvent({
    event: 'form_callback_step_open',
    userData: formValues
      ? {
          fullName: formValues.fullName,
          email: formValues.email,
          phone: formValues.phone,
        }
      : undefined,
    params: {
      form_type: formType,
      full_name: formValues?.fullName || undefined,
      phone: formValues?.phone || undefined,
      email: formValues?.email || undefined,
      offer_name: formValues?.offer || undefined,
      service_name: formValues?.service || undefined,
      message: formValues?.message || undefined,
    },
  });
}

/** 8. Form Abandonment (closed modal or left page without submitting — with plain values) */
export function trackFormAbandon(options: {
  formType: 'quote' | 'consultation';
  abandonedAtStep: 'modal_opened' | 'filling_fields' | 'picking_callback_time';
  filledFields: string[];
  formValues?: {
    fullName?: string;
    phone?: string;
    email?: string;
    offer?: string;
    service?: string;
    message?: string;
  };
  timeSpentSeconds: number;
  useBeacon?: boolean;
}): void {
  if (options.formValues) {
    updateSessionFormContext({
      full_name: options.formValues.fullName,
      phone: options.formValues.phone,
      email: options.formValues.email,
      offer_name: options.formValues.offer,
      service_name: options.formValues.service,
      message: options.formValues.message,
    });
  }
  trackUnifiedEvent({
    event: 'form_abandon',
    useBeacon: options.useBeacon,
    userData: options.formValues
      ? {
          fullName: options.formValues.fullName,
          email: options.formValues.email,
          phone: options.formValues.phone,
        }
      : undefined,
    params: {
      form_type: options.formType,
      abandoned_at_step: options.abandonedAtStep,
      filled_fields: options.filledFields.join(',') || 'none',
      filled_fields_count: options.filledFields.length,
      full_name: options.formValues?.fullName || undefined,
      phone: options.formValues?.phone || undefined,
      email: options.formValues?.email || undefined,
      offer_name: options.formValues?.offer || undefined,
      service_name: options.formValues?.service || undefined,
      message: options.formValues?.message || undefined,
      time_spent_seconds: options.timeSpentSeconds,
    },
  });
}

/** 9. Successful Form Submission (Quote or Consultation — with plain form data) */
export function trackFormConversion(
  formType: 'quote' | 'consultation' = 'quote',
  details?: {
    service?: string;
    offer?: string;
    message?: string;
    callbackDay?: string;
    callbackTime?: string;
    userData?: UserContactInfo;
    eventId?: string;
  },
): string {
  updateSessionFormContext({
    full_name: details?.userData?.fullName,
    phone: details?.userData?.phone,
    email: details?.userData?.email,
    service_name: details?.service,
    offer_name: details?.offer,
    message: details?.message,
    callback_day: details?.callbackDay,
    callback_time: details?.callbackTime,
  });
  return trackUnifiedEvent({
    event: 'form_submission',
    ga4StandardEvent: 'generate_lead',
    metaStandardEvent: 'Lead',
    eventId: details?.eventId,
    userData: details?.userData,
    params: {
      form_type: formType,
      full_name: details?.userData?.fullName || undefined,
      phone: details?.userData?.phone || undefined,
      email: details?.userData?.email || undefined,
      service_name: details?.service || undefined,
      offer_name: details?.offer || undefined,
      message: details?.message || undefined,
      callback_day: details?.callbackDay || undefined,
      callback_time: details?.callbackTime || undefined,
      currency: 'USD',
    },
  });
}

/** 10. Phone Click */
export function trackPhoneClick(clickLocation = 'unknown'): void {
  trackUnifiedEvent({
    event: 'phone_click',
    ga4StandardEvent: 'contact',
    metaStandardEvent: 'Contact',
    params: {
      contact_method: 'phone',
      phone_number: '+14136662026',
      click_location: clickLocation,
    },
  });
}

/** 11. Email Click or Copy */
export function trackEmailClick(clickLocation = 'unknown'): void {
  trackUnifiedEvent({
    event: 'email_click',
    ga4StandardEvent: 'contact',
    metaStandardEvent: 'Contact',
    params: {
      contact_method: 'email',
      email_address: 'redcoreusa@gmail.com',
      click_location: clickLocation,
    },
  });
}

/** 12. Social Media Link Click */
export function trackSocialClick(
  platform: string,
  destinationUrl: string,
): void {
  trackUnifiedEvent({
    event: 'social_click',
    params: {
      social_platform: platform,
      destination_url: destinationUrl,
    },
  });
}

/** 13. Project Image Click (Open Full-Screen Lightbox on Service Page) */
export function trackProjectImageOpen(options: {
  projectTitle: string;
  projectLocation?: string;
  imageIndex: number;
  totalImages: number;
  imageAlt: string;
}): void {
  trackUnifiedEvent({
    event: 'project_image_open',
    ga4StandardEvent: 'select_content',
    metaStandardEvent: 'ViewContent',
    params: {
      content_type: 'project_image',
      project_title: options.projectTitle,
      project_location: options.projectLocation,
      image_index: options.imageIndex + 1,
      total_images: options.totalImages,
      image_alt: options.imageAlt,
    },
  });
}

/** 14. In-Page Project Image Slider / Dots Pagination */
export function trackProjectImageCarouselChange(options: {
  projectTitle: string;
  slideIndex: number;
  totalSlides: number;
  interactionType: 'carousel' | 'dots';
}): void {
  trackUnifiedEvent({
    event: 'project_image_carousel_change',
    params: {
      project_title: options.projectTitle,
      slide_index: options.slideIndex + 1,
      total_slides: options.totalSlides,
      interaction_type: options.interactionType,
    },
  });
}

/** 15. Full-Screen Lightbox Image Navigation (Prev / Next / Thumbnail / Swipe / Keyboard) */
export function trackLightboxImageChange(options: {
  projectTitle?: string;
  imageIndex: number;
  totalImages: number;
  imageAlt: string;
  navigationMethod: 'prev' | 'next' | 'thumbnail';
}): void {
  trackUnifiedEvent({
    event: 'lightbox_image_change',
    params: {
      project_title: options.projectTitle || 'gallery',
      image_index: options.imageIndex + 1,
      total_images: options.totalImages,
      image_alt: options.imageAlt,
      navigation_method: options.navigationMethod,
    },
  });
}

/** 16. Full-Screen Lightbox Close (with time spent & photos viewed count) */
export function trackLightboxClose(options: {
  projectTitle?: string;
  durationSeconds: number;
  imagesViewedCount: number;
}): void {
  trackUnifiedEvent({
    event: 'lightbox_close',
    params: {
      project_title: options.projectTitle || 'gallery',
      duration_seconds: options.durationSeconds,
      images_viewed_count: options.imagesViewedCount,
    },
  });
}

/** 17. Service Page Projects Pagination (Page 1, 2, 3...) */
export function trackProjectsPageChange(options: {
  fromPage: number;
  toPage: number;
  totalPages: number;
  totalProjects: number;
}): void {
  trackUnifiedEvent({
    event: 'projects_page_change',
    params: {
      from_page: options.fromPage,
      to_page: options.toPage,
      total_pages: options.totalPages,
      total_projects: options.totalProjects,
    },
  });
}

/** 18. Offers Carousel Slide Change */
export function trackOfferSlideChange(
  slideIndex: number,
  totalSlides: number,
  offerAlt: string,
): void {
  trackUnifiedEvent({
    event: 'offer_slide_change',
    params: {
      slide_index: slideIndex + 1,
      total_slides: totalSlides,
      offer_name: offerAlt,
    },
  });
}

/** 19. Navbar / Footer Scroll-to-Section Click */
export function trackNavScrollToSection(targetSection: string): void {
  trackUnifiedEvent({
    event: 'nav_scroll_to_section',
    params: {
      target_section: targetSection,
    },
  });
}

/** 20. Section Entered Viewport */
export function trackSectionView(sectionId: string): void {
  trackUnifiedEvent({
    event: 'section_view',
    params: {
      section_id: sectionId,
    },
  });
}

/** 21. Time Spent Viewing a Single Section */
export function trackSectionTimeSpent(
  sectionId: string,
  durationSeconds: number,
  useBeacon = false,
): void {
  trackUnifiedEvent({
    event: 'section_time_spent',
    useBeacon,
    params: {
      section_id: sectionId,
      duration_seconds: durationSeconds,
    },
  });
}

/** 22. Time Spent on Page (Milestones & Exit) */
export function trackPageTimeSpent(options: {
  durationSeconds: number;
  maxScrollPercent: number;
  triggerType: 'milestone' | 'page_leave';
  useBeacon?: boolean;
}): void {
  trackUnifiedEvent({
    event: 'page_time_spent',
    useBeacon: options.useBeacon,
    params: {
      duration_seconds: options.durationSeconds,
      max_scroll_percent: options.maxScrollPercent,
      trigger_type: options.triggerType,
    },
  });
}

/** 23. Page Scroll Depth Milestone (25%, 50%, 75%, 90%, 100%) */
export function trackScrollDepth(depthPercent: number): void {
  trackUnifiedEvent({
    event: 'scroll_depth',
    params: {
      depth_percent: depthPercent,
    },
  });
}

/** 24. Global Button / CTA Click */
export function trackButtonClick(options: {
  buttonText: string;
  sectionId: string;
  destinationUrl?: string;
}): void {
  trackUnifiedEvent({
    event: 'button_click',
    params: {
      button_text: options.buttonText,
      section_id: options.sectionId,
      destination_url: options.destinationUrl,
    },
  });
}
