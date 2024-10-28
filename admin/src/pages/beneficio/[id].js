import { useState, useEffect, useCallback } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import Navbar from "../../components/navbar";
import BeneficioForm from '../../components/BeneficioForm';
import BeneficioImg from '../../components/BeneficioImg';
import { fetchBenefitById, updateBenefit, deleteBenefit } from '/services/benefits';


export default function EditBeneficio() {
  // Estado inicial do benefício para edição
  const [beneficio, setBeneficio] = useState({
    title: '',
    points: 0,
    description: '',
    image: '',
    redemptionSteps: ['']
  });
  const [isLoading, setIsLoading] = useState(true); // Controle de carregamento
  const router = useRouter();
  const { id } = router.query; // Identifica o benefício via ID na URL

  // Carrega as informações do benefício ao obter o ID
  useEffect(() => {
    const loadBenefit = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await fetchBenefitById(id);
        setBeneficio(prev => ({
          ...prev,
          ...data,
          image: `https://opuramarmores.com/benef-img/${id}.webp`,
        }));
      } catch (error) {
        console.error('Erro ao carregar benefício:', error);
        alert('Erro ao carregar dados do benefício: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadBenefit();
  }, [id]);

  // Atualiza a imagem do benefício; usa useCallback para evitar recriação
  // const handleImagemChange = useCallback((novaImagemBase64) => {
  //   setBeneficio(prev => ({ ...prev, image: novaImagemBase64 }));
  // }, []);
  const handleImagemChange = useCallback((novaImagemUrl) => {
    setBeneficio(prev => ({ ...prev, image: novaImagemUrl }));
    // Aqui você pode implementar a lógica para salvar a nova imagem no servidor
  }, []);


  // Atualiza os campos do formulário com dados novos
  const handleFormChange = useCallback((novoDados) => {
    setBeneficio(prev => ({ ...prev, ...novoDados }));
  }, []);

  // Função para salvar o benefício editado
  // const handleSave = useCallback(async () => {
  //   if (!id) {
  //     alert('ID do benefício não está definido.');
  //     return;
  //   }
  //   try {
  //     const updatedData = {
  //       title: beneficio.title,
  //       points: beneficio.points,
  //       description: beneficio.description,
  //       image: beneficio.image,
  //       id_user_updated: 1, // Substitua pelo ID do usuário atual se disponível
  //     };
  //     console.log('Dados sendo enviados para atualização:', updatedData);
  //     const updatedBenefit = await updateBenefit(id, updatedData);
  //     setBeneficio(prev => ({ ...prev, ...updatedBenefit }));
  //     alert('Benefício salvo com sucesso!');
  //     router.push('/beneficios');
  //   } catch (error) {
  //     console.error('Erro ao salvar benefício:', error);
  //     if (error.response) {
  //       console.error('Resposta do servidor:', error.response.data);
  //       console.error('Status do erro:', error.response.status);
  //       alert(`Erro ao salvar benefício: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
  //     } else if (error.request) {
  //       console.error('Sem resposta do servidor');
  //       alert('Erro ao salvar benefício: Não foi possível conectar ao servidor');
  //     } else {
  //       console.error('Erro na configuração da requisição:', error.message);
  //       alert(`Erro ao salvar benefício: ${error.message}`);
  //     }
  //   }
  // }, [id, beneficio, router]);

  const handleSave = useCallback(async () => {
    if (!id) {
      alert('ID do benefício não está definido.');
      return;
    }
    try {
      const updatedData = {
        title: beneficio.title,
        points: beneficio.points,
        description: beneficio.description,
        // Não enviamos a imagem aqui, pois ela é gerenciada separadamente
        id_user_updated: 1, // Substitua pelo ID do usuário atual se disponível
      };
      await updateBenefit(id, updatedData);
      alert('Benefício salvo com sucesso!');
      router.push('/beneficios');
    } catch (error) {
      console.error('Erro ao salvar benefício:', error);
      alert('Erro ao salvar benefício: ' + (error.response?.data?.message || error.message));
    }
  }, [id, beneficio, router]);
  

  // Função para deletar o benefício
  const handleDelete = useCallback(async () => {
    // Confirmação de exclusão
    if (confirm('Tem certeza que deseja excluir este benefício?')) {
      try {
        // Chama a API para deletar o benefício
        await deleteBenefit(id);
        alert('Benefício excluído com sucesso.');
        router.push('/beneficios'); // Redireciona após exclusão
      } catch (error) {
        console.error('Erro ao excluir benefício:', error);
        alert('Erro ao excluir benefício: ' + error.message);
      }
    }
  }, [id, router]);


  return (
    <>
      <Head>
        <title>Editar Benefício {id}</title>
      </Head>
      <Navbar />
      <div className="main-content md:p-2 flex flex-col md:flex-row">
        {/* Componente de imagem do benefício */}
        <BeneficioImg 
          beneficioId={id}
          onImagemChange={handleImagemChange}
        />
        <div className="w-full h-full md:w-1/2 flex-col inline-flex">
          {/* Formulário para editar os dados do benefício */}
          <BeneficioForm 
          beneficio={beneficio} 
          onChange={handleFormChange} 
          />

          <div className="bg-[var(--color-bg-preto)] rounded-[32px] p-8 pb-24 md:pb-8 flex flex-col gap-2 justify-between items-center">
            <button className="bt-linha-clara w-full" onClick={handleSave}>Salvar Alterações</button>
            <div className="w-full text-center text-[#ff0000] flex justify-between items-center">
              <p className="animate-pulse w-fit">Cuidado aqui, ok?!</p>
              <button className="bt-perigo w-1/2" onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}