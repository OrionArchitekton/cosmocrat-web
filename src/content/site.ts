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

// Slide 2: Problem
export const problem = {
  title: "Modern life is fragmented. Your context is lost.",
  body: [
    "Life is scattered across dozens of tools and contexts—email, chats, docs, browsers, AI tools, devices.",
    "Each system knows a fragment, but none preserve continuity.",
    "Result: drift, missed commitments, inconsistent execution."
  ]
};

// Slide 3: What Cosmocrat Is
export const whatItIs = {
  title: "Cosmocrat doesn't replace your tools. It connects your life.",
  bullets: [
    "You don't change your behavior—you keep using your tools exactly as you already do.",
    "With explicit permission and clear boundaries, Cosmocrat turns meaningful signals into memory — not surveillance."
  ]
};

// Slide 4: Side-brain Does
export const sidebrain = {
  title: "A living side-brain to preserve continuity.",
  bullets: [
    "Compiles scattered digital life into a coherent timeline of meaning",
    "Remembers commitments, priorities, patterns, and what you intended",
    "Connects dots across tools you already use",
    "Surfaces the right context at the right moment",
    "Helps you make better decisions with full context—without taking agency away"
  ]
};

// Slide 6: Sovereignty
export const sovereignty = {
  title: "Designed for sovereignty.",
  subhead: "Your data, your memory, your decisions — protected by structure, not promises.",
  cards: [
    {
      title: "Business model",
      body: "Software licenses, subscriptions, enterprise support. No data resale. No training on customer data."
    },
    {
      title: "Architecture",
      body: "Privacy is structural—enforced by encryption, boundaries, and customer-owned keys."
    }
  ]
};

// Slide 7: Non-negotiables (5 cards)
export const principles = {
  title: "Non-negotiables",
  items: [
    {
      title: "Memory is sacred",
      body: "Your memory belongs to you. It is never sold, mined, or used for training."
    },
    {
      title: "The user always retains agency",
      body: "Nothing that changes the world happens without your confirmation. You choose sources and scopes."
    },
    {
      title: "No extraction. Ever.",
      body: "You own your data, memory, and outcomes. Cosmocrat is designed to avoid extraction."
    },
    {
      title: "Ethics enforced by design",
      body: "Not by policy or promises—by architecture that makes violation impossible."
    },
    {
      title: "Boring reliability beats clever intelligence",
      body: "The system should feel calm. Predictable. Trustworthy."
    }
  ]
};
