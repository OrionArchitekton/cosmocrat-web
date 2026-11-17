// Each comparison names an independent public practice and the private kernel's separate responsibility.
export const architecturePillars = [
  {
    href: '/memory-infrastructure', label: 'Memory Infrastructure', short: '01 Memory',
    toolId: 'orion-handoff', tool: 'Orion Handoff',
    practice: 'Preserve an observation for the next session to inspect.',
    boundary: 'Determine which context an enrolled decision may use.',
  },
  {
    href: '/decision-exhaust', label: 'Decision Exhaust', short: '02 Exhaust',
    toolId: 'orion-results', tool: 'Orion Results',
    practice: 'Retrieve captured text by its reference.',
    boundary: 'Retain policy, authority and state references for a governed decision. External outcomes need their own evidence.',
  },
  {
    href: '/runtime-governance', label: 'Runtime Governance', short: '03 Runtime',
    toolId: 'orion-browser', tool: 'Orion Browser',
    practice: 'Lease a named browser profile to a cooperating worker.',
    boundary: 'Resolve admission before a mutation on an enrolled execution path.',
  },
  {
    href: '/gate-system', label: 'Gate System', short: '04 Gates',
    toolId: 'failclosed', tool: 'failclosed',
    practice: 'Withhold a merge-ready verdict when review evidence fails validation.',
    boundary: 'Separate intent, policy decision and authority for a governed action.',
  },
  {
    href: '/chronicle-receipts', label: 'Chronicle Receipts', short: '05 Receipts',
    toolId: 'orion-pm', tool: 'Orion PM',
    practice: 'Inspect a task revision and its evidence references.',
    boundary: 'Issue an authoritative receipt for an enrolled governance decision.',
  },
  {
    href: '/drift-guard', label: 'Drift Guard', short: '06 Drift Guard',
    toolId: 'orion-worktree-report', tool: 'Orion Worktree Report',
    practice: 'Recheck current file overlaps and inspect scan coverage.',
    boundary: 'Check explicitly enrolled retrieval paths for divergence from the permitted scope.',
  },
] as const;
