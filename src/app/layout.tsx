import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/content/site';

import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cosmocrat.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`
  },
  description: site.description,
  icons: {
    icon: '/favicon.jpg',
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: siteUrl,
    siteName: site.name,
    type: 'website',
    images: ["/og.png"]
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ["/og.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased relative">
        {/* Subtle background watermark */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url(/brand/cosmocrat-sigil.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: '50vmin',
          }}
        />
        <div className="relative z-10">
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
