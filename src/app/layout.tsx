import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/v1/Header';
import Footer from '@/components/v1/Footer';
import { siteConfig } from '@/lib/siteConfig';
import '../styles/globals.css';

const GTM_ID = 'GTM-K3RWK8SD';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0B0B0F',
};


export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],

  },
  other: {
    'msapplication-TileColor': '#0B0B0F',
    'msapplication-config': '/browserconfig.xml',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteConfig.url}/#organization`,
                  name: siteConfig.name,
                  url: siteConfig.url,
                  logo: siteConfig.logoIcon,
                  description:
                    'Cosmocrat is a Governed AI Operating System providing controlled execution and governed memory for enterprise AI.',
                  parentOrganization: {
                    '@type': 'Organization',
                    name: 'Orion Apex Capital',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteConfig.url}/#website`,
                  url: siteConfig.url,
                  name: `${siteConfig.name} | Governed AI Operating System`,
                  publisher: {
                    '@id': `${siteConfig.url}/#organization`,
                  },
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': `${siteConfig.url}/#software`,
                  name: siteConfig.name,
                  applicationCategory: 'EnterpriseApplication',
                  operatingSystem: 'Cloud, On-Premise',
                  description:
                    'An AI Operating System that enforces fail-closed execution, governed memory, and audit-grade run records.',
                  offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/PreOrder',
                    price: '0',
                    priceCurrency: 'USD',
                    description: 'Request Early Access for Enterprise Pilot',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-cosmo-text selection:bg-cosmo-accent selection:text-white bg-cosmo-dark">
        {/* GTM noscript - immediately after body open */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />

        {/* GTM script - afterInteractive to avoid blocking render */}
        {/* GA4 (G-RPJ9C1KYMF) is injected via GTM, not hard-coded */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </body>
    </html>
  );
}
