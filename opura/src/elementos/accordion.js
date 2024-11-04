import React, { useState } from 'react';

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full p-[8px] border border-[var(--color-links)] bg-white/50 rounded-[24px] mb-2">
      {/* Título do Accordion */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h5 className="text-[var(--color-preto)] font-semibold leading-[18px]">{title}</h5>
        <svg
          className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      {/* Conteúdo do Accordion */}
      {isOpen && (
        <div className="p-4 text-sm">
          {content}
        </div>
      )}
    </div>
  );
}

export default AccordionItem;