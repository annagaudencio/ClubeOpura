import React from 'react';
import Link from 'next/link';

const BeneficioCard = ({ id, titulo, pontos }) => {
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primaria)] via-transparent to-transparent" />
        <div className="absolute w-full bottom-0 p-4 py-2 text-center text-[var(--color-texto)]">
          <h5 className="font-bold">{titulo}</h5>
          <p className="text-sm"><strong>{pontos}</strong> Pontos</p>
        </div>
      </div>
    </Link>
  );
};

export default BeneficioCard;