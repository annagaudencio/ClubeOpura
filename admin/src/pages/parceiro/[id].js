import { useState, useEffect } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import Navbar from "../../elementos/navbar.js";
import UserTopo from "../../elementos/userTopo.js";
import UserData from "../../elementos/userDados.js";
import UserResgates from "../../elementos/userResgates.js";
import UserApagar from "../../elementos/userApagar.js";
import { fetchUserById, updateUser, createOrUpdateEnterprise } from '/services/users';

export default function Arquiteto() {
    const router = useRouter();
    const { id } = router.query;

    const [userData, setUserData] = useState({
        id: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        birthday: '',
        profession: '',
        id_enterprise: null,
    });
    const [enterpriseData, setEnterpriseData] = useState({
        id: '',
        cnpj: '',
        name: '',
        address: '',
        cep: '',
        city: '',
        state: '',
        country: 'Brasil',
    });
    
    const [isDataChanged, setIsDataChanged] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            if (id) {
                try {
                    const data = await fetchUserById(id);
                    setUserData({
                        ...data,
                        password: '', // Por segurança, não carregamos a senha
                    });
                    if (data.enterprise) {
                        setEnterpriseData({
                            ...data.enterprise,
                            id: data.id_enterprise,
                        });
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

    const handleUserDataChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleEnterpriseDataChange = (e) => {
        const { name, value } = e.target;
        setEnterpriseData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        if (!isDataChanged) return;

        try {
            // Primeiro, cria ou atualiza a enterprise
            const updatedEnterprise = await createOrUpdateEnterprise(userData.id_enterprise, enterpriseData);
            
            // Atualiza o userData com o novo id_enterprise se necessário
            const updatedUserData = {
                ...userData,
                id_enterprise: updatedEnterprise.id,
            };

            // Atualiza o usuário com os novos dados
            await updateUser(id, updatedUserData);

            alert('Alterações salvas com sucesso!');
            setIsDataChanged(false);
            router.reload();
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