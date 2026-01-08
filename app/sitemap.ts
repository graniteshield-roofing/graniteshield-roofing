import { MetadataRoute } from 'next';
import { getAllTownSlugs } from '@/lib/towns-data';
import { SITE_URL } from '@/lib/business-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/instant-quote`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/areas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/roofing-guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
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
    url: `${SITE_URL}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Town pages (dynamic from towns-data.ts)
  const townSlugs = getAllTownSlugs();
  const townPages: MetadataRoute.Sitemap = townSlugs.map((slug) => ({
    url: `${SITE_URL}/areas/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Problem/Guide pages
  const problemPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/problems/ice-dams`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Report pages
  const reportPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/reports`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/reports/maine-roofing-cost-report-winter-2025`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/reports/maine-ice-dam-steaming-safety-specs`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/reports/maine-winter-roofing-response-times-and-process`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return [...corePages, ...servicePages, ...townPages, ...problemPages, ...reportPages];
}
