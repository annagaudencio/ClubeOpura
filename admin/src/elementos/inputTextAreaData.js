import { useState } from 'react';

export default function TextAreaData({ label, name, value, onChange, rows = 4, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const inputClass = isFocused
    ? 'input rounded-[16px] transition-colors duration-300'
    : 'inputData rounded-[16px] transition-colors duration-300';

  return (
    <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)] mb-4">
      <div className="flex items-center">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${inputClass} flex-grow outline-none placeholder:text-[var(--color-cinza)] text-[var(--color-texto)]`}
          rows={rows}
          {...props}
        />
      </div>
    </div>
  );
}