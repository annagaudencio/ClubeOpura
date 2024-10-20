import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '/services/auth';
import InputField from '../elementos/InputField';
import PasswordInput from '../elementos/PasswordInput';

const LoginForm = ({ onForgotPasswordClick }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success) {
        router.push('/dashboard');
      } else {
        alert(response.error || 'Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className='w-full flex-col gap-2 justify-start items-center inline-flex'>
      <form onSubmit={handleSubmit} className='w-full'>
        <div style={{ paddingBottom: '1rem' }}>
          <InputField 
            label="Email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput 
            label="Senha" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Senha"
          />
        </div>
        
        <button className="bt-marrom w-full" type="submit">Entrar</button>
      </form>

      {/* Link para recuperação de senha */}
      <a onClick={onForgotPasswordClick} className='legenda cursor-pointer'>Esqueci minha senha 🥲</a>
    </div>
  );
};

export default LoginForm;