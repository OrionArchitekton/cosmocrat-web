import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Public pages to be indexed
  const publicPages = [
    '',
    '/platform',
    '/about',
    '/contact',
    '/runtime-governance',
    '/gate-system',
    '/decision-exhaust',
    '/drift-guard',
    '/chronicle-receipts',
    '/memory-infrastructure',
    '/privacy',
    '/terms',
    '/docs',
    '/waitlist',
  ];

  return publicPages.map((route) => {
    const isLanding = route === '';
    const isPlatform = route === '/platform';
    const isPillar = [
      '/runtime-governance',
      '/gate-system',
      '/decision-exhaust',
      '/drift-guard',
      '/chronicle-receipts',
      '/memory-infrastructure'
    ].includes(route);

    return {
      url: `${siteConfig.origin}${route}`,
      lastModified,
      changeFrequency: isLanding || isPlatform ? 'weekly' : isPillar ? 'monthly' : 'yearly',
      priority: isLanding ? 1.0 : isPlatform ? 0.9 : isPillar ? 0.8 : route === '/docs' ? 0.7 : 0.5,
    };
  });

}
