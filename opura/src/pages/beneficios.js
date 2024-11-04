import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import ListaDeBeneficios from '../components/listabeneficios';
import { getBenefits } from '/services/benefits';
import { getUserPoints } from '/services/points';
import Icon from '../elementos/Icons';

export default function BeneficiosPage() {
  const [cards, setCards] = useState([]);
  const [pontosUsuario, setPontosUsuario] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Função para buscar benefícios e pontos do usuário
    const fetchData = async () => {
      try {
        const benefitsData = await getBenefits();
        setCards(benefitsData);
        
        const userPoints = await getUserPoints();
        setPontosUsuario(userPoints);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Funções para rolagem de cards de benefícios
  const handleMouseDown = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    scrollContainer.isDown = true;
    scrollContainer.startX = e.pageX - scrollContainer.offsetLeft;
    scrollContainer.scrollLeftStart = scrollContainer.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer.isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - scrollContainer.startX) * 2;
    scrollContainer.scrollLeft = scrollContainer.scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    const scrollContainer = scrollRef.current;
    scrollContainer.isDown = false;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };


  return (
    <>
      <Head>
        <title>Lista de Benefícios</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-4 pt-[40px]">
        <div className='w-full h-fit md:h-full bg-[var(--color-background)] rounded-[32px] overflow-clip overflow-x-auto'>
          {/* Cabeçalho */}
          <div className="w-full flex-wrap md:flex-nowrap justify-between items-center inline-flex p-8 gap-8">
            <h1 className="text-3xl font-bold md:w-[50%]">Benefícios</h1>
            <p className='md:text-right md:w-[30%] md:w-[50%] text-sm text-[var(--color-cinza)]'>
              Conheça nossos beneficios.
            </p>
          </div>

          {/* Lista de Benefícios */}
          <div 
            ref={scrollRef}
            className="w-full px-8 scroll-container overflow-x-auto flex items-stretch space-x-4"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            <ListaDeBeneficios pontosUsuario={pontosUsuario} cards={cards} />
          </div>
          <div className="flex justify-between space-x-4 mt-4 px-8 pb-24 md:pb-8 ">
            <button onClick={scrollLeft} className="bt-icon">
              <Icon name="arrowLeft" />
            </button>
            <button onClick={scrollRight} className="bt-icon">
              <Icon name='arrowRight' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}