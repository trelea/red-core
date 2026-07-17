'use client';

import * as React from 'react';

export interface RenderedVariant {
  id: string;
  name: string;
  description: string;
  html: string;
}

const RED = '#C70017';
const SLATE = '#1E2C32';
const UI_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** Iframe that resizes itself to its rendered email content. */
function EmailFrame({ html, title }: { html: string; title: string }) {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState(1100);

  const resize = React.useCallback(() => {
    const doc = ref.current?.contentDocument;
    if (doc?.body) {
      setHeight(Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight) + 4);
    }
  }, []);

  return (
    <iframe
      ref={ref}
      title={title}
      srcDoc={html}
      onLoad={() => {
        resize();
        // Re-measure after the logo/web fonts load.
        setTimeout(resize, 500);
      }}
      style={{
        width: '100%',
        height,
        border: 'none',
        display: 'block',
        backgroundColor: '#ffffff',
      }}
    />
  );
}

export function PreviewClient({ previews }: { previews: RenderedVariant[] }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f6f7', fontFamily: UI_FONT, color: SLATE }}>
      {/* Sticky header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'saturate(180%) blur(8px)',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '16px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: RED, display: 'inline-block' }} />
            <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: -0.2 }}>
              Confirmation Email — Design Options
            </h1>
          </div>
          <p style={{ margin: '4px 0 0 20px', fontSize: 13, color: '#6b7280' }}>
            Four variants with the approved copy. Compare them below and pick a favourite.
          </p>
        </div>
      </div>

      {/* Variant grid */}
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(560px, 1fr))',
          gap: 28,
          alignItems: 'start',
        }}
      >
        {previews.map((v, i) => (
          <section
            key={v.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              boxShadow: '0 6px 22px rgba(30,44,50,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Label header */}
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #eef0f2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    backgroundColor: '#FEF2F3',
                    color: RED,
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{v.name}</h2>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
                {v.description}
              </p>
            </div>

            {/* Rendered email */}
            <div style={{ backgroundColor: '#f0f1f2' }}>
              <EmailFrame html={v.html} title={v.name} />
            </div>
          </section>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '8px 0 40px', fontSize: 12, color: '#9ca3af' }}>
        Preview data is illustrative · Red Core Company
      </div>
    </div>
  );
}
