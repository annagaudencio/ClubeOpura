import axios from 'axios';

export const createBenefit = async (benefitData) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token não encontrado. Faça o login novamente.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/api/benefits', benefitData, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar benefício:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchBenefits = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token não encontrado. Faça o login novamente.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.get('/api/benefits', config);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar benefícios:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchBenefitById = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token não encontrado. Faça o login novamente.');
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.get(`/api/benefits/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar benefício:', error);
    throw error;
  }
};

export const deleteBenefit = async (id) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token não encontrado. Faça o login novamente.');
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    await axios.delete(`/api/benefits/${id}`, config);
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar benefício:', error);
    throw error;
  }
};


export const updateBenefit = async (id, beneficio) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token não encontrado. Faça o login novamente.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.put(`/api/benefits/${id}`, beneficio, config);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar benefício:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Função para obter benefícios resgatados de um usuário específico
export const getUserRedeemedBenefits = async (userId) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Token não encontrado. Faça o login novamente.');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // Filtra os benefícios resgatados pelo ID do usuário
    const response = await axios.get(`/api/redeemedBenefits?user_id=${userId}`, config);

    const promises = response.data.map(async (element) => {
      try {
        const benefit = await axios.get(`/api/benefits/${element.id_benefits}`, config);
        return { ...element, title: benefit.data.title };
      } catch (error) {
        console.error("Erro ao buscar benefício:", error);
        return null;
      }
    });

    const data = await Promise.all(promises);
    return data.filter((benefit) => benefit !== null); // Remove valores nulos
  } catch (error) {
    console.error("Erro ao obter os benefícios resgatados:", error);
    throw error;
  }
};




