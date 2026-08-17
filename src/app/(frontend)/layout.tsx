import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ScrollDownIndicator from '@/components/scroll-down-indicator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QuoteDialogProvider } from '@/components/quote-dialog-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'Red Core | Professional Concrete Cutting & Core Drilling Services',
    template: '%s | Red Core',
  },
  description:
    'Red Core provides professional concrete cutting and core drilling services including slab cutting, wall saw cutting, and demolition & cutting. Precision work for residential and commercial projects.',
  keywords: [
    'core drilling',
    'concrete cutting',
    'slab cutting',
    'wall saw cutting',
    'demolition and cutting',
    'concrete restoration',
    'concrete repair',
    'concrete resurfacing',
    'concrete drilling',
    'precision cutting',
    'construction services',
    'concrete removal',
    'structural openings',
    'utility access cutting',
    'concrete cutting Agawam MA',
    'core drilling Massachusetts',
    'concrete services Springfield',
    'concrete cutting near me',
    'concrete contractor Western MA',
  ],
  authors: [{ name: 'Red Core' }],
  creator: 'Red Core',
  publisher: 'Red Core',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Red Core',
    title: 'Red Core | Professional Concrete Cutting & Core Drilling Services',
    description:
      'Professional concrete cutting and core drilling services. Slab cutting, wall saw cutting, and controlled demolition for residential and commercial projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Red Core - Professional Concrete Cutting & Core Drilling Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Core | Professional Concrete Cutting & Core Drilling Services',
    description:
      'Professional concrete cutting and core drilling services. Slab cutting, wall saw cutting, and controlled demolition.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#business`,
  name: 'Red Core',
  description:
    'Professional concrete cutting and core drilling services. Slab cutting, wall saw cutting, and controlled demolition for residential and commercial projects.',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  image: `${siteUrl}/og-image.png`,
  telephone: '+14136662026',
  email: 'redcoreusa@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '321 Springfield St',
    addressLocality: 'Agawam',
    addressRegion: 'MA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Agawam, MA' },
    { '@type': 'City', name: 'Springfield, MA' },
    { '@type': 'State', name: 'Massachusetts' },
  ],
  serviceType: [
    'Core Drilling',
    'Slab Cutting',
    'Wall Saw Cutting',
    'Demolition & Cutting',
    'Concrete Restoration',
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17966730832"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17966730832');
            gtag('config', 'AW-17966730832/qm7rCPqQ5I8cENCcmvdC', {
              'phone_conversion_number': '413-666-2026'
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <QuoteDialogProvider>
            <main>
              <Navbar />
              {children}
              <Footer />
              <ScrollDownIndicator />
            </main>
          </QuoteDialogProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
