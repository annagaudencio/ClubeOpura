// components/UserForm.js
import React from 'react';
import InputField from '../elementos/InputField';
import PasswordInput from '../elementos/PasswordInput';


export default function UserForm({ userData, handleChange, handleCepChange, isEditing, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className='md:h-[75%] h-fit md:overflow-y-auto bg-[var(--color-background)] rounded-[32px] p-8'>
      <div className='form-perfil'>
        <h3 className='text-center text-lg'>Sobre você</h3>
        <InputField 
          label="Seu nome" 
          name="nome" 
          placeholder="Digite seu nome completo" 
          value={userData.nome} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          label="Whatsapp" 
          name="telefone" 
          placeholder="(99) 99999-9999" 
          value={userData.telefone} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          label="Seu email" 
          name="email" 
          placeholder="exemplo@email.com" 
          value={userData.email} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <PasswordInput 
          label="Senha" 
          name="senha" 
          placeholder="Digite sua senha" 
          value={userData.senha} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          type="date" 
          label="Data de Aniversário" 
          name="aniversario" 
          placeholder="dd/mm/aaaa" 
          value={userData.aniversario} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
      </div>

      <div className='form-perfil pt-8'>
        <h3 className='text-center text-lg'>Sobre seu trabalho</h3>
        <InputField 
          type="text" 
          label="CNPJ" 
          name="cnpj" 
          placeholder="00.000.000/0000-00" 
          value={userData.cnpj} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          type="text" 
          label="Nome do Escritório" 
          name="nomeEscritorio" 
          placeholder="Nome do seu escritório" 
          value={userData.nomeEscritorio} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
      </div>

      <div className='form-perfil pt-8'>
        <h3 className='text-center text-lg'>Seu espaço</h3>
        <InputField 
          type="text" 
          label="CEP" 
          name="cep" 
          placeholder="00000-000" 
          value={userData.cep} 
          onChange={handleCepChange} 
          disabled={!isEditing} 
        />
        <InputField 
          type="text" 
          label="Rua" 
          name="rua" 
          placeholder="Nome da rua" 
          value={userData.rua} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          type="text" 
          label="Número" 
          name="numero" 
          placeholder="Número da casa/apartamento" 
          value={userData.numero} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          type="text" 
          label="Cidade" 
          name="cidade" 
          placeholder="Nome da cidade" 
          value={userData.cidade} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          type="text" 
          label="Estado" 
          name="estado" 
          placeholder="UF" 
          value={userData.estado} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        <InputField 
          type="text" 
          label="País" 
          name="pais" 
          placeholder="País de residência" 
          value={userData.pais} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
      </div>
      
      {isEditing && (
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Salvar Alterações
        </button>
      )}
    </form>
  );
}