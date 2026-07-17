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

const P_STYLE: React.CSSProperties = {
  margin: '14px 0 0',
  fontSize: 13,
  color: COLORS.muted,
  lineHeight: '1.8',
};

/**
 * Variant B — "Red Check".
 * Light page, narrow white card whose top block is solid red with one large
 * thin checkmark. Compact copy, gray PM mini-card, one CTA, tiny footer below.
 */
export function ConfirmationIndustrial({ referenceId }: ConfirmationVariantProps) {
  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: '#f0f0f0', fontFamily: FONT }}>
      <Fonts />
      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: '#f0f0f0', padding: '52px 0 0' }}>
        <tbody>
          <tr>
            <td align="center">
              {/* Logo above the card */}
              <table width={480} cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td align="center" style={{ paddingBottom: 28 }}>
                      <img src={BRAND.logo} alt={BRAND.name} width={140} height={26} style={{ display: 'block', border: 0 }} />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Card */}
              <table width={480} cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: COLORS.paper }}>
                <tbody>
                  {/* Red block with large thin check */}
                  <tr>
                    <td
                      align="center"
                      valign="middle"
                      style={{
                        backgroundColor: '#e8384f',
                        height: 200,
                        textAlign: 'center',
                        color: '#ffffff',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontSize: 88,
                        fontWeight: 100,
                        lineHeight: '200px',
                      }}
                    >
                      &#10003;
                    </td>
                  </tr>
                  {/* Heading + copy */}
                  <tr>
                    <td align="center" style={{ padding: '38px 44px 0' }}>
                      <h1 style={{ margin: 0, fontFamily: DISPLAY, fontSize: 15, fontWeight: 700, color: '#20262b', lineHeight: '1.6', letterSpacing: 0.3 }}>
                        THANK YOU FOR
                        <br />
                        CHOOSING REDCORE
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style={{ padding: '10px 44px 0' }}>
                      <p style={P_STYLE}>{COPY.received}</p>
                      <p style={P_STYLE}>{COPY.contact}</p>
                      <p style={P_STYLE}>{COPY.urgent}</p>
                    </td>
                  </tr>

                  {/* PM mini-card */}
                  <tr>
                    <td style={{ padding: '20px 44px 0' }}>
                      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: '#f6f7f8', borderRadius: 6 }}>
                        <tbody>
                          <tr>
                            <td align="center" style={{ padding: '18px 20px' }}>
                              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#20262b' }}>{PM.name}</p>
                              <p style={{ margin: '3px 0 0', fontSize: 10, fontWeight: 700, color: COLORS.mutedLight, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                                {PM.role}
                              </p>
                              <p style={{ margin: '10px 0 0', fontSize: 13, color: COLORS.muted, lineHeight: '1.8' }}>
                                <a href={PM.phoneHref} style={{ color: COLORS.red, fontWeight: 700, textDecoration: 'none' }}>{PM.phone}</a>
                                <br />
                                <a href={BRAND.url} style={{ color: '#20262b', fontWeight: 700, textDecoration: 'none' }}>{BRAND.domain}</a>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Appreciation + CTA */}
                  <tr>
                    <td align="left" style={{ padding: '20px 44px 0' }}>
                      <p style={{ margin: 0, fontSize: 13, color: COLORS.muted, lineHeight: '1.8' }}>{COPY.appreciation}</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: '26px 44px 0' }}>
                      <Button href={PM.phoneHref} label={`Call ${PM.name}`} fontSize={13} padding="13px 34px" radius={5} letterSpacing={0.3} />
                      <p style={{ margin: '14px 0 0', fontSize: 12, color: COLORS.mutedLight }}>
                        or visit{' '}
                        <a href={BRAND.url} style={{ color: '#20262b', fontWeight: 700, textDecoration: 'none' }}>{BRAND.domain}</a>
                      </p>
                    </td>
                  </tr>

                  {/* Sign-off */}
                  <tr>
                    <td align="center" style={{ padding: '28px 44px 40px' }}>
                      <p style={{ margin: 0, fontSize: 13, color: COLORS.muted }}>{COPY.signoff}</p>
                      <p style={{ margin: '6px 0 0', fontFamily: DISPLAY, fontSize: 11, fontWeight: 700, color: '#20262b', letterSpacing: 0.5 }}>
                        REDCORE TEAM
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 11, fontStyle: 'italic', color: COLORS.mutedLight }}>{COPY.tagline}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Tiny footer below the card */}
              <table width={480} cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: '30px 40px 52px' }}>
                      {referenceId && (
                        <p style={{ margin: '0 0 8px', fontSize: 10, color: COLORS.mutedLight }}>
                          Reference {referenceId}
                        </p>
                      )}
                      <p style={{ margin: 0, fontSize: 10, color: COLORS.mutedLight, lineHeight: '1.9' }}>
                        {BRAND.company} &middot; {BRAND.address}
                        <br />
                        {BRAND.phone} &middot; {BRAND.email}
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
