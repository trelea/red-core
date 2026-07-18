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
  margin: '18px 0 0',
  fontSize: 15,
  color: COLORS.muted,
  lineHeight: '1.75',
};

/**
 * Variant D — "Big Type".
 * All-white, ultra minimal: thin red rule, small logo, oversized display
 * headline, left-aligned copy, minimal red-rule PM block and one CTA.
 */
export function ConfirmationPremium({ referenceId }: ConfirmationVariantProps) {
  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: '#ffffff', fontFamily: FONT }}>
      <Fonts />
      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: '#ffffff' }}>
        <tbody>
          {/* Thin red rule across the top */}
          <tr>
            <td style={{ backgroundColor: COLORS.red, height: 4, fontSize: 0, lineHeight: 0 }}>&nbsp;</td>
          </tr>
          <tr>
            <td align="center">
              <table width={560} cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  {/* Logo */}
                  <tr>
                    <td align="center" style={{ padding: '64px 60px 0' }}>
                      <img src={BRAND.logo} alt={BRAND.name} width={140} height={23} style={{ display: 'block', border: 0 }} />
                    </td>
                  </tr>

                  {/* Oversized headline */}
                  <tr>
                    <td align="center" style={{ padding: '64px 60px 0' }}>
                      <h1 style={{ margin: 0, fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, color: COLORS.slate, lineHeight: '1.25', letterSpacing: 0.5 }}>
                        REQUEST
                        <br />
                        RECEIVED<span style={{ color: COLORS.red }}>.</span>
                      </h1>
                    </td>
                  </tr>

                  {/* Body copy */}
                  <tr>
                    <td align="left" style={{ padding: '40px 60px 0' }}>
                      <p style={{ margin: 0, fontSize: 16, color: COLORS.slate, lineHeight: '1.6' }}>{COPY.greeting}</p>
                      <p style={{ margin: '16px 0 0', fontSize: 16, fontWeight: 700, color: COLORS.slate, lineHeight: '1.5' }}>
                        {COPY.thanks}
                      </p>
                      <p style={P_STYLE}>{COPY.received}</p>
                      <p style={P_STYLE}>{COPY.contact}</p>
                      <p style={P_STYLE}>{COPY.urgent}</p>
                    </td>
                  </tr>

                  {/* PM block */}
                  <tr>
                    <td style={{ padding: '26px 60px 0' }}>
                      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                        <tbody>
                          <tr>
                            <td style={{ borderLeft: `2px solid ${COLORS.red}`, padding: '4px 0 4px 20px' }}>
                              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: COLORS.slate }}>{PM.name}</p>
                              <p style={{ margin: '3px 0 0', fontSize: 11, fontWeight: 700, color: COLORS.mutedLight, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                                {PM.role}
                              </p>
                              <p style={{ margin: '10px 0 0', fontSize: 14, color: COLORS.muted, lineHeight: '1.8' }}>
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

                  {/* Appreciation + CTA */}
                  <tr>
                    <td align="left" style={{ padding: '26px 60px 0' }}>
                      <p style={{ margin: 0, fontSize: 15, color: COLORS.muted, lineHeight: '1.75' }}>{COPY.appreciation}</p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: '36px 60px 0' }}>
                      <Button href={PM.phoneHref} label={`Call ${PM.phone}`} fontSize={14} padding="15px 38px" radius={4} letterSpacing={0.3} />
                      <p style={{ margin: '16px 0 0', fontSize: 13, color: COLORS.mutedLight }}>
                        <a href={BRAND.url} style={{ color: COLORS.mutedLight, textDecoration: 'underline' }}>{BRAND.domain}</a>
                      </p>
                    </td>
                  </tr>

                  {/* Sign-off */}
                  <tr>
                    <td align="center" style={{ padding: '48px 60px 0' }}>
                      <p style={{ margin: 0, fontSize: 14, color: COLORS.muted }}>{COPY.signoff}</p>
                      <p style={{ margin: '8px 0 0', fontFamily: DISPLAY, fontSize: 12, fontWeight: 700, color: COLORS.slate, letterSpacing: 0.5 }}>
                        REDCORE TEAM
                      </p>
                      <p style={{ margin: '8px 0 0', fontSize: 12, fontStyle: 'italic', color: COLORS.mutedLight }}>{COPY.tagline}</p>
                    </td>
                  </tr>

                  {/* Micro footer */}
                  <tr>
                    <td align="center" style={{ padding: '56px 60px 56px' }}>
                      {referenceId && (
                        <p style={{ margin: '0 0 8px', fontSize: 11, color: '#c0c4c8' }}>
                          Reference {referenceId}
                        </p>
                      )}
                      <p style={{ margin: 0, fontSize: 11, color: '#c0c4c8', lineHeight: '1.8' }}>
                        {BRAND.company} &middot; {BRAND.address} &middot; {BRAND.phone}
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
