import { useState } from 'react';
import Icon from './Icons';

export default function CheckboxField({ label, checked, onChange, isRequired }) {
  const [isChecked, setIsChecked] = useState(checked);
  const [showError, setShowError] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    setShowError(false);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className="flex items-center space-x-3 self-stretch py-2">
      <div 
        className={`Checkbox rounded-full transition-colors duration-300 flex content-center justify-center p-0.5 ${isChecked ? 'bg-[var(--color-links)]' : 'border border-[var(--color-links)]'}`}
        onClick={handleCheckboxChange}
      >
        {isChecked && <Icon name="check" fill="var(--color-primaria)" />}
      </div>
      <label className="text-sm cursor-pointer" onClick={handleCheckboxChange}>{label}</label>
      {isRequired && showError && (
        <div><span className="text-red-500 text-xs">Este campo é obrigatório.</span></div>
      )}
    </div>
  );
}