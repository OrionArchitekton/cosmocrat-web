import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cosmocrat.ai';
  const lastModified = new Date();

  // Public pages to be indexed
  const publicPages = [
    '',
    '/about',
    '/waitlist',
    '/contact',
    '/privacy',
    '/terms',
    '/decision-exhaust',
    '/runtime-governance',
    '/gate-system',
    '/chronicle-receipts',
    '/drift-guard',
    '/memory-infrastructure',
  ];

  return publicPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/decision') || route.startsWith('/runtime') || route.startsWith('/gate') || route.startsWith('/chronicle') || route.startsWith('/drift') || route.startsWith('/memory') ? 0.8 : 0.6,
  }));
}
