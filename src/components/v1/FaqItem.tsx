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
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
      >
        <h3 className="text-base font-medium text-slate-300 group-hover:text-amber-500 transition-colors">
          {question}
        </h3>
        {isOpen ? (
          <ChevronUp className="text-slate-500" size={16} />
        ) : (
          <ChevronDown className="text-slate-500" size={16} />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-slate-400 text-sm leading-relaxed">{answer}</div>
      </div>
    </div>
  );
}
