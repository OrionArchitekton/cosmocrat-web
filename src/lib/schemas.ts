/**
 * JSON-LD schema generators for SEO.
 */

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
  const base = 'https://www.cosmocrat.ai';
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
