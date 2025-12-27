export const site = {
  name: 'Cosmocrat',
  domain: 'cosmocrat.ai',
  title: 'Cosmocrat — the AI brain you own',
  description:
    'A private, user-owned cognitive continuity layer that helps you remember and decide with full context.',
  contactEmail: process.env.CONTACT_EMAIL || 'contact@cosmocrat.ai',
  nav: [
    { label: 'Docs', href: '/docs' },
    { label: 'Waitlist', href: '/waitlist' }
  ]
};

export const hero = {
  eyebrow: 'Coming soon',
  headline: 'The AI brain you own.',
  subhead:
    'Cosmocrat is a private, user-owned cognitive continuity layer — a side-brain that connects your digital life into memory and helps you make better decisions with full context.',
  bullets: [
    'No behavior change: keep using the tools you already use.',
    'Lane-aware memory to prevent context bleed across life and work.',
    'Guidance over answers: remembers what matters and reflects prior intent.'
  ]
};

export const sections = {
  whatItIs: {
    title: 'What Cosmocrat is',
    body: [
      'Cosmocrat preserves continuity, intent, and identity across time.',
      'It is not a chatbot wrapper — it is a runtime where your intelligence can persist and compound.'
    ]
  },
  principles: {
    title: 'Non-negotiables',
    items: [
      {
        title: 'User ownership',
        body: 'You own your data, memory, and outcomes. Cosmocrat is designed to avoid extraction.'
      },
      {
        title: 'Explicit permission',
        body: 'Nothing that changes the world happens without your confirmation.'
      },
      {
        title: 'Selective ingestion',
        body: 'You choose sources and scopes. Nothing is collected by default.'
      },
      {
        title: 'Calm reliability',
        body: 'Boring reliability beats clever intelligence. The system should feel calm.'
      }
    ]
  }
};
