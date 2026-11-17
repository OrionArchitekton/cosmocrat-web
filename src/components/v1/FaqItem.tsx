'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-[#233047] bg-[#121b2e]/50 px-5 transition-colors hover:border-[#334563]">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center gap-4 text-left focus:outline-none"
      >
        <h3 className="text-sm sm:text-base font-medium text-[#e2e8f0] m-0">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-[#f0b66a] shrink-0" size={16} aria-hidden="true" />
        ) : (
          <ChevronDown className="text-[#94a3b8] shrink-0" size={16} aria-hidden="true" />
        )}
      </button>
      <div
        hidden={!isOpen}
        className="pb-5 text-sm leading-relaxed text-[#94a3b8] border-t border-[#233047]/60 pt-3"
      >
        {answer}
      </div>
    </div>
  );
}
