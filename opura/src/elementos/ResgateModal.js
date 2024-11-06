import React, { useState, useEffect } from 'react';
import CardBeneficioH from '../components/cardHorizontal';
import { useRouter } from 'next/router';
import { redeemBenefit } from '/services/benefits';
import { fetchUserPoints, updateUserPoints } from '/services/points';

export default function ResgateModal({ beneficio, onClose, userId }) {
  const [userPoints, setUserPoints] = useState(0);
  const [pointId, setPointId] = useState(null); // Armazena o ID do ponto
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      console.error('Erro: userId não está definido');
      return;
    }

    const getUserPoints = async () => {
      try {
        const pointsResponse = await fetchUserPoints(userId);

        if (pointsResponse && pointsResponse.length > 0) {
          setUserPoints(pointsResponse[0].points);
          setPointId(pointsResponse[0].id); // Armazena o ID do ponto
        } else {
          console.warn("Nenhum ponto encontrado para o usuário.");
          setUserPoints(0);  // Define pontos como 0 se não encontrar nenhum ponto
        }
      } catch (error) {
        console.error('Erro ao buscar pontos do usuário:', error);
      }
    };

    getUserPoints();
  }, [userId]);

  const handleCancel = () => onClose();

  const handleResgatar = async () => {
    if (userPoints < beneficio.pontos) {
      alert('Você não tem pontos suficientes para resgatar este benefício.');
      return;
    }
  
    try {
      // Realiza o resgate do benefício
      await redeemBenefit(beneficio.id, userId, beneficio.pontos);
  
      // Calcula o novo total de pontos após a subtração
      const newPoints = userPoints - beneficio.pontos;
  
      // Atualiza os pontos do usuário usando o ID do ponto
      if (pointId) {
        await updateUserPoints(pointId, newPoints);  // Envia o pointId e o total reduzido
        setUserPoints(newPoints);  // Atualiza o estado local
      } else {
        console.error("ID do ponto não encontrado. Não foi possível atualizar os pontos.");
      }
  
      router.push('/resgatar');
    } catch (error) {
      console.error('Erro ao resgatar benefício:', error.response?.data || error.message);
      alert('Erro ao resgatar o benefício. Tente novamente mais tarde.');
    }
  };

  return (
    <div id="modal-overlay" className="w-screen h-screen fixed inset-0 flex md:items-center items-end justify-center bg-black bg-opacity-50 z-50" onClick={(e) => e.target.id === 'modal-overlay' && onClose()}>
      <div className="bg-[var(--color-primaria)] md:rounded-[32px] p-8 md:max-w-[500px] w-full">
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