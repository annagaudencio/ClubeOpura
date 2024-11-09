import React, { useEffect, useState } from 'react';
import { getUserRedeemedBenefits } from '/services/benefits';
import Icon from '../elementos/Icons';

const BeneficiosResgatados = ({ userId }) => {
  const [redeemedBenefits, setRedeemedBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedeemedBenefits = async () => {
      try {
        console.log("Buscando benefícios resgatados para o usuário:", userId);
        
        const userRedeemedBenefits = await getUserRedeemedBenefits(userId);
        console.log("Benefícios resgatados do usuário:", userRedeemedBenefits);
        
        setRedeemedBenefits(userRedeemedBenefits);
      } catch (error) {
        console.error('Erro ao buscar benefícios resgatados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRedeemedBenefits();
  }, [userId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="w-full">
      <h3 className='pb-4 text-center'>Benefícios Resgatados</h3>
      {/* {redeemedBenefits.length > 0 ? (
        <ul className='p-6 bg-white/[20%] rounded-[32px] border border-[var(--color-cinza)] flex-col justify-start items-start gap-4 space-y-2'>
          {redeemedBenefits.map((beneficio) => (
            <li key={beneficio.id} className="flex justify-between items-center py-1 text-[var(--color-texto)]">
              <div>
                <p>{beneficio.title || 'Benefício Desconhecido'}</p>
                <p>Data de Resgate: {new Date(beneficio.rescued_date).toLocaleDateString()}</p>
                <p>Pontos Usados: {beneficio.points_used}</p>
              </div>
              <Icon name="check" className="text-[var(--color-links)] w-6"/>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-[var(--color-cinza)]">Nenhum benefício resgatado ainda.</p>
      )} */}
      <p>Em breve...</p>
    </div>
  );
};

export default BeneficiosResgatados;
