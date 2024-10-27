import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import Navbar from '../components/navbar';
import UserInfo from '../components/UserInfo';
import UserForm from '../components/UserForm';
import BenefitsAndProgress from '../components/BenefProgress';

import { getUserInfoFromToken } from "/services/auth";
import { getUserDataById, updateUserData } from '/services/user';
import { getUserPoints } from '/services/points';
import { getEnterpriseById, updateEnterprise } from '/services/enterprise';

export default function PerfilUser() {
  const [userCode, setUserCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    senha: '',
    birthday: '',
    profession: '',
    id_enterprise: null
  });
  
  const [enterpriseData, setEnterpriseData] = useState({
    cnpj: '',
    name: '',
    address: '',
    cep: '',
    city: '',
    state: '',
    country: 'Brasil'
  });

  const [pontos, setPontos] = useState(0);
  const [initialUserData, setInitialUserData] = useState({});
  const [initialEnterpriseData, setInitialEnterpriseData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Parte do useEffect que busca os dados no perfil.js
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado");
      
      const userInfo = getUserInfoFromToken(token);
      if (!userInfo || !userInfo.id) throw new Error("ID do usuário não encontrado no token");

      // Busca dados do usuário
      const user = await getUserDataById(userInfo.id);
      const formattedUserData = {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        birthday: user.birthday || '',
        profession: user.profession || '',
        id_enterprise: user.id_enterprise
      };

      setUserData(formattedUserData);
      setInitialUserData(formattedUserData);
      setUserCode(user.id);

      // Se houver empresa associada, busca dados da empresa
      if (user.id_enterprise) {
        const enterprise = await getEnterpriseById(user.id_enterprise);
        const formattedEnterpriseData = {
          cnpj: enterprise.cnpj || '',
          name: enterprise.name || '',
          address: enterprise.address || '',
          cep: enterprise.cep || '',
          city: enterprise.city || '',
          state: enterprise.state || '',
          country: enterprise.country || 'Brasil'
        };

        setEnterpriseData(formattedEnterpriseData);
        setInitialEnterpriseData(formattedEnterpriseData);
      }
      
      // Busca pontos usando o ID correto do usuário
      try {
        const userPoints = await getUserPoints(user.id); // Usando o ID do usuário retornado pela API
        setPontos(userPoints);
        console.log('Pontos do usuário:', userPoints);
      } catch (pointsError) {
        console.error("Erro ao buscar pontos do usuário:", pointsError);
        setPontos(0); // Define um valor padrão em caso de erro
      }

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  fetchData();
}, []);

  // Monitora mudanças nos dados
  useEffect(() => {
    const hasUserChanges = Object.keys(userData).some(key => {
      return userData[key] !== initialUserData[key];
    });

    const hasEnterpriseChanges = Object.keys(enterpriseData).some(key => {
      return enterpriseData[key] !== initialEnterpriseData[key];
    });

    setHasChanges(hasUserChanges || hasEnterpriseChanges);
  }, [userData, enterpriseData, initialUserData, initialEnterpriseData]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnterpriseChange = (e) => {
    const { name, value } = e.target;
    setEnterpriseData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Cria objetos apenas com os campos alterados
      const userUpdates = {};
      Object.keys(userData).forEach(key => {
        if (userData[key] !== initialUserData[key] && userData[key] !== undefined) {
          userUpdates[key] = userData[key];
        }
      });

      const enterpriseUpdates = {};
      Object.keys(enterpriseData).forEach(key => {
        if (enterpriseData[key] !== initialEnterpriseData[key] && enterpriseData[key] !== undefined) {
          enterpriseUpdates[key] = enterpriseData[key];
        }
      });

      // Atualiza dados apenas se houver alterações
      if (Object.keys(userUpdates).length > 0) {
        console.log('Atualizando dados do usuário:', userUpdates);
        await updateUserData(userCode, userUpdates);
      }

      if (Object.keys(enterpriseUpdates).length > 0 && userData.id_enterprise) {
        console.log('Atualizando dados da empresa:', enterpriseUpdates);
        await updateEnterprise(userData.id_enterprise, enterpriseUpdates);
      }

      // Atualiza estados após sucesso
      setInitialUserData(userData);
      setInitialEnterpriseData(enterpriseData);
      setHasChanges(false);
      setIsEditing(false);

      console.log('Dados atualizados com sucesso');
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      // Aqui você pode adicionar um tratamento de erro para o usuário
    }
  };

  return (
    <>
      <Head>
        <title>Perfil do Usuário</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-2 h-full flex-col md:flex md:flex-row pt-8 md:overflow-y-clip">
        <div className='w-full md:h-full md:w-1/2'>
          <UserInfo 
            userData={userData}
            pontos={pontos}
            userCode={userCode}
            isEditing={isEditing} 
            toggleEdit={toggleEdit} 
          />
          <UserForm 
            userData={userData}
            enterpriseData={enterpriseData}
            handleUserChange={handleUserChange}
            handleEnterpriseChange={handleEnterpriseChange}
            isEditing={isEditing}
            handleSubmit={handleSubmit}
            hasChanges={hasChanges}
          />
        </div>
        <BenefitsAndProgress beneficios={[]} pontos={pontos} />
      </div>
    </>
  );
}