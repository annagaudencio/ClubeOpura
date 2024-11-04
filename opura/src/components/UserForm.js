import React from 'react';
import InputData from '../elementos/InputData';

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
  console.log('Data antes da formatação:', userData.birthday);


  return (
    <form onSubmit={handleSubmit} className='md:h-3/4 h-fit md:overflow-y-auto bg-[var(--color-background)] rounded-[32px] p-8'>
      {/* Dados do Usuário */}
      <div className='form-perfil'>
        <h3 className='text-center text-lg'>Sobre você</h3>
        <InputData 
          label="Seu name" 
          name="name" 
          placeholder="Digite seu name completo" 
          value={userData.name || ""} 
          onChange={handleUserChange}
          
        />
        <InputData 
          label="Whatsapp" 
          name="phone" 
          placeholder="(99) 99999-9999" 
          value={userData.phone || ""} 
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
          name="birthday" 
          placeholder="dd/mm/yyyy" 
          value={formatDateForDisplay(userData.birthday)}
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
          label="name do Escritório"
          name="name"
          placeholder="name do escritório"
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