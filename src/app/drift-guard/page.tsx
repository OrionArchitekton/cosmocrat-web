import type { Metadata } from 'next';
import DriftGuardContent from '@/components/v1/pages/DriftGuardContent';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Drift Guard | Continuous AI Integrity Detection',
  description:
    'Detect behavioral and policy divergence in real-time. Identify when authorized intent decouples from actual system execution.',
  alternates: { canonical: `${baseUrl}/drift-guard` },
  openGraph: {
    title: 'Drift Guard | Cosmocrat',
    description:
      'Detect behavioral and policy divergence in real-time. Identify when authorized intent decouples from actual system execution.',
    url: `${baseUrl}/drift-guard`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function DriftGuardPage() {
  return <DriftGuardContent />;
}
