import axios from 'axios';

// Função para buscar pontos de um usuário específico
const fetchUserPoints = async (userId) => {
  try {
    // Pegar o token do localStorage
    const token = localStorage.getItem('access_token');
    
    // Verificar se o token existe
    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.');
    }

    // Configurar o header com o token
    const config = {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    // Fazer a requisição com o token
    const response = await axios.get(`/api/points?userId=${userId}`, config);
    return response.data;
  } catch (error) {
    // Melhor tratamento de erro
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('access_token'); // Remove o token inválido
      window.location.href = '/'; // Redireciona para login
    }
    console.error('Erro ao buscar pontos:', error);
    throw error;
  }
};

// Função para atualizar pontos de um usuário específico
const updateUserPoints = async (pointId, updatedPointData) => {
  try {
      const token = localStorage.getItem('access_token');
      const config = {
          headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json' 
          }
      };

      console.log("Dados enviados para atualização:", updatedPointData); // Verificar payload

      const response = await axios.put(`/api/points/${pointId}`, updatedPointData, config);
      console.log("Resposta completa do servidor:", response); // Log detalhado

      return response;
  } catch (error) {
      if (error.response) {
          // Se o erro tiver uma resposta, mostre o status e a mensagem
          console.error('Erro ao atualizar pontos:', error.response.data);
      } else {
          console.error('Erro desconhecido ao atualizar pontos:', error.message);
      }
      throw error;
  }
};



// Exportar funções de forma nomeada
export { fetchUserPoints, updateUserPoints };
