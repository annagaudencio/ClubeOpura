import React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import ProgressContainer from '../components/saldoDePontos';
import { useUser } from '/services/UserContext';

export default function ListaBeneficios() {
  const { userId } = useUser(); // Acessa o userId do contexto

  return (
    <>
      <Head>
        <title>Troca de Pontos</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-2 pt-[40px] md:flex w-fill">
        <div className='w-full h-fit md:h-full md:w-1/2 bg-[var(--color-background)] rounded-[32px] p-8 md:flex-col md:justify-center md:items-center gap-[17px] md:inline-flex'>
          <div className='flex flex-wrap md:flex-col items-start justify-between'>
            <h1 className='w-[243px] break-words order-1 md:order-2'>Parabéns!</h1>
            <img className='bg-transparent w-40 h-40 order-2 md:order-1' src='./midia/feliz-emoji-2.gif' alt='ilustação de felicidade' />
          </div>
          <p className='py-4 md:w-[230px]'>Você desbloqueou um benefício especial! <a href='https://wa.me/5581992237827?text=Ol%C3%A1!%20Acabei%20escolher%20um%20beneficio%20para%20resgate%2C%20como%20posso%20ter%20acesso%20a%20ele%3F' target='_blank'>Clique aqui</a> e entre e contato com nossa equipe para que possamos te guiar até a entrega da sua conquista.</p>
        <div className='p-8 w-full flex justify-center items-center'>
          <a href='https://wa.me/5581992237827?text=Ol%C3%A1!%20Acabei%20escolher%20um%20beneficio%20para%20resgate%2C%20como%20posso%20ter%20acesso%20a%20ele%3F' target="_blank"><button className='bt-marrom'>Fale conosco</button></a>
          <a href='./dashboard'><button>Voltar</button></a>
        </div>
        </div>
        <div className='w-full md:w-1/2 h-fit md:h-full bg-[var(--color-background)] rounded-[32px] p-8 pb-40 md:overflow-y-auto md:overscroll-y-auto'>
          <ProgressContainer userId={userId} /> 
        </div> 
      </div>
    </>
  );
}