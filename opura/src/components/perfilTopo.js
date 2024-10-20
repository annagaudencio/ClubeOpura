import React, { useState } from 'react';
import button from './botoes'; // Certifique-se de que o componente button esteja implementado e importado corretamente.

export default function UserProfile({nome , pontos, cod}) {
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div className="w-full  bg-[var(--color-background)] rounded-[32px] p-4"> 
      <div className="flex items-center justify-between">
        {/* Foto do Usuário - Ilustração */}
        <div className="flex items-center">
          <img src="/midia/avatar.webp" alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h4 className="text-[var(--color-preto)] text-lg font-semibold">{nome}</h4>
          </div>
        </div>

        {/* Botão Editar */}
        <button 
        variant="outline" 
        onClick={handleEditClick} 
        className="flex items-center">
          Editar <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none"><path d="M14.828 2.586a2 2 0 0 1 2.828 2.828l-10 10A1 1 0 0 1 7 16H3v-4a1 1 0 0 1 .293-.707l10-10z" fill="currentColor" /></svg>
        </button>
      </div>

      <hr className="my-4 border-[var(--color-links)]" />

      {/* Link "Saiba Mais" */}
      <div className="flex justify-between items-center">
        <p className="text-[var(--color-preto)] text-sm">{pontos} pontos</p>
        <p className="text-[var(--color-preto)] text-sm">Código: {cod}</p>
      </div>
    </div>
  );
}