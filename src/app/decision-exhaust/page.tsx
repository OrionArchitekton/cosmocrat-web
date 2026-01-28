import Script from 'next/script';
import DecisionExhaustContent from '@/components/v1/pages/DecisionExhaustContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Decision Exhaust',
  description:
    'Capture the "why" behind every AI action. A complete, replayable record of policy evaluation, authority context, and state transitions.',
  path: '/decision-exhaust',
});

const schema = generateFeatureSchema({
  name: 'Decision Exhaust',
  description:
    'Capture the "why" behind every AI action. A complete, replayable record of policy evaluation, authority context, and state transitions.',
  path: '/decision-exhaust',
});

export default function DecisionExhaustPage() {
  return (
    <>
      <Script
        id="ldjson-decision-exhaust"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        strategy="afterInteractive"
      />
      <DecisionExhaustContent />
    </>
  );
}
