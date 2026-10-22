import type { MetadataRoute } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://redcoreconcrete.com';

export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Googlebot',
    'Bingbot',
    'Applebot',
    'Applebot-Extended',
    'CCBot',
    'FacebookBot',
    'Meta-ExternalAgent',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/email-preview',
          '/payload-api/graphql',
          '/payload-api/graphql-playground',
        ],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/email-preview',
          '/payload-api/graphql',
          '/payload-api/graphql-playground',
        ],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}