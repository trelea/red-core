import * as React from 'react';

const BASE_URL = 'https://redcoreconcrete.com';

interface ContactUsTemplateProps {
  fullName: string;
  phone: string;
  email: string;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <td style={{ padding: '16px 0', borderBottom: '1px solid #e5e7eb' }}>
        <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</span>
        <span style={{ display: 'block', marginTop: 6, fontSize: 16, color: '#1E2C32', fontWeight: 600, lineHeight: '1.5' }}>{children}</span>
      </td>
    </tr>
  );
}

export function ContactUsTemplate({
  fullName,
  phone,
  email,
}: ContactUsTemplateProps) {
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
                    <td style={{ backgroundColor: '#1E2C32', padding: '24px 40px' }}>
                      <img
                        src={`${BASE_URL}/logo.png`}
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
                        Free Consultation
                      </h1>
                      <p style={{ margin: '8px 0 0', fontSize: 15, color: '#6b7280', lineHeight: '1.5' }}>
                        Someone requested a free consultation from the website.
                      </p>
                    </td>
                  </tr>
                  {/* Divider */}
                  <tr>
                    <td style={{ padding: '0 40px' }}>
                      <div style={{ borderBottom: '2px solid #C70017', width: 48 }} />
                    </td>
                  </tr>
                  {/* Fields */}
                  <tr>
                    <td style={{ padding: '8px 40px 32px' }}>
                      <table width="100%" cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <Field label="Full Name">{fullName}</Field>
                          <Field label="Phone">
                            <a href={`tel:${phone}`} style={{ color: '#1E2C32', textDecoration: 'none' }}>{phone}</a>
                          </Field>
                          <tr>
                            <td style={{ padding: '16px 0' }}>
                              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>Email</span>
                              <a href={`mailto:${email}`} style={{ display: 'block', marginTop: 6, fontSize: 16, color: '#1E2C32', fontWeight: 600, textDecoration: 'none' }}>{email}</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {/* Footer */}
                  <tr>
                    <td style={{ backgroundColor: '#1E2C32', padding: '24px 40px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: 13, color: '#ffffff', opacity: 0.5 }}>
                        Red Core Company &bull; (413)-666-2026 &bull; redcoreusa@gmail.com
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 11, color: '#ffffff', opacity: 0.3 }}>
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
