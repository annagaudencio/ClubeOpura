import React from 'react';
import Icon from '../elementos/Icons'


const UserResgates = ({ benefits }) => {
    if (!benefits || benefits.length === 0) {
        return <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] p-8">
        <div className='text-[var(--color-primaria)]'>
            <h5 className='text-center border-b pb-4'>Beneficios Resgatados</h5>
            <div className="pt-8">
            <p>O usuário ainda não resgatou nenhum benefício.</p>
            </div>
          </div>
    </div>;
    }

    return (
        <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] p-8">
            <div className='text-[var(--color-primaria)]'>
                <h5 className='text-center border-b pb-4'>Beneficios Resgatados</h5>
                <div>
                <ul className="space-y-4">
                    {benefits.map((benefit) => (
                        <li key={benefit.id} className="flex justify-between items-center">
                            <span className="text-[var(--color-texto)]">{benefit.title}</span>
                            <CheckIcon className="w-6 h-6 text-[var(--color-primaria)]" /> {/* Ícone de verificação */}
                        </li>
                    ))}
                </ul>
                </div>
              </div>
        </div>
    )
}

export default UserResgates;
