import * as React from 'react';

const BASE_URL = 'https://redcoreconcrete.com';

interface ConfirmationTemplateProps {
  fullName: string;
  kind: 'quote' | 'consultation';
}

// Customer-facing auto-reply sent by /api/get-a-quote and /api/contact-us.
// TODO: replace body copy with the client-approved text when it arrives.
export function ConfirmationTemplate({
  fullName,
  kind,
}: ConfirmationTemplateProps) {
  const requestLabel =
    kind === 'quote' ? 'quote request' : 'free consultation request';

  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: '#E0E0E2', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#E0E0E2', padding: '40px 0' }}>
        <tbody>
          <tr>
            <td align="center">
              <table width={600} cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#ffffff', borderRadius: 0, overflow: 'hidden' }}>
                <tbody>
                  {/* Logo bar */}
                  <tr>
                    <td style={{ backgroundColor: '#ffffff', padding: '24px 40px' }}>
                      <img
                        src={`${BASE_URL}/logo.svg`}
                        alt="Red Core"
                        width={160}
                        height={30}
                        style={{ display: 'block' }}
                      />
                    </td>
                  </tr>
                  {/* Red accent line */}
                  <tr>
                    <td style={{ backgroundColor: '#C70017', height: 4, fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
                  </tr>
                  {/* Title section */}
                  <tr>
                    <td style={{ padding: '36px 40px 20px' }}>
                      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#1E2C32', textTransform: 'uppercase', letterSpacing: -0.5 }}>
                        Request Received
                      </h1>
                      <p style={{ margin: '8px 0 0', fontSize: 15, color: '#6b7280', lineHeight: '1.5' }}>
                        Thank you for reaching out to Red Core.
                      </p>
                    </td>
                  </tr>
                  {/* Divider */}
                  <tr>
                    <td style={{ padding: '0 40px' }}>
                      <div style={{ borderBottom: '2px solid #C70017', width: 48 }} />
                    </td>
                  </tr>
                  {/* Body */}
                  <tr>
                    <td style={{ padding: '24px 40px 8px' }}>
                      <p style={{ margin: 0, fontSize: 16, color: '#1E2C32', lineHeight: '1.6' }}>
                        Hi {fullName},
                      </p>
                      <p style={{ margin: '16px 0 0', fontSize: 16, color: '#1E2C32', lineHeight: '1.6' }}>
                        We&apos;ve received your {requestLabel}. Our team will
                        review it and get back to you shortly &mdash; usually
                        within one business day.
                      </p>
                      <p style={{ margin: '16px 0 0', fontSize: 16, color: '#1E2C32', lineHeight: '1.6' }}>
                        If your request is urgent, feel free to call us directly
                        at{' '}
                        <a href="tel:+14136662026" style={{ color: '#C70017', fontWeight: 700, textDecoration: 'none' }}>
                          (413)-666-2026
                        </a>
                        .
                      </p>
                      <p style={{ margin: '24px 0 32px', fontSize: 16, color: '#1E2C32', lineHeight: '1.6' }}>
                        &mdash; The Red Core team
                      </p>
                    </td>
                  </tr>
                  {/* Footer */}
                  <tr>
                    <td style={{ backgroundColor: '#1E2C32', padding: '24px 40px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: 13, color: '#ffffff' }}>
                        Red Core Company &bull; (413)-666-2026 &bull; redcoreusa@gmail.com
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 11, color: '#cbd5e1' }}>
                        321 Springfield St, Agawam, MA
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
