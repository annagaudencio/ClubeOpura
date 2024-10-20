import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BeneficiosResgatados = ({ userId }) => {
  const [beneficios, setBeneficios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeneficios = async () => {
      try {
        const response = await axios.get(`/redeemedBenefits`, {
          params: {
            id_user: userId,
          },
        });
        setBeneficios(response.data);
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
      {beneficios.length > 0 ? (
        <ul className='p-6 bg-white/[20%] rounded-[32px] border border-[var(--color-cinza)] flex-col justify-start items-start gap-4 space-y-2'>
          {beneficios.map((beneficio, index) => (
            <li key={index} className="flex justify-between items-center py-1 text-[var(--color-texto)]">
              <span>{beneficio.titulo}</span>
              <span className="text-[var(--color-links)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
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
