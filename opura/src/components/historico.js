import React, { useEffect, useRef } from 'react';
import BeneficiosResgatados from '../components/beneficiosResg';
import ProgressContainer from '../components/saldoDePontos';

const Popup = ({ isOpen, onClose, userId, beneficios }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    // Função que escuta cliques fora do popup
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    // Event listener quando o popup é aberto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove o event listener quando o popup fecha
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Se o popup não estiver aberto, retorna null


  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
        <div className='w-2/2 flex flex-col md:flex-row md:min-h-96 overflow-y-clip'>
            <div ref={popupRef} className='w-full md:w-1/2 h-fit md:h-full p-8 bg-[var(--color-background)] rounded-[32px] space-y-10'>
                <BeneficiosResgatados beneficios={beneficios} />
            </div>
            <div ref={popupRef} className='w-full md:w-1/2 h-fit md:h-full p-8 bg-[var(--color-background)] rounded-[32px] space-y-10'>
              <ProgressContainer userId={userId} />
            </div>
        </div>
    </div>
  );
};

export default Popup;