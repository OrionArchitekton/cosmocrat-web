import GovernanceContext from '@/components/os/GovernanceContext';
import RuntimeGovernanceContent from '@/components/v1/pages/RuntimeGovernanceContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Runtime Governance',
  description: 'Cosmocrat runtime governance architecture: policy and authority admission at a named integration boundary, separate from the independently released Orion tools.',
  path: '/runtime-governance',
});

const schema = generateFeatureSchema({
  name: 'Runtime Governance',
  description: 'Cosmocrat runtime governance architecture: policy and authority admission at a named integration boundary, separate from the independently released Orion tools.',
  path: '/runtime-governance',
});
const schemaJson = JSON.stringify(schema);

export default function RuntimeGovernancePage() {
  return (
    <>
      <GovernanceContext />
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
