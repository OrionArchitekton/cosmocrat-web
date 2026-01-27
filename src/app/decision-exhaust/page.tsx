import DecisionExhaustContent from '@/components/v1/pages/DecisionExhaustContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Decision Exhaust',
  description:
    'Capture the "why" behind every AI action. A complete, replayable record of policy evaluation, authority context, and state transitions.',
  path: '/decision-exhaust',
});

export default function DecisionExhaustPage() {
  return <DecisionExhaustContent />;
}
