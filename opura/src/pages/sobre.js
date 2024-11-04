import Head from 'next/head';
import Navbar from '../components/navbar'; 
import Perguntas from '../components/perguntas';

export default function Sobre() {
    return (
    <>
    <Head><title>Sobre</title></Head>
    <Navbar />

    <div className='main-content h-svh p-0 md:p-2 pt-8 flex flex-col md:flex-row'>

        {/* Sobre */}
        <div className='w-full h-fit md:h-full bg-[var(--color-background)] rounded-[32px] p-8 space-y-8'>
            <h3 className='pb-4 text-center'>Clube Ópura</h3>
            <div className='space-y-2'>
                <div className='space-y-4 pb-8'>
                    <h3>Qual história você quer contar?</h3>
                    <p>
                        O Clube Ópura é muito mais que um programa de pontos, é seu espaço de desenvolvimento, conexões e, claro, muitos benefícios. Ser parceiro Ópura é fazer parte de um movimento que transcende a definição de marmoraria no mercado. Nós nos destacamos por ir além e estamos muito felizes por ter você junto nessa jornada. Aqui você tem a oportunidade de conquistar pontos que se tornam programas de capacitação, catálogos e viagens. Ou seja, entregar projetos que celebram a autenticidade como a essência e ainda desfrutar de prêmios exclusivos.
                    </p>
                </div>
                <a href='https://opuramarmores.com/regulamento/'target="_blank"><button className='w-full'>Leia o regulamento completo</button></a>
            </div>
        </div>

        {/* Perguntas Frequentes */}
        <div className='w-full h-fit md:h-full bg-[var(--color-background)] rounded-[32px] space-y-8 md:overflow-y-auto'><Perguntas /></div>
        
    </div>
    </>
    );
}