// import React, { useState, useEffect } from 'react';
// import InputData from '../elementos/InputData';
// import PasswordInput from '../elementos/PasswordInput';

// export default function UserForm({ userData, handleChange, handleCepChange, isEditing, handleSubmit }) {
//   const [isSaveEnabled, setIsSaveEnabled] = useState(false); // Estado para controlar o botão salvar
//   const [formState, setFormState] = useState(userData); // Estado interno para armazenar mudanças

//   // Função para formatar a data para yyyy-MM-dd
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0];
//   };

//   // Atualiza o estado local com mudanças e ativa o botão Salvar
//   const handleInputChange = (e) => {
//     handleChange(e); // Mantém o funcionamento de handleChange existente
//     const { name, value } = e.target;
//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     setIsSaveEnabled(true); // Ativa o botão
//   };

//   const handleSubmitForm = (e) => {
//     e.preventDefault();
//     handleSubmit(formState); // Envia os dados alterados
//     setIsSaveEnabled(false); // Desativa o botão após salvar
//   };

//   return (
//     <form onSubmit={handleSubmitForm} className='md:h-[75%] h-fit md:overflow-y-auto bg-[var(--color-background)] rounded-[32px] p-8'>
//       <div className='form-perfil'>
//         <h3 className='text-center text-lg'>Sobre você</h3>
//         <InputData 
//           label="Seu nome" 
//           name="nome" 
//           placeholder="Digite seu nome completo" 
//           value={formState.nome || ""} 
//           onChange={handleInputChange} 
//         />
//         <InputData 
//           label="Whatsapp" 
//           name="telefone" 
//           placeholder="(99) 99999-9999" 
//           value={formState.telefone || ""} 
//           onChange={handleInputChange} 
//         />
//         <InputData 
//           label="Seu email" 
//           name="email" 
//           placeholder="exemplo@email.com" 
//           value={formState.email || ""} 
//           onChange={handleInputChange} 
//         />
//         <InputData 
//           type="date" 
//           label="Data de Aniversário" 
//           name="aniversario" 
//           placeholder="dd/mm/aaaa" 
//           value={formatDate(formState.aniversario)} 
//           onChange={handleInputChange} 
//         />
//         <div><a>Redefinir senha</a></div>
//       </div>

//       <div className='form-perfil pt-8'>
//         <h3 className='text-center text-lg'>Sobre seu trabalho</h3>
//         <InputData 
//           type="text"
//           label="CNPJ"
//           name="cnpj"
//           value={formState.cnpj || ""}
//           onChange={handleInputChange}
//         />
//         <InputData 
//           type="text"
//           label="Nome do Escritório"
//           name="nomeEscritorio"
//           value={formState.nomeEscritorio || ""}
//           onChange={handleInputChange}
//         />
//       </div>

//       <div className='form-perfil pt-8'>
//         <h3 className='text-center text-lg'>Seu espaço</h3>
//         <InputData 
//           type="text"
//           label="CEP"
//           name="cep"
//           value={formState.cep || ""}
//           onChange={handleCepChange}
//         />
//         <InputData 
//           type="text"
//           label="Rua"
//           name="rua"
//           value={formState.rua || ""}
//           onChange={handleInputChange}
//         />
//         <InputData 
//           type="text"
//           label="Número"
//           name="numero"
//           value={formState.numero || ""}
//           onChange={handleInputChange}
//         />
//         <InputData 
//           type="text"
//           label="Cidade"
//           name="cidade"
//           value={formState.cidade || ""}
//           onChange={handleInputChange}
//         />
//         <InputData 
//           type="text"
//           label="Estado"
//           name="estado"
//           value={formState.estado || ""}
//           onChange={handleInputChange}
//         />
//         <InputData 
//           type="text"
//           label="País"
//           name="pais"
//           value={formState.pais || ""}
//           onChange={handleInputChange}
//         />
//       </div>

//       <button 
//         type="submit"
//         className='w-full mt-8 bt-marrom' 
//         style={{ opacity: isSaveEnabled ? 1 : 0.5 }}
//         disabled={!isSaveEnabled}
//       >
//         Salvar
//       </button>
//     </form>
//   );
// }
import React from 'react';
import InputData from '../elementos/InputData';
//import PasswordInput from '../elementos/PasswordInput';

