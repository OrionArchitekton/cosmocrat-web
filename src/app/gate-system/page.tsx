import GovernanceContext from '@/components/os/GovernanceContext';
import GateSystemContent from '@/components/v1/pages/GateSystemContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Gate System',
  description: 'The conceptual Cosmocrat gate model separates intent, decision, authority, execution and observed outcome. Actual integration scope must be verified.',
  path: '/gate-system',
});

const schema = generateFeatureSchema({
  name: 'Gate System',
  description: 'The conceptual Cosmocrat gate model separates intent, decision, authority, execution and observed outcome. Actual integration scope must be verified.',
  path: '/gate-system',
});
const schemaJson = JSON.stringify(schema);

export default function GateSystemPage() {
  return (
    <>
      <GovernanceContext />
      <script
        id="ldjson-gate-system"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <GateSystemContent />
    </>
  );
}
