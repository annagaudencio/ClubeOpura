import React, { useEffect, useState } from 'react';
import Icon from '../elementos/Icons';
import { getUserRedeemedBenefits } from '/services/benefits'; // importe a função

const UserResgates = ({ userId }) => {
    const [benefits, setBenefits] = useState([]);

    useEffect(() => {
        const fetchRedeemedBenefits = async () => {
            try {
                const redeemedBenefits = await getUserRedeemedBenefits(userId);
                setBenefits(redeemedBenefits);
            } catch (error) {
                console.error("Erro ao carregar benefícios resgatados:", error);
            }
        };

        fetchRedeemedBenefits();
    }, [userId]);

    if (!benefits || benefits.length === 0) {
        return (
            <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] p-8">
                <div className='text-[var(--color-primaria)]'>
                    <h5 className='text-center border-b pb-4'>Benefícios Resgatados</h5>
                    <div className="pt-8">
                        <p>O usuário ainda não resgatou nenhum benefício.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] p-8 overflow-y-auto">
            <div className='text-[var(--color-primaria)]'>
                <h5 className='text-center border-b pb-4'>Benefícios Resgatados</h5>
                <div className="py-8">
                    <ul className="space-y-4">
                        {benefits.map((benefit) => (
                            <li key={benefit.id} className="flex justify-between items-center">
                                <span className="text-[var(--color-primaria)]">{benefit.title}</span>
                                <Icon name="check" className="w-6 h-6 text-[var(--color-primaria)]" /> {/* Ícone de verificação */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserResgates;