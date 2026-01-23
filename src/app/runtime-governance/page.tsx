import type { Metadata } from 'next';
import RuntimeGovernanceContent from '@/components/v1/pages/RuntimeGovernanceContent';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Runtime Governance | AI Policy Enforcement Kernel',
  description:
    'Prevent unauthorized AI execution. The Cosmocrat kernel enforces policy, authority, and lane isolation before any tool use or memory access occurs.',
  alternates: { canonical: `${baseUrl}/runtime-governance` },
  openGraph: {
    title: 'Runtime Governance | Cosmocrat',
    description:
      'Prevent unauthorized AI execution. The Cosmocrat kernel enforces policy, authority, and lane isolation before any tool use or memory access occurs.',
    url: `${baseUrl}/runtime-governance`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RuntimeGovernancePage() {
  return <RuntimeGovernanceContent />;
}
