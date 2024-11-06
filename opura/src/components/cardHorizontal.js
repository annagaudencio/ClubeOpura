import React from 'react';

export default function CardBeneficioH({ tituloBeneficio, descricaoBeneficio, pontosBeneficio, bgImage }) {
  console.log('Props recebidas no CardBeneficioH:', { tituloBeneficio, descricaoBeneficio, pontosBeneficio, bgImage });


  // Tratando dados recebidos para garantir que nunca sejam undefined
  const title = tituloBeneficio ?? 'Título não disponível';
  const description = descricaoBeneficio ?? 'Descrição não disponível';
  const points = pontosBeneficio ?? 0;

  //reduzir numeros com mais de 6 digitos
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
    <div className="w-full flex items-start p-0 overflow-hidden">
      {/* Imagem */}
      <div
        className="w-1/3 rounded-[32px] h-fill bg-gray-200"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px',
        }}
      ></div>

      {/* Conteúdo */}
      <div className="w-2/3 ml-4">
        <div className='w-full justify-start items-center gap-2 inline-flex'>
            <h5 className="w-2/3 text-[12px] font-semibold uppercase leading-[18px] tracking-widest">{title}</h5>
            <div className='w-1/3 justify-center items-center gap-1 inline-flex'>
              {/* <span className="font-bold text-lg">{points}</span>  */}
              <span className="font-bold text-lg">{`${formatNumber(points)}`}</span>
              <span className="ml-1">★</span>
            </div>
        </div>
        <div className="mt-4">
            <p className="text-[var(--color-cinza)] mt-1 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
