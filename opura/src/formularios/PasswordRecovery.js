import { useState } from 'react';
import { useRouter } from 'next/router';
import { recoverPassword } from '/services/auth';
import InputField from '../elementos/InputField';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Por favor, insira seu e-mail.');
      return;
    }
    setIsRecovering(true);
    try {
      await recoverPassword(email);
      setMessage('Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.');
      setTimeout(() => {
        router.push(`/verify-reset-code?email=${encodeURIComponent(email)}`);
      }, 3000);
    } catch (error) {
      console.error('Oops.. Erro ao solicitar recuperação de senha:', error.response ? error.response.data : error.message);
      setMessage('Oops...Ocorreu um erro ao processar a recuperação de senha. Verifique se esse é mesmo o email inserido no cadastro.');
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <div className='w-full flex-col gap-2 justify-start items-center inline-flex'>
        <p className="text-[12px]"> Esqueceu sua senha? Não tem problema, vamos enviar as instruções de como recupera-lo para seu e-mail cadastrado.</p>
      <form onSubmit={handleSubmit} className='w-full'>
        <InputField 
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Seu email cadastrado"
        />
        <button className="bt-marrom w-full mt-2" type="submit" disabled={isRecovering}>
          {isRecovering ? 'Enviando...' : 'Recuperar Senha'}
        </button>
      </form>
      {message && <p className="text-[12px]">{message}</p>}
    </div>
  );
};

export default PasswordRecovery;