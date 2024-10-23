import { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import Navbar from "../../elementos/navbar.js";
import UserTopo from "../../elementos/userTopo.js";
import UserData from "../../elementos/userDados.js";
import UserResgates from "../../elementos/userResgates.js";
import UserApagar from "../../elementos/userApagar.js";
import { fetchUserById, updateUser, createOrUpdateEnterprise, fetchEnterpriseById } from '/services/users';

export default function Arquiteto() {
    const router = useRouter();
    const { id } = router.query;

    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',  // Para alterar a senha
        birthday: '',
        profession: '',
        id_enterprise: null,
    });
    const [enterpriseData, setEnterpriseData] = useState({
        cnpj: '',
        name: '',
        address: '',
        cep: '',
        city: '',
        state: '',
        country: 'Brasil',
    });
    
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [userDataOriginal, setUserDataOriginal] = useState({});
    const [enterpriseDataOriginal, setEnterpriseDataOriginal] = useState({});

    useEffect(() => {
        const loadUserData = async () => {
            if (id) {
                try {
                    // Busca os dados do usuário com base no ID
                    const data = await fetchUserById(id);
                    
                    // Atualiza os dados do usuário e mantém os dados originais
                    setUserData({
                        ...data,
                        password: '', // Por segurança, não carregamos a senha
                    });
                    setUserDataOriginal({
                        ...data,
                        password: '', 
                    });

                    // Se o usuário tiver uma empresa associada, busca os dados da empresa
                    if (data.id_enterprise) {
                        const enterpriseData = await fetchEnterpriseById(data.id_enterprise);
                        if (enterpriseData) {
                            // Atualiza os dados da empresa e mantém os dados originais
                            setEnterpriseData({
                                ...enterpriseData,
                            });
                            setEnterpriseDataOriginal({
                                ...enterpriseData,
                            });
                        }
                    }
                } catch (error) {
                    console.error("Erro ao carregar dados do usuário:", error);
                }
            }
        };

        loadUserData();
    }, [id]);

    useEffect(() => {
        setIsDataChanged(true);
    }, [userData, enterpriseData]);

    // Função para preparar os dados para salvamento, garantindo que campos vazios sejam preenchidos com valores originais
    const prepareData = (newData, oldData) => {
        let preparedData = {};
        
        for (let key in newData) {
            // Se o campo não está vazio, usamos o novo valor. Caso contrário, mantemos o valor antigo.
            if (newData[key] !== '') {
                // Para o CNPJ, sanitizamos o valor antes de atribuí-lo
                preparedData[key] = key === 'cnpj' ? sanitizeCNPJ(newData[key]) : newData[key];
            } else {
                preparedData[key] = oldData[key]; // Mantém o valor antigo
            }
        }

        // Remover a senha do objeto caso não tenha sido modificada
        if (!newData.password) {
            delete preparedData.password;
        }

        return preparedData;
    };

    // Função para sanitizar o CNPJ, removendo caracteres especiais
    const sanitizeCNPJ = (cnpj) => {
        return cnpj.replace(/[.\-\/\s]/g, ''); // Remove . - / e espaços
    };

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleEnterpriseDataChange = (e) => {
        const { name, value } = e.target;
        setEnterpriseData(prev => ({ ...prev, [name]: value }));
    };

    
    const handleSaveChanges = async () => {
        // Inicialize pointsModified se ela ainda não estiver definida
        const isPointsModified = typeof pointsModified !== 'undefined' ? pointsModified : false;
    
        if (!isDataChanged && !isPointsModified) {
            console.log("Nenhuma alteração detectada.");
            return;
        }
    
        try {
            // Se houver mudanças nos dados da empresa/usuário
            if (isDataChanged) {
                // Prepara os dados da empresa removendo caracteres inválidos e mantendo os campos preenchidos
                const updatedEnterpriseData = prepareData(enterpriseData, enterpriseDataOriginal);
    
                // Prepara os dados do usuário removendo campos vazios e mantendo os originais
                const updatedUserData = prepareData(userData, userDataOriginal);
    
                // Atualiza ou cria a empresa conforme o ID da empresa
                let updatedEnterprise;
                if (userData.id_enterprise) {
                    // Se o ID da empresa já existir, atualizamos a empresa existente
                    updatedEnterprise = await createOrUpdateEnterprise(userData.id_enterprise, updatedEnterpriseData);
                } else {
                    // Caso contrário, criamos uma nova empresa e associamos ao usuário
                    updatedEnterprise = await createOrUpdateEnterprise(null, updatedEnterpriseData);
                }
    
                // Agora associamos a empresa ao usuário e salvamos os dados do usuário
                const finalUserData = {
                    ...updatedUserData,
                    id_enterprise: updatedEnterprise.id, // Certifica-se de que a empresa foi associada ao usuário
                };
    
                // Atualiza os dados do usuário com base no ID do usuário
                await updateUser(userData.id, finalUserData); // Garantimos que o usuário correto seja atualizado
    
                console.log('Dados do usuário e empresa atualizados com sucesso!');
            }
    
            // Se houver mudanças nos pontos
            if (isPointsModified) {
                const pointToUpdate = pointsData[0];
    
                const updatedPointPayload = {
                    points: points,
                    are_expired: pointToUpdate.are_expired || false,
                    were_rescued: pointToUpdate.were_rescued || false,
                    rescued_date: pointToUpdate.rescued_date || null,
                    createdAt: pointToUpdate.createdAt,
                    id_user_registered: pointToUpdate.id_user_registered
                };
    
                console.log("Payload enviado para atualizar pontos:", updatedPointPayload);
    
                const response = await updateUserPoints(pointToUpdate.id, updatedPointPayload);
                console.log("Resposta do servidor ao atualizar pontos:", response);
    
                if (response.status === 200) {
                    console.log('Pontos atualizados com sucesso!');
                } else {
                    alert(`Erro ao atualizar pontos: ${response.statusText}`);
                }
            }
    
            alert('Alterações salvas com sucesso!');
            setIsDataChanged(false);
            router.reload(); // Recarrega a página para refletir os dados atualizados
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
            alert('Erro ao salvar alterações. Por favor, tente novamente.');
        }
    };
    

    const getWhatsappLink = (phone) => {
        const formattedPhone = phone.replace(/\D/g, '');
        return `https://wa.me/55${formattedPhone}`;
    };

    return (
        <>
            <Head>
                <title>Detalhes do Arquiteto</title>
            </Head>
            <Navbar />

            <div className="main-content md:overflow-hidden md:p-2">
                <div className="h-1/6">
                    {id && <UserTopo userId={id} />}
                </div>

                <div className="w-full md:h-5/6 text-white flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <UserData 
                            userData={userData} 
                            enterpriseData={enterpriseData} 
                            onUserDataChange={handleUserDataChange} 
                            onEnterpriseDataChange={handleEnterpriseDataChange} 
                        />
                    </div>

                    <div className="md:w-1/2">
                        <div className="h-2/3"><UserResgates userId={id} /></div>

                        <div className="h-1/3 flex flex-col justify-between">
                            <div className="h-2/5 p-4 bg-[var(--color-bg-preto)] rounded-[32px] flex items-center">
                                <button 
                                    className={`h-1/5 w-full ${isDataChanged ? 'bt-marrom' : 'bt-linha-clara opacity-50 cursor-not-allowed'}`}
                                    onClick={handleSaveChanges}
                                    disabled={!isDataChanged}
                                >
                                    Salvar Alterações
                                </button>
                            </div>

                            <div className="h-2/5 p-4 bg-[var(--color-bg-preto)] rounded-[32px] flex items-center">
                                <button onClick={() => window.open(getWhatsappLink(userData.phone), '_blank')} className="h-1/5 w-full bt-linha-clara">Entrar em contato</button>
                            </div>
                            
                            <div className="p-4 bg-[var(--color-bg-preto)] rounded-[32px] justify-between flex flex-col h-2/5 md:pb-4 pb-24"><UserApagar userId={id} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
