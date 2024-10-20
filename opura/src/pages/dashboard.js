import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

import { getUserInfoFromToken } from "/services/auth";
import { getUserDataById } from "/services/user";
import { getUserPoints, getTotalPoints } from "/services/points";

import Navbar from '../components/navbar';
import UserPointsChart from '../components/grafDePontos';
import ListaBeneficiosUsuario from '../components/listabeneficios';
import Icon from '../elementos/Icons';

export default function Dashboard() {
  const [pontosUsuario, setPontosUsuario] = useState(0);
  const [pontosTotais, setPontosTotais] = useState(0);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = getUserInfoFromToken(token);
      
      if (userInfo && userInfo.id) {
        // Usa o ID para buscar o nome completo
        getUserDataById(userInfo.id)
          .then((data) => setUserName(data.name || userInfo.email))
          .catch((error) => console.error("Erro ao buscar dados do usuário:", error));
      } else {
        setUserName(userInfo.email || "Usuário");
      }
    }
    
    setIsLoading(true);
    getUserPoints()
      .then((data) => setPontosUsuario(data))
      .catch((error) => console.error("Erro ao obter pontos do usuário:", error));
      
    getTotalPoints()
      .then((data) => setPontosTotais(data))
      .catch((error) => console.error("Erro ao obter pontos totais:", error));
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
        <title>Dashboard</title>
      </Head>
      <Navbar />
      
      <div className='main-content p-0 md:p-2'>
        <div className='w-full h-1/5 flex-col justify-center items-center gap-2.5 inline-flex p-8'>
          <UserPointsChart pontosTotais={pontosTotais} pontosAtual={pontosUsuario} />  
        </div>
        
        <div className='bg-[var(--color-background)] rounded-[32px] h-4/5 md:overflow-y-auto'>
          <div className="w-full justify-between items-center inline-flex p-8">
            <h1 className="text-3xl font-bold w-[50%]">Olá {userName}</h1>
            <p className='text-right md:w-[30%] w-[50%] text-sm text-[var(--color-cinza)]'>
              Acumule pontos para resgatar benefícios exclusivos!
            </p>
          </div>
          
          <div 
            ref={scrollRef}
            className="w-full px-8 scroll-container overflow-x-auto flex items-stretch space-x-4"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            <ListaBeneficiosUsuario pontosUsuario={pontosUsuario} />
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



