interface Window {
  dataLayer?: unknown[];
  fbq?: (
    command: 'init' | 'track' | 'trackCustom',
    eventNameOrId: string,
    params?: Record<string, unknown>,
    options?: { eventID?: string },
  ) => void;
  _fbq?: unknown;
}
