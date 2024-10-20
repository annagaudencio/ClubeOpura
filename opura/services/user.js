import api from './api';

//Dados do usuário
export const getUserDataById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error.response ? error.response.data : error.message);
    throw error;
  }
};

//Criar usuário
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao criar usuário:", error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
};

