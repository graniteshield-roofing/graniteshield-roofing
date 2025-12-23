import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://graniteshieldroofing.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block only truly non-indexable routes if you add them later
        disallow: [
          '/api/',
          // If you add internal test pages later, add them here (e.g., /dev/, /staging/)
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
