import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InputField from '../elementos/InputField';
import PasswordInput from '../elementos/PasswordInput';
import CheckboxField from '../elementos/chekbox';
import { createUser } from '/services/user';

function CadastroForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profession: '',
    phone: '',
    birthday: '',
    cnpj: '',
    enterprise_name: '',
    cep: '',
    address: '',
    city: '',
    state: '',
    country: 'Brasil',
    accept_notifications: false,
    accept_program: false,
    accept_regulation: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleCepChange = async (e) => {
    const newCep = e.target.value.replace(/\D/g, '');
    setFormData(prevData => ({ ...prevData, cep: newCep }));

    if (newCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData(prevData => ({
            ...prevData,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf
          }));
        } else {
          alert('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Preparar os dados para envio
      const userData = {
        ...formData,
        is_adm: false,
        id_enterprise: null,
      };

      // Chamar a função de registro do serviço
      const response = await createUser(userData);

      if (response.success) {
        router.push('/boasvindas');
      } else {
        alert(response.error || 'Erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  return (
    <div className="bg-transparente-12 border-solid border-[1px] border-gray-600 backdrop-blur-md w-full md:max-w-96 flex-col justify-start items-start flex py-8 px-4 rounded-[32px]">
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <div className='w-full flex-col justify-start items-center inline-flex'>
          <h5 className='text-[var(--color-primaria)]'>Vamos nos conhecer?</h5>
          <InputField name="name" label="Seu nome" placeholder="Seu nome completo" onChange={handleInputChange} required />
          <InputField name="email" label="Email" placeholder="Seu melhor e-mail" onChange={handleInputChange} required />
          <PasswordInput name="password" label="Senha" placeholder="Digite sua senha" onChange={handleInputChange} required />
          <InputField name="profession" label="Profissão" placeholder="Sua profissão" onChange={handleInputChange} required />
          <InputField name="phone" label="Whatsapp" placeholder="(99) 99999-9999" onChange={handleInputChange} required />
          <InputField name="birthday" type="date" label="Data de Aniversário" onChange={handleInputChange} required />
        </div>

        {/* Escritório */}
        <div className='w-full flex-col justify-start items-center inline-flex'>
          <h5 className='text-[var(--color-primaria)]'>Sobre seu trabalho</h5>
          <InputField name="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" onChange={handleInputChange} required />
          <InputField name="enterprise_name" label="Nome do escritório" placeholder="Nome do escritório" onChange={handleInputChange} required />
        </div>

        {/* Endereço */}
        <div className='w-full flex-col justify-start items-center inline-flex'>
          <h5 className='text-[var(--color-primaria)]'>Endereço</h5>
          <InputField 
            name="cep"
            label="CEP" 
            placeholder="00000-000" 
            value={formData.cep} 
            onChange={handleCepChange} 
            required
          />
          <InputField 
            name="address"
            label="Endereço" 
            placeholder="Rua, número, complemento" 
            value={formData.address} 
            onChange={handleInputChange}
            required
          />
          <InputField 
            name="city"
            label="Cidade" 
            placeholder="Cidade" 
            value={formData.city} 
            onChange={handleInputChange}
            required
          />
          <InputField 
            name="state"
            label="UF" 
            placeholder="Estado" 
            value={formData.state} 
            onChange={handleInputChange}
            required
          />
          <InputField 
            name="country"
            label="País" 
            placeholder="País" 
            value={formData.country} 
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Termos */}
        <div className='w-full flex-col justify-start items-center inline-flex text-[var(--color-primaria)]'>
          <h5>Como vamos nos comunicar</h5>
          <CheckboxField 
            label="Aceito receber comunicação" 
            checked={formData.accept_notifications}
            onChange={(checked) => handleCheckboxChange('accept_notifications', checked)} 
          />
          <CheckboxField 
            label="Confirmo minha participação no Programa" 
            checked={formData.accept_program}
            onChange={(checked) => handleCheckboxChange('accept_program', checked)} 
            isRequired
          />
          <CheckboxField 
            label={<>Li e concordo com o <a href="/regulamento" target="_blank" rel="noopener noreferrer">Regulamento do Programa</a></>}
            checked={formData.accept_regulation}
            onChange={(checked) => handleCheckboxChange('accept_regulation', checked)} 
            isRequired
          />
        </div>

        <button type="submit" className='w-full'>Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroForm;
