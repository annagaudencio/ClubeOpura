import React, { useEffect, useState } from 'react';
import api from '/services/api';

function ProgressBar({ label, value, maxValue }) {
  const percentage = (value / maxValue) * 100;
  console.log(`Renderizando ProgressBar - Label: ${label}, Value: ${value}, MaxValue: ${maxValue}`);

  return (
    <div className="flex items-center mb-4 gap-4">
      <span className="w-32 text-[var(--color-preto)] text-sm leading-[14px] border-r border-[var(--color-texto)] h-16">{label}</span>
      <div className='w-full'>
        <div>{value}</div>
        <div className="bg-white/40 rounded-full h-8 relative overflow-clip"> 
          <div
            className="h-full rounded-full bg-[url('/midia/textura-escura.webp')] bg-blend-multiply bg-auto bg-left bg-repeat"
            style={{
              width: `${percentage}%`,
              backgroundColor: 'var(--color-links)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function ProgressContainer({ userId }) {
  const [pontosGanhos, setPontosGanhos] = useState(0);
  const [pontosResgatados, setPontosResgatados] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.warn("userId não foi definido. Verifique a passagem do ID.");
      return;
    }

    const fetchPontos = async () => {
      try {
        console.log("Buscando pontos ganhos para o id_user_registered:", userId);

        // Buscar pontos ganhos para o id_user_registered específico
        const pontosResponse = await api.get(`/points`, {
          params: { id_user_registered: userId },
        });
        
        console.log("Resposta da API para pontos ganhos:", pontosResponse.data);

        const totalPontosGanhos = pontosResponse.data.reduce((acc, ponto) => acc + ponto.points, 0);
        setPontosGanhos(totalPontosGanhos);
        console.log("Total de pontos ganhos após cálculo:", totalPontosGanhos);

        // Buscar pontos resgatados usando id_user_registered para consistência
        const resgatadosResponse = await api.get(`/redeemedBenefits`, {
          params: { id_user_registered: userId }, // Certifique-se de que este parâmetro está correto no backend
        });

        console.log("Resposta da API para pontos resgatados:", resgatadosResponse.data);

        // Somente pontos resgatados do usuário específico devem ser somados
        const totalPontosResgatados = resgatadosResponse.data.reduce((acc, beneficio) => acc + beneficio.points_used, 0);
        setPontosResgatados(totalPontosResgatados);
        console.log("Total de pontos resgatados após cálculo:", totalPontosResgatados);

      } catch (error) {
        console.error('Erro ao buscar dados dos pontos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPontos();
  }, [userId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const pontosRestantes = pontosGanhos - pontosResgatados;
  console.log("Pontos Ganhos:", pontosGanhos);
  console.log("Pontos Resgatados:", pontosResgatados);
  console.log("Pontos Restantes:", pontosRestantes)

  return (
    <div className='w-full'>
      <h3 className='pb-4 text-center'>Saldo de pontos</h3>
      <div className="w-full rounded-[32px] p-6 border border-[var(--color-cinza)] bg-white/[20%]">
        <ProgressBar label="Pontos Ganhos" value={pontosGanhos} maxValue={pontosGanhos || 1} />
        <ProgressBar label="Pontos Resgatados" value={pontosResgatados} maxValue={pontosGanhos || 1} />
        <ProgressBar label="Pontos Restantes" value={pontosRestantes} maxValue={pontosGanhos || 1} />
      </div>
    </div>
  );
}
