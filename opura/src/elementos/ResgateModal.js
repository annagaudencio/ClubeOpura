import React from 'react';
import CardBeneficios from '../components/cardHorizontal';

export default function ResgateModal({ onClose }) {
  console.log('ResgateModal aberto');

  const handleCancel = () => {
    console.log('Cancelando e fechando modal...');
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      console.log('Clicou fora do modal, fechando...');
      onClose();
    }
  };

  return (
    <div 
      id="modal-overlay" 
      className="w-screen h-screen fixed inset-0 flex md:items-center items-end justify-center bg-black bg-opacity-50 z-50" 
      onClick={handleOutsideClick}
    >
      {/* card */}
      <div className="bg-[var(--color-primaria)] md:rounded-[32px] rounded-[32px] rounded-b-lg p-8 md:max-w-[500px] w-full">
        <h2 className="text-2xl font-bold text-center">RESGATE</h2>
        
        <div className='my-4 w-full justify-start items-start gap-4 inline-flex'>
          {/* card de resgate */}
          <CardBeneficios
            variant="comPontos"
            titulo="Nome do benefício"
            descricao="Pequeno texto com detalhes, escrever até 100 caracteres. Para que caiba em quatro linhas."
            pontos={80}
            bgImage="/midia/imagem.webp" //imagens do beneficio aqui
          />
        </div>

        <div className="h-[0px] border border-[#d9d9d9]"></div>

        <div className="my-4">
          <p className="text-center text-[var(--color-texto)] text-[16px]">
            Você confirma que quer resgatar esse benefício?
          </p>
        </div>
        
        {/* Botões */}
        <div className="flex space-x-4">
          <button className="bt-cancelar w-1/2" onClick={handleCancel}>Cancelar</button>
          <button size="normal" variant="marrom" width="[50%]" href={'/resgatar'}>Resgatar</button>
        </div>
      </div>
    </div>
  );
}

