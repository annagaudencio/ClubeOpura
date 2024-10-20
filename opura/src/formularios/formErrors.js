import { useState } from 'react';
import InputField from './InputField'; // Ajuste o caminho se necessário

const FormComponent = () => {
  const [formErrors, setFormErrors] = useState({});
  const [birthday, setBirthday] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!birthday) {
      errors.date = 'A data de aniversário é obrigatória';
    }
    setFormErrors(errors);
  };

  return (
    <div className="form-container">
      <InputField
        type="date"
        label="Data de Aniversário"
        icon="Calendario"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        error={formErrors.date}
      />
      <button onClick={validateForm} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Validar
      </button>
    </div>
  );
};

export default FormComponent;