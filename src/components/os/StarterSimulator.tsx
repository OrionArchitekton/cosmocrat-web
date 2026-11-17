'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Eye, FileText, GitBranch, RefreshCw } from 'lucide-react';

interface WorkflowStep {
  id: string;
  num: string;
  shortLabel: string;
  tool: string;
  role: string;
  boundary: string;
  snapshotCode: string;
  fullCode?: string;
}

const workflowSteps: readonly WorkflowStep[] = [
  {
    id: 'claim',
    num: '01',
    shortLabel: 'Claim',
    tool: 'Orion PM',
    role: 'Establish who owns the task within a bounded scope',
    boundary: 'Cooperative claim: prevents accidental overlap without granting account or merge authority.',
    snapshotCode: `{
  "task_id": "task-auth-refresh",
  "owner": "worker-a",
  "claim_status": "ACTIVE",
  "scope": ["src/auth/**"],
  "evidence": ["initial-test-run.txt"]
}`,
  },
  {
    id: 'handoff',
    num: '02',
    shortLabel: 'Handoff',
    tool: 'Orion Handoff',
    role: 'Carry intended context, observed state, and open uncertainty',
    boundary: 'Immutable revision record: informs the next session without authorizing automatic execution.',
    snapshotCode: `{
  "revision": 2,
  "task_id": "task-auth-refresh",
  "observed": "Token refresh passes locally; migration pending.",
  "uncertain": ["Staging edge headers not yet verified"],
  "result_ref": "res://89c4a2e1"
}`,
  },
  {
    id: 'recover',
    num: '03',
    shortLabel: 'Recover',
    tool: 'Orion Results',
    role: 'Keep the complete output while passing a byte-bounded view',
    boundary: 'Toggle below to compare the compact context snapshot with the exact recovered original.',
    snapshotCode: `{
  "ref": "res://89c4a2e1",
  "view": "bounded_snapshot (512 bytes)",
  "summary": "24/24 unit checks passed; 2 staging warnings noted.",
  "truncated": true
}`,
    fullCode: `{
  "ref": "res://89c4a2e1",
  "view": "full_recovered_artifact (4,812 bytes)",
  "suite": "auth-integration",
  "passed": 24,
  "warnings": [
    "WARN: staging proxy strips custom x-trace header",
    "WARN: fallback refresh clock skew tolerance at 500ms"
  ],
  "checksum_sha256": "e3b0c44298fc1c14..."
}`,
  },
  {
    id: 'observe',
    num: '04',
    shortLabel: 'Observe',
    tool: 'Orion Worktree Report',
    role: 'Verify current workspace state and visible path overlaps',
    boundary: 'Read-only observation: keeps partial or unavailable coverage visible before you decide.',
    snapshotCode: `{
  "worktrees_checked": 3,
  "overlaps_detected": [
    "src/auth/session.ts (worker-a, worker-b)"
  ],
  "coverage": "complete (WSL2 ext4)",
  "verdict": "Review overlap before continuing"
}`,
  },
];

export default function StarterSimulator() {
  const [stepIdx, setStepIdx] = useState(0);
  const [showFullResult, setShowFullResult] = useState(false);

  const current = workflowSteps[stepIdx];
  const codeText =
    current.id === 'recover' && showFullResult && current.fullCode
      ? current.fullCode
      : current.snapshotCode;

  return (
    <div className="sim-shell" aria-label="Interactive Starter workflow explorer">
      <div className="sim-header">
        <div className="sim-title">STARTER WORKFLOW · 0.3.0-RC.1</div>
        <span className="tag tag-preview">PREVIEW</span>
      </div>

      <div className="sim-steps" role="tablist" aria-label="Workflow stages">
        {workflowSteps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            className="sim-step-btn"
            aria-selected={index === stepIdx}
            onClick={() => {
              setStepIdx(index);
              if (step.id !== 'recover') setShowFullResult(false);
            }}
          >
            <span className="sim-step-num">{step.num}</span>
            <span className="sim-step-name">{step.shortLabel}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={`${current.id}-${showFullResult ? 'full' : 'snap'}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="sim-body"
      >
        <div className="sim-meta-row">
          <div>
            <div className="sim-tool-label flex items-center gap-2">
              {current.id === 'claim' && <CheckCircle2 size={15} className="text-amber-400" />}
              {current.id === 'handoff' && <RefreshCw size={15} className="text-amber-400" />}
              {current.id === 'recover' && <FileText size={15} className="text-amber-400" />}
              {current.id === 'observe' && <GitBranch size={15} className="text-amber-400" />}
              <span>{current.tool}</span>
            </div>
            <div className="sim-role-sub">{current.role}</div>
          </div>

          {current.id === 'recover' && (
            <button
              type="button"
              onClick={() => setShowFullResult((prev) => !prev)}
              className="motion-control text-xs min-h-[34px] py-1 px-3"
            >
              <Eye size={13} aria-hidden="true" />
              {showFullResult ? 'View bounded snapshot' : 'Recover full artifact'}
            </button>
          )}
        </div>

        <pre className="sim-code">
          <code>{codeText}</code>
        </pre>

        <div className="sim-boundary">
          <div>
            <strong>Boundary:</strong> {current.boundary}
          </div>
          <button
            type="button"
            onClick={() => setStepIdx((prev) => (prev + 1) % workflowSteps.length)}
            className="text-link text-xs whitespace-nowrap min-h-[32px]"
          >
            Next stage <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
