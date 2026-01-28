/**
 * Centralized site configuration.
 * Allows env-based base URL for staging/preview environments.
 */
export const siteConfig = {
  name: 'Cosmocrat',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cosmocrat.ai',
  title: 'Cosmocrat | The AI Operating System for Governed Memory and Controlled Execution',
  description:
    'Cosmocrat is the AI Operating System for governed memory and controlled execution. It runs in your environment to enforce fail-closed AI execution, runtime governance, and audit-grade run records.',
  ogImage: '/og.png',
  logo: 'https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/wordmark-logo_light.png',
  logoIcon: 'https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/sigil-gold.png',
  logoSchema: '/logo.png', // first-party PNG for schema compatibility
  sameAs: [
    'https://www.linkedin.com/company/cosmocrat/',
    'https://www.instagram.com/cosmocrat.ai/',
    'https://www.facebook.com/profile.php?id=61585886768903#',
  ],
  founder: {
    id: 'https://www.danmercede.com/#person',
    name: 'Dan Mercede',
    url: 'https://www.danmercede.com/',
    sameAs: [
      'https://www.linkedin.com/in/danmercede/',
      'https://x.com/danmercede',
    ],
  },
  parentOrganization: {
    id: 'https://www.orionapexcapital.com/#organization',
    name: 'Orion Apex Capital',
    url: 'https://www.orionapexcapital.com/',
    sameAs: ['https://www.linkedin.com/company/orioncapexcapital'],
  },
} as const;

export type SiteConfig = typeof siteConfig;
