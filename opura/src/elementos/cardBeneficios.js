import React, { useState, useEffect } from 'react';
import ResgateModal from './ResgateModal';
import api from '/services/api'; 

export default function CardBeneficios({  
  titulo, 
  descricao, 
  pontos, 
  bgImage, 
  pontosUsuario,
  userId, 
}) {
  const [showModal, setShowModal] = useState(false);
  const [beneficioId, setBeneficioId] = useState(null);

  useEffect(() => {
    const fetchBenefitId = async () => {
      try {
        const response = await api.get('/benefits');
        const benefit = response.data.find(b => b.title === titulo);  
        if (benefit) {
          setBeneficioId(benefit.id);  // Armazena o ID do benefício
          console.log('ID do benefício encontrado:', benefit.id);
          console.log("userId no componente pai:", userId)
        } else {
          console.warn('Benefício com título não encontrado:', titulo);
        }
      } catch (error) {
        console.error("Erro ao buscar o ID do benefício:", error);
      }
    };
    fetchBenefitId();
  }, [titulo]);
  

  // Função para abrir o modal
  const handleResgatar = () => {
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Calcular os pontos restantes
  const pontosRestantes = Math.max(pontos - pontosUsuario, 0);
  
  // Determinar se o benefício está disponível para resgate
  const disponivelParaResgate = pontosUsuario >= pontos;

  return (
    <div className="w-full min-w-72 min-h-[500px] max-w-xs bg-transparent rounded-[32px] overflow-hidden">
      {/* Imagem ou área para o conteúdo do benefício */}
      <div
        className="min-h-80 bg-gray-200 rounded-[32px] p-4 relative"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(241, 240, 234, 0.00) 40%, #F1F0EA 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {disponivelParaResgate && (
          <button 
            className="absolute top-4 left-4" 
            variant="default" 
            onClick={handleResgatar}
          >
            Resgatar
          </button>
        )}

        {!disponivelParaResgate && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-[var(--color-links)] px-2">
            <span>Restam</span>
            <span className="font-bold">{pontosRestantes}</span>
            <span>Pontos</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className='w-full justify-start items-center gap-2 inline-flex'>
          <h6 className="w-2/3 text-[18px]">{titulo}</h6>
          <div className='w-1/3 justify-end items-center gap-1 inline-flex'>
            <span className="font-bold text-lg">{pontos}</span> 
            <span className="ml-1">★</span>
          </div>
        </div>
        <p className="text-[var(--color-cinza)] text-sm mt-1">
          {descricao}
        </p>
      </div>

      {showModal && (
        <ResgateModal 
        beneficio={{ titulo, descricao, pontos, id: beneficioId }} 
        userId={userId}  
        onClose={handleCloseModal} 
      />      
      )}
    </div>
  );
}
