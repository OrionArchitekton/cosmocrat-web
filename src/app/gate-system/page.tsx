import type { Metadata } from 'next';
import GateSystemContent from '@/components/v1/pages/GateSystemContent';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'The Gate System | 7-Stage AI Execution Pipeline',
  description:
    'A deterministic enforcement pipeline. Validates input, memory, authority, and intent. The system fails closed if any gate conditions are not met.',
  alternates: { canonical: `${baseUrl}/gate-system` },
  openGraph: {
    title: 'The Gate System | Cosmocrat',
    description:
      'A deterministic enforcement pipeline. Validates input, memory, authority, and intent. The system fails closed if any gate conditions are not met.',
    url: `${baseUrl}/gate-system`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function GateSystemPage() {
  return <GateSystemContent />;
}
