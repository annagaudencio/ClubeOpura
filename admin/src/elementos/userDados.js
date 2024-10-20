import InputData from '../elementos/InputData';
import { resetPassword } from '/services/users';

const UserData = ({ userData, enterpriseData, onUserDataChange, onEnterpriseDataChange }) => {
    
    const handleResetPassword = async () => {
        try {
            await resetPassword(userData.email);
            alert('Um e-mail com instruções para redefinir sua senha foi enviado.');
        } catch (error) {
            console.error('Erro ao solicitar redefinição de senha:', error);
            alert('Ocorreu um erro ao solicitar a redefinição de senha. Por favor, tente novamente mais tarde.');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="h-full bg-[var(--color-bg-preto)] rounded-[32px] overflow-clip overflow-y-auto">
            <div className='pb-4 sticky top-0 p-8 bg-[var(--color-bg-preto)]'>
                <h5 className='text-[var(--color-primaria)]'>Dados</h5>
            </div>

            <div className="px-8">
                <form className="divide-y border-t">
                    <div className='py-8'>
                        <h5 className='col-span-2 text-[var(--color-primaria)]'>Pessoais:</h5>
                        <InputData
                            label="Seu nome"
                            name="name"
                            value={userData.name || ''}
                            onChange={onUserDataChange}
                        />
                        <InputData
                            label="WhatsApp"
                            name="phone"
                            value={userData.phone || ''}
                            onChange={onUserDataChange}
                        />
                        <InputData
                            label="Email"
                            name="email"
                            value={userData.email || ''}
                            onChange={onUserDataChange}
                        />
                        <InputData
                            label="Data de Nascimento"
                            name="birthday"
                            type="date"
                            value={formatDate(userData.birthday)}
                            onChange={onUserDataChange}
                        />
                        <div className="py-4"><a href="#" onClick={handleResetPassword}>Redefinir senha</a></div>
                    </div>

                    <div className='py-8'>
                        <h5 className='col-span-2 text-[var(--color-primaria)]'>Trabalho:</h5>
                        <InputData
                        label="CNPJ"
                        name="cnpj"
                        value={enterpriseData?.cnpj || ''}
                        onChange={onEnterpriseDataChange}
                        />
                        <InputData
                            label="Nome da Empresa"
                            name="name"
                            value={enterpriseData.name || ''}
                            onChange={onEnterpriseDataChange}
                        />
                        <InputData
                            label="Profissão"
                            name="profession"
                            value={userData.profession || ''}
                            onChange={onUserDataChange}
                        />
                    </div>

                    <div className='py-8'>
                        <h5 className='col-span-2 text-[var(--color-primaria)]'>Endereço:</h5>
                        <InputData 
                            label="CEP" 
                            name="cep"
                            value={enterpriseData.cep || ''} 
                            onChange={onEnterpriseDataChange} 
                        />
                        <InputData 
                            label="Logradouro" 
                            name="address"
                            value={enterpriseData.address || ''} 
                            onChange={onEnterpriseDataChange} 
                        />
                        <InputData 
                            label="Cidade" 
                            name="city"
                            value={enterpriseData.city || ''} 
                            onChange={onEnterpriseDataChange} 
                        />
                        <InputData 
                            label="Estado" 
                            name="state"
                            value={enterpriseData.state || ''} 
                            onChange={onEnterpriseDataChange} 
                        />
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserData;