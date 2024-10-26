import axios from "axios";

const API_URL = "/api";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@teste.com';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'senhaSeguraAdmin123';


export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userName", response.data.name);
      return { success: true, userName: response.data.name };
    }
    return { success: false };
  } catch (error) {
    console.error("Erro no login:", error);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
};

export const loginAdmin = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    console.log("Admin login response:", response);
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      return response.data.access_token;
    }
    throw new Error("Falha ao obter token de admin");
  } catch (error) {
    console.error("Erro no login do admin:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export function getUserInfoFromToken(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    console.log("Decoded token:", decoded);

    // Retorna o id (sub) e o email para futuras consultas
    return { id: decoded.sub, email: decoded.email };
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

//Atualizar senha
export const recoverPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/recover`, { email });
    return response.data;
  } catch (error) {
    console.error('Erro na recuperação de senha:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const verifyResetCode = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/verify-reset-code`, { email, code });
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar código:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const resetPassword = async (email, token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email, token, newPassword });
    return response.data;
  } catch (error) {
    console.error('Erro ao redefinir senha:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createUser = async (userData, token) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error.response ? error.response.data : error.message);
    return { success: false, error: error.response ? error.response.data : error.message };
  }
};

export const createEnterprise = async (enterpriseData, token) => {
  try {
    const response = await axios.post(`${API_URL}/enterprise`, enterpriseData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("Resposta da criação de empresa:", response);
    return response.data; // Verifique se `response.data` contém o ID esperado
  } catch (error) {
    console.error("Erro ao criar empresa:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const createAdminUser = async (adminData, token) => {
  try {
    const response = await axios.post(`${API_URL}/users`, adminData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("Resposta da criação de admin:", response);
    return response.data; // Deve retornar o ID do usuário admin
  } catch (error) {
    console.error("Erro ao criar usuário admin:", error.response ? error.response.data : error.message);
    throw error;
  }
};