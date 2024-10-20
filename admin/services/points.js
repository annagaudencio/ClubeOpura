import axios from 'axios';

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

export default fetchUserPoints;