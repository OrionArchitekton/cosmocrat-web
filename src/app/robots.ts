import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.SITE_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      allow: isProd ? '/' : undefined,
      disallow: isProd ? ['/api/'] : '/',
    },
    sitemap: `${siteConfig.origin}/sitemap.xml`,
  };
}
