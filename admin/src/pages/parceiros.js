import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { fetchUsers } from "/services/users";

import Head from "next/head";
import Navbar from "../components/navbar";
import InscritoItem from "../components/itemParceiros";
import Icon from '../elementos/Icons';

import fetchUserPoints from "/services/points";

const Parceiros = () => {
  const [partners, setPartners] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadPartners = async () => {
      try {
        // Fetch all users
        const users = await fetchUsers();
        
        // Filter out admins and company users
        const nonAdminPartners = users.filter(user => !user.is_adm && user.type !== 'company');
        
        // Fetch and calculate valid points for each partner
        const partnersWithPoints = await Promise.all(
          nonAdminPartners.map(async (partner) => {
            const pointsData = await fetchUserPoints(partner.id);
            const validPoints = pointsData
              .filter(point => !point.are_expired && !point.were_rescued)
              .reduce((total, point) => total + point.points, 0);
            
            return {
              ...partner,
              points: validPoints
            };
          })
        );

        setPartners(partnersWithPoints);
      } catch (error) {
        console.error("Erro ao carregar os parceiros:", error);
      }
    };

    loadPartners();
  }, []);

  const handleAddParceiro = () => {
    router.push('/addParceiro');
  };

  return (
    <>
      <Head>
        <title>Parceiros</title>
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

          {/* Display Partners */}
          <div className="partners-list space-y-4">
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
        </div>
      </div>
    </>
  );
};

export default Parceiros;