import RuntimeGovernanceContent from '@/components/v1/pages/RuntimeGovernanceContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Runtime Governance',
  description:
    'Prevent unauthorized AI execution. The Cosmocrat kernel enforces policy, authority, and lane isolation before any tool use or memory access occurs.',
  path: '/runtime-governance',
});

const schema = generateFeatureSchema({
  name: 'Runtime Governance',
  description:
    'Prevent unauthorized AI execution. The Cosmocrat kernel enforces policy, authority, and lane isolation before any tool use or memory access occurs.',
  path: '/runtime-governance',
});
const schemaJson = JSON.stringify(schema);

export default function RuntimeGovernancePage() {
  return (
    <>
      <script
        id="ldjson-runtime-governance"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <RuntimeGovernanceContent />
    </>
  );
}
