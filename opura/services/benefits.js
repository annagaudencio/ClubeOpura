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


