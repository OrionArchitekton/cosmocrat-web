export type ToolCategory = 'coordination' | 'access' | 'continuity' | 'practice' | 'experimental';
export interface ToolDefinition {
  id: string;
  icon:
    | 'pm'
    | 'browser'
    | 'phone'
    | 'handoff'
    | 'results'
    | 'worktree'
    | 'starter'
    | 'shield'
    | 'skills'
    | 'remote';
  name: string;
  category: ToolCategory;
  kind: string;
  version: string;
  status: string;
  tagline: string;
  description: string;
  environment: string;
  boundary: string;
  release?: string;
  guide?: string;
  guide_label?: string;
  source?: string;
  video?: string;
  profiles?: readonly { label: string; href: string }[];
}

// Release and guide relationships checked October 30, 2026. Affiliation does not
// imply private-estate adoption, kernel integration or a shared support boundary.
export const tools: readonly ToolDefinition[] = [
  {
    id: 'orion-pm',
    icon: 'pm',
    name: 'Orion PM',
    category: 'coordination',
    kind: 'Task ownership',
    version: 'v0.1.1',
    status: 'RELEASED',
    tagline: 'Local task ownership for cooperating agents.',
    description:
      'Record a task, let one worker claim it, and retain revisions and evidence as the work moves forward. The next worker obtains its own claim.',
    environment:
      'CPython 3.11 on WSL2 Linux with local ext4. Consult the release for exact support limits.',
    boundary:
      'A claim coordinates work. It grants no account, merge, deployment or publishing authority, and does not stop an expired worker.',
    release: 'https://github.com/OrionArchitekton/orion-pm-oss/releases/tag/v0.1.1',
    guide: 'https://www.danmercede.com/guides/coordinate-local-agents-with-orion-pm',
    video: 'https://www.youtube.com/watch?v=U8q_0b1lu_4',
  },
  {
    id: 'orion-browser',
    icon: 'browser',
    name: 'Orion Browser',
    category: 'access',
    kind: 'Browser access',
    version: 'v0.1.0',
    status: 'RELEASED',
    tagline: 'A persistent Chrome identity with a lease of its own.',
    description:
      'Separate profiles and screens for the identities you work with. An agent leases a browser, connects its existing driver, and releases it when finished.',
    environment:
      'Linux with a systemd user manager; separately installed Chrome and display packages. WSL2 as documented.',
    boundary:
      'Leases coordinate cooperative agents. They do not sandbox hostile local processes or limit a holder’s signed-in account actions.',
    release: 'https://github.com/OrionArchitekton/orion-browser-oss/releases/tag/v0.1.0',
    guide: 'https://www.danmercede.com/guides/multi-agent-browser-pool',
    video: 'https://www.youtube.com/watch?v=ggYDb2nDhDY',
  },
  {
    id: 'orion-phone',
    icon: 'phone',
    name: 'Orion Phone',
    category: 'access',
    kind: 'Android access',
    version: 'v0.2.0',
    status: 'RELEASED',
    tagline: 'An Android phone your agent can use.',
    description:
      'Lease Android emulators, read screens, tap, and type through a CLI or MCP. Holder actions leave audit records; a locked tier waits for an operator unlock.',
    environment:
      'Linux with systemd and KVM, or documented WSL2 with nested virtualization. Android SDK and image requirements apply.',
    boundary:
      'Unlocked accounts retain their powers. Leases and the locked tier do not remove local adb or host access or attest who supplied an unlock credential.',
    release: 'https://github.com/OrionArchitekton/orion-phone-oss/releases/tag/v0.2.0',
    guide: 'https://www.danmercede.com/guides/agent-android-phones',
    video: 'https://www.youtube.com/watch?v=YE9snj66-A0',
  },
  {
    id: 'orion-handoff',
    icon: 'handoff',
    name: 'Orion Handoff',
    category: 'continuity',
    kind: 'Session continuity',
    version: 'v0.1.0',
    status: 'RELEASED',
    tagline: 'The right task. Its observed state. What remains uncertain.',
    description:
      'Save bounded task context in immutable revisions. Another session selects the intended task and inspects that context before deciding how to continue.',
    environment:
      'CPython 3.11 and 3.13 on Linux x86_64, with WSL2/ext4 artifact validation. Exact combinations are in the release receipt.',
    boundary:
      'A handoff records observations and claims. It grants no permission for the next action and does not make an old observation current.',
    release: 'https://github.com/OrionArchitekton/orion-handoff/releases/tag/v0.1.0',
    guide: 'https://www.danmercede.com/guides/hand-off-local-agent-tasks',
    video: 'https://www.youtube.com/watch?v=fPeXt-E-j14',
  },
  {
    id: 'orion-results',
    icon: 'results',
    name: 'Orion Results',
    category: 'continuity',
    kind: 'Recoverable results',
    version: 'v0.1.0',
    status: 'RELEASE AVAILABLE',
    tagline: 'Keep the complete result. Pass a bounded view.',
    description:
      'Capture full text in an explicitly selected local session. Share a small snapshot and recover the exact original text by reference when you need it.',
    environment:
      'Python library. Demonstrated on CPython 3.11.9, SQLite 3.45.1, WSL2 Linux x86_64 and local ext4.',
    boundary:
      'The byte limit applies to selected snapshot text, not the whole model context. References identify content; they do not authorize, redact or encrypt it. The README still labels this version a release candidate.',
    release: 'https://github.com/OrionArchitekton/orion-results/releases/tag/v0.1.0',
    guide: 'https://www.danmercede.com/guides/capture-agent-results-with-byte-bounded-snapshots',
  },
  {
    id: 'orion-worktree-report',
    icon: 'worktree',
    name: 'Orion Worktree Report',
    category: 'coordination',
    kind: 'Development evidence',
    version: 'v0.1.0',
    status: 'RELEASED',
    tagline: 'See overlapping edits, with the coverage to interpret them.',
    description:
      'Observe registered worktrees in selected local repositories. Report exact uncommitted path overlaps while keeping partial or unavailable coverage visible.',
    environment:
      'Acceptance target: CPython 3.11, Git 2.43.0, Linux x86_64, WSL2 and local ext4. MIT with retained attribution.',
    boundary:
      'The report makes no edits, grants no ownership, and does not establish that a merge is safe.',
    release: 'https://github.com/OrionArchitekton/orion-worktree-report/releases/tag/v0.1.0',
    guide: 'https://www.danmercede.com/guides/git-worktree-overlap-report',
  },
  {
    id: 'orion-starter',
    icon: 'starter',
    name: 'Orion Starter',
    category: 'coordination',
    kind: 'Tools working together',
    version: '0.3.0-rc.1',
    status: 'PREVIEW',
    tagline: 'Keep the evidence. Check the work again.',
    description:
      'The development-evidence preview combines Orion PM, Orion Worktree Report, Orion Results and Orion Handoff. Retain the original observation, then have the next worker recover it and check the current state. Components remain independently usable.',
    environment:
      'Manually invoked cooperative local examples on the environments in each profile. MIT with applicable notices.',
    boundary:
      'Independent newcomer onboarding, universal platform support and native agent-harness integrations remain unverified. The continuity guide below is pinned to 0.2.0-rc.1; the development-evidence guide teaches 0.3.0-rc.1.',
    release: 'https://github.com/OrionArchitekton/orion-starter/releases/tag/v0.3.0-rc.1',
    guide: 'https://www.danmercede.com/guides/agent-development-evidence-handoff',
    guide_label: 'Development-evidence guide',
    profiles: [
      {
        label: 'Continuity guide · 0.2.0-rc.1',
        href: 'https://www.danmercede.com/guides/continue-agent-tasks-with-orion-starter',
      },
      {
        label: 'Watch that guide’s companion',
        href: 'https://www.youtube.com/watch?v=nMUzL2o6uEQ',
      },
    ],
  },
  {
    id: 'failclosed',
    icon: 'shield',
    name: 'failclosed',
    category: 'practice',
    kind: 'Review admission',
    version: 'v0.2.0',
    status: 'TAGGED RELEASE',
    tagline: 'Refuse malformed review evidence.',
    description:
      'Run a configured reviewer and examine its output before reporting a change ready. Missing, malformed or contradictory evidence blocks the merge-ready outcome.',
    environment:
      'MIT source and tagged release. Follow repository instructions for the reviewer command and toolchain.',
    boundary:
      'A repository’s actual merge protections and authorization remain separate controls. A tool verdict does not grant merge authority.',
    release: 'https://github.com/OrionArchitekton/failclosed/releases/tag/v0.2.0',
    source: 'https://github.com/OrionArchitekton/failclosed',
  },
  {
    id: 'orion-skills',
    icon: 'skills',
    name: 'Orion Skills',
    category: 'practice',
    kind: 'Operating procedures',
    version: 'v0.6.0',
    status: 'TAGGED RELEASE',
    tagline: 'Scoped work. Honest completion. Recoverable progress.',
    description:
      'Reusable procedures help agents verify outcomes, stay within scope, and preserve useful context. Choose the skills that fit your workflow.',
    environment:
      'MIT. The full library targets Claude Code; a smaller set has documented Codex support.',
    boundary:
      'Skills guide behavior. They are not an execution sandbox or a universal enforcement layer.',
    release: 'https://github.com/OrionArchitekton/orion-skills/releases/tag/v0.6.0',
    guide: 'https://www.danmercede.com/guides/done-needs-a-receipt',
    source: 'https://github.com/OrionArchitekton/orion-skills',
  },
  {
    id: 'remote-hands',
    icon: 'remote',
    name: 'Remote Hands',
    category: 'experimental',
    kind: 'Experimental / session control',
    version: 'SOURCE ONLY',
    status: 'EXPERIMENTAL',
    tagline: 'Let an agent start a Claude Code session on your PC.',
    description:
      'A public experiment connects a WSL command, loopback Windows service, and Cursor bridge to start a session and read its first reply.',
    environment:
      'Windows PC, WSL and Cursor as documented. MIT source; no packaged GitHub release is listed.',
    boundary:
      'The public experiment is start-only. The private estate implementation’s broader session-driving and peer-delivery features are not part of this download.',
    source: 'https://github.com/OrionArchitekton/remote-hands',
    guide: 'https://www.danmercede.com/guides/openai-dot-starts-claude-code-sessions',
  },
];
