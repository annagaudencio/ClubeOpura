import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import { fetchUsers, fetchUserById } from "/services/users"; 
import { fetchUserPoints, updateUserPoints } from "/services/points";

import Head from "next/head";
import Navbar from "../components/navbar";
import InscritoItem from "../components/itemParceiros";
import Icon from '../elementos/Icons';

const Parceiros = () => {
  const [partners, setPartners] = useState([]);
  const [admins, setAdmins] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Fetch all users
        const users = await fetchUsers();
        
        // Filtra administradores e parceiros
        const adminUsers = users.filter(user => user.is_adm);
        const nonAdminPartners = users.filter(user => !user.is_adm && user.type !== 'company');
        
        // Fetch e calcula pontos válidos para cada parceiro
        const partnersWithPoints = await Promise.all(
          nonAdminPartners.map(async (partner) => {
            const userData = await fetchUserById(partner.id);
            const userRegisteredId = userData.id_user_registered;

            const pointsData = await fetchUserPoints(partner.id);
            const validPoints = pointsData
              .filter(point => point.id_user_registered === userRegisteredId && !point.are_expired && !point.were_rescued)
              .reduce((total, point) => total + point.points, 0);
            
            return {
              ...partner,
              points: validPoints
            };
          })
        );

        setAdmins(adminUsers);
        setPartners(partnersWithPoints);
      } catch (error) {
        console.error("Erro ao carregar os usuários:", error);
      }
    };

    loadUsers();
  }, []);

  const handleAddParceiro = () => {
    router.push('/addParceiro');
  };

  return (
    <>
      <Head>
        <title>Parceiros e Administradores</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-2 overflow-clip">
        <div className="conteudo p-4">
          <div className="w-full p-8 justify-between items-center inline-flex">
            <h3 className="text-[24px] md:text-[32px] text-[var(--color-primaria)]">
              Arquitetos Parceiros
            </h3>
            <button onClick={handleAddParceiro} className="bt-marrom">
              Adicionar <Icon name="plus" />
            </button>
          </div>

          {/* Lista de Parceiros */}
          <div className="partners-list space-y-4 mt-8">
            <h4 className="text-[20px] md:text-[28px] text-[var(--color-primaria)]">
              Parceiros
            </h4>
            {partners.length > 0 ? (
              partners.map((partner) => (
                <InscritoItem
                  key={partner.id}
                  id={partner.id}
                  name={partner.name}
                  points={partner.points}
                />
              ))
            ) : (
              <p>Nenhum parceiro encontrado</p>
            )}
          </div>

          {/* Lista de Administradores */}
          <div className="admins-list space-y-4 mt-8 text-[var(--color-primaria)]">
            <h4 className="text-[20px] md:text-[28px] px-4">
              Administradores
            </h4>
            <p className='text-white/70 text-[14px] px-4'>Não é recomendado alterar os dados desses usuário.</p>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <InscritoItem
                  key={admin.id}
                  id={admin.id}
                  name={admin.name}
                  points={"Administrador"} // Administradores não possuem pontos
                />
              ))
            ) : (
              <p>Nenhum administrador encontrado</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Parceiros;
