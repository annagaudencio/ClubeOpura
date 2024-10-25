import api from './api';

export const getBenefits = async () => {
  try {
    const token = localStorage.getItem('token'); // Verifique se o token está armazenado
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login novamente.');
    }

    const response = await api.get('/benefits');
    return response.data;  // Retorna os dados dos benefícios
  } catch (error) {
    console.error('Erro ao obter os benefícios:', error);
    if (error.response && error.response.status === 401) {
      alert('Sessão expirada. Por favor, faça login novamente.');
    }
    throw error;
  }
};

export const redeemBenefit = async (id_benefit, id_user_registered) => {
  return api.post('/redeemedBenefits', {
    id_user: id_user_registered,
    id_benefits: id_benefit,
    points_used: 300,  // Aqui você pode ajustar com os pontos que o usuário está resgatando
    rescued_date: new Date().toISOString(),
  });
};



