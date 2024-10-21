import axios from 'axios';

export const createPartner = async (partnerData) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Token não encontrado. Faça o login novamente.');

    const config = {
      headers: { 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/api/enterprise', partnerData, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar parceiro:', error.response ? error.response.data : error.message);
    throw error;
  }
};