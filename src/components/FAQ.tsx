'use client';

import { useState } from 'react';
import { faq } from '@/content/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faq.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-[var(--border)] bg-[rgba(255,255,255,0.03)] overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
          >
            <span className="font-medium">{item.q}</span>
            <svg
              className={`w-5 h-5 text-copper transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-[var(--muted)]">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}






