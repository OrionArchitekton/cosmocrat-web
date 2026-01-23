'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is an AI operating system?',
    answer: (
      <>
        <p>
          An AI Operating System (AI OS) is the infrastructure layer that sits between your
          models/agents and your business systems. It is responsible for memory management,
          authority enforcement, and execution governance.
        </p>
        <p className="mt-3">
          Unlike a simple model wrapper, an AI OS maintains state and enforces policy at the
          runtime kernel level, ensuring that AI cannot bypass governance controls.
        </p>
      </>
    ),
  },
  {
    question: 'Does Cosmocrat replace my LLM provider?',
    answer: (
      <p>
        No. Cosmocrat is model-agnostic. You bring your own models (OpenAI, Anthropic, Llama, etc.)
        and your own API keys. Cosmocrat acts as the governance and control plane{' '}
        <em>around</em> those models, ensuring their outputs and tool calls adhere to your
        enterprise policy before execution.
      </p>
    ),
  },
  {
    question: 'What is governed memory?',
    answer: (
      <p>
        Governed memory means that AI context is treated as a secure resource with access controls,
        not just a text cache. Cosmocrat uses &quot;Lane Isolation&quot; to ensure that memory from
        sensitive workflows (like legal or HR) cannot bleed into unrelated tasks or be accessed by
        unauthorized agents.
      </p>
    ),
  },
  {
    question: 'How is Cosmocrat different from AI agents?',
    answer: (
      <p>
        Cosmocrat is the system <em>beneath</em> the agents. While you can build agents on top of
        it, Cosmocrat provides the shared memory, tool interfaces, and governance rules that those
        agents must obey. It prevents &quot;agent sprawl&quot; where every bot has its own isolated,
        ungoverned memory.
      </p>
    ),
  },
  {
    question: 'Does Cosmocrat allow AI to act autonomously?',
    answer: (
      <p>
        Cosmocrat enables controlled autonomy. The system allows AI to execute workflows and access
        tools, but strictly within the bounds defined by your governance policy. It is designed to
        prevent &quot;silent drift&quot; where an AI slowly deviates from its intended parameters.
      </p>
    ),
  },
  {
    question: 'Do I have to change my workflow?',
    answer: (
      <p>
        Standard deployment integrates with your existing backend services. Your team can use the
        default Cosmocrat Client or you can use Developer Mode to build custom interfaces via the
        API, maintaining your preferred workflows while gaining the protection of the operating
        system.
      </p>
    ),
  },
  {
    question: 'What about privacy?',
    answer: (
      <p>
        Cosmocrat is designed for &quot;Your engine. Your keys. Your data.&quot; In standard
        deployment, the system runs in your environment. Authorization tokens and run records are
        cryptographically bound to your instance. We do not require access to your raw data lakes or
        customer databases.
      </p>
    ),
  },
];

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <h3 className="text-lg font-medium text-slate-300 group-hover:text-cosmo-accent transition-colors">
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="text-slate-500 flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-slate-400 leading-relaxed space-y-4">{answer}</div>
      </div>
    </div>
  );
}

export default function SeoFaq() {
  return (
    <section className="py-24 bg-cosmo-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Frequently asked questions</h2>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
