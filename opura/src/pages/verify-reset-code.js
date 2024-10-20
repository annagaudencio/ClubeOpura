
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import InputField from '../elementos/InputField';
import { verifyResetCode } from '/services/auth';

export default function VerifyResetCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const { email } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setMessage('Por favor, insira o código de verificação.');
      return;
    }
    setIsVerifying(true);
    try {
      const result = await verifyResetCode(email, code);
      if (result.success) {
        // Redireciona para a página de redefinição de senha com o token
        router.push(`/reset-password?email=${encodeURIComponent(email)}&token=${result.token}`);
      } else {
        setMessage('Código inválido. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      setMessage('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <Head>
        <title>Verificar Código de Redefinição</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-links)] text-[var(--color-primaria)]">
        <div className="p-8 w-96 bg-white/10 rounded-[32px] border border-white/5">
          <h2 className="text-2xl font-bold mb-6">Verificar Código</h2>
          <p className="mb-4">Insira o código de verificação enviado para {email}</p>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Código de Verificação"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Insira o código de 6 dígitos"
            />
            <button type="submit" className="w-full mt-4" disabled={isVerifying}>
              {isVerifying ? 'Verificando...' : 'Verificar Código'}
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-center">{message}</p>}
        </div>
      </div>
    </>
  );
}