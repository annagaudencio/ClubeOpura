import React, { useState, useEffect } from 'react';
import CardBeneficios from '../elementos/cardBeneficios';
import ResgateModal from '../elementos/ResgateModal';
import { getBenefits } from '/services/benefits';

export default function ListaBeneficiosUsuario({ pontosUsuario, userId }) {  // Confirme que userId está sendo recebido aqui
  const [modalAberto, setModalAberto] = useState(false);
  const [beneficioSelecionado, setBeneficioSelecionado] = useState(null);
  const [benefits, setBenefits] = useState([]);  // Estado para armazenar os benefícios

  useEffect(() => {
    // Carrega os benefícios do backend
    getBenefits()
      .then(setBenefits)
      .catch(error => console.error('Erro ao carregar benefícios:', error));
  }, []);

  const abrirModalResgate = (beneficio) => {
    setBeneficioSelecionado(beneficio);
    setModalAberto(true);
  };

  const fecharModalResgate = () => {
    setModalAberto(false);
    setBeneficioSelecionado(null);
  };

  console.log("userId em ListaBeneficiosUsuario:", userId);

  return (
    <div className="p-0 h-full flex justify-start items-center">
      <div className="flex justify-start items-center gap-4 inline-flex">
        {benefits.map((card) => (
          <CardBeneficios 
            key={card.id}
            variant={card.points <= pontosUsuario ? 'comBotao' : 'comPontos'} 
            titulo={card.title}
            descricao={card.description}
            pontos={card.points}
            bgImage={`https://opuramarmores.com/benef-img/${card.id}.webp`}  
            pontosUsuario={pontosUsuario}
            userId={userId}  // Passa o userId aqui
            onResgatar={() => abrirModalResgate(card)}
            beneficio={card}
          />
        ))}
      </div>

      {modalAberto && (
        <ResgateModal
          beneficio={beneficioSelecionado}
          userId={userId}  // Passa o userId também para ResgateModal
          onClose={fecharModalResgate}
        />
      )}
    </div>
  );
}
