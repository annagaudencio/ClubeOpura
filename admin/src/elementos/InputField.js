import { useState } from 'react';

export default function InputField({ label, icon, error, type = "text", ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = "input w-full rounded-full transition-colors duration-300";
  const errorClasses = error ? "border border-red-500 text-red-500" : "border border-transparent";
  const hoverClasses = "hover:border-[var(--color-links)] focus:border-[var(--color-links)] border-2";
  const iconClasses = "ml-2";

  return (
    <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)]">
      <label className={`tag inline-flex transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        {label}
      </label>
      <div className={`flex items-center ${baseClasses} ${errorClasses} ${hoverClasses} bg-color-primaria`}>
        <input
          type={type}
          className="flex-grow bg-transparent outline-none placeholder:text-[var(--color-cinza)]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {icon && <Icon name={icon} className={iconClasses} fill="var(--color-links)" />}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
