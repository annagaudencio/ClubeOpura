import React, { useState, useEffect } from 'react';
import CardBeneficios from '../elementos/cardBeneficios';
import ResgateModal from '../elementos/ResgateModal';
import { getBenefits } from '/services/benefits';

export default function ListaBeneficiosUsuario({ pontosUsuario = 50 }) {
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
          bgImage={card.image}
          pontosUsuario={pontosUsuario}
          onResgatar={() => abrirModalResgate(card)}
        />
        ))}
      </div>

      {modalAberto && (
        <ResgateModal
          beneficio={beneficioSelecionado}
          onClose={fecharModalResgate}
        />
      )}
    </div>
  );
}