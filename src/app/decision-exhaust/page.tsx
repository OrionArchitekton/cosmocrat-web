import GovernanceContext from '@/components/os/GovernanceContext';
import DecisionExhaustContent from '@/components/v1/pages/DecisionExhaustContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Decision Exhaust',
  description: 'Governed decision metadata and its policy, authority and state references. Decision records remain distinct from evidence of an external outcome.',
  path: '/decision-exhaust',
});

const schema = generateFeatureSchema({
  name: 'Decision Exhaust',
  description: 'Governed decision metadata and its policy, authority and state references. Decision records remain distinct from evidence of an external outcome.',
  path: '/decision-exhaust',
});
const schemaJson = JSON.stringify(schema);

export default function DecisionExhaustPage() {
  return (
    <>
      <GovernanceContext />
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
