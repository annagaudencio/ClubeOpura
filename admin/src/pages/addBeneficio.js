import { useState } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import Navbar from "../components/navbar";
import InputField from '../elementos/InputField';
import BeneficioImg from '../components/BeneficioImg';
import { createBenefit } from '/services/benefits'; 
import TextAreaField from '../elementos/inputTextArea';

export default function AddBeneficio() {
  const [beneficio, setBeneficio] = useState({
    title: '',
    points: 0,
    description: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImagemChange = (novaImagemBase64) => {
    setBeneficio(prev => ({ ...prev, image: novaImagemBase64 }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBeneficio(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const newBenefit = await createBenefit(beneficio);
      alert('Benefício criado com sucesso!');
      router.push('/beneficios');
    } catch (error) {
      console.error('Erro ao criar benefício:', error);
      alert('Erro ao criar benefício: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Adicionar Benefício</title>
      </Head>
      <Navbar />
      <div className="main-content md:p-2 flex flex-col md:flex-row">
        <BeneficioImg 
          imagem={beneficio.image} 
          onImagemChange={handleImagemChange} 
          beneficioId={null} // Passamos null pois é um novo benefício
        />
        <div className="w-full h-full md:w-1/2 flex-col inline-flex">
          <div className="md:self-stretch md:grow bg-[var(--color-bg-preto)] rounded-[32px] p-2">
            <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] overflow-clip overflow-y-auto">
              <div className='flex justify-between items-center pb-4 sticky top-0 p-8 bg-[var(--color-bg-preto)]'>
                <h3 className='text-[var(--color-primaria)]'>{beneficio.title || 'Novo benefício'}</h3>
              </div>
              <div className="px-8">
                <form className="divide-y border-t">
                  <div className='py-8'>
                    <InputField
                      label="Nome do Benefício"
                      name="title"
                      placeholder="Digite o nome do benefício"
                      value={beneficio.title}
                      onChange={handleFormChange}
                    />
                    
                    <TextAreaField
                      label="Descrição"
                      name="description"
                      value={beneficio.description}
                      onChange={handleFormChange}
                      placeholder="Digite a descrição"
                    />

                    <div className="text-[var(--color-primaria)] mt-6">
                      <p className="text-sm px-4">Quantidade de pontos:</p>
                      <InputField
                        label="Pontos"
                        name="points"
                        type="number"
                        value={beneficio.points}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--color-bg-preto)] rounded-[32px] p-8 flex flex-col gap-2 justify-between items-center">
            <button className="bt-linha-clara w-full" onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar Benefício'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}