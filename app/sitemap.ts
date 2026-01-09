import { MetadataRoute } from 'next';
import { getAllTownSlugs } from '@/lib/towns-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://graniteshieldroofing.com';
  const currentDate = new Date();

  // Core pages - highest priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/instant-quote`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95, // High priority - key conversion page
    },
    {
      url: `${baseUrl}/lp`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95, // High priority - landing page
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
      url: `${baseUrl}/roofing-guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
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

  // Service pages - high priority for SEO
  const serviceSlugs = [
    'standing-seam-metal-roofing', // Most valuable service
    'roof-replacement',
    'shingle-roofing',
    'roof-repair',
    'emergency-repair',
    'ice-dam-removal',
    'roof-inspection',
    'roof-maintenance',
    'vinyl-siding',
    'metal-siding',
    'windows',
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug, index) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: index < 3 ? 0.85 : 0.8, // Top 3 services get higher priority
  }));

  // Town pages (dynamic from towns-data.ts) - critical for local SEO
  const townSlugs = getAllTownSlugs();
  const townPages: MetadataRoute.Sitemap = townSlugs.map((slug) => ({
    url: `${baseUrl}/areas/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // High priority for local SEO
  }));

  // Problem/Guide pages - informational content
  const problemPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/problems/ice-dams`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
  ];

  // Report pages - authority content
  const reportPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/reports`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reports/maine-roofing-cost-report-winter-2025`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/reports/maine-ice-dam-steaming-safety-specs`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/reports/maine-winter-roofing-response-times-and-process`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
  ];

  return [...corePages, ...servicePages, ...townPages, ...problemPages, ...reportPages];
}
