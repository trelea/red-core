import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ScrollDownIndicator from '@/components/scroll-down-indicator';
import AnalyticsProvider from '@/components/analytics-provider';
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

const metaPixelId =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '1120187307040000';
const metaTrackingEnabled =
  process.env.META_TRACKING_ENABLED !== 'false' &&
  process.env.NEXT_PUBLIC_META_TRACKING_ENABLED !== 'false';
const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'REDCORE | Concrete Cutting & Core Drilling Across Massachusetts',
    template: '%s | REDCORE',
  },
  description:
    'REDCORE across Massachusetts. Concrete cutting, drilling, sawing, demolition & restoration. 24/7 free estimates: (413) 666-2026.',
  keywords: [
    'REDCORE',
    'redcore',
    'concrete cutting',
    'concrete cutting MA',
    'concrete cutting Boston',
    'Boston concrete cutting',
    'concrete cutting companies near me',
    'concrete cutting near me',
    'concrete cutting services near me',
    'core drilling',
    'core drilling services near me',
    'core drilling near me',
    'concrete core drilling',
    'slab cutting',
    'concrete saw cutting',
    'concrete slab removal Massachusetts',
    'wall saw cutting',
    'egress window cutting',
    'demolition and cutting',
    'concrete demolition',
    'concrete demolition contractor',
    'concrete removal Springfield',
    'concrete step removal near me',
    'concrete restoration',
    'concrete restoration MA',
    'concrete restoration Massachusetts',
    'concrete crack repair',
    'concrete repairs near me',
    'concrete resurfacing',
    'HVAC concrete pad installation',
    'construction company Agawam MA',
    'concrete cutting Agawam MA',
    'core drilling Massachusetts',
    'concrete services Springfield MA',
    'concrete contractor Western MA',
  ],
  authors: [{ name: 'REDCORE' }],
  creator: 'REDCORE',
  publisher: 'REDCORE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'REDCORE',
    title:
      'REDCORE | Concrete Cutting & Core Drilling in Springfield, Agawam & MA',
    description:
      'REDCORE concrete cutting, core drilling, sawing, demolition & restoration across Massachusetts. 24/7 free estimates: (413) 666-2026.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'REDCORE — Professional Concrete Cutting & Core Drilling Services in Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'REDCORE | Concrete Cutting & Core Drilling in Springfield, Agawam & MA',
    description:
      'REDCORE concrete cutting, core drilling, sawing, demolition & restoration across Massachusetts. 24/7 free estimates: (413) 666-2026.',
    images: ['/opengraph-image'],
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
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${siteUrl}/#business`,
  name: 'REDCORE',
  alternateName: ['REDCORE Concrete', 'Red Core'],
  description:
    'REDCORE provides concrete cutting, core drilling, sawing, demolition & restoration across Massachusetts and New England for residential and commercial projects.',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  image: `${siteUrl}/opengraph-image`,
  telephone: '+14136662026',
  email: 'redcoreusa@gmail.com',
  hasMap: 'https://maps.app.goo.gl/NU1TtaE9qrRtK2o86',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61592192361536',
    'https://www.instagram.com/redcoreusa',
    'https://maps.app.goo.gl/NU1TtaE9qrRtK2o86',
    'https://share.google/SCRHv9ju5q3mgFyGb',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '321 Springfield St',
    addressLocality: 'Agawam',
    addressRegion: 'MA',
    postalCode: '01001',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.0695,
    longitude: -72.6227,
  },
  areaServed: [
    { '@type': 'City', name: 'Agawam, MA' },
    { '@type': 'City', name: 'Springfield, MA' },
    { '@type': 'City', name: 'West Springfield, MA' },
    { '@type': 'City', name: 'Holyoke, MA' },
    { '@type': 'City', name: 'Northampton, MA' },
    { '@type': 'City', name: 'Pittsfield, MA' },
    { '@type': 'City', name: 'Worcester, MA' },
    { '@type': 'City', name: 'Boston, MA' },
    { '@type': 'City', name: 'Lynnfield, MA' },
    { '@type': 'State', name: 'Massachusetts' },
    { '@type': 'State', name: 'Connecticut' },
    { '@type': 'State', name: 'Rhode Island' },
    { '@type': 'State', name: 'New Hampshire' },
    { '@type': 'State', name: 'Vermont' },
    { '@type': 'State', name: 'Maine' },
  ],
  serviceType: [
    'Core Drilling',
    'Slab Cutting',
    'Wall Saw Cutting',
    'Demolition & Cutting',
    'Concrete Restoration',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Concrete Cutting & Core Drilling Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Core Drilling',
          url: `${siteUrl}/core-drilling`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Slab Cutting',
          url: `${siteUrl}/slab-cutting`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Demolition & Cutting',
          url: `${siteUrl}/demolition-cutting`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wall Saw Cutting',
          url: `${siteUrl}/wall-saw-cutting`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Concrete Restoration',
          url: `${siteUrl}/concrete-restoration`,
        },
      },
    ],
  },
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
        {isProduction && (
          <script
            id="google-tag-manager"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-586Q4LZW');`,
            }}
          />
        )}
        {isProduction && metaTrackingEnabled && metaPixelId && (
          <script
            id="meta-pixel"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');`,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <link rel="llms" href="/llms.txt" />
        <link rel="llms-full" href="/llms-full.txt" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isProduction && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-586Q4LZW"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {isProduction && metaTrackingEnabled && metaPixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <TooltipProvider>
          <QuoteDialogProvider>
            {isProduction && <AnalyticsProvider />}
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollDownIndicator />
          </QuoteDialogProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
