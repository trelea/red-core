import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://redcore.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Red Core | Professional Concrete Cutting & Core Drilling Services",
    template: "%s | Red Core",
  },
  description:
    "Red Core provides professional concrete cutting and core drilling services including slab cutting, wall saw cutting, hand saw cutting, and small demolition. Precision work for residential and commercial projects.",
  keywords: [
    "core drilling",
    "concrete cutting",
    "slab cutting",
    "wall saw cutting",
    "hand saw cutting",
    "small demolition",
    "concrete drilling",
    "precision cutting",
    "construction services",
    "concrete removal",
    "structural openings",
    "utility access cutting",
  ],
  authors: [{ name: "Red Core" }],
  creator: "Red Core",
  publisher: "Red Core",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Red Core",
    title: "Red Core | Professional Concrete Cutting & Core Drilling Services",
    description:
      "Professional concrete cutting and core drilling services. Slab cutting, wall saw cutting, hand saw cutting, and controlled demolition for residential and commercial projects.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Red Core - Professional Concrete Cutting & Core Drilling Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Core | Professional Concrete Cutting & Core Drilling Services",
    description:
      "Professional concrete cutting and core drilling services. Slab cutting, wall saw cutting, hand saw cutting, and controlled demolition.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>

      </body>
    </html>
  );
}
