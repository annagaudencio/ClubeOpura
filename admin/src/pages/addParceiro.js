import Head from "next/head";
import Navbar from "../components/navbar";
import CadastroForm from "../components/CadastroForm";
import { useRouter } from 'next/router';
import { createUser } from "/services/users.js"; 

export default function NovoParceiro() {
  const router = useRouter();

  const handleCadastro = async (userData) => {
    try {
      // Crie o usuário com is_adm: false
      const newUser = { ...userData, is_adm: false };
      const response = await createUser(newUser);
      alert("Parceiro cadastrado com sucesso!");

      // Redireciona para a página do parceiro recém-criado
      router.push(`/parceiro/${response.data.id}`);
    } catch (error) {
      console.error("Erro ao cadastrar parceiro:", error);
      alert("Erro ao cadastrar parceiro.");
    }
  };

  return (
    <>
      <Head>
        <title>Adicionar Parceiro</title>
      </Head>
      <Navbar />
      <div className="main-content md:p-2">
        <div className="w-full h-full bg-[var(--color-bg-preto)] rounded-[32px] p-8 overflow-clip overflow-y-auto pb-48">
          <div className="w-full justify-between items-center inline-flex">
            <h3 className="text-[24px] md:text-[32px] text-[var(--color-secundaria)]">Novo Parceiro</h3>
            <img src="./midia/avatar.webp" className="w-16" alt="avatar de parceiros" />
          </div>
          <CadastroForm onSubmit={handleCadastro} />
        </div>
      </div>
    </>
  );
}
