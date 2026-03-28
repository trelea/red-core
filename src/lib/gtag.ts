const AW_CONVERSION_ID = 'AW-17966730832';
const AW_CONVERSION_LABEL = 'QB3ZCIXtrI4cENCcmvdC';

/** Fire a Google Ads conversion event after successful form submission */
export function trackFormConversion(): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${AW_CONVERSION_ID}/${AW_CONVERSION_LABEL}`,
    });
  }
}

/** Fire a Google Ads conversion event on phone link click */
export function trackPhoneClick(): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${AW_CONVERSION_ID}/${AW_CONVERSION_LABEL}`,
    });
  }
}
