import React from 'react';
import BeneficiosResgatados from '../components/beneficiosResg';
import ProgressContainer from '../components/saldoDePontos';
import { useUser } from '/services/UserContext';

export default function BenefitsAndProgress({ beneficios }) {
  const { userId } = useUser(); // Acessa o userId do contexto

  return (
    <div className='w-full h-fit md:w-1/2 md:h-full bg-[var(--color-background)] rounded-[32px] p-8 pt-12 pb-40 space-y-10 md:overflow-y-auto'>
      <BeneficiosResgatados beneficios={beneficios} />
      <ProgressContainer userId={userId} />
    </div>
  );
}