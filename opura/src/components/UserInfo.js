// components/UserInfo.js
import React from 'react';
import Icon from '../elementos/Icons';

export default function UserInfo({ userData, pontos, userCode, isEditing, toggleEdit }) {
  return (
    <div className='h-[25%] bg-[var(--color-background)] rounded-[32px] p-8 pt-1 divide-y divide-[var(--color-links)]'>
      <div className='py-8 flex'>
        <div className='flex w-2/3 justify-start items-center gap-3'>
          <img src="/midia/avatar.webp" alt="Foto do usuário" className="rounded-full w-16 h-16" />
          <h3 className='text-[18px]'>{userData.nome}</h3>
        </div>
        <button className='bt-linha flex gap-2 h-fit justify-center items-center' onClick={toggleEdit}>
          {isEditing ? 'Salvar' : 'Editar'} 
          <Icon src='/icons/acoes/Edit-alt.svg' alt='Icon Editar' className="w-5 h-5" name="editAlt"/>
        </button>
      </div>
      <div className='flex pt-4 justify-between'>
        <p>{pontos} pontos</p>
        <p className="text-sm text-[var(--color-links)]">Código: <span className="font-bold">{userCode}</span></p>
      </div>
    </div>
  );
}