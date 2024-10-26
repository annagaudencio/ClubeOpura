import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import Navbar from '../components/navbar';
import UserInfo from '../components/UserInfo';
import UserForm from '../components/UserForm';
import BenefitsAndProgress from '../components/BenefProgress';

import { getUserDataById } from '/services/user';
import { getUserPoints } from '/services/points';

export default function PerfilUser() {
  const [userCode, setUserCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    aniversario: '',
    cnpj: '',
    nomeEscritorio: '',
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    pais: '',
  });
  const [pontos, setPontos] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 116;
        const user = await getUserDataById(userId); // Uso da função correta de user.js
        setUserData({
          nome: user.name,
          email: user.email,
          telefone: user.telefone || '',
          aniversario: user.dataNascimento || '',
          cnpj: user.cnpj || '',
          nomeEscritorio: user.nomeEscritorio || '',
          cep: user.cep || '',
          rua: user.rua || '',
          numero: user.numero || '',
          cidade: user.cidade || '',
          estado: user.estado || '',
          pais: user.pais || 'Brasil',
        });
        setUserCode(user.id);

        const userPoints = await getUserPoints(userId); // Uso da função correta de points.js
        setPontos(userPoints);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', userData);
  };

  const beneficios = [
    { titulo: 'Catálogo Ametista' },
    { titulo: 'Ingresso do Evento' }
  ];

  return (
    <>
      <Head>
        <title>Perfil do Usuário</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-2 h-full flex-col md:flex md:flex-row pt-8 md:overflow-y-clip">
        <div className='w-full md:h-full md:w-1/2'>
        <UserInfo userData={userData} pontos={pontos} userCode={userCode} isEditing={isEditing} toggleEdit={toggleEdit} />
        <UserForm userData={userData} handleChange={handleChange} handleCepChange={handleChange} isEditing={isEditing} handleSubmit={handleSubmit} />
        </div>
        <BenefitsAndProgress beneficios={beneficios} pontos={pontos} />
      </div>
    </>
  );
}