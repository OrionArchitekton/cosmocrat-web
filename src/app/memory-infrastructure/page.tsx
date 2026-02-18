import MemoryInfrastructureContent from '@/components/v1/pages/MemoryInfrastructureContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Memory Infrastructure',
  description:
    'Treat AI memory as a managed resource, not a log. Enforce lane isolation and authority-scoped retrieval to prevent context contamination.',
  path: '/memory-infrastructure',
});

const schema = generateFeatureSchema({
  name: 'Memory Infrastructure',
  description:
    'Treat AI memory as a managed resource, not a log. Enforce lane isolation and authority-scoped retrieval to prevent context contamination.',
  path: '/memory-infrastructure',
});
const schemaJson = JSON.stringify(schema);

export default function MemoryInfrastructurePage() {
  return (
    <>
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
