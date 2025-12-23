import type { MetadataRoute } from 'next';
import { getAllTownSlugs } from '@/lib/towns-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://graniteshieldroofing.com';

  // Use "now" if you don't track per-page edits
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/areas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/lp`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/thank-you`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];

  const serviceSlugs = [
    'roof-replacement',
    'roof-repair',
    'roof-inspection',
    'standing-seam-metal-roofing',
    'ice-dam-removal',
    'metal-siding',
    'vinyl-siding',
    'emergency-repair',
    'windows',
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const townSlugs = getAllTownSlugs();
  const townPages: MetadataRoute.Sitemap = townSlugs.map((slug) => ({
    url: `${siteUrl}/areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...townPages];
}
