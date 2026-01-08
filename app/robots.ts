import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/lp/', '/thank-you'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
