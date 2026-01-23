import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://cosmocrat.ai';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/docs'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
