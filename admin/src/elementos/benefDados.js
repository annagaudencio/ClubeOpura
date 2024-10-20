import React from 'react';
import InputData from '../elementos/InputData';
import TextAreaData from './inputTextAreaData';

const BenefDados = ({ beneficio, setBeneficio }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBeneficio({ ...beneficio, [name]: value });
    };

    return (
        <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] overflow-clip overflow-y-auto p-2 divide-y">
            <div className='w-full flex justify-between items-center pb-4 gap-2'>
                <h3 className='text-[16px] w-4/5 text-[var(--color-primaria)]'>{beneficio.title || ''}</h3>
            </div>

            <form className="w-full">
                <div className='py-8'>
                    <div className="w-full text-[var(--color-primaria)] justify-start items-center inline-flex py-2">
                        <p className="w-32 text-[14px] font-bold">Nome do beneficio:</p>
                        <InputData
                        name="title"
                        value={beneficio.title || ''}
                        onChange={handleChange}
                        />
                    </div>
                            
                    <div className="w-full text-[var(--color-primaria)] justify-start items-center inline-flex py-2">
                        <p className="w-32 text-[14px] font-bold">Quantidade de pontos:</p>
                        <InputData
                        name="points"
                        type="number"
                        value={beneficio.points || 0}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="w-full text-[var(--color-primaria)] flex flex-col justify-start items-start gap-2 pt-8 gap-2">
                        <p className="w-32 text-[14px] font-bold">Descrição:</p>
                        <TextAreaData
                        label="Descrição"
                        name="description"
                        value={beneficio.description || ''}
                        onChange={handleChange}
                        rows={4}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BenefDados;