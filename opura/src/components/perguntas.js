import React, { useState } from 'react';
import AccordionItem from '../elementos/accordion'

export default function Perguntas() {

    return (
        <div>
            {/* Perguntas Frequentes */}
            <div className='w-full h-full bg-[var(--color-background)] rounded-[32px] p-8 space-y-8 pb-20 md:pb-8'>
                <h3 className='pb-4 text-center'>Perguntas Frequentes</h3>
                <div>
                    <AccordionItem
                    title="Pergunta frequente"
                    content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
                    />
                    <AccordionItem
                    title="Pergunta frequente"
                    content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
                    />
                    <AccordionItem
                    title="Pergunta frequente"
                    content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
                    />
                    <AccordionItem
                    title="Pergunta frequente"
                    content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
                    />
                    <AccordionItem
                    title="Pergunta frequente"
                    content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
                    />
                    <AccordionItem
                    title="Pergunta frequente"
                    content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
                    />
                    <div className='w-full p-8 flex flex-col gap-2 md:flex-row justify-between items-center text-center md:text-left'>
                        <p className='md:w-1/2'>Ainda ficou com dúvida?<br /> Fique à vontade para envia-la para nós.</p>
                        <a href='https://wa.me/5581992237827?text=Ol%C3%A1%20%E2%98%BA%EF%B8%8F%20Estou%20com%20uma%20d%C3%BAvida'><button>Enviar uma pergunta</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
