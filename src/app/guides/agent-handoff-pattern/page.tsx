import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'A handoff pattern for local AI agents',
  description: 'Give the next agent an explicit task, the original evidence and one observation to repeat. A field note on Orion Handoff, Results and PM.',
  path: '/guides/agent-handoff-pattern',
});

export default function HandoffFieldNote() {
  return (
    <>
      <h1>A handoff the next agent can verify</h1>
      <p>
        A worker spots overlapping edits just before its session ends. By the time another
        worker opens the task, both branches may have moved. The second worker needs both
        the first worker’s original observation and a way to check what the repository shows now.
      </p>
      <h2>What to carry across the session boundary</h2>
      <dl className="grid gap-4 rounded-lg border border-[#334563] p-5">
        <div><dt className="font-semibold text-white">Task identity</dt>
          <dd>Record the specific task key and the revision under review. Two tasks in the same project can both look current.</dd></div>
        <div><dt className="font-semibold text-white">Observation and source</dt>
          <dd>Record when the scan ran, which checkouts it covered, and a reference to the full report. Keep the short snapshot small enough to read on pickup.</dd></div>
        <div><dt className="font-semibold text-white">Open question</dt>
          <dd>“Both worktrees had uncommitted edits to the same file. Do those edits still overlap?” This gives the next worker a concrete check.</dd></div>
      </dl>
      <h2>Pick up the named task</h2>
      <p>
        Orion Handoff v0.1.0 selects the record by task key. If selection is ambiguous, ask the
        producer which task to resume. Read the recorded uncertainties, then retrieve the saved
        report through Orion Results. The handoff stores a reference. The reader chooses when to
        retrieve it. If the original is unavailable, record that gap.
      </p>
      <h2>Repeat the observation before taking ownership</h2>
      <p>
        Run a fresh worktree scan over the same selected repositories and compare coverage as
        well as filenames. If the overlap has cleared, record that change in a successor handoff.
        If it persists, agree on a path owner with the other worker. For work coordinated through
        Orion PM, the incoming worker needs its own current claim before continuing.
      </p>
      <p>
        Starter 0.3.0-rc.1 demonstrates this sequence with synthetic worktrees. The walkthrough
        includes recovery of the original observation and an independent scan by the receiving worker.
      </p>
      <div className="button-row">
        <a className="button button-primary" href="https://www.danmercede.com/guides/agent-development-evidence-handoff">Follow the pinned walkthrough</a>
        <Link className="button button-outline" href="/tools#orion-handoff">Handoff release and scope</Link>
      </div>
      <p className="mt-6">
        <Link className="text-link" href="/guides/preventing-worktree-collisions">How to interpret overlapping edits →</Link>
      </p>
    </>
  );
}
