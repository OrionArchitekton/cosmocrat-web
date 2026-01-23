import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/v1/Header';
import Footer from '@/components/v1/Footer';
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

export const metadata: Metadata = {
  title: {
    default: 'Cosmocrat | The Governed AI Operating System',
    template: '%s | Cosmocrat',
  },
  description:
    'An enterprise OS for governed memory and controlled execution. Enforce fail-closed authority and audit-grade run records at the runtime kernel level.',
  metadataBase: new URL('https://cosmocrat.ai'),
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cosmocrat.ai',
    siteName: 'Cosmocrat',
    title: 'Cosmocrat | The Governed AI Operating System',
    description:
      'An enterprise OS for governed memory and controlled execution. Enforce fail-closed authority and audit-grade run records at the runtime kernel level.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmocrat | The Governed AI Operating System',
    description:
      'An enterprise OS for governed memory and controlled execution. Enforce fail-closed authority and audit-grade run records at the runtime kernel level.',
    images: ['/og.png'],
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
                  '@id': 'https://cosmocrat.ai/#organization',
                  name: 'Cosmocrat',
                  url: 'https://cosmocrat.ai',
                  logo: 'https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/cosmocrat-.png',
                  description:
                    'Cosmocrat is a Governed AI Operating System providing controlled execution and governed memory for enterprise AI.',
                  parentOrganization: {
                    '@type': 'Organization',
                    name: 'Orion Apex Capital',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://cosmocrat.ai/#website',
                  url: 'https://cosmocrat.ai',
                  name: 'Cosmocrat | Governed AI Operating System',
                  publisher: {
                    '@id': 'https://cosmocrat.ai/#organization',
                  },
                },
                {
                  '@type': 'SoftwareApplication',
                  '@id': 'https://cosmocrat.ai/#software',
                  name: 'Cosmocrat',
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
