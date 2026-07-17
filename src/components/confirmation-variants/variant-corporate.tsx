import * as React from 'react';
import {
  BRAND,
  COLORS,
  COPY,
  DISPLAY,
  FONT,
  Fonts,
  PM,
  SERVICES,
  Button,
  type ConfirmationVariantProps,
} from './shared';

const P_STYLE: React.CSSProperties = {
  margin: '18px 0 0',
  fontSize: 15,
  color: '#4b5563',
  lineHeight: '1.75',
};

/**
 * Variant A — "Clean Classic".
 * Flat white card on a light gray page. Centered logo & CTA, left-aligned
 * body copy, hairline PM contact box, quiet footer outside the card.
 */
export function ConfirmationCorporate({ fullName, referenceId }: ConfirmationVariantProps) {
  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: '#f0f0f0', fontFamily: FONT }}>
      <Fonts />
      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: '#f0f0f0', padding: '48px 0 0' }}>
        <tbody>
          <tr>
            <td align="center">
              {/* Card */}
              <table width={768} cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: COLORS.paper }}>
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: '52px 56px 0' }}>
                      <img src={BRAND.logo} alt={BRAND.name} width={200} height={38} style={{ display: 'block', border: 0 }} />
                    </td>
                  </tr>

                  {/* Body copy */}
                  <tr>
                    <td align="left" style={{ padding: '44px 56px 0' }}>
                      <p style={{ margin: 0, fontSize: 16, color: COLORS.slate, lineHeight: '1.6' }}>
                        Hello {fullName.trim()},
                      </p>
                      <p style={{ margin: '16px 0 0', fontSize: 17, fontWeight: 700, color: COLORS.slate, lineHeight: '1.5' }}>
                        {COPY.thanks}
                      </p>
                      <p style={P_STYLE}>{COPY.received}</p>
                      <p style={P_STYLE}>{COPY.contact}</p>
                      <p style={P_STYLE}>{COPY.appreciation}</p>
                    </td>
                  </tr>

                  {/* CTA */}
                  <tr>
                    <td align="center" style={{ padding: '30px 56px 0' }}>
                      <Button href={BRAND.url} label="VISIT OUR WEBSITE" padding="16px 40px" letterSpacing={1} radius={3} />
                      <p style={{ margin: '14px 0 0', fontSize: 13, color: COLORS.mutedLight }}>
                        or call{' '}
                        <a href={PM.phoneHref} style={{ color: COLORS.red, fontWeight: 700, textDecoration: 'none' }}>{PM.phone}</a>
                      </p>
                    </td>
                  </tr>

                  {/* Urgent line + PM contact box (phone sits low, near sign-off) */}
                  <tr>
                    <td align="left" style={{ padding: '30px 56px 0' }}>
                      <p style={{ margin: 0, fontSize: 15, color: '#4b5563', lineHeight: '1.75' }}>{COPY.urgent}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '20px 56px 0' }}>
                      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ border: `1px solid ${COLORS.hairline}` }}>
                        <tbody>
                          <tr>
                            <td align="center" style={{ padding: '22px 24px' }}>
                              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: COLORS.slate }}>{PM.name}</p>
                              <p style={{ margin: '4px 0 0', fontSize: 11, fontWeight: 700, color: COLORS.mutedLight, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                                {PM.role}
                              </p>
                              <p style={{ margin: '12px 0 0', fontSize: 14, color: '#4b5563', lineHeight: '1.8' }}>
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

                  {/* Sign-off */}
                  <tr>
                    <td align="center" style={{ padding: '34px 56px 48px' }}>
                      <div style={{ borderTop: `1px solid ${COLORS.hairline}`, width: 90, margin: '0 auto', fontSize: 0, lineHeight: 0 }}>&nbsp;</div>
                      <p style={{ margin: '26px 0 0', fontSize: 15, color: '#4b5563', lineHeight: '1.5' }}>{COPY.signoff}</p>
                      <p style={{ margin: '8px 0 0', fontFamily: DISPLAY, fontSize: 15, fontWeight: 700, color: COLORS.slate, letterSpacing: 0.5 }}>
                        REDCORE TEAM
                      </p>
                      <p style={{ margin: '8px 0 0', fontSize: 12, fontStyle: 'italic', color: COLORS.mutedLight }}>{COPY.tagline}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Quiet footer outside the card */}
              <table width={768} cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: '28px 40px 8px' }}>
                      <p style={{ margin: 0, fontSize: 12, color: COLORS.muted, lineHeight: '1.8' }}>
                        {SERVICES.map((s, i) => (
                          <React.Fragment key={s.href}>
                            {i > 0 && <span style={{ color: '#c4c8cc' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                            <a href={s.href} style={{ color: COLORS.muted, textDecoration: 'none' }}>{s.label}</a>
                          </React.Fragment>
                        ))}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: '10px 40px 48px' }}>
                      {referenceId && (
                        <p style={{ margin: '0 0 8px', fontSize: 11, color: COLORS.mutedLight }}>
                          Reference {referenceId}
                        </p>
                      )}
                      <p style={{ margin: 0, fontSize: 12, color: COLORS.mutedLight, lineHeight: '1.8' }}>
                        <span style={{ fontWeight: 700, color: COLORS.muted }}>{BRAND.company}</span> &middot; {BRAND.phone} &middot; {BRAND.email}
                        <br />
                        {BRAND.address}
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
