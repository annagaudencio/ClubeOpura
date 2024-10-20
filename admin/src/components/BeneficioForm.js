import React from 'react';
import BenefDados from '../elementos/benefDados';

const BeneficioForm = ({ beneficio, onChange }) => {
  const handleChange = (updatedData) => {
    onChange(updatedData);
  };

  return (
    <div className="md:self-stretch md:grow bg-[var(--color-bg-preto)] rounded-[32px] p-6">
      <BenefDados 
        beneficio={beneficio} 
        setBeneficio={handleChange} 
      />
    </div>
  );
};

export default BeneficioForm;