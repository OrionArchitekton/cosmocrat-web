import type { Metadata } from 'next';
import MemoryInfrastructureContent from '@/components/v1/pages/MemoryInfrastructureContent';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Memory as Infrastructure | Governed AI Context',
  description:
    'Treat AI memory as a managed resource, not a log. Enforce lane isolation and authority-scoped retrieval to prevent context contamination.',
  alternates: { canonical: `${baseUrl}/memory-infrastructure` },
  openGraph: {
    title: 'Memory as Infrastructure | Cosmocrat',
    description:
      'Treat AI memory as a managed resource, not a log. Enforce lane isolation and authority-scoped retrieval to prevent context contamination.',
    url: `${baseUrl}/memory-infrastructure`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function MemoryInfrastructurePage() {
  return <MemoryInfrastructureContent />;
}
