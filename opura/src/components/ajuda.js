import React, { useEffect, useRef } from 'react';
import Perguntas from '../components/perguntas';

const PopupAjuda = ({ isOpen, onClose }) => {
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
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 h-screen' >
        <div className='w-full h-full flex flex-col p-2 justify-center items-center' ref={popupRef}>
            <div className='w-full md:w-[600px] flex justify-end items-end px-2'><button onClick={onClose}>X</button></div>
            <div className='w-full md:w-[600px] h-full md:h-[500px] p-8 bg-[var(--color-background)] rounded-[32px] space-y-10 overflow-clip overflow-y-auto'>
            <Perguntas />
            </div>
        </div>
    </div>
  );
};

export default PopupAjuda;