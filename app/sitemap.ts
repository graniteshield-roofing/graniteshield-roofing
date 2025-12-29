import { MetadataRoute } from 'next';
import { getAllTownSlugs } from '@/lib/towns-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://graniteshieldroofing.com';
  const currentDate = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Service pages
  const serviceSlugs = [
    'roof-replacement',
    'roof-repair',
    'roof-inspection',
    'roof-maintenance',
    'shingle-roofing',
    'standing-seam-metal-roofing',
    'emergency-repair',
    'ice-dam-removal',
    'vinyl-siding',
    'metal-siding',
    'windows',
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Town pages (dynamic from towns-data.ts)
  const townSlugs = getAllTownSlugs();
  const townPages: MetadataRoute.Sitemap = townSlugs.map((slug) => ({
    url: `${baseUrl}/areas/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...corePages, ...servicePages, ...townPages];
}
