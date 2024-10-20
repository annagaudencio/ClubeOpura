import { useState, useEffect } from 'react';

import React from 'react';
import Head from "next/head";
import Navbar from "../components/navbar";

import Link from 'next/link';
import BeneficioCard from '../components/listaBeneficios';
import { fetchBenefits } from '/services/benefits';

const beneficios = () => {
  const [beneficios, setBeneficios] = useState([]);  
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os benefícios
    const loadBenefits = async () => {
      try {
        const benefitsData = await fetchBenefits();  
        setBeneficios(benefitsData);
      } catch (error) {
        console.error('Erro ao carregar benefícios:', error);
        setError('Erro ao carregar os benefícios.');
      }
    };

    loadBenefits(); 
  }, []);


  return (
    <>
    <Head>
      <title>Beneficios</title>
    </Head>
    <Navbar />

    <div className="main-content md:p-2 overflow-clip">
      <div className="conteudo p-4">
        {/* Topo */}
        <div className="w-full p-8 justify-between items-center inline-flex">
            <h3 className="text-[24px] md:text-[32px] text-[var(--color-primaria)]">Beneficios</h3>
            <Link href="/addBeneficio">
              <button className="bt-marrom justify-center items-center gap-2 inline-flex">Adicionar</button>
            </Link>
        </div> 

        {error && <p>{error}</p>}

        {/* Lista de beneficios */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-8">
            {beneficios.map((beneficio) => (
              <BeneficioCard
                key={beneficio.id}
                id={beneficio.id}
                titulo={beneficio.title}  
                pontos={beneficio.points}  
              />
            ))}
          </div>
      </div>
    </div>
    </>
  );
};

export default beneficios;