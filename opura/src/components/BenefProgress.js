// components/BenefitsAndProgress.js
import React from 'react';
import BeneficiosResgatados from '../components/beneficiosResg';
import ProgressBar from '../components/saldoDePontos';

export default function BenefitsAndProgress({ beneficios, pontos }) {
  return (
    <div className='w-full h-fit md:w-1/2 md:h-full bg-[var(--color-background)] rounded-[32px] p-8 pt-12 pb-40 space-y-10'>
      <BeneficiosResgatados beneficios={beneficios} />
      <ProgressBar pontosGanhos={pontos} pontosResgatados="" pontosRestantes="" maxPontos="300"/>
    </div>
  );
}