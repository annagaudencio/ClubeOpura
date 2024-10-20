import React, { useState } from 'react';
import ResgateModal from './ResgateModal';

export default function CardBeneficios({ 
  variant, 
  titulo, 
  descricao, 
  pontos, 
  bgImage, 
  pontosUsuario 
}) {
  const [showModal, setShowModal] = useState(false);

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

  // Determinar qual variante do card deve ser exibida
  const cardVariant = disponivelParaResgate ? 'comBotao' : 'comPontos';

  return (
    <div className="w-full min-w-72 max-w-xs bg-transparent rounded-[32px] overflow-hidden">
      {/* Imagem ou área para o conteúdo do benefício */}
      <div
        className="car-img-1 bg-gray-200 rounded-[32px] p-4 relative"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(241, 240, 234, 0.00) 40%, #F1F0EA 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Botão de resgate ativo quando disponível */}
        {cardVariant === 'comBotao' && (
          <button 
            className="absolute top-4 left-4" 
            variant="default" 
            onClick={handleResgatar}
          >
            Resgatar
          </button>
        )}

        {/* Exibição dos pontos restantes */}
        {cardVariant === 'comPontos' && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-[var(--color-links)] px-2">
            <span>Restam</span>
            <span className="font-bold">{pontosRestantes}</span>
            <span>Pontos</span>
          </div>
        )}
      </div>

      {/* Título e descrição do benefício */}
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

      {/* Modal de Resgate */}
      {showModal && (
        <ResgateModal 
          titulo={titulo} 
          descricao={descricao} 
          pontos={pontos} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}