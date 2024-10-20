import React, { useEffect, useState } from 'react';
import api from '/services/api'; // Importando API para usar os endpoints
import { getUserPoints } from '/services/points'; // Função para obter pontos do usuário
import { getUserDataById } from '/services/user'; // Função para obter dados do usuário

function ProgressBar({ label, value, maxValue }) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex items-center mb-4 gap-4">
      {/* Pontos ganhos */}
      <span className="w-32 text-[var(--color-preto)] text-sm leading-[14px] border-r border-[var(--color-texto)] h-16">{label}</span>
      {/* Barra e numeros */}
      <div className='w-full'>
        {/* numero */}
        <div>{value}</div>
        {/* barra */}
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
    const fetchPontos = async () => {
      try {
        // Buscar pontos ganhos pelo usuário
        const pontosResponse = await api.get(`/points`, {
          params: {
            id_user: userId,
          },
        });
        const totalPontosGanhos = pontosResponse.data.reduce((acc, ponto) => acc + ponto.points, 0);
        setPontosGanhos(totalPontosGanhos);

        // Buscar pontos resgatados pelo usuário
        const resgatadosResponse = await api.get(`/redeemedBenefits`, {
          params: {
            id_user: userId,
          },
        });
        const totalPontosResgatados = resgatadosResponse.data.reduce((acc, beneficio) => acc + beneficio.points_used, 0);
        setPontosResgatados(totalPontosResgatados);
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

  return (
    <div className='w-full'>
      <h3 className='pb-4 text-center'>Saldo de pontos</h3>
      <div className="w-full rounded-[32px] p-6 border border-[var(--color-cinza)] bg-white/[20%]">
        <ProgressBar label="Pontos Ganhos" value={pontosGanhos} maxValue={pontosGanhos} />
        <ProgressBar label="Pontos Resgatados" value={pontosResgatados} maxValue={pontosGanhos} />
        <ProgressBar label="Pontos Restantes" value={pontosRestantes} maxValue={pontosGanhos} />
      </div>
    </div>
  );
}
