import Script from 'next/script';
import GateSystemContent from '@/components/v1/pages/GateSystemContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Gate System',
  description:
    'A deterministic enforcement pipeline. Validates input, memory, authority, and intent. The system fails closed if any gate conditions are not met.',
  path: '/gate-system',
});

const schema = generateFeatureSchema({
  name: 'Gate System',
  description:
    'A deterministic enforcement pipeline. Validates input, memory, authority, and intent. The system fails closed if any gate conditions are not met.',
  path: '/gate-system',
});

export default function GateSystemPage() {
  return (
    <>
      <Script
        id="ldjson-gate-system"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        strategy="afterInteractive"
      />
      <GateSystemContent />
    </>
  );
}
