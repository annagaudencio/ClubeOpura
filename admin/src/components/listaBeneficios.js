import React from 'react';
import Link from 'next/link';

const BeneficioCard = ({ id, titulo, pontos }) => {
  // Formatação de números grandes (ex: 1000 -> 1K)
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    } else {
      return num.toString();
    }
  }

  return (
    <Link href={`/beneficio/${id}`}>
      <div className="relative bg-white rounded-[32px] overflow-hidden cursor-pointer shadow-lg transition-transform transform hover:scale-105">
        <img 
          src={`https://opuramarmores.com/benef-img/${id}.webp`} 
          alt={titulo} 
          className="w-full h-[200px] object-cover"
          onError={(e) => {
            e.target.onerror = null; // Previne loop infinito
            e.target.src = '/midia/imagem.webp'; // Imagem padrão em caso de erro
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-preto)] via-transparent to-transparent" />
          <div className="absolute w-full bottom-0 p-4 py-2 text-center text-[var(--color-background)]">
            <h5 className="font-bold">{titulo}</h5>
            <p className="text-sm"><strong>{formatNumber(pontos)}</strong> Pontos</p>
          </div>
      </div>
    </Link>
  );
};

export default BeneficioCard;