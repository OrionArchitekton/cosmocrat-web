export const site = {
  name: 'Cosmocrat',
  domain: 'cosmocrat.ai',
  title: 'Cosmocrat — the customer-owned AI brain',
  description:
    'A governed system that remembers, reasons, and acts over time — running in your environment.',
  contactEmail: process.env.CONTACT_EMAIL || 'contact@cosmocrat.ai',
  nav: [
    { label: 'Docs', href: '/docs' },
    { label: 'Early Access', href: '/waitlist' }
  ]
};

export const hero = {
  eyebrow: 'Early access',
  headline: 'The customer-owned AI brain.',
  subhead:
    'Cosmocrat is a governed system that remembers, reasons, and acts over time — running in your environment, accessed through the Cosmocrat Client (default).',
  bullets: [
    'Not a chatbot. Not a memory plugin.',
    'A production-grade control plane for persistent memory + safe execution.',
    'Your engine runs in your environment. Your keys. Your data.'
  ]
};

// Slide 2: Problem
export const problem = {
  title: 'Most “AI apps” forget. Most “agent stacks” drift.',
  body: [
    'Ad-hoc RAG pipelines. Stateless assistants. Scripted agents with no audit trail.',
    'Pipelines fail quietly. Governance is bolted on — if it exists at all.'
  ],
  result: 'Cosmocrat makes AI operationally real: fail-closed, drift-protected, auditable by default.'
};

// Slide 3: What Cosmocrat Is
export const whatItIs = {
  title: 'What you get',
  bullets: [
    'Cosmocrat Client (default) — the product experience your team uses daily',
    'Cosmocrat API — the stable interface your client and integrations call',
    'Cosmocrat Engine — workers + memory + orchestration that run inside your environment',
    'Governance baked in — fail-closed guardrails, drift protection, and audit-grade run records'
  ]
};

// Slide 4: Side-brain Does
export const sidebrain = {
  title: 'Standard Deployment (Default)',
  bullets: [
    'Deploy the Cosmocrat Engine + API in your environment.',
    'Your team uses the Cosmocrat Client to connect securely to your backend.',
    'Your engine. Your keys. Your data.',
    'We don’t require access to your databases or infrastructure.'
  ]
};

// Slide 6: Sovereignty
export const sovereignty = {
  title: 'Developer Mode (Advanced)',
  subhead: 'Prefer a custom client or direct integrations? Use the Cosmocrat API with your own UI and automation.',
  cards: [
    {
      title: 'Bring your own client',
      body: 'Use the Cosmocrat API to power a custom UI and workflow tailored to your team.'
    },
    {
      title: 'API-first integrations',
      body: 'Connect directly to your systems and automations while keeping governance and run records intact.'
    }
  ]
};

// Slide 7: Non-negotiables (now: operational outcomes)
export const principles = {
  title: 'Cosmocrat makes AI operationally real',
  items: [
    {
      title: 'Fail-closed',
      body: 'Guardrails that stop unsafe actions instead of failing silently.'
    },
    {
      title: 'Auditable',
      body: 'Run records you can inspect, reason about, and trust.'
    },
    {
      title: 'Persistent',
      body: 'Long-term memory that survives sessions, tools, and time.'
    },
    {
      title: 'Governed',
      body: 'Control, boundaries, and drift protection by default.'
    }
  ]
};
