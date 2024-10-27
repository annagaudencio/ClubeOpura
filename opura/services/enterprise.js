import api from './api';

//Busca os dados de uma empresa específica pelo ID
export const getEnterpriseById = async (id) => {
  try {
    const response = await api.get(`/enterprise/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da empresa:', error.response?.data || error.message);
    throw error;
  }
};

//Atualiza os dados de uma empresa existente
export const updateEnterprise = async (id, data) => {
  try {
    const response = await api.put(`/enterprise/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error.response?.data || error.message);
    throw error;
  }
};



//Atualiza ou cria uma empresa (upsert)
export const createOrUpdateEnterprise = async (id, data) => {
  try {
    if (id) {
      return await updateEnterprise(id, data);
    } else {
      return await createEnterprise(data);
    }
  } catch (error) {
    console.error('Erro ao criar/atualizar empresa:', error.response?.data || error.message);
    throw error;
  }
};

//Valida CNPJ de uma empresa
export const validateCNPJ = async (cnpj) => {
  try {
    const response = await api.post('/enterprise/validate-cnpj', { cnpj });
    return response.data;
  } catch (error) {
    console.error('Erro ao validar CNPJ:', error.response?.data || error.message);
    throw error;
  }
};


//Verifica se um CNPJ já está em uso
export const checkCNPJExists = async (cnpj) => {
  try {
    const response = await api.get(`/enterprise/check-cnpj/${cnpj}`);
    return response.data.exists;
  } catch (error) {
    console.error('Erro ao verificar CNPJ:', error.response?.data || error.message);
    throw error;
  }
};

//Formata um CNPJ para o padrão XX.XXX.XXX/XXXX-XX
export const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  
  // Remove caracteres não numéricos
  const numericCNPJ = cnpj.replace(/\D/g, '');
  
  // Aplica a máscara XX.XXX.XXX/XXXX-XX
  return numericCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};

//Remove formatação do CNPJ
export const sanitizeCNPJ = (cnpj) => {
  if (!cnpj) return '';
  return cnpj.replace(/\D/g, '');
};