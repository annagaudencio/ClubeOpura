// historico.js
import React, { useEffect, useRef } from 'react';
import BeneficiosResgatados from '../components/beneficiosResg';
import ProgressContainer from '../components/saldoDePontos';
import { useUser } from '/services/UserContext';

const Popup = ({ isOpen, onClose, beneficios }) => {
  const { userId } = useUser(); // Acessa o userId do contexto
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
      <div className='w-2/2 flex flex-col md:flex-row md:h-96 overflow-y-clip'>
        <div ref={popupRef} className='w-full md:w-1/2 h-fit md:h-full p-8 bg-[var(--color-background)] rounded-[32px] space-y-10 overflow-y-auto'>
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