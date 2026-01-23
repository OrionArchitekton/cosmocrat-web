import DriftGuardContent from '@/components/v1/pages/DriftGuardContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Drift Guard | Continuous AI Integrity Detection',
  description:
    'Detect behavioral and policy divergence in real-time. Identify when authorized intent decouples from actual system execution.',
  path: '/drift-guard',
});

export default function DriftGuardPage() {
  return <DriftGuardContent />;
}
