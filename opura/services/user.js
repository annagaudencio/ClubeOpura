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

export const updateUserData = async (id, data) => {
  try {
    // Remove campos undefined ou vazios
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Se não houver dados para atualizar, retorna
    if (Object.keys(cleanData).length === 0) {
      return null;
    }

    const response = await api.put(`/users/${id}`, cleanData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
    throw error;
  }
};

