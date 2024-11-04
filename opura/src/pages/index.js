import Icon from '@/elementos/Icons';
import { useRouter } from 'next/router';


export default function Home() {
    const router = useRouter();

    const irPara = (pagina) => {
        router.push(pagina);
      };

  return (
    <div className="md:flex grid text-[var(--color-primaria)]">

      {/* Coluna 1 */}
      <div className="md:h-screen md:w-1/3 h-[30vh] md:order-1 order-2 p-6 md:py-14 md:pr-6 md:pl-14 flex-col justify-between items-start inline-flex">
        <div className="w-full flex-col gap-6 inline-flex">
          <h2 className="text-2xl font-medium uppercase tracking-widest">Seja parceiro Ópura & ganhe benefícios únicos</h2>
          <p>O Clube Ópura é muito mais que um programa de pontos: Cadastre-se agora!</p>
        </div>

        {/* Chamadas de ação */}
        <div className="w-full gap-2 inline-flex">
          <button className="w-1/2 bt-linha-clara" 
          onClick={() => irPara('/login')}>Entrar</button>
          
          <button className="w-1/2 p-0" 
          onClick={() => irPara('/cadastro')}>Cadastrar</button>
        </div>
      </div>

      {/* Coluna 2 - imagem */}
      <div className="relative md:h-screen md:w-2/3 h-[70vh] md:order-2 order-1 p-3">
        <div className="absolute bottom-0 left-0 p-8">
          <Icon name="logoVertical" className="h-64 text-[var(--color-principal)]" />
        </div>
          
        <img className="w-full h-[100%] object-cover" src="/midia/img-ola.webp" alt="imagem de olá" />
      </div>
    </div>
  );
}