import * as React from 'react';
import {
  BASE_URL,
  BRAND,
  COPY,
  FONT,
  PM,
  SERVICES,
  type ConfirmationVariantProps,
} from './shared';

// Final client-approved design (Figma "Redcore (Copy)" nodes 2041-90 light /
// 2041-120 dark): 600px email with a fixed #e0e0e2 logo bar, body copy on
// white (dark mode: #3a3a3a with white text), PM contact block with red
// phone/globe icons, and a fixed red services strip at the bottom.
const HEADER_BG = '#e0e0e2';
const RED = '#c70017';
const INK = '#1e2c32';

// Body text: Inter 400 16/24 per the design spec.
const P_STYLE: React.CSSProperties = {
  margin: '24px 0 0',
  fontSize: 16,
  color: INK,
  lineHeight: '24px',
};

/**
 * The emf-* classes carry this variant's own dark-mode palette (kept separate
 * from shared Fonts() so the older variants are unaffected). The header and
 * footer bars intentionally have no dark class — both Figma frames keep them
 * #e0e0e2 / #c70017 in light and dark.
 */
function FigmaFonts() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
:root { color-scheme: light dark; supported-color-schemes: light dark; }
@media (prefers-color-scheme: dark) {
  .emf-bg { background-color: #3a3a3a !important; }
  .emf-ink { color: #ffffff !important; }
  .emf-border { border-color: #6a6a6a !important; }
}
[data-ogsb] .emf-bg { background-color: #3a3a3a !important; }
[data-ogsc] .emf-ink { color: #ffffff !important; }
[data-ogsc] .emf-border { border-color: #6a6a6a !important; }
`,
      }}
    />
  );
}

export function ConfirmationFigma(_props: ConfirmationVariantProps) {
  return (
    <div className="emf-bg" style={{ margin: 0, padding: 0, backgroundColor: '#ffffff', fontFamily: FONT }}>
      <FigmaFonts />
      <table className="emf-bg" width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ backgroundColor: '#ffffff' }}>
        <tbody>
          <tr>
            <td align="center">
              <table width={600} cellPadding={0} cellSpacing={0} role="presentation" style={{ width: 600 }}>
                <tbody>
                  {/* Header bar — same in light and dark */}
                  <tr>
                    <td style={{ backgroundColor: HEADER_BG, padding: '12px 40px 12px 24px' }}>
                      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                        <tbody>
                          <tr>
                            <td align="left" style={{ verticalAlign: 'middle' }}>
                              {/* The chip PNG bakes the bar's #e0e0e2 behind the logo: invisible
                                  in light mode, keeps the black logo readable when the Gmail app
                                  force-darkens the bar (it never inverts images). */}
                              <img
                                src={`${BASE_URL}/assets/email/logo-chip.png`}
                                alt="RED CORE drilling & sawing"
                                width={263}
                                height={70}
                                style={{ display: 'block', border: 0 }}
                              />
                            </td>
                            <td align="right" style={{ verticalAlign: 'middle' }}>
                              <a
                                href={PM.phoneHref}
                                style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, lineHeight: '24px', color: INK, textDecoration: 'none', whiteSpace: 'nowrap' }}
                              >
                                {PM.phone}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Body copy */}
                  <tr>
                    <td align="left" style={{ padding: '39px 60px 0 40px' }}>
                      <p className="emf-ink" style={{ ...P_STYLE, margin: 0 }}>
                        {COPY.greeting}
                        <br />
                        {COPY.thanks}
                      </p>
                      <p className="emf-ink" style={P_STYLE}>{COPY.received}</p>
                      <p className="emf-ink" style={P_STYLE}>{COPY.contact}</p>
                      <p className="emf-ink" style={P_STYLE}>{COPY.urgent}</p>
                    </td>
                  </tr>

                  {/* Full-width hairline */}
                  <tr>
                    <td style={{ padding: '58px 40px 0' }}>
                      <div className="emf-border" style={{ borderTop: '1px solid #d9d9d9', fontSize: 0, lineHeight: 0 }}>&nbsp;</div>
                    </td>
                  </tr>

                  {/* PM contact block */}
                  <tr>
                    <td align="left" style={{ padding: '44px 40px 0' }}>
                      <p className="emf-ink" style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: '24px', color: INK, textTransform: 'uppercase' }}>
                        {PM.name}
                      </p>
                      <p className="emf-ink" style={{ margin: '2px 0 0', fontSize: 16, fontWeight: 500, lineHeight: '24px', color: INK }}>
                        {PM.role}
                      </p>
                      <div className="emf-border" style={{ borderTop: '1px solid #d9d9d9', width: 190, margin: '13px 0 0', fontSize: 0, lineHeight: 0 }}>&nbsp;</div>
                      <table cellPadding={0} cellSpacing={0} role="presentation" style={{ marginTop: 14 }}>
                        <tbody>
                          <tr>
                            <td style={{ width: 23, verticalAlign: 'middle' }}>
                              <img src={`${BASE_URL}/assets/email/phone.png`} alt="" width={16} height={16} style={{ display: 'block', border: 0 }} />
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                              <a className="emf-ink" href={PM.phoneHref} style={{ fontFamily: FONT, fontSize: 16, lineHeight: '24px', color: INK, textDecoration: 'none' }}>
                                {PM.phone}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 23, verticalAlign: 'middle', paddingTop: 4 }}>
                              <img src={`${BASE_URL}/assets/email/globe.png`} alt="" width={15} height={15} style={{ display: 'block', border: 0 }} />
                            </td>
                            <td style={{ verticalAlign: 'middle', paddingTop: 4 }}>
                              <a className="emf-ink" href={BRAND.url} style={{ fontFamily: FONT, fontSize: 16, lineHeight: '24px', color: INK, textDecoration: 'none' }}>
                                {BRAND.domain}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Closing + sign-off */}
                  <tr>
                    <td align="left" style={{ padding: '35px 60px 41px 40px' }}>
                      <p className="emf-ink" style={{ ...P_STYLE, margin: 0 }}>{COPY.appreciation}</p>
                      <p className="emf-ink" style={P_STYLE}>
                        {COPY.signoff}
                        <br />
                        {COPY.team}
                        <br />
                        {COPY.tagline}
                      </p>
                    </td>
                  </tr>

                  {/* Red services strip — same in light and dark */}
                  <tr>
                    <td align="center" style={{ backgroundColor: RED, padding: '14px 40px 15px' }}>
                      <p style={{ margin: 0, fontFamily: FONT, fontSize: 14, lineHeight: '24px', color: '#ffffff', whiteSpace: 'nowrap' }}>
                        {SERVICES.map((s, i) => (
                          <React.Fragment key={s.href}>
                            {i > 0 && <>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</>}
                            <a href={s.href} style={{ color: '#ffffff', textDecoration: 'none' }}>{s.label}</a>
                          </React.Fragment>
                        ))}
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
