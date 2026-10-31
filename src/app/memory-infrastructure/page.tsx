import GovernanceContext from '@/components/os/GovernanceContext';
import MemoryInfrastructureContent from '@/components/v1/pages/MemoryInfrastructureContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Memory Infrastructure',
  description: 'Cosmocrat governed-memory design: explicit context scope, authority and provenance. Comprehensive isolation is not established by tool-family membership.',
  path: '/memory-infrastructure',
});

const schema = generateFeatureSchema({
  name: 'Memory Infrastructure',
  description: 'Cosmocrat governed-memory design: explicit context scope, authority and provenance. Comprehensive isolation is not established by tool-family membership.',
  path: '/memory-infrastructure',
});
const schemaJson = JSON.stringify(schema);

export default function MemoryInfrastructurePage() {
  return (
    <>
      <GovernanceContext />
      <script
        id="ldjson-memory-infrastructure"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <MemoryInfrastructureContent />
    </>
  );
}
