import React, { useState, useEffect } from 'react';
import { fetchBenefitById, updateBenefit } from '/services/benefits';

const EditSpecificBenefit = () => {
  const benefitId = 3; // ID fixo do benefício
  const [benefit, setBenefit] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    points: 0,
    description: '',
    image: null
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBenefit = async () => {
      try {
        const data = await fetchBenefitById(benefitId);
        setBenefit(data);
        setFormData({
          title: data.title,
          points: data.points,
          description: data.description,
          image: null
        });
      } catch (err) {
        setError(err.message);
      }
    };

    loadBenefit();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBenefit(benefitId, formData);
      alert('Benefício atualizado com sucesso!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div>Erro: {error}</div>;
  if (!benefit) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
      />
      <input
        type="number"
        name="points"
        value={formData.points}
        onChange={handleChange}
        placeholder="Pontos"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição"
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
      />
      <button type="submit">Atualizar Benefício</button>
    </form>
  );
};

export default EditSpecificBenefit;