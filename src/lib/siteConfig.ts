/**
 * Centralized site configuration.
 * Allows env-based base URL for staging/preview environments.
 */
export const siteConfig = {
  name: 'Cosmocrat',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cosmocrat.ai',
  title: 'Cosmocrat | The Governed AI Operating System',
  description:
    'An enterprise OS for governed memory and controlled execution. Enforce fail-closed authority and audit-grade run records at the runtime kernel level.',
  ogImage: '/og.png',
  logo: 'https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/wordmark-logo_light.png',
  logoIcon: 'https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/sigil-gold.png',
} as const;

export type SiteConfig = typeof siteConfig;
