import RuntimeGovernanceContent from '@/components/v1/pages/RuntimeGovernanceContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Runtime Governance | AI Policy Enforcement Kernel',
  description:
    'Prevent unauthorized AI execution. The Cosmocrat kernel enforces policy, authority, and lane isolation before any tool use or memory access occurs.',
  path: '/runtime-governance',
});

export default function RuntimeGovernancePage() {
  return <RuntimeGovernanceContent />;
}
