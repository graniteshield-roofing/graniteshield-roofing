/**
 * Helper functions to identify roofing-related pages
 * Used for conditionally showing "Get Instant Quote" CTAs
 */

/**
 * Check if a service slug is roofing-related
 */
export function isRoofingService(slug: string): boolean {
  const roofingServices = [
    'roof-replacement',
    'roof-repair',
    'roof-inspection',
    'roof-maintenance',
    'shingle-roofing',
    'standing-seam-metal-roofing',
    'emergency-repair',
    'ice-dam-removal',
  ];
  return roofingServices.includes(slug);
}

/**
 * Check if a pathname is for a roofing-related page
 */
export function isRoofingPage(pathname: string): boolean {
  // Roofing service pages
  if (pathname.startsWith('/services/')) {
    const serviceSlug = pathname.replace('/services/', '').split('/')[0];
    return isRoofingService(serviceSlug);
  }

  // Roofing problems/guides
  if (
    pathname.startsWith('/problems/ice-dams') ||
    pathname.startsWith('/roofing-guides') ||
    pathname === '/instant-quote'
  ) {
    return true;
  }

  return false;
}

/**
 * Get all roofing service slugs
 */
export function getRoofingServiceSlugs(): string[] {
  return [
    'roof-replacement',
    'roof-repair',
    'roof-inspection',
    'roof-maintenance',
    'shingle-roofing',
    'standing-seam-metal-roofing',
    'emergency-repair',
    'ice-dam-removal',
  ];
}
