function pushToDataLayer(payload: Record<string, unknown>): void {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }
}

/** Push a GTM event after a successful form submission */
export function trackFormConversion(
  formType: 'quote' | 'consultation' = 'quote',
): void {
  pushToDataLayer({
    event: 'form_submission',
    form_type: formType,
  });
}

/** Push a GTM event on phone link click */
export function trackPhoneClick(): void {
  pushToDataLayer({
    event: 'phone_click',
  });
}

/** Push a GTM event on email link click */
export function trackEmailClick(): void {
  pushToDataLayer({
    event: 'email_click',
  });
}
