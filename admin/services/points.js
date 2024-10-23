import axios from 'axios';

// Função para buscar pontos de um usuário específico
const fetchUserPoints = async (userId) => {
  try {
    const token = localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`/api/points?userId=${userId}`, config);
    return response.data;
  } catch (error) {
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

      console.log("Dados enviados para atualização:", updatedPointData); // Adicione este log para verificar o payload

      const response = await axios.put(`/api/points/${pointId}`, updatedPointData, config);
      return response;
  } catch (error) {
      console.error('Erro ao atualizar pontos:', error);
      throw error;
  }
};


// Exportar funções de forma nomeada
export { fetchUserPoints, updateUserPoints };
