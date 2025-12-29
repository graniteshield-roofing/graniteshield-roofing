import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://graniteshieldroofing.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/lp/', '/thank-you'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