export default function UserForm({ 
    userData, 
    enterpriseData,
    handleUserChange, 
    handleEnterpriseChange, 
    isEditing, 
    handleSubmit,
    hasChanges 
  }) {
  
  // Função para formatar a data ISO para dd/mm/aaaa
  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return '';
    try {
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  };

  // Handler para mudanças no campo de data
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (!value) {
      handleUserChange({
        target: {
          name,
          value: ''
        }
      });
      return;
    }

    // Converte dd/mm/aaaa para ISO
    const [day, month, year] = value.split('/');
    const isoDate = new Date(year, month - 1, day).toISOString();
    
    handleUserChange({
      target: {
        name,
        value: isoDate
      }
    });
  };

  // Log para debug
  console.log('Data antes da formatação:', userData.aniversario);


  return (
    <form onSubmit={handleSubmit} className='md:h-[75%] h-fit md:overflow-y-auto bg-[var(--color-background)] rounded-[32px] p-8'>
      {/* Dados do Usuário */}
      <div className='form-perfil'>
        <h3 className='text-center text-lg'>Sobre você</h3>
        <InputData 
          label="Seu nome" 
          name="nome" 
          placeholder="Digite seu nome completo" 
          value={userData.nome || ""} 
          onChange={handleUserChange}
          
        />
        <InputData 
          label="Whatsapp" 
          name="telefone" 
          placeholder="(99) 99999-9999" 
          value={userData.telefone || ""} 
          onChange={handleUserChange}
          
        />
        <InputData 
          label="Seu email" 
          name="email" 
          placeholder="exemplo@email.com" 
          value={userData.email || ""} 
          onChange={handleUserChange}
          
        />
        <InputData 
          type="date" 
          label="Data de Aniversário" 
          name="aniversario" 
          placeholder="dd/mm/yyyy" 
          value={formatDateForDisplay(userData.aniversario)}
          onChange={handleUserChange}
        />
        <InputData 
          label="Profissão" 
          name="profession" 
          placeholder="Sua profissão" 
          value={userData.profession || ""} 
          onChange={handleUserChange}
          
        />
        {isEditing && <div><a href="/reset-password">Redefinir senha</a></div>}
      </div>

      {/* Dados da Empresa */}
      <div className='form-perfil pt-8'>
        <h3 className='text-center text-lg'>Sobre seu trabalho</h3>
        <InputData 
          label="CNPJ"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          value={enterpriseData.cnpj || ""}
          onChange={handleEnterpriseChange}
          
        />
        <InputData 
          label="Nome do Escritório"
          name="name"
          placeholder="Nome do escritório"
          value={enterpriseData.name || ""}
          onChange={handleEnterpriseChange}
          
        />
      </div>

      {/* Endereço */}
      <div className='form-perfil pt-8'>
        <h3 className='text-center text-lg'>Seu espaço</h3>
        <InputData 
          label="CEP"
          name="cep"
          placeholder="00000-000"
          value={enterpriseData.cep || ""}
          onChange={handleEnterpriseChange}
          
        />
        <InputData 
          label="Endereço"
          name="address"
          placeholder="Rua, número, complemento"
          value={enterpriseData.address || ""}
          onChange={handleEnterpriseChange}
          
        />
        <InputData 
          label="Cidade"
          name="city"
          placeholder="Cidade"
          value={enterpriseData.city || ""}
          onChange={handleEnterpriseChange}
          
        />
        <InputData 
          label="Estado"
          name="state"
          placeholder="UF"
          value={enterpriseData.state || ""}
          onChange={handleEnterpriseChange}
          
        />
        <InputData 
          label="País"
          name="country"
          placeholder="País"
          value={enterpriseData.country || ""}
          onChange={handleEnterpriseChange}
          
        />
      </div>

      
        <button 
          type="submit"
          className='w-full mt-8 bt-marrom'
          style={{ opacity: hasChanges ? 1 : 0.5 }}
          disabled={!hasChanges}
        >
          Salvar Alterações
        </button>
      
    </form>
  );
}