import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirmation Email — Variants',
  robots: { index: false, follow: false },
};

// Minimal standalone layout so the email-preview page renders without the
// marketing site's navbar/footer chrome.
export default function PreviewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
