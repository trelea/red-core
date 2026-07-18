import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://redcoreconcrete.com";

// Real content-change dates. Google ignores lastmod values that change on
// every fetch (which `new Date()` did) — bump these only when a page's
// content actually changes.
const lastModified = new Date("2026-07-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/core-drilling`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/slab-cutting`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/demolition-cutting`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/wall-saw-cutting`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
