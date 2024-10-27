// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Navbar from '../components/navbar';
// import UserInfo from '../components/UserInfo';
// import UserForm from '../components/UserForm';
// import BenefitsAndProgress from '../components/BenefProgress';
// import { getUserInfoFromToken } from "/services/auth";
// import { getUserDataById, updateUserData } from '/services/user';
// import { getUserPoints } from '/services/points';

// export default function PerfilUser() {
//   const [userCode, setUserCode] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     nome: '',
//     email: '',
//     telefone: '',
//     senha: '',
//     aniversario: '',
//     cnpj: '',
//     nomeEscritorio: '',
//     cep: '',
//     rua: '',
//     numero: '',
//     cidade: '',
//     estado: '',
//     pais: '',
//   });
//   const [pontos, setPontos] = useState(0);
//   const [initialUserData, setInitialUserData] = useState({}); // Novo estado para comparação de alterações

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Token não encontrado");
        
//         const userInfo = getUserInfoFromToken(token);
//         if (!userInfo || !userInfo.id) throw new Error("ID do usuário não encontrado no token");

//         console.log("Buscando dados do usuário com ID:", userInfo.id);
//         const user = await getUserDataById(userInfo.id);
//         const formattedData = {
//           nome: user.name,
//           email: user.email,
//           telefone: user.phone || '',
//           aniversario: user.birthday || '',
//           cnpj: user.cnpj || '',
//           nomeEscritorio: user.nomeEscritorio || '',
//           cep: user.cep || '',
//           rua: user.address || '',
//           numero: user.numero || '',
//           cidade: user.city || '',
//           estado: user.state || '',
//           pais: user.country || 'Brasil',
//         };

//         setUserData(formattedData);
//         setInitialUserData(formattedData); // Guarda o estado inicial para referência
//         setUserCode(user.id);

//         console.log("Dados iniciais do usuário:", formattedData);
        
//         const userPoints = await getUserPoints(user.id_user_registered);
//         setPontos(userPoints);
//       } catch (error) {
//         console.error("Erro ao buscar dados do usuário:", error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//     console.log(`Campo alterado: ${name}, Novo valor: ${value}`);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Iniciando envio de dados...");
    
//     // Filtra apenas os dados que foram alterados
//     const changedData = Object.keys(userData).reduce((acc, key) => {
//       if (userData[key] !== initialUserData[key]) {
//         acc[key] = userData[key];
//       }
//       return acc;
//     }, {});

//     if (Object.keys(changedData).length === 0) {
//       console.log("Nenhuma alteração detectada.");
//       return;
//     }

//     console.log("Dados a serem enviados para atualização:", changedData);
//     try {
//       await updateUserData(userCode, changedData);
//       console.log('Dados atualizados com sucesso');
//       setInitialUserData(userData); // Atualiza o estado inicial com os novos dados salvos
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Erro ao atualizar os dados do usuário:", error);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>Perfil do Usuário</title>
//       </Head>
//       <Navbar />

//       <div className="main-content md:p-2 h-full flex-col md:flex md:flex-row pt-8 md:overflow-y-clip">
//         <div className='w-full md:h-full md:w-1/2'>
//           <UserInfo 
//           userData={userData} 
//           pontos={pontos} 
//           userCode={userCode} 
//           isEditing={isEditing} 
//           toggleEdit={toggleEdit} 
//           />
//           <UserForm 
//             userData={userData} 
//             handleChange={handleChange} 
//             handleCepChange={handleChange} 
//             isEditing={isEditing} 
//             handleSubmit={handleSubmit} 
//           />
//         </div>
//         <BenefitsAndProgress  />
//       </div>
//     </>
//   );
// }
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
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    aniversario: '',
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
          nome: user.name,
          email: user.email,
          telefone: user.phone || '',
          aniversario: user.birthday || '',
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
        
        const userPoints = await getUserPoints(userInfo.id);
        setPontos(userPoints);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  // Monitora mudanças nos dados
  useEffect(() => {
    const checkChanges = () => {
      const userDataChanged = JSON.stringify(userData) !== JSON.stringify(initialUserData);
      const enterpriseDataChanged = JSON.stringify(enterpriseData) !== JSON.stringify(initialEnterpriseData);
      setHasChanges(userDataChanged || enterpriseDataChanged);
    };
    checkChanges();
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
    console.log("Iniciando atualização de dados...");
    
    try {
      // Atualiza dados da empresa se houver mudanças
      const enterpriseChanges = Object.keys(enterpriseData).reduce((acc, key) => {
        if (enterpriseData[key] !== initialEnterpriseData[key]) {
          acc[key] = enterpriseData[key];
        }
        return acc;
      }, {});

      if (Object.keys(enterpriseChanges).length > 0) {
        await updateEnterprise(userData.id_enterprise, enterpriseChanges);
      }

      // Atualiza dados do usuário se houver mudanças
      const userChanges = Object.keys(userData).reduce((acc, key) => {
        if (userData[key] !== initialUserData[key]) {
          acc[key] = userData[key];
        }
        return acc;
      }, {});

      if (Object.keys(userChanges).length > 0) {
        await updateUserData(userCode, userChanges);
      }

      // Atualiza estados iniciais
      setInitialUserData(userData);
      setInitialEnterpriseData(enterpriseData);
      setHasChanges(false);
      setIsEditing(false);

      console.log('Dados atualizados com sucesso');
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
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