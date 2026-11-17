'use client';

import { useState } from 'react';
import { ArrowDown, ChevronDown } from 'lucide-react';
import type { ToolDefinition } from '@/lib/toolCatalog';

const questions = [
  {
    question: 'Do workers edit the same files?',
    reason: 'Claim the task with PM, then scan worktrees for overlapping paths.',
    tools: ['orion-pm', 'orion-worktree-report'],
  },
  {
    question: 'Does context get lost between sessions?',
    reason: 'Save task context in Handoff and keep the full output recoverable in Results.',
    tools: ['orion-handoff', 'orion-results'],
  },
  {
    question: 'Do workers share a signed-in browser?',
    reason: 'Give each browser identity its own profile and lease it to the worker that needs it.',
    tools: ['orion-browser'],
  },
];

export default function ToolMatcher({
  tools,
  onChoose,
}: {
  tools: readonly ToolDefinition[];
  onChoose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const matches = questions.filter((item) => selected.includes(item.question));
  return (
    <details
      data-tool-matcher
      className="group mb-6 rounded-xl border border-[#334563] bg-[#121b2e]/70 px-4 sm:px-5"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-base font-semibold text-[#e2e8f0]">
        Which tool do I need?
        <ChevronDown
          size={17}
          className="text-[#f0b66a] group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <fieldset className="border-t border-[#233047] pb-4">
        <legend className="px-1 text-xs text-[#b2c0d4]">Select each problem you run into</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {questions.map((item) => (
            <label
              key={item.question}
              className="flex cursor-pointer items-start gap-2 rounded-md border border-[#334155] bg-[#0b1120] p-3 text-sm text-[#d7e0ed]"
            >
              <input
                type="checkbox"
                className="mt-1 accent-[#f0b66a]"
                checked={selected.includes(item.question)}
                onChange={(event) =>
                  setSelected(
                    event.target.checked
                      ? [...selected, item.question]
                      : selected.filter((value) => value !== item.question)
                  )
                }
              />
              {item.question}
            </label>
          ))}
        </div>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {matches.map(({ question, reason, tools: ids }) => (
          <div key={question} className="border-t border-[#233047] py-3 text-sm text-[#b2c0d4]">
            <p>{reason}</p>
            <div className="mt-1 flex flex-wrap gap-x-4">
              {ids.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={onChoose}
                  className="inline-flex min-h-9 items-center gap-1 text-[#f0b66a] underline-offset-4 hover:underline"
                >
                  {tools.find((tool) => tool.id === id)?.name}{' '}
                  <ArrowDown size={12} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
