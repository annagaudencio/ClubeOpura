import axios from "axios";

//const API_URL = "/api/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login", { email, password });
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
    const response = await axios.post('/api/auth/recover', { email });
    return response.data;
  } catch (error) {
    console.error('Erro na recuperação de senha:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const verifyResetCode = async (email, code) => {
  try {
    const response = await axios.post('/api/verify-reset-code', { email, code });
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar código:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const resetPassword = async (email, token, newPassword) => {
  try {
    const response = await axios.post('/api/reset-password', { email, token, newPassword });
    return response.data;
  } catch (error) {
    console.error('Erro ao redefinir senha:', error.response ? error.response.data : error.message);
    throw error;
  }
};




