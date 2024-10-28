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
                <p>Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:</p>
                <p>Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</p>
                <p>Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning.</p>
            </div>
        </div>

        {/* Perguntas Frequentes */}
        <div className='w-full h-fit md:h-full bg-[var(--color-background)] rounded-[32px] space-y-8'><Perguntas /></div>
        
    </div>
    </>
    );
}