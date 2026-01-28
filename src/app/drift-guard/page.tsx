import Script from 'next/script';
import DriftGuardContent from '@/components/v1/pages/DriftGuardContent';
import { generatePageMetadata } from '@/lib/metadata';
import { generateFeatureSchema } from '@/lib/schemas';

export const metadata = generatePageMetadata({
  title: 'Drift Guard',
  description:
    'Detect behavioral and policy divergence in real-time. Identify when authorized intent decouples from actual system execution.',
  path: '/drift-guard',
});

const schema = generateFeatureSchema({
  name: 'Drift Guard',
  description:
    'Detect behavioral and policy divergence in real-time. Identify when authorized intent decouples from actual system execution.',
  path: '/drift-guard',
});

export default function DriftGuardPage() {
  return (
    <>
      <Script
        id="ldjson-drift-guard"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        strategy="afterInteractive"
      />
      <DriftGuardContent />
    </>
  );
}
