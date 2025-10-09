'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-purple-300 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left text-white font-semibold text-lg"
      >
        {question}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="mt-2 text-purple-100 text-base">
          {answer}
        </div>
      )}
    </div>
  );
}
