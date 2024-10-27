// import { useState } from 'react';

// export default function InputData({ label, name, value, onChange, type = "text", ...props }) {
//   const [isFocused, setIsFocused] = useState(false);

//   const inputClass = isFocused
//     ? 'input rounded-full transition-colors duration-300'
//     : 'rounded-full transition-colors duration-300 bg-transparent py-2';

//   // Função para formatar a data de ISO para dd/mm/yyyy
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return ''; // Verifica se a data é válida
      
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
      
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error('Erro ao formatar data:', error);
//       return '';
//     }
//   };
  
//   // Handler específico para mudanças em campos de data
//   const handleDateChange = (e) => {
//     let inputValue = e.target.value;

//     if (!inputValue) {
//       onChange({
//         target: {
//           name,
//           value: ''
//         }
//       });
//       return;
//     }

//     // Se estiver digitando a data manualmente
//     if (type === 'text' && props.placeholder === 'dd/mm/aaaa') {
//       // Remove caracteres não numéricos
//       inputValue = inputValue.replace(/\D/g, '');
      
//       // Aplica máscara enquanto digita
//       if (inputValue.length > 0) {
//         const day = inputValue.substring(0, 2);
//         const month = inputValue.substring(2, 4);
//         const year = inputValue.substring(4, 8);
        
//         if (inputValue.length >= 4) {
//           inputValue = `${day}/${month}${year.length > 0 ? '/' + year : ''}`;
//         } else if (inputValue.length >= 2) {
//           inputValue = `${day}${month.length > 0 ? '/' + month : ''}`;
//         }
//       }

//       onChange({
//         target: {
//           name,
//           value: inputValue
//         }
//       });
//       return;
//     }

//     // Se usar o seletor de data nativo
//     if (type === 'date') {
//       const selectedDate = new Date(inputValue);
//       if (!isNaN(selectedDate.getTime())) {
//         selectedDate.setMinutes(selectedDate.getMinutes() + selectedDate.getTimezoneOffset());
//         onChange({
//           target: {
//             name,
//             value: selectedDate.toISOString()
//           }
//         });
//       }
//     }
//   };

//   // Determina o valor a ser exibido
//   const displayValue = type === 'date' ? formatDate(value) : value;

  

//   return (
//     <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)]">
//       <div className="flex items-center">
//         <input
//           type={type}
//           placeholder={isFocused ? '' : label}
//           name={name}
//           value={displayValue}
//           onChange={handleDateChange}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           className={`${inputClass} flex-grow outline-none placeholder:text-[var(--color-cinza)] text-[var(--color-texto)]`}
//           {...props}
//         />
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import Icon from './Icons'; // Ajuste o caminho conforme necessário

export default function InputData({ label, name, value, onChange, type = "text", ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  const inputClass = isFocused
    ? 'input rounded-full transition-colors duration-300'
    : 'rounded-full transition-colors duration-300 bg-transparent py-2';

  // Função para formatar a data de ISO para dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    } catch (error) {
      return '';
    }
  };

  // Função para converter data de dd/mm/yyyy para yyyy-mm-dd
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };

  const handleDateChange = (e) => {
    const inputValue = e.target.value;
    onChange({
      target: {
        name,
        value: inputValue
      }
    });
  };

  // Renderização condicional baseada no tipo do input
  if (type === 'date') {
    return (
      <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)]">
      <div className="flex items-center">
          <input
            type="date"
            name={name}
            value={formatDateForInput(value)}
            onChange={handleDateChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${inputClass} flex-grow outline-none placeholder:text-[var(--color-cinza)] text-[var(--color-texto)]`}
          {...props}
          />
          
        </div>
      </div>
    );
  }

  // Renderização padrão para outros tipos de input
  return (
    <div className="flex flex-col text-sm font-normal leading-[14px] self-stretch text-[var(--color-texto)]">
      <div className="flex items-center">
        <input
          type={type}
          placeholder={isFocused ? '' : label}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${inputClass} flex-grow outline-none placeholder:text-[var(--color-cinza)] text-[var(--color-texto)]`}
          {...props}
        />
      </div>
    </div>
  );
}