import React, { useEffect, useState } from 'react';
import { getUserDataById } from '/services/user';
import { getUserPoints } from '/services/points';

export default function UserInfo({ userCode }) {
  const [pontos, setPontos] = useState(0);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userCode) {
      getUserDataById(userCode)
        .then((data) => {
          console.log("Dados do usuário:", data);
          const { id_user_registered } = data; // Extrai o ID correto para buscar pontos

          if (id_user_registered) {
            getUserPoints(id_user_registered)
              .then((pontosUsuario) => {
                setPontos(pontosUsuario);
                console.log("Pontos do usuário:", pontosUsuario);
              })
              .catch((error) => console.error("Erro ao buscar pontos no UserInfo:", error));
          } else {
            console.log("id_user_registered não encontrado.");
          }
        })
        .catch((error) => console.error("Erro ao buscar dados do usuário:", error));
    }
  }, [userCode]);

  console.log("Pontos:", pontos)

  return (
    <div className='h-[25%] bg-[var(--color-background)] rounded-[32px] p-8 pt-1 divide-y divide-[var(--color-links)]'>
      <div className='py-8 flex'>
        <div className='flex w-2/3 justify-start items-center gap-3'>
          <img src="/midia/avatar.webp" alt="Foto do usuário" className="rounded-full w-16 h-16" />
          <h3 className='text-[18px]'>{userData?.name}</h3>
        </div>
      </div>
      <div className='flex pt-4 justify-between'>
        <p>{pontos} pontos</p>
        <p className="text-sm text-[var(--color-links)]">Código: <span className="font-bold">{userCode}</span></p>
      </div>
    </div>
  );
}
