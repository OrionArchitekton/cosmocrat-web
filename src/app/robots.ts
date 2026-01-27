import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.SITE_STAGE === 'prd';

  return {
    rules: {
      userAgent: '*',
      allow: isProd ? '/' : undefined,
      disallow: isProd ? ['/api/'] : '/',
    },
    sitemap: 'https://www.cosmocrat.ai/sitemap.xml',
  };
}
