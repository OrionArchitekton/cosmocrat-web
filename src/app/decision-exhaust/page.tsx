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
const schemaJson = JSON.stringify(schema);

export default function DecisionExhaustPage() {
  return (
    <>
      <script
        id="ldjson-decision-exhaust"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <DecisionExhaustContent />
    </>
  );
}
