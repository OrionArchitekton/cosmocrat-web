import type { Metadata } from 'next';
import { siteConfig } from './siteConfig';
import { socialCards } from './socialCards';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for a page.
 * Uses siteConfig for base URL to support staging/preview environments.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = new URL(path, siteConfig.origin).toString();

  const socialTitle = path === '/' ? title : `${title} | ${siteConfig.name}`;
  const card = socialCards.find(({ slug }) => path === `/${slug}`);
  const image = card ? `/og/${card.slug}?v=1` : siteConfig.ogImage;

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
    robots: noIndex || process.env.SITE_ENV !== 'production'
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
