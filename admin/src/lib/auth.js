import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = '/api';

export const login = async (email, password) => {
  try {
    // Fazendo a requisição ao backend para login
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    // Pegando is_adm diretamente da resposta e verificando
    const { access_token, is_adm } = response.data;

    // Se o usuário não for administrador, lançar erro
    // OCULTO POR ENQUANTO !!!!!
    // if (!is_adm) {
    //   throw new Error('Oops... apenas usuários admin podem acessar aqui!');
    // }

    // Se for administrador, armazenar o token em um cookie
    Cookies.set('token', access_token, { expires: 1 });

    return access_token;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

// Função para obter o token armazenado no cookie
export const getToken = () => {
  return Cookies.get('token');
};