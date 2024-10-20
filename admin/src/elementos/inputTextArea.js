import { useState } from 'react';

export default function TextAreaField({ label, name, value, onChange, rows = 4, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = "input w-full rounded-[32px] transition-colors duration-300";
  const hoverClasses = "hover:border-[var(--color-links)] focus:border-[var(--color-links)] border-2";

  return (
    <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)]">
      <label className={`tag inline-flex transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        {label}
      </label>
      <div className={`flex items-center ${baseClasses} ${hoverClasses} bg-[var(--color-background)]`}>
        <textarea
          name={name}
          rows={rows}
          className="flex-grow bg-transparent outline-none placeholder:text-[var(--color-cinza)] resize-none p-2"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}