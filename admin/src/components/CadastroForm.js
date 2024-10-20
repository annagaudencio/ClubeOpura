import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createPartner } from '../../services/inscritos';
import * as Yup from 'yup';
import InputField from '../elementos/InputField';
import PasswordInput from '../elementos/PasswordInput';
import axios from 'axios';

function CadastroForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: ''
  });
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    senha: '',
    aniversario: '',
    cnpj: '',
    escritorio: '',
    termos: {
      comunicacao: true,
      participacao: true,
      regulamento: true
    }
  });

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    whatsapp: Yup.string().required('WhatsApp é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    senha: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    aniversario: Yup.date().required('Data de aniversário é obrigatória'),
    cnpj: Yup.string().required('CNPJ é obrigatório'),
    escritorio: Yup.string().required('Nome do escritório é obrigatório'),
    endereco: Yup.object().shape({
      cep: Yup.string().required('CEP é obrigatório'),
      logradouro: Yup.string().required('Logradouro é obrigatório'),
      numero: Yup.string().required('Número é obrigatório'),
      bairro: Yup.string().required('Bairro é obrigatório'),
      cidade: Yup.string().required('Cidade é obrigatória'),
      uf: Yup.string().required('UF é obrigatória')
    })
  });

  const handleCepChange = async (e) => {
    const cepValue = e.target.value.replace(/\D/g, '');
    setCep(cepValue);
  
    if (cepValue.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
        setEndereco(prev => ({
          ...prev,
          logradouro,
          bairro,
          cidade: localidade,
          uf
        }));
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
        setError("Não foi possível buscar o endereço. Por favor, preencha manualmente.");
      }
    }
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const dataToValidate = {
        ...formData,
        endereco: {
          ...endereco,
          cep
        }
      };
  
      await validationSchema.validate(dataToValidate, { abortEarly: false });
      
      const partnerData = {
        name: formData.nome,
        password: formData.senha,
        email: formData.email,
        profession: formData.escritorio, // Pode ajustar conforme necessário
        id_enterprise: 1, // Defina um valor válido para o ID da empresa
        is_adm: false, // Defina conforme necessário
        id_user_registered: 1, // Defina o ID do usuário que registra
        accept_notifications: formData.termos.comunicacao,
        accept_program: formData.termos.participacao,
        accept_regulation: formData.termos.regulamento,
        phone: formData.whatsapp,
        birthday: formData.aniversario,
        endereco: {
          cep,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          uf: endereco.uf
        }
      };
  
      console.log("Dados para criação de parceiro:", JSON.stringify(partnerData, null, 2));
  
      await createPartner(partnerData);
      alert('Parceiro cadastrado com sucesso!');
      router.push('/parceiros');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = error.inner.map(err => err.message);
        setError(`Erros de validação:\n${errorMessages.join('\n')}`);
      } else {
        console.error("Erro ao criar parceiro:", error.response ? error.response.data : error.message);
        setError(`Erro ao criar parceiro: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full">
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <div className='w-full flex-col justify-start items-center inline-flex'>
          <h5 className='text-[var(--color-primaria)]'>Dados pessoais</h5>
          <InputField 
            label="Seu nome" 
            name="nome"
            placeholder="Seu nome" 
            value={formData.nome}
            onChange={handleInputChange} 
          />
          <InputField 
            label="Whatsapp" 
            name="whatsapp"
            placeholder="Whatsapp" 
            value={formData.whatsapp}
            onChange={handleInputChange} 
          />
          <InputField 
            label="Email" 
            name="email"
            placeholder="Seu melhor e-mail" 
            value={formData.email}
            onChange={handleInputChange} 
          />
          <PasswordInput 
            label="Senha" 
            name="senha"
            placeholder="Digite sua senha" 
            value={formData.senha}
            onChange={handleInputChange} 
          />
          <InputField 
            type="date" 
            label="Data de Aniversário" 
            name="aniversario"
            value={formData.aniversario}
            onChange={handleInputChange} 
          />
        </div>  

        {/* Escritório */}
        <div className='w-full flex-col justify-start items-center inline-flex'>
          <h5 className='text-[var(--color-primaria)]'>Trabalho</h5>
          <InputField 
            label="CNPJ" 
            name="cnpj"
            placeholder="CNPJ" 
            value={formData.cnpj}
            onChange={handleInputChange} 
          />
          <InputField 
            label="Local" 
            name="escritorio"
            placeholder="Nome do escritório" 
            value={formData.escritorio}
            onChange={handleInputChange} 
          />
        </div>

        {/* Endereço */}
        <div className='w-full flex-col justify-start items-center inline-flex'>
          <h5 className='text-[var(--color-primaria)]'>Endereço</h5>
          <InputField 
            label="CEP" 
            name="cep"
            placeholder="CEP" 
            value={cep} 
            onChange={handleCepChange}
          />
          <div className="w-full flex gap-2">
            <div className="flex-grow">
              <InputField 
                label="Logradouro" 
                placeholder="Rua, Av..." 
                name="logradouro"
                value={endereco.logradouro} 
                onChange={handleEnderecoChange}
                className="w-3/4"
              />
            </div>
            <InputField 
              label="Número" 
              placeholder="Nº" 
              name="numero"
              value={endereco.numero} 
              onChange={handleEnderecoChange}
              className="w-1/4"
            />
          </div>
          <InputField 
            label="Bairro" 
            placeholder="Bairro" 
            name="bairro"
            value={endereco.bairro} 
            onChange={handleEnderecoChange}
          />
          <InputField 
            label="Cidade" 
            placeholder="Cidade" 
            name="cidade"
            value={endereco.cidade} 
            onChange={handleEnderecoChange}
          />
          <InputField 
            label="UF" 
            placeholder="Estado" 
            name="uf"
            value={endereco.uf} 
            onChange={handleEnderecoChange}
          />
        </div>
      
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn btn-large btn-default w-full" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default CadastroForm;