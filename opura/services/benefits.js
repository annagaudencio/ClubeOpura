import api from './api';

// Função para obter todos os benefícios disponíveis
export const getBenefits = async () => {
  try {
    const token = localStorage.getItem('token'); // Verifica se o token está armazenado
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login novamente.');
    }

    const response = await api.get('/benefits');
    return response.data;  // Retorna todos os benefícios
  } catch (error) {
    console.error('Erro ao obter os benefícios:', error);
    if (error.response && error.response.status === 401) {
      alert('Sessão expirada. Por favor, faça login novamente.');
    }
    throw error;
  }
};

// Função para obter benefícios resgatados de um usuário específico
export const getUserRedeemedBenefits = async () => { // Removendo userId temporariamente
  try {
    const response = await api.get('/redeemedBenefits');
    console.log("Resposta da API para benefícios resgatados (sem filtro de id_user):", response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter os benefícios resgatados:', error);
    throw error;
  }
};


// Função para obter os benefícios, marcando os já resgatados pelo usuário logado
export const getUserBenefits = async (userId) => {
  try {
    const [allBenefits, redeemedBenefits] = await Promise.all([
      getBenefits(),
      getRedeemedBenefits(userId),
    ]);

    // Obter IDs dos benefícios já resgatados
    const redeemedIds = new Set(redeemedBenefits.map((item) => item.id_benefits));

    // Mapear todos os benefícios, adicionando uma flag para os resgatados
    const benefitsWithRedeemedStatus = allBenefits.map((benefit) => ({
      ...benefit,
      redeemed: redeemedIds.has(benefit.id),  // Marca como resgatado se o ID estiver em redeemedIds
    }));

    return benefitsWithRedeemedStatus;
  } catch (error) {
    console.error('Erro ao obter os benefícios do usuário:', error);
    throw error;
  }
};

export const redeemBenefit = async (benefitId, userId, pointsUsed) => {
  try {
    const response = await api.post('/redeemedBenefits', {
      id_user: userId,
      id_benefits: benefitId,
      rescued_date: new Date().toISOString(),
      points_used: pointsUsed,
    });
    console.log("Resgate de benefício realizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao resgatar benefício:", error.response?.data || error.message);
    throw error;
  }
};
