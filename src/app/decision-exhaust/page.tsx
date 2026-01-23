import type { Metadata } from 'next';
import DecisionExhaustContent from '@/components/v1/pages/DecisionExhaustContent';

const baseUrl = 'https://cosmocrat.ai';

export const metadata: Metadata = {
  title: 'Decision Exhaust | Immutable AI Run Records',
  description:
    'Capture the "why" behind every AI action. A complete, replayable record of policy evaluation, authority context, and state transitions.',
  alternates: { canonical: `${baseUrl}/decision-exhaust` },
  openGraph: {
    title: 'Decision Exhaust | Cosmocrat',
    description:
      'Capture the "why" behind every AI action. A complete, replayable record of policy evaluation, authority context, and state transitions.',
    url: `${baseUrl}/decision-exhaust`,
    siteName: 'Cosmocrat',
    images: ['/og.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function DecisionExhaustPage() {
  return <DecisionExhaustContent />;
}
