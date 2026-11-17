import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Preventing worktree collisions between AI agents',
  description: 'Pair a named task owner with a read-only worktree scan. Learn what complete, overlapping and partial reports let a second agent conclude.',
  path: '/guides/preventing-worktree-collisions',
});

export default function WorktreeFieldNote() {
  return (
    <>
      <h1>Find overlapping work before two agents edit the same file</h1>
      <p>
        Two branches can each have a clear purpose and still touch the same file. Imagine one
        worker changing a retry helper while another adds timeout handling in that helper.
        Orion PM records who claimed each task. Orion Worktree Report shows which
        registered worktrees currently have uncommitted edits to the same path.
      </p>
      <h2>Read coverage before reading the file list</h2>
      <p>
        Select each repository by its absolute checkout root. In Orion Worktree Report v0.1.0,
        the exit code tells you how to interpret the scan. The report also records its coverage,
        conclusion and any problems.
      </p>
      <dl className="grid gap-4 rounded-lg border border-[#334563] p-5">
        <div><dt className="font-mono text-[#f0b66a]">0 · Complete, no overlap observed</dt>
          <dd>The scanned worktrees showed no common dirty path. Committed changes or an interaction across two different files can still conflict.</dd></div>
        <div><dt className="font-mono text-[#f0b66a]">1 · Complete, overlap observed</dt>
          <dd>Read the named path and worktree pair. Agree who will finish that file and what the second worker can do independently.</dd></div>
        <div><dt className="font-mono text-[#f0b66a]">3 · Partial coverage</dt>
          <dd>Keep any positive findings, identify the missing checkout, and repeat the scan when it is available. The unobserved portion remains unknown.</dd></div>
      </dl>
      <p>
        An invalid invocation, unavailable report or internal failure leaves the question open.
        Keep the exit status with the report so the next reader can distinguish a positive finding
        from an unsuccessful scan.
      </p>
      <h2>Resolve the overlap, then check the combined change</h2>
      <p>
        For the retry helper, the workers could give one person the implementation while the
        other takes a separate test file. Record the scope decision where both workers can see
        it. Scan again after the edits, inspect the combined diff, and run the relevant tests.
        Merge approval stays with the repository owner’s normal process.
      </p>
      <div className="button-row">
        <a className="button button-primary" href="https://www.danmercede.com/guides/git-worktree-overlap-report">Run the two-worktree example</a>
        <Link className="button button-outline" href="/tools#orion-worktree-report">Report release and scope</Link>
      </div>
      <p className="mt-6">
        <Link className="text-link" href="/guides/agent-handoff-pattern">How to hand the report to another agent →</Link>
      </p>
    </>
  );
}
