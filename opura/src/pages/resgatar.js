import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar'; 
import StepItem from '../components/listaEtapas';
import ProgressBar from '../components/saldoDePontos';

export default function ListaBeneficios() {


  return (
    <>
      <Head>
        <title>Troca de Pontos</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-2 pt-[40px] md:flex w-fill">
        {/* Topo */}
        <div className='w-full h-fit md:h-full md:w-1/3 bg-[var(--color-background)] rounded-[32px] p-8 md:flex-col md:justify-center md:items-center gap-[17px] md:inline-flex'>
          <div className='flex flex-wrap md:flex-col items-start justify-between'>
            <h1 className='w-[243px] break-words order-1 md:order-2'>Parabéns!</h1>
            <img className='bg-transparent w-40 h-40 order-2 md:order-1' src='./midia/feliz-emoji-2.gif' alt='ilustação de felicidade' />
          </div>
          <p className='py-4 md:w-[230px]'>Você desbloqueou um benefício especial.</p>
        </div>

        {/* Informações */}
        <div className='w-full md:w-2/3 h-fit md:h-full bg-[var(--color-background)] rounded-[32px] p-8 pb-40 md:overflow-y-auto md:overscroll-y-auto'>
        {/* Próximos passos */}
        <div className='pt-10'>
            <h3 className='text-center'>Próximos passos</h3>
            <div className='divide-y divide-[var(--color-desabilitado)]'>
            <StepItem
            numero="1"
            titulo="Primeiro Passo"
            descricao="Orientação. Figma ipsum component variant main layer community."
            url="https://annagaudencio.com/"
            />
            <StepItem
            numero="2"
            titulo="Segundo Passo"
            descricao="Orientação. Figma ipsum component variant main layer community."
            url="/pagina-destino"
            />
            <StepItem
            numero="2"
            titulo="Terceiro Passo"
            descricao="Orientação. Figma ipsum component variant main layer community."
            url="/pagina-destino"
            />
            </div>
            
        </div>
        
        {/* Saldo de pontos */}
        <div className='pt-10'>
          <ProgressBar pontosGanhos="" pontosResgatados="" pontosRestantes="" maxPontos="300"/>
        </div>

        {/* Botão resgatar */}
        <div className='p-8 w-full flex justify-center items-center'>
          <a href='./dashboard'><button className='bt-marrom'>Tudo certo</button></a>
        </div>
        
        </div> 
      </div>
    </>
  );
}