import axios from 'axios';

const getAuthConfig = () => {
  const token = localStorage.getItem('access_token');
  if (!token) throw new Error("Token de autenticação não encontrado");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Função para obter todos os usuários
export const fetchUsers = async () => {
  try {
    const config = getAuthConfig();
    const response = await axios.get('/api/users', config);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const fetchEnterpriseById = async (id) => {
  const config = getAuthConfig();
  const response = await axios.get(`/api/enterprise/${id}`, config);
  return response.data;
};  


// Função para editar um usuário existente
// export const updateUser = async (id, userData) => {
//   try {
//     const config = getAuthConfig();
//     const response = await axios.put(`/api/users/${id}`, userData, config);
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao editar usuário:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };
export const updateUser = async (userId, userData) => {
  try {
      const config = getAuthConfig(); // Inclui o token de autenticação, se necessário
      const response = await axios.put(`/api/users/${userId}`, userData, config); // Usa o ID do usuário para atualizar
      return response.data;
  } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
  }
};


// Função para deletar um usuário
export const deleteUser = async (id) => {
  try {
    const config = getAuthConfig();
    const response = await axios.delete(`/api/users/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

// Função para buscar um usuário por ID
export const fetchUserById = async (id) => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`/api/users/${id}`, config);

    const userData = {
      ...response.data,
      enterprise: response.data.enterprise ? {
        ...response.data.enterprise,
        id: response.data.enterprise.id,
      } : null
    };

    console.log("Dados da empresa:", userData.enterprise); // Adicionando log para os dados da empresa
    return userData;

  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
};


// Nova função para redefinir a senha
export const resetPassword = async (email) => {
  try {
    const response = await axios.post('/api/users/reset-password', { email });
    return response.data;
  } catch (error) {
    console.error('Erro ao solicitar redefinição de senha:', error);
    throw error;
  }
};

// Função para criar um novo usuário
export const createUser = async (userData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.post('/api/users', userData, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Criar ou atualizar uma enterprise
export const createOrUpdateEnterprise = async (enterpriseId, enterpriseData) => {
  try {
    const config = getAuthConfig();
    console.log(enterpriseData, enterpriseId);
    let response;
    if (enterpriseId) {
      // Se já existe um id_enterprise, atualizamos
      response = await axios.put(`/api/enterprise/${enterpriseId}`, enterpriseData, config);
    } else {
      // Se não existe, criamos uma nova enterprise
      response = await axios.post('/api/enterprise', enterpriseData, config);
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao criar/atualizar enterprise:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para buscar um usuário e sua empresa associada pelo ID
export const fetchUserEnterprise = async (userId) => {
  try {
    const config = getAuthConfig();

    // Buscar dados do usuário
    const userResponse = await axios.get(`/api/users/${userId}`, config);
    const userData = userResponse.data;

    let enterpriseData = null;

    // Se o usuário tem uma empresa associada, buscar os dados da empresa
    if (userData.id_enterprise) {
      const enterpriseResponse = await axios.get(`/api/enterprise/${userData.id_enterprise}`, config);
      enterpriseData = enterpriseResponse.data;
    }

    // Retorna os dados do usuário e da empresa (se existir)
    return {
      user: userData,
      enterprise: enterpriseData
    };

  } catch (error) {
    console.error('Erro ao buscar usuário e empresa:', error);
    throw error;
  }
};

