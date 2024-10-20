import React from 'react';

export default function CardBeneficio({ titulo, descricao, pontos, bgImage }) {
  return (
    <div className="flex items-start p-0 overflow-hidden max-w-md">
      {/* Imagem */}
      <div
        className="w-1/3 rounded-[32px] h-fill bg-gray-200"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px',
        }}
      ></div>

      {/* Conteúdo */}
      <div className="w-2/3 ml-4">
        <div className='w-full justify-start items-center gap-2 inline-flex'>
            <h5 className="w-2/3 text-[12px] font-semibold uppercase leading-[18px] tracking-widest">{titulo}</h5>
            <div className='w-1/3 justify-center items-center gap-1 inline-flex'><span className="font-bold text-lg">{pontos}</span> <span className="ml-1">★</span></div>
        </div>
        <div className="mt-4">
            <p className="text-[var(--color-cinza)] mt-1 text-sm">{descricao}</p>
        </div>
      </div>
    </div>
  );
}