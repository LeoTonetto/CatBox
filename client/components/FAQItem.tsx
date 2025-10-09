'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-blue-300 py-4 w-[40vw]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left text-white font-semibold text-lg"
      >
        {question}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-96 mt-2 opacity-100' : 'max-h-0 mt-0 opacity-0'
          }`}
      >
        <div className="text-purple-100 text-base break-words p-5">{answer}</div>
      </div>
    </div>
  );
}
