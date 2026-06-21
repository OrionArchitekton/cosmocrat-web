/**
 * JSON-LD schema generators for SEO.
 */
import { siteConfig } from './siteConfig';

interface FeatureSchemaOptions {
  name: string;
  description: string;
  path: string;
}

/**
 * Generate WebPage JSON-LD schema for platform feature pages.
 * Links to the main website, software, and organization entities.
 */
export function generateFeatureSchema({ name, description, path }: FeatureSchemaOptions) {
  const base = siteConfig.origin;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${base}${path}#webpage`,
    url: `${base}${path}`,
    name,
    description,
    isPartOf: { '@id': `${base}/#website` },
    about: { '@id': `${base}/#software` },
    publisher: { '@id': `${base}/#organization` },
  };
}

/**
 * Generate the homepage-only WebPage JSON-LD node.
 * Per the locked AEO doctrine, a page-level WebPage belongs on a page (here, the
 * homepage via page.tsx), never in RootLayout. The @id is env-derived from
 * siteConfig.origin so it resolves correctly on preview deployments.
 */
export function generateHomeWebPage({ name, description }: { name: string; description: string }) {
  const base = siteConfig.origin;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${base}/#webpage`,
    url: `${base}/`,
    name,
    description,
    isPartOf: { '@id': `${base}/#website` },
    about: { '@id': `${base}/#software` },
    publisher: { '@id': `${base}/#organization` },
  };
}
