import * as React from 'react';

/**
 * Shared brand tokens and small email-safe building blocks used by the four
 * confirmation-email variants. Inline styles + <table> layout only, so it
 * renders consistently across email clients — matching the hand-written style
 * of src/components/confirmation.template.tsx.
 */

export const BASE_URL = 'https://redcoreconcrete.com';

export const BRAND = {
  name: 'Red Core',
  company: 'REDCORE Company',
  url: BASE_URL,
  domain: 'redcoreconcrete.com',
  logo: `${BASE_URL}/logo.svg`,
  // Clients call the Project Manager's direct line (customer request).
  phone: '+1 (413) 250-2099',
  phoneHref: 'tel:+14132502099',
  email: 'redcoreusa@gmail.com',
  address: '321 Springfield St, Agawam, MA',
} as const;

export const COLORS = {
  red: '#C70017',
  slate: '#1E2C32',
  hairline: '#e5e7eb',
  muted: '#6b7280',
  mutedLight: '#9ca3af',
  paper: '#ffffff',
} as const;

// Matches the website's type pairing (src/lib/fonts.ts): Inter for text,
// Microgramma D Extended Bold for display headings. Clients that don't load
// web fonts (Gmail, Outlook) fall back to Helvetica/Arial gracefully.
export const FONT = "'Inter', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
export const DISPLAY = "'Microgramma', 'Arial Black', Arial, sans-serif";

/** Web-font loader — render once at the top of each variant. */
export function Fonts() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@font-face {
  font-family: 'Microgramma';
  src: url('${BASE_URL}/assets/Microgramma%20D%20Extended%20Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`,
      }}
    />
  );
}

/** Services link row used in quiet footers. */
export const SERVICES = [
  { label: 'Core Drilling', href: `${BASE_URL}/core-drilling` },
  { label: 'Slab Cutting', href: `${BASE_URL}/slab-cutting` },
  { label: 'Wall Saw', href: `${BASE_URL}/wall-saw-cutting` },
  { label: 'Demolition', href: `${BASE_URL}/demolition-cutting` },
] as const;

/** Project Manager direct contact shown in the email body. */
export const PM = {
  name: 'Serghei',
  role: 'Project Manager',
  phone: '+1 (413) 250-2099',
  phoneHref: 'tel:+14132502099',
} as const;

/** Client-approved confirmation copy — identical for quote & consultation. */
export const COPY = {
  greeting: 'Hello,',
  thanks: 'Thank you for choosing REDCORE.',
  received:
    'We have successfully received your project request and the information you provided. Your request has been forwarded to our Project Management Team for review.',
  contact:
    'A Project Manager will contact you shortly to discuss your project details, scope of work, scheduling, and the next steps.',
  urgent:
    'Our team is available to assist our clients 24/7. If your project is urgent or requires immediate assistance, you may contact our Project Manager directly:',
  appreciation:
    'We appreciate the opportunity to assist you and look forward to working with you.',
  signoff: 'Best regards,',
  team: 'REDCORE Team',
  tagline: 'Precision You Can Trust.',
} as const;

export interface ConfirmationVariantProps {
  fullName: string;
  kind: 'quote' | 'consultation';
  /** Optional reference id; shown as one tiny muted line, hidden when absent. */
  referenceId?: string;
}

/** Single bulletproof CTA button (rounded table cell). */
export function Button({
  href,
  label,
  fontSize = 14,
  padding = '14px 40px',
  radius = 4,
  letterSpacing = 0.5,
}: {
  href: string;
  label: string;
  fontSize?: number;
  padding?: string;
  radius?: number;
  letterSpacing?: number;
}) {
  return (
    <table cellPadding={0} cellSpacing={0} role="presentation" align="center" style={{ margin: '0 auto' }}>
      <tbody>
        <tr>
          <td style={{ borderRadius: radius, backgroundColor: COLORS.red }}>
            <a
              href={href}
              style={{
                display: 'inline-block',
                padding,
                fontFamily: FONT,
                fontSize,
                fontWeight: 700,
                lineHeight: '1',
                letterSpacing,
                textDecoration: 'none',
                color: '#ffffff',
                borderRadius: radius,
              }}
            >
              {label}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
