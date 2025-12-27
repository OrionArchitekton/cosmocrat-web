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
      <body className="font-sans antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
