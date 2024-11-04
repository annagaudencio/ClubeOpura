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
                    title="Como posso resgatar meus benefícios?"
                    content="Clicando no botão 'Resgatar' quando você atingir os pontos necessários, conferindo o resgate e seguindo as instruções para entrar em contato com a Ópura."
                    />
                    <AccordionItem
                    title="Quem pode participar do Programa Ópura Clube?"
                    content="Todos os parceiros da Ópura que trabalham no ramo de design de interiores, como arquitetos, designers de interior e decoradores, podem participar. É necessário se inscrever através do site opuramarmores.com.br e preencher o formulário de cadastro."
                    />
                    <AccordionItem
                    title="Como funciona o sistema de pontuação?"
                    content="A cada R$ 1.000,00 em compras, é gerado 1 ponto OP. A pontuação é válida de 01/11/2024 a 31/10/2025. Existem também campanhas especiais onde os pontos são dobrados, como a Campanha do Agasalho e a Campanha de Natal."
                    />
                    <AccordionItem
                    title="Qual é a premiação do Programa Ópura Clube?"
                    content="Os 3 parceiros com a pontuação mais alta serão presenteados com uma experiência exclusiva de imersão em design, que inclui um programa educacional, visitas a showrooms e feiras de design. A Ópura cobre os custos de passagens, hospedagem, alimentação e atividades programadas."
                    />
                    <AccordionItem
                    title="Posso transferir meus pontos para outra pessoa?"
                    content="Não, os pontos acumulados são pessoais e intransferíveis. Eles não possuem valor monetário e não podem ser convertidos em dinheiro ou qualquer outro meio de pagamento."
                    />
                    <AccordionItem
                    title="O que acontece se eu não puder participar da experiência de imersão?"
                    content="Em caso de impossibilidade de participação na experiência, não haverá compensação em dinheiro. O parceiro pode renunciar ao prêmio, favorecendo o próximo colocado na lista de pontuação."
                    />
                     <AccordionItem
                    title="Como posso acompanhar minha pontuação?"
                    content="O participante pode visualizar sua pontuação através do login no site da Ópura. É importante fazer o lançamento das compras no prazo de 30 dias para que a Ópura possa validar ou corrigir o valor informado."
                    />
                    <AccordionItem
                    title="A Ópura pode cancelar ou alterar o programa?"
                    content="Sim, a Ópura reserva-se o direito de alterar ou cancelar o Programa Ópura Clube a qualquer momento, sem aviso prévio e sem qualquer indenização aos participantes."
                    />
                    <AccordionItem
                    title="Como posso obter mais informações ou tirar dúvidas sobre o programa?"
                    content="Dúvidas, sugestões ou reclamações devem ser encaminhadas para a Ópura via e-mail ou contato telefônico, conforme informado no regulamento."
                    />
                    <div className='w-full p-8 flex flex-col gap-2 md:flex-row justify-between items-center text-center md:text-left'>
                        <p className='md:w-1/2'>Ainda ficou com dúvida?<br /> Fique à vontade para envia-la para nós.</p>
                        <a href='https://wa.me/5581992237827?text=Ol%C3%A1%20%E2%98%BA%EF%B8%8F%20Estou%20com%20uma%20d%C3%BAvida' target="_blank"><button>Enviar uma pergunta</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
