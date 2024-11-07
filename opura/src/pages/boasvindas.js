import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';



export default function WelcomePage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); 

  

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true); // Oculta o botão de play quando o vídeo começa
    }
  };

  return (
    <div className="flex flex-col md:justify-center justify-between items-center h-screen md:bg-[url('/midia/textura.svg')] p-2 pb-8 gap-2 text-[var(--color-primaria)]">
        <h1 className='w-full max-w-xl text-center md:text-[96px] text-[32px] rounded-3xl absolute md:relative z-10 py-8 md:p-0 bg-gradient-to-b from-black from-0% md:bg-transparent md:from-transparent'>Olá</h1>
      {/* Seção do Vídeo */}
      <div className="w-full max-w-xl p-0 md:p-8 relative h-[90%] md:h-auto">
        <div className="relative w-full bg-black h-full md:h-[700px] rounded-3xl overflow-hidden flex justify-center items-center">
          {/* Vídeo */}
          <video
            ref={videoRef} 
            className="video-bv"
            src="https://opuramarmores.com/videos/bg-topo.mp4"
            title="Vídeo de Boas-Vindas"
            // muted
            onEnded={() => setIsPlaying(false)} 
          />

          {/* Botão de Play, que desaparece ao clicar */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="vidro absolute w-[90px] h-[90px] rounded-full gap-2 flex justify-center items-center cursor-pointer focus:outline-none"
            >
            ►
            </button>
          )}
        </div>
      </div>

      {/* Botão de pular */}
      <div className="w-full max-w-xl md:px-8">
      <button 
        onClick={() => router.push('/login')} 
        className="w-full" 
      >
        Pular e Ir para o Login
      </button>
      </div>
    </div>
  );
}
