import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PasswordInput from '../elementos/PasswordInput';
import { resetPassword } from '/services/auth';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const router = useRouter();
  const { email, token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }
    setIsResetting(true);
    try {
      const result = await resetPassword(email, token, password);
      if (result.success) {
        setMessage('Senha redefinida com sucesso! Redirecionando para o login...');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setMessage('Não foi possível redefinir a senha. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setMessage('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Redefinir Senha</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-links)] text-[var(--color-primaria)]">
        <div className="p-8 w-96 bg-white/10 rounded-[32px] border border-white/5">
          <h2 className="text-2xl font-bold mb-2">Redefinir Senha</h2>
          <form onSubmit={handleSubmit}>
            <PasswordInput
              label="Nova Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="sua nova senha"
              required
            />
            <PasswordInput
              label="Confirmar Nova Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirme a nova senha"
              required
            />
            <button type="submit" className="w-full mt-4" disabled={isResetting}>
              {isResetting ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-center">{message}</p>}
        </div>
      </div>
    </>
  );
}