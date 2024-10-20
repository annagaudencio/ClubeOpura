import { useState } from 'react';

export default function InputData({ label, name, value, onChange, type = "text", ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = isFocused
    ? 'input rounded-full transition-colors duration-300'
    : 'inputData rounded-full transition-colors duration-300';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    };
  
    const handleDateChange = (e) => {
      const newDate = e.target.value;
      onChange({
        target: {
          name,
          value: newDate
        }
      });
    };
  
    const displayValue = type === 'date' ? formatDate(value) : value;
  

  return (
    <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)]">
      {/* <label className={`tag inline-flex transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        {label}
      </label> */}
      <div className="flex items-center">
        <input
          type={inputType}
          placeholder={isFocused ? '' : label}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${inputClass} flex-grow outline-none placeholder:text-[var(--color-cinza)] text-[var(--color-texto)]`}
          {...props}
        />
      </div>
    </div>
  );
}
