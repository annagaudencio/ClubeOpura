import { useState } from 'react';
import Icon from './Icons'; 

export default function PasswordInput({ label, error, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const baseClasses = "input w-full rounded-full transition-colors duration-300";
  const errorClasses = error ? "border border-red-500 text-red-500" : "border border-transparent";
  const hoverClasses = "hover:border-[var(--color-links)] focus:border-[var(--color-links)] border-2";
  const iconClasses = "ml-2 cursor-pointer";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)]">
      <label className={`tag inline-flex ${isFocused ? 'label-visible' : 'label-hidden'}`}>
        {label}
      </label>
      <div className={`flex items-center ${baseClasses} ${errorClasses} ${hoverClasses} bg-color-primaria`}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="flex-grow bg-transparent outline-none placeholder-gray-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <div 
          onClick={togglePasswordVisibility}
          className={iconClasses}
        >
          <Icon 
            name={isPasswordVisible ? "verOff" : "verOn"} 
            fill="var(--color-links)"
            width="24"
            height="24"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}