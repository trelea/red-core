interface Window {
  gtag?: (
    command: 'js' | 'config' | 'event',
    targetOrEvent: Date | string,
    params?: Record<string, unknown>,
  ) => void;
  dataLayer?: unknown[];
}
