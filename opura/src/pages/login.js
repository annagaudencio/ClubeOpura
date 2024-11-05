import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { login } from '/services/auth';
import LoginForm from '../formularios/LoginForm';
import PasswordRecovery from '../formularios/PasswordRecovery';
import Icon from '../elementos/Icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showRecovery, setShowRecovery] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        router.push('/dashboard');
      } else {
        setError('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro no login. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      
      <div className="h-screen flex flex-col md:flex-row bg-auto bg-no-repeat md:overflow-hidden">
        
        {/* Coluna 1 - login */}
        <div className="flex flex-col p-4 gap-2.5 md:h-screen order-2 md:w-1/3 w-full self-stretch justify-center items-center text-[var(--color-primaria)]">
          <h3 className='uppercase text-center w-[300px]'>Que bom te ver de volta!</h3>
          <p>Qual história vamos construir hoje?</p>
          <div className='w-full px-6 pt-10 pb-8 bg-white/10 rounded-[32px] border border-white/5 flex-col justify-start items-center gap-8 inline-flex'>
            {showRecovery ? (
              <PasswordRecovery onClose={() => setShowRecovery(false)} />
            ) : (
              <LoginForm onForgotPasswordClick={() => setShowRecovery(true)} />
            )}
          </div>
          <div>
            <p>Ainda não faz parte do nosso clube? Vem com a gente. <a href='/cadastro' className='text-[var(--color-secundaria)]'>Cadastre-se</a></p>
          </div>
        </div>
        
        {/* Coluna 2 - imagem */}
        <div className="relative md:h-screen md:w-2/3 h-[70vh] md:order-2 order-1 p-3">
          <div className="absolute bottom-0 right-0 p-8 z-40"><Icon name="logoVertical" className="h-64" /></div>
          {/* <div className='w-full h-full bg-gradient-to-t from-[#eee5d3] rounded-[32px] absolute'></div> */}
          <img className="w-full h-[100%] object-cover" src="/midia/img-login.webp" alt="imagem de olá" />
        </div>
      </div>
    </>
  );
}