// import React, { useState, useEffect } from 'react';
// import ResgateModal from './ResgateModal';
// import api from '/services/api'; 

// export default function CardBeneficios({ titulo, descricao, pontos, bgImage, pontosUsuario, userId }) {
//   const [showModal, setShowModal] = useState(false);
//   const [beneficioId, setBeneficioId] = useState(null);

//   useEffect(() => {
//     const fetchBenefitId = async () => {
//       try {
//         const response = await api.get('/benefits');
//         const benefit = response.data.find(b => b.title === titulo);  
//         if (benefit) {
//           setBeneficioId(benefit.id);
//           console.log('ID do benefício encontrado:', benefit.id);
//         } else {
//           console.warn('Benefício com título não encontrado:', titulo);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar o ID do benefício:", error);
//       }
//     };
//     fetchBenefitId();
//   }, [titulo]);

//   const handleResgatar = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const pontosRestantes = Math.max(pontos - pontosUsuario, 0);
//   const disponivelParaResgate = pontosUsuario >= pontos;

//   //redução de numeros com mais de 6 digitos
//   function formatNumber(num) {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
//     } else if (num >= 1000) {
//       return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
//     } else {
//       return num.toString();
//     }
//   }

//   console.log("Valor de userId no componente pai:", userId);
  

//   return (
//     <div className="w-full min-w-72 min-h-[500px] max-w-xs bg-transparent rounded-[32px] overflow-hidden">
//       <div
//         className="min-h-80 bg-gray-200 rounded-[32px] p-4 relative"
//         style={{
//           backgroundImage: `linear-gradient(180deg, rgba(241, 240, 234, 0.00) 40%, #F1F0EA 100%), url(${bgImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         {disponivelParaResgate && (
//           <button className="absolute top-4 left-4" onClick={handleResgatar}>Resgatar</button>
//         )}
//         {!disponivelParaResgate && (
//           <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-[var(--color-links)] px-2">
//             <span>Faltam</span>
//             {/* <span className="font-bold">{pontosRestantes}</span> */}
//             <span className="font-bold">{formatNumber(pontosRestantes)}</span>
//             <span>Pontos</span>
//           </div>
//         )}
//       </div>
//       <div className="p-4">
//         <div className='w-full justify-start items-center gap-2 inline-flex'>
//           <h6 className="w-2/3 text-[18px]">{titulo}</h6>
//           <div className='w-1/3 justify-end items-center gap-1 inline-flex'>
//             {/* <span className="font-bold text-lg">{pontos}</span>  */}
//             <span className="font-bold text-lg">{formatNumber(pontos)}</span>
//             <span className="ml-1">★</span>
//           </div>
//         </div>
//         <p className="text-[var(--color-cinza)] text-sm mt-1">{descricao}</p>
//       </div>
//       {showModal && (
//         <ResgateModal 
//           beneficio={{ titulo, descricao, pontos, id: beneficioId }} 
//           userId={userId}
//           onClose={handleCloseModal} 
//         />      
//       )}
//     </div>
//   );
// }

//Com a alternativa de card ocultado quando houver resgate.ß
import React, { useState, useEffect } from 'react';
import ResgateModal from './ResgateModal';
import api from '/services/api'; 

export default function CardBeneficios({ titulo, descricao, pontos, bgImage, pontosUsuario, userId, isResgatado }) {
  const [showModal, setShowModal] = useState(false);
  const [beneficioId, setBeneficioId] = useState(null);

  useEffect(() => {
    const fetchBenefitId = async () => {
      try {
        const response = await api.get('/benefits');
        const benefit = response.data.find(b => b.title === titulo);  
        if (benefit) {
          setBeneficioId(benefit.id);
          console.log('ID do benefício encontrado:', benefit.id);
        } else {
          console.warn('Benefício com título não encontrado:', titulo);
        }
      } catch (error) {
        console.error("Erro ao buscar o ID do benefício:", error);
      }
    };
    fetchBenefitId();
  }, [titulo]);

  const handleResgatar = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const pontosRestantes = Math.max(pontos - pontosUsuario, 0);
  const disponivelParaResgate = pontosUsuario >= pontos;

  // Formatação de números grandes (ex: 1000 -> 1K)
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    } else {
      return num.toString();
    }
  }

  return (
    <div className="w-full min-w-72 max-w-xs bg-transparent rounded-[32px] overflow-hidden relative">
      <div
        className={`min-h-80 bg-gray-200 rounded-[32px] p-4 relative ${isResgatado ? 'opacity-25' : ''}`}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(241, 240, 234, 0.00) 40%, #F1F0EA 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {!isResgatado && disponivelParaResgate && (
          <button className="absolute top-4 left-4" onClick={handleResgatar}>Resgatar</button>
        )}
        {!isResgatado && !disponivelParaResgate && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-[var(--color-links)] px-2">
            <span>Faltam</span>
            <span className="font-bold">{formatNumber(pontosRestantes)}</span>
            <span>Pontos</span>
          </div>
        )}
      </div>
      <div className={`p-4 ${isResgatado ? 'opacity-25' : ''}`}>
        <div className="w-full justify-start items-center gap-2 inline-flex">
          <h6 className="w-2/3 text-[18px]">{titulo}</h6>
          <div className='w-1/3 justify-end items-center gap-1 inline-flex'>
            <span className="font-bold text-lg">{formatNumber(pontos)}</span>
            <span className="ml-1">★</span>
          </div>
        </div>
        <p className="text-[var(--color-cinza)] text-sm mt-1">{descricao}</p>
      </div>

      {isResgatado && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)]/50 rounded-[32px]">
          <h3 className="text-lg text-[var(--color-links)] text-center">Benefício<br/>Resgatado<br/>🥳</h3>
        </div>
      )}

      {showModal && (
        <ResgateModal 
          beneficio={{ titulo, descricao, pontos, id: beneficioId }} 
          userId={userId}
          onClose={handleCloseModal} 
        />      
      )}
    </div>
  );
}