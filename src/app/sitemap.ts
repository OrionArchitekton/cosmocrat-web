import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cosmocrat.ai';
  const now = new Date().toISOString();

  // Public indexed routes only (excludes noindex pages like /docs if gated)
  const routes = [
    { path: '/', priority: 1.0 },
    { path: '/waitlist', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.7 },
    // Platform concept pages (SEO pillars)
    { path: '/decision-exhaust', priority: 0.8 },
    { path: '/runtime-governance', priority: 0.8 },
    { path: '/gate-system', priority: 0.8 },
    { path: '/chronicle-receipts', priority: 0.8 },
    { path: '/drift-guard', priority: 0.8 },
    { path: '/memory-infrastructure', priority: 0.8 },
    // Legal
    { path: '/privacy', priority: 0.5 },
    { path: '/terms', priority: 0.5 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority,
  }));
}
