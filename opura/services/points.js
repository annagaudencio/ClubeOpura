import api from "./api";

export const getUserPoints = async (id_user_registered) => {
  try {
    console.log("ID do usuário para filtragem (id_user_registered):", id_user_registered);  // Verificação do ID passado

    const response = await api.get("/points");

    // Log da resposta completa antes do filtro
    console.log("Resposta completa da API:", response.data);

    // Filtro dos pontos com base em id_user_registered, are_expired e were_rescued
    const filteredPoints = response.data.filter(point => 
      point.id_user_registered === id_user_registered &&
      !point.are_expired && 
      !point.were_rescued
    );

    // Log dos pontos filtrados para debug
    console.log("Pontos filtrados:", filteredPoints);

    // Cálculo dos pontos
    const userPoints = filteredPoints.reduce((total, point) => total + point.points, 0);

    console.log("Total de pontos do usuário:", userPoints);
    return userPoints;
  } catch (error) {
    console.error("Erro ao obter pontos do usuário:", error);
    throw error;
  }
};

export const fetchUserPoints = async (userId) => {
  try {
    const response = await api.get(`/points`, {
      params: { id_user: userId },
    });
    
    console.log('Resposta completa da API para pontos:', response.data);  // Log para verificar a resposta da API
    
    if (response && response.data && Array.isArray(response.data)) {
      // Verifica se o usuário está no array de resposta
      const userPointsData = response.data.find(pointData => pointData.id_user === userId);
      
      if (userPointsData) {
        return userPointsData.points;  // Retorna os pontos encontrados
      } else {
        console.error('Pontos para o usuário não encontrados na resposta da API');
        return 0;  // Retorna 0 se o usuário não for encontrado
      }
    } else {
      console.error('Resposta inesperada da API');
      return 0;  // Retorna 0 se não houver dados
    }
  } catch (error) {
    console.error('Erro ao buscar pontos do usuário:', error);
    throw error;
  }
};

export const updateUserPoints = async (userId, newPoints) => {
  try {
    await api.put(`/points/${userId}`, { points: newPoints });
    console.log('Pontos atualizados com sucesso:', newPoints);
  } catch (error) {
    console.error('Erro ao atualizar pontos do usuário:', error);
    throw error;
  }
};

export const createUserPoints = async (id_user_registered) => {
  try {
    const response = await api.post('/points', {
      id_user_registered: id_user_registered, // Usa o id_user_registered diretamente
      points: 5, // Adiciona os pontos de brinde ao realizar cadastro
      are_expired: false,
      were_rescued: false,
      rescued_date: null
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pontos para o usuário:', error);
    throw error;
  }
};


