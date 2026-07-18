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

// Matches the website hero (src/components/hero.tsx): page grey, heading and
// body text colors — customer wants the email to look like the site.
// The em-* classes carry the dark-mode overrides defined in shared.tsx Fonts().
const PAGE_BG = '#d9d9d9';
const INK = '#141414';
const BODY = '#3a3a3a';

const P_STYLE: React.CSSProperties = {
  margin: '18px 0 0',
  fontSize: 15,
  color: BODY,
  lineHeight: '1.75',
};

/**
 * Variant A — "Clean Classic".
 * Flat layout on the site's grey page (#d9d9d9). Centered logo & CTA, left-aligned
 * body copy, hairline PM contact box, quiet footer outside the card.
 */
export function ConfirmationCorporate({ fullName, referenceId }: ConfirmationVariantProps) {
  return (
    <div className="em-bg" style={{ margin: 0, padding: 0, backgroundColor: PAGE_BG, fontFamily: FONT }}>
      <Fonts />
      <table className="em-bg" width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: PAGE_BG, padding: '48px 0 0' }}>
        <tbody>
          <tr>
            <td align="center">
              {/* Content — sits directly on the grey page, like the site hero */}
              <table className="em-bg" width={768} cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: PAGE_BG }}>
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: '52px 56px 0' }}>
                      <img className="em-logo" src={BRAND.logo} alt={BRAND.name} width={200} height={33} style={{ display: 'block', border: 0 }} />
                    </td>
                  </tr>

                  {/* Body copy */}
                  <tr>
                    <td align="left" style={{ padding: '44px 56px 0' }}>
                      <p className="em-ink" style={{ margin: 0, fontSize: 16, color: INK, lineHeight: '1.6' }}>
                        Hello {fullName.trim()},
                      </p>
                      <p className="em-ink" style={{ margin: '16px 0 0', fontSize: 17, fontWeight: 700, color: INK, lineHeight: '1.5' }}>
                        {COPY.thanks}
                      </p>
                      <p className="em-body" style={P_STYLE}>{COPY.received}</p>
                      <p className="em-body" style={P_STYLE}>{COPY.contact}</p>
                      <p className="em-body" style={P_STYLE}>{COPY.appreciation}</p>
                    </td>
                  </tr>

                  {/* CTA */}
                  <tr>
                    <td align="center" style={{ padding: '30px 56px 0' }}>
                      <Button href={BRAND.url} label="VISIT OUR WEBSITE" padding="16px 40px" letterSpacing={1} radius={3} />
                      <p className="em-body" style={{ margin: '18px 0 0', fontSize: 15, color: BODY }}>
                        or call{' '}
                        <a className="em-red" href={BRAND.phoneHref} style={{ color: COLORS.red, fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>
                          <span style={{ fontSize: 17 }}>&#128222;</span>&nbsp;{BRAND.phone}
                        </a>
                      </p>
                    </td>
                  </tr>

                  {/* Urgent line + PM contact box (phone sits low, near sign-off) */}
                  <tr>
                    <td align="left" style={{ padding: '30px 56px 0' }}>
                      <p className="em-body" style={{ margin: 0, fontSize: 15, color: BODY, lineHeight: '1.75' }}>{COPY.urgent}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '20px 56px 0' }}>
                      {/* #7a7a7a: hairline grey is invisible on the #d9d9d9 page */}
                      <table className="em-border" width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ border: '1px solid #7a7a7a' }}>
                        <tbody>
                          <tr>
                            <td align="center" style={{ padding: '22px 24px' }}>
                              <p className="em-ink" style={{ margin: 0, fontSize: 16, fontWeight: 700, color: INK }}>{PM.name}</p>
                              <p className="em-muted" style={{ margin: '4px 0 0', fontSize: 11, fontWeight: 700, color: COLORS.mutedLight, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                                {PM.role}
                              </p>
                              <p className="em-body" style={{ margin: '12px 0 0', fontSize: 14, color: BODY, lineHeight: '1.8' }}>
                                <span style={{ fontSize: 15 }}>&#128222;</span> Phone:{' '}
                                <a className="em-red" href={PM.phoneHref} style={{ color: COLORS.red, fontWeight: 700, textDecoration: 'none' }}>{PM.phone}</a>
                                <br />
                                Website:{' '}
                                <a className="em-ink" href={BRAND.url} style={{ color: INK, fontWeight: 700, textDecoration: 'none' }}>{BRAND.domain}</a>
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
                      <div className="em-border" style={{ borderTop: `1px solid ${COLORS.hairline}`, width: 90, margin: '0 auto', fontSize: 0, lineHeight: 0 }}>&nbsp;</div>
                      <p className="em-body" style={{ margin: '26px 0 0', fontSize: 15, color: BODY, lineHeight: '1.5' }}>{COPY.signoff}</p>
                      <p className="em-ink" style={{ margin: '8px 0 0', fontFamily: DISPLAY, fontSize: 15, fontWeight: 700, color: INK, letterSpacing: 0.5 }}>
                        REDCORE TEAM
                      </p>
                      <p className="em-muted" style={{ margin: '8px 0 0', fontSize: 12, fontStyle: 'italic', color: COLORS.mutedLight }}>{COPY.tagline}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Quiet footer outside the card */}
              <table width={768} cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td align="center" style={{ padding: '28px 40px 8px' }}>
                      <p className="em-muted" style={{ margin: 0, fontSize: 12, color: COLORS.muted, lineHeight: '1.8' }}>
                        {SERVICES.map((s, i) => (
                          <React.Fragment key={s.href}>
                            {i > 0 && <span className="em-muted" style={{ color: '#c4c8cc' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>}
                            <a className="em-muted" href={s.href} style={{ color: COLORS.muted, textDecoration: 'none' }}>{s.label}</a>
                          </React.Fragment>
                        ))}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style={{ padding: '10px 40px 48px' }}>
                      {referenceId && (
                        <p className="em-muted" style={{ margin: '0 0 8px', fontSize: 11, color: COLORS.mutedLight }}>
                          Reference {referenceId}
                        </p>
                      )}
                      <p className="em-muted" style={{ margin: 0, fontSize: 12, color: COLORS.mutedLight, lineHeight: '1.8' }}>
                        <span className="em-muted" style={{ fontWeight: 700, color: COLORS.muted }}>{BRAND.company}</span> &middot; {BRAND.phone} &middot; {BRAND.email}
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
