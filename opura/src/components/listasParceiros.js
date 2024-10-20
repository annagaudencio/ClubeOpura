import React from 'react';

// Componente PartnerRow
const PartnerRow = ({ nome, pontos, onClick }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4 cursor-pointer" onClick={onClick}>
      <div className="flex items-center">
        <img
          src="/midia/avatar.webp"
          alt={`${nome} avatar`}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-bold">{nome}</h3>
          <p className="text-sm text-gray-500">{pontos} pontos</p>
        </div>
      </div>
      
      <button>Saiba mais</button>
      
    </div>
  );
};

const Listas = () => {
  // Exemplo de dados para o PartnerRow e StepItem
  const parceiros = [
    { nome: 'Cecilia Nunes', pontos: 120 },
    { nome: 'João Silva', pontos: 150 },
  ];

  const etapas = [
    { numero: 1, titulo: 'Primeiro Passo', descricao: 'Orientação sobre o início' },
    { numero: 2, titulo: 'Segundo Passo', descricao: 'Informações avançadas' },
  ];

  return (
    <div className="p-4">
      {/* Lista de Parceiros */}
      {parceiros.map((parceiro, index) => (
        <PartnerRow
          key={index}
          nome={parceiro.nome}
          pontos={parceiro.pontos}
          onClick={() => console.log(`Parceiro ${parceiro.nome} clicado!`)}
        />
      ))}
    </div>
  );
};

export default Listas;