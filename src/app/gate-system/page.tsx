import GateSystemContent from '@/components/v1/pages/GateSystemContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Gate System',
  description:
    'A deterministic enforcement pipeline. Validates input, memory, authority, and intent. The system fails closed if any gate conditions are not met.',
  path: '/gate-system',
});

export default function GateSystemPage() {
  return <GateSystemContent />;
}
