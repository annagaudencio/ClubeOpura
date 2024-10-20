import React from 'react';
import Tooltip from '../elementos/Tooltip.js';

const UserPointsChart = ({ pontosTotais = 1200, pontosAtual }) => { 
  const percent = Math.min((pontosAtual / pontosTotais) * 10, 100); 
  const tooltipWidth = 45;

  return (
    <div className="relative w-full h-20 bg-[var(--color-branco-12)] bg-[url('/midia/textura-barra.svg')] rounded-full">
      {/* Barra de progresso */}
      <div 
        className="absolute top-0 left-0 h-full bg-[var(--color-primaria)] rounded-full"
        style={{ width: `${percent}%` }}
      ></div>

      {/* Tooltip de Pontuação */}
      <div 
        className='flex w-40px h-[118px] justify-end items-end inline-flex' 
        style={{ 
          width: `calc(${percent}% + ${tooltipWidth}px)`,
          maxWidth: '100%' 
        }}
      >
        <div className='w-[91px]'>
          <Tooltip 
            type="fixed" 
            title={`${pontosAtual}`} 
            body="Pontos" 
            position="top" 
          />
        </div>
        {/* Forma abaixo da Tooltip */}
        <div className='absolute opacity-25'>
          <svg xmlns="http://www.w3.org/2000/svg" width="91" height="74" viewBox="0 0 91 74" fill="none">
            <g filter="url(#filter0_b_2290_2073)">
              <path fillRule="evenodd" clipRule="evenodd" d="M52.477 8.28484L47.3258 2.65049C46.5329 1.78317 45.1666 1.78317 44.3736 2.65049L39.2224 8.28484C38.0857 9.52812 36.4788 10.2363 34.7942 10.2363H8C4.68629 10.2363 2 12.9226 2 16.2363V65.8387C2 69.1524 4.68629 71.8387 8 71.8387H83C86.3137 71.8387 89 69.1524 89 65.8387V16.2363C89 12.9226 86.3137 10.2363 83 10.2363H56.9053C55.2207 10.2363 53.6137 9.52812 52.477 8.28484ZM53.9531 6.93532C54.7109 7.76418 55.7822 8.2363 56.9053 8.2363H83C87.4183 8.2363 91 11.818 91 16.2363V65.8387C91 70.257 87.4183 73.8387 83 73.8387H8C3.58172 73.8387 0 70.257 0 65.8387V16.2363C0 11.818 3.58172 8.2363 8 8.2363H34.7942C35.9172 8.2363 36.9886 7.76418 37.7463 6.93532L42.8976 1.30097C44.4835 -0.433658 47.216 -0.433658 48.8019 1.30097L53.9531 6.93532Z" fill="url(#paint0_linear_2290_2073)"/>
            </g>
            <defs>
              <filter id="filter0_b_2290_2073" x="-24" y="-24" width="139" height="121.839" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="12"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2290_2073"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2290_2073" result="shape"/>
              </filter>
              <linearGradient id="paint0_linear_2290_2073" x1="45.5" y1="0" x2="45.5" y2="73.8387" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserPointsChart;