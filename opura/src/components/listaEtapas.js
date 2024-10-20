import React from 'react';


// Componente StepItem
const StepItem = ({ numero, titulo, descricao, onClick, url }) => {
  const handleClick = () => {
    window.location.href = url; 
  };

  return (
    <div className="flex items-start mb-6 pt-8 cursor-pointer" onClick={handleClick}>
        <div className='w-90%'>
            <div className='mr-4 flex justify-start items-center gap-2 inline-flex pb-1'>
                <div className="text-2xl font-bold">#{numero}</div>
                <h3 className="text-lg font-bold">{titulo}</h3>
            </div>
            <p className="text-gray-500">{descricao}</p>
        </div>
      
      <div className="ml-auto bg-[var(--color-links)] w-8 h-8 rounded-full justify-center items-center inline-flex">
        {/* verificar porque esse icone n fica com a cor determinada aqui */}
        <img className='bg-transparent rotate-45 w-[24px]' src='/icons/setas/Arrow up.svg' alt='clique para ir para esse passo' />
      </div> 
    </div>
  );
};

export default StepItem;