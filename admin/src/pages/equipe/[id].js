import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';

import Head from "next/head";
import Navbar from "../../components/navbar";
import InputField from '../../components/InputField';
import InputData from '../../components/InputData';

const EditarMembro = () => {
  const [user, setUser] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    birthday: '',
    profession: '',
    id_user_registered: '',
    is_admin: false,
  });

  // Buscar e atualizar os detalhes do usuário
  useEffect(() => {
    if (id) {
      const loadUser = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setUser(response.data);
          setFormData(response.data);
        } catch (err) {
          setError('Erro ao carregar os detalhes do membro da equipe.');
        }
      };

      loadUser();
    }
  }, [id]);

  // Função para alternar entre modo de edição e visualização
  const toggleeditMode = () => {
    seteditMode(!editMode);
    if (editMode) {
      saveChanges();
    }
  };

  // Função para salvar as alterações
  const saveChanges = async () => {
    try {
      await api.put(`/users/${id}`, formData);
      alert('Dados salvos com sucesso!');
      seteditMode(false);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados.');
    }
  };

  // Função para lidar com mudanças nos campos de input
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // Se houver erro, exibe a mensagem de erro
  if (error) {
    return <p>{error}</p>;
  }

  // Se os dados do usuário ainda não foram carregados, retorna null para não exibir nada
  if (!user) {
    return null;
  }

  //Deletar
  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este membro da equipe?")) {
      try {
        await api.delete(`/users/${id}`);
        alert("Membro da equipe excluído com sucesso!");
        router.push('/parceiros');  // Redireciona para a lista de parceiros após a exclusão
      } catch (error) {
        console.error('Erro ao excluir membro da equipe:', error);
        alert("Erro ao excluir membro da equipe.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Editar Membro da Equipe</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-2 flex flex-col md:h-screen">
        {/* topo */}
        <div className="w-full flex p-8 bg-[var(--color-bg-preto)] rounded-[32px] divide-x divide-[var()] gap-4">
          {/* coluna 1 */}
          <div className="w-full flex text-[var(--color-primaria)] justify-between items-center gap-4 inline-flex">
            {/* Icone e nome */}
            <div className="flex items-center gap-4">
              <img src="/midia/avatar.webp" className="w-16" alt="avatar de membro da equipe" />
              <h5>{formData.name}</h5>
            </div>

            {/* Código */}
            <div className="w-fit flex-col justify-start items-start gap-3 inline-flex">
              <h5 className="text-[var(--color-secundaria)]">Código</h5>
              <p>{formData.id_user_registered}</p>
            </div>
          </div>
        </div>
        
        <div className="w-full h-full text-white md:grid md:grid-rows-3 md:grid-flow-col">
          {/* Dados */}
          <div className="w-full p-8 bg-[var(--color-bg-preto)] rounded-[32px] md:row-span-3 md:col-span-3 overflow-clip overflow-y-auto">
            {/* Topo */}
            <div className='flex justify-between items-center border-b pb-4'>
              <h5 className='text-[var(--color-primaria)]'>Dados do Membro da Equipe</h5>
              <button onClick={toggleeditMode} className='bt-linha-clara'>{editMode ? 'Salvar' : 'Editar'}</button>
            </div>
              
            {/* Lista de dados editáveis */}
            <form className="divide-y">
              <div className='py-8'>
                <h5 className='col-span-2 text-[var(--color-primaria)]'>Pessoais:</h5>
                <InputData
                  label="Nome"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  editMode={editMode}
                />
                <InputData
                  label="Telefone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  editMode={editMode}
                />
                <InputData
                  label="Email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  editMode={editMode} 
                />
                <InputData
                  label="Data de Nascimento"
                  name="birthday"
                  type="date"
                  value={formData.birthday ? new Date(formData.birthday).toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  editMode={editMode} 
                />
                <InputData
                  label="Senha"
                  name="password"
                  type="password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  editMode={editMode} 
                />
              </div>

              {/* Trabalho */}
              <div className='py-8'>
                <h5 className='col-span-2 text-[var(--color-primaria)]'>Trabalho:</h5>
                <InputData
                  label="Cargo"
                  name="profession"
                  value={formData.profession || ''}
                  onChange={handleChange}
                  editMode={editMode}
                />
                <InputData
                  label="Admin"
                  name="is_admin"
                  type="checkbox"
                  checked={formData.is_admin}
                  onChange={handleChange}
                  editMode={editMode}
                />
              </div>
            </form>

            {/* Deletar */}
            <div className="bg-[var(--color-bg-preto)] rounded-[32px] p-8 pb-[120px] md:pb-8 text-[#ff0000] flex gap-4 justify-center items-center">
              <button onClick={handleDelete} className="bt-perigo">Excluir</button>
              <p className="animate-pulse">Cuidado aqui, ok?!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarMembro;