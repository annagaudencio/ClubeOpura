import { useState } from 'react';

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
      <label className={`tag inline-flex transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        {label}
      </label>
      <div className={`flex items-center ${baseClasses} ${errorClasses} ${hoverClasses} bg-color-primaria`}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="flex-grow bg-transparent outline-none placeholder:text-[var(--color-cinza)]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <span className={iconClasses} onClick={togglePasswordVisibility}>
          <img
            src={isPasswordVisible ? "/icons/acoes/ver-off.svg" : "/icons/acoes/ver-on.svg"}
            alt={isPasswordVisible ? "Esconder Senha" : "Mostrar Senha"}
            className="w-6 h-6" // Ajuste o tamanho conforme necessário
          />
        </span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}