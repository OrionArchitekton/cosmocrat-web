export const site = {
  name: 'Cosmocrat',
  domain: 'cosmocrat.ai',
  title: 'Cosmocrat — enterprise AI operating system for governed memory',
  description:
    'An enterprise AI control plane with governed memory, fail-closed execution, ' +
      'and audit-grade run records in your environment.',
  contactEmail: process.env.CONTACT_EMAIL || 'contact@cosmocrat.ai',
  nav: [
    { label: 'Docs', href: '/docs' },
    { label: 'Early Access', href: '/waitlist' }
  ]
};

export const hero = {
  eyebrow: 'Enterprise early access',
  headline: 'The AI operating system for governed memory and controlled execution.',
  subhead:
    'Cosmocrat is an enterprise AI control plane for governance. It runs in your environment and provides fail-closed AI execution, governed memory, and runtime governance with audit-grade run records, all accessed through the default Cosmocrat Client.',
  bullets: [
    'Not a chatbot. Not an agent platform. Not an automation tool.',
    'A production-grade AI control plane for persistent, governed memory and auditable intelligent systems.',
    'Your engine runs in your environment. Your keys. Your data.'
  ]
};

// Slide 2: Problem
export const problem = {
  title: 'Most AI systems lack governance. Most memory drifts.',
  body: [
    'Ad-hoc pipelines and stateless assistants create gaps in AI execution governance.',
    'When controls are bolted on, auditability and AI risk control are inconsistent.',
    'Without runtime governance, AI systems drift silently and liability accumulates invisibly.'
  ],
  result:
    'Cosmocrat makes enterprise AI governance operational: fail-closed AI, drift protection, and an AI audit trail by default.'
};

// Slide 3: What Cosmocrat Is
export const whatItIs = {
  title: 'What you get',
  bullets: [
    'Governance baked in — fail-closed AI guardrails, drift protection, and audit-grade run records and execution receipts',
    'Cosmocrat Engine — workers, governed AI memory, and orchestration that run inside your environment',
    'Cosmocrat API — the stable interface your client and integrations call',
    'Cosmocrat Client (default) — the interface your team uses daily with human-in-the-loop AI controls'
  ]
};

// Slide 4: Side-brain Does
export const sidebrain = {
  title: 'Standard Deployment (Default)',
  bullets: [
    'Deploy the Cosmocrat Engine + API in your environment.',
    'Your team uses the Cosmocrat Client to connect securely to your backend.',
    'Your engine. Your keys. Your data.',
    'Authorization and run records stay with you — cryptographically bound and replayable. We don’t require access to your databases or infrastructure.'
  ]
};

// Slide 6: Sovereignty
export const sovereignty = {
  title: 'Developer Mode (Advanced)',
  subhead:
    'Prefer a custom client or direct integrations? Use the Cosmocrat API with your own UI while keeping AI execution governance intact.',
  cards: [
    {
      title: 'Bring your own client',
      body: 'Use the Cosmocrat API to power a custom UI and workflow tailored to your team.'
    },
    {
      title: 'API-first integrations',
      body: 'Connect directly to your systems while keeping governance and run records intact.'
    }
  ]
};

// Slide 7: Non-negotiables (now: operational outcomes)
export const principles = {
  title: 'Operational outcomes for governed AI',
  items: [
    {
      title: 'Fail-closed',
      body: 'Fail-closed AI guardrails that stop unsafe actions instead of failing silently.'
    },
    {
      title: 'Auditable',
      body: 'Auditable AI systems with run records you can inspect and trust.'
    },
    {
      title: 'Persistent',
      body: 'Persistent AI memory that survives sessions, tools, and time.'
    },
    {
      title: 'Governed',
      body: 'Governed AI memory with control, boundaries, and drift protection by default.'
    }
  ]
};
