import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import InputField from '../elementos/InputField';
import PasswordInput from '../elementos/PasswordInput';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Faz a requisição ao backend para autenticar
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });
  
        // Pegando o token da resposta
        const { access_token } = response.data;

        // Salvando o token no localStorage e cookies
        Cookies.set('token', access_token, { expires: 1 });
        localStorage.setItem('access_token', access_token);
  
        // Redirecionar para o dashboard após login
        window.location.href = '/dashboard';
      } catch (err) {
        setError('Erro no login. Verifique suas credenciais.');
      }
    };

  return (
    <div className="p-8 rounded-[36px] vidro border border-white/10 min-w-96">
      <form onSubmit={handleSubmit}>
        <InputField 
          label="Login" 
          type="email"
          placeholder="Email de login" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput 
          label="Senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
        <div className="pt-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full">Entrar</button>
        </div>
      </form>
    </div>
  );
}