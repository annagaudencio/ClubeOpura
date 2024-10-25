import React, { useState, useEffect } from 'react';
import CardBeneficioH from '../components/cardHorizontal';
import { useRouter } from 'next/router';
import { redeemBenefit } from '/services/benefits';  
import { fetchUserPoints, updateUserPoints } from '/services/points';  

export default function ResgateModal({ beneficio, onClose, userId }) {
  const [userPoints, setUserPoints] = useState(0); 
  const [loaded, setLoaded] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    console.log('Estrutura completa do benefício no ResgateModal:', beneficio);
    console.log('Verificando beneficio:', beneficio);
    console.log('Passando para o CardBeneficioH:', {
      titulo: beneficio.titulo,
      descricao: beneficio.descricao,
      pontos: beneficio.pontos
    });
    console.log('ID do benefício:', beneficio.id);


    
    const getUserPoints = async () => {
      try {
        const pointsResponse = await fetchUserPoints(userId);
        setUserPoints(pointsResponse);
      } catch (error) {
        console.error('Erro ao buscar pontos do usuário:', error);
      }
    };

    getUserPoints();
  }, [userId]);

  if (!beneficio) {
    return null;
  }

  const handleCancel = () => {
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };
  

  const handleResgatar = async () => {
    console.log("ID do usuário:", userId);  // Verificação para confirmar se userId está definido
    try {
      if (userPoints < beneficio.pontos) {
        alert('Você não tem pontos suficientes para resgatar este benefício.');
        return;
      }
  
      await redeemBenefit(beneficio.id, userId);  
      const newPoints = userPoints - beneficio.pontos;
      await updateUserPoints(userId, newPoints);
  
      setUserPoints(newPoints);
      router.push('/resgatar');
    } catch (error) {
      console.error('Erro ao resgatar benefício:', error);
    }
  };
  
  
  

  return (
    <div 
      id="modal-overlay" 
      className="w-screen h-screen fixed inset-0 flex md:items-center items-end justify-center bg-black bg-opacity-50 z-50" 
      onClick={handleOutsideClick}
    >
      <div className="bg-[var(--color-primaria)] md:rounded-[32px] rounded-[32px] rounded-b-lg p-8 md:max-w-[500px] w-full">
        <h2 className="text-2xl font-bold text-center">RESGATE</h2>

        <div className='my-4 w-full justify-start items-start gap-4 inline-flex'>
          <CardBeneficioH
            tituloBeneficio={beneficio.titulo}
            descricaoBeneficio={beneficio.descricao}
            pontosBeneficio={beneficio.pontos}
            bgImage={`https://opuramarmores.com/benef-img/${beneficio.id}.webp`}
          />
        </div>

        <div className="h-[0px] border border-[#d9d9d9]"></div>

        <div className="my-4">
          <p className="text-center text-[var(--color-texto)] text-[16px]">
            Você tem {userPoints} pontos. Confirma que quer resgatar esse benefício?
          </p>
        </div>

        <div className="flex space-x-4">
          <button className="bt-cancelar w-1/2" onClick={handleCancel}>Cancelar</button>
          <button className="w-1/2 bt-marrom" onClick={handleResgatar}>Resgatar</button>
        </div>
      </div>
    </div>
  );
}
