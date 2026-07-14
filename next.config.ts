import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    qualities: [75, 100],
    // AVIF first (≈20–30% smaller than WebP for these photos); browsers that
    // don't support it fall back to WebP automatically.
    formats: ['image/avif', 'image/webp'],
    // Keep optimized variants cached for 31 days so repeat views (and the same
    // project images across the 4 service pages) are served instantly instead of
    // re-fetching/re-optimizing from the private R2 media route each time.
    minimumCacheTTL: 2678400,
    // Allow next/image to optimize media served directly from the R2 public
    // bucket domain (see the s3Storage config in payload.config.ts).
    remotePatterns: process.env.S3_PUBLIC_URL
      ? [new URL(`${process.env.S3_PUBLIC_URL}/**`)]
      : [],
  },
  async redirects() {
    return [
      {
        // Service renamed "Small Demolition" → "Demolition & Cutting"; keep the
        // old Google-indexed URL working.
        source: '/small-demolition',
        destination: '/demolition-cutting',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      },
      {
        // The Payload media route sends no Cache-Control, so browsers refetch/
        // revalidate every image on each view (e.g. reopening the lightbox).
        // Media filenames change on re-upload, so the bytes are safe to cache
        // immutably — this lets repeat views (and the modal) load from cache.
        source: '/payload-api/media/file/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
};

export default withPayload(nextConfig);
