import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Icon from '@/elementos/Icons';

const BeneficiosResgatados = ({ userId }) => {
  // Definição do estado para armazenar os benefícios resgatados
  const [redeemedBenefits, setRedeemedBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token não encontrado. Faça login novamente.');

        // Obter todos os benefícios
        const allBenefitsResponse = await axios.get(`/api/benefits`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allBenefits = allBenefitsResponse.data;
        console.log("Todos os benefícios:", allBenefits); // Log dos benefícios completos

        // Obter benefícios resgatados pelo usuário com filtro de id_user
        const redeemedResponse = await axios.get(`/api/redeemedBenefits`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { id_user: userId },
        });
        
        // Exibir os dados de resposta no console
        const redeemedBenefitsData = redeemedResponse.data;
        console.log("Benefícios resgatados para o usuário:", redeemedBenefitsData); // Log dos benefícios resgatados para o id_user logado

        // Filtrar os benefícios resgatados com base no id_user fornecido
        const userRedeemedBenefits = redeemedBenefitsData
          .filter((redeemed) => redeemed.id_user === userId) // Filtra pelo id_user específico
          .map((redeemed) => {
            const benefitInfo = allBenefits.find(
              (benefit) => benefit.id === redeemed.id_benefits
            );

            return benefitInfo
              ? {
                  ...redeemed,
                  titulo: benefitInfo.title, // Nome do benefício
                  points_needed: benefitInfo.points, // Pontos necessários para o benefício
                }
              : {
                  ...redeemed,
                  titulo: "Benefício Desconhecido",
                  points_needed: redeemed.points_used, // Usa pontos resgatados como fallback
                };
          });

        setRedeemedBenefits(userRedeemedBenefits); // Define o estado com benefícios específicos do usuário
      } catch (error) {
        console.error('Erro ao buscar benefícios resgatados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficios();
  }, [userId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="w-full">
      <h3 className='pb-4 text-center'>Benefícios Resgatados</h3>
      {redeemedBenefits.length > 0 ? (
        <ul className='p-6 bg-white/[20%] rounded-[32px] border border-[var(--color-cinza)] flex-col justify-start items-start gap-4 space-y-2'>
           {redeemedBenefits.map((beneficio) => (
            <li key={beneficio.id} className="flex justify-between items-center py-1 text-[var(--color-texto)]">
              <div>
                <p>{beneficio.titulo}</p>
                <p>Data de Resgate: {new Date(beneficio.rescued_date).toLocaleDateString()}</p>
                <p>Pontos Usados: {beneficio.points_used}</p>
              </div>
              <Icon name="check" className="text-[var(--color-links)] w-6"/>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-[var(--color-cinza)]">Nenhum benefício resgatado ainda.</p>
      )}
    </div>
  );
};

export default BeneficiosResgatados;
