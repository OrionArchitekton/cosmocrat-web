import Script from 'next/script';
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

export default function MemoryInfrastructurePage() {
  return (
    <>
      <Script
        id="ldjson-memory-infrastructure"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        strategy="afterInteractive"
      />
      <MemoryInfrastructureContent />
    </>
  );
}
