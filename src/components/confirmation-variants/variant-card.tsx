import * as React from 'react';
import {
  BRAND,
  COLORS,
  COPY,
  DISPLAY,
  FONT,
  Fonts,
  PM,
  Button,
  type ConfirmationVariantProps,
} from './shared';

const STRIP = [
  { glyph: '✓', label: 'Received', done: true },
  { glyph: '2', label: 'Review', done: false },
  { glyph: '3', label: 'Callback', done: false },
];

const P_STYLE: React.CSSProperties = {
  margin: '16px 0 0',
  fontSize: 14,
  color: '#4b5563',
  lineHeight: '1.75',
};

/**
 * Variant C — "Status Strip".
 * Slate hero (display heading + pill CTA), minimal 3-step progress strip,
 * left-aligned approved copy and a red-border PM contact row.
 */
export function ConfirmationCard({ referenceId }: ConfirmationVariantProps) {
  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: '#f0f0f0', fontFamily: FONT }}>
      <Fonts />
      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: '#f0f0f0', padding: '48px 0 0' }}>
        <tbody>
          <tr>
            <td align="center">
              <table width={560} cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: COLORS.paper }}>
                <tbody>
                  {/* Logo */}
                  <tr>
                    <td align="center" style={{ padding: '36px 56px 28px' }}>
                      <img src={BRAND.logo} alt={BRAND.name} width={150} height={25} style={{ display: 'block', border: 0 }} />
                    </td>
                  </tr>

                  {/* Slate hero */}
                  <tr>
                    <td align="center" style={{ backgroundColor: COLORS.slate, padding: '48px 60px' }}>
                      <h1 style={{ margin: 0, fontFamily: DISPLAY, fontSize: 19, fontWeight: 700, color: '#ffffff', lineHeight: '1.4', letterSpacing: 0.5 }}>
                        REQUEST RECEIVED
                      </h1>
                      <p style={{ margin: '14px 0 0', fontSize: 14, color: '#aeb9bf', lineHeight: '1.7' }}>
                        {COPY.thanks}
                      </p>
                      <div style={{ marginTop: 26 }}>
                        <Button href={PM.phoneHref} label="Call your Project Manager" fontSize={13} padding="13px 30px" radius={999} letterSpacing={0.3} />
                      </div>
                    </td>
                  </tr>

                  {/* 3-step strip */}
                  <tr>
                    <td align="center" style={{ padding: '38px 56px 0' }}>
                      <table cellPadding={0} cellSpacing={0} role="presentation" align="center" style={{ margin: '0 auto' }}>
                        <tbody>
                          <tr>
                            {STRIP.map((s, i) => (
                              <React.Fragment key={s.label}>
                                {i > 0 && (
                                  <td style={{ width: 56, verticalAlign: 'top', paddingTop: 21 }}>
                                    <div style={{ borderTop: `1px dashed #d3d7da`, fontSize: 0, lineHeight: 0 }}>&nbsp;</div>
                                  </td>
                                )}
                                <td align="center" style={{ verticalAlign: 'top' }}>
                                  <table cellPadding={0} cellSpacing={0} role="presentation" align="center" style={{ margin: '0 auto' }}>
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          valign="middle"
                                          style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 42,
                                            backgroundColor: s.done ? COLORS.red : '#ffffff',
                                            border: s.done ? `1px solid ${COLORS.red}` : `1px solid #d3d7da`,
                                            color: s.done ? '#ffffff' : COLORS.mutedLight,
                                            fontSize: 15,
                                            fontWeight: 700,
                                            textAlign: 'center',
                                            lineHeight: '42px',
                                          }}
                                        >
                                          {s.glyph}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p style={{ margin: '10px 0 0', fontSize: 11, fontWeight: 700, color: s.done ? COLORS.slate : COLORS.mutedLight, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    {s.label}
                                  </p>
                                </td>
                              </React.Fragment>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Body copy */}
                  <tr>
                    <td align="left" style={{ padding: '22px 56px 0' }}>
                      <p style={{ ...P_STYLE, margin: '16px 0 0' }}>{COPY.received}</p>
                      <p style={P_STYLE}>{COPY.contact}</p>
                      <p style={P_STYLE}>{COPY.urgent}</p>
                    </td>
                  </tr>

                  {/* PM contact row */}
                  <tr>
                    <td style={{ padding: '22px 56px 0' }}>
                      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                        <tbody>
                          <tr>
                            <td style={{ borderLeft: `3px solid ${COLORS.red}`, padding: '4px 0 4px 18px' }}>
                              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: COLORS.slate }}>
                                {PM.name}
                                <span style={{ fontWeight: 400, color: COLORS.mutedLight }}> &middot; {PM.role}</span>
                              </p>
                              <p style={{ margin: '8px 0 0', fontSize: 13, color: '#4b5563', lineHeight: '1.8' }}>
                                Phone:{' '}
                                <a href={PM.phoneHref} style={{ color: COLORS.red, fontWeight: 700, textDecoration: 'none' }}>{PM.phone}</a>
                                <br />
                                Website:{' '}
                                <a href={BRAND.url} style={{ color: COLORS.slate, fontWeight: 700, textDecoration: 'none' }}>{BRAND.domain}</a>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Appreciation + sign-off */}
                  <tr>
                    <td align="left" style={{ padding: '22px 56px 0' }}>
                      <p style={{ margin: 0, fontSize: 14, color: '#4b5563', lineHeight: '1.75' }}>{COPY.appreciation}</p>
                      <p style={{ margin: '24px 0 0', fontSize: 14, color: '#4b5563' }}>{COPY.signoff}</p>
                      <p style={{ margin: '6px 0 0', fontFamily: DISPLAY, fontSize: 12, fontWeight: 700, color: COLORS.slate, letterSpacing: 0.5 }}>
                        REDCORE TEAM
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 12, fontStyle: 'italic', color: COLORS.mutedLight }}>{COPY.tagline}</p>
                    </td>
                  </tr>

                  {/* Footer inside card */}
                  <tr>
                    <td align="center" style={{ padding: '34px 56px 44px' }}>
                      <div style={{ borderTop: `1px solid ${COLORS.hairline}`, width: '100%', fontSize: 0, lineHeight: 0 }}>&nbsp;</div>
                      {referenceId && (
                        <p style={{ margin: '20px 0 0', fontSize: 11, color: COLORS.mutedLight }}>
                          Reference {referenceId}
                        </p>
                      )}
                      <p style={{ margin: referenceId ? '8px 0 0' : '20px 0 0', fontSize: 11, color: COLORS.mutedLight, lineHeight: '1.9' }}>
                        {BRAND.company} &middot;{' '}
                        <a href={BRAND.phoneHref} style={{ color: COLORS.mutedLight, textDecoration: 'none' }}>{BRAND.phone}</a>
                        {' '}&middot;{' '}
                        <a href={`mailto:${BRAND.email}`} style={{ color: COLORS.mutedLight, textDecoration: 'none' }}>{BRAND.email}</a>
                        <br />
                        {BRAND.address}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table width={560} cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td style={{ height: 48, fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
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
