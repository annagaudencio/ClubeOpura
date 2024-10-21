import { useEffect, useState } from "react";
import fetchUserPoints from "/services/points";
import { fetchUserById, fetchEnterpriseById } from "/services/users"; 
import Icon from "../elementos/Icons";
import axios from "axios";

export default function UserTopo({ userId }) {
    const [user, setUser] = useState({});
    const [points, setPoints] = useState(0);
    const [newPoints, setNewPoints] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enterprise, setEnterprise] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.error("ID de usuário não fornecido.");
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                // Busca os dados do usuário
                const userData = await fetchUserById(userId);
                if (!userData) {
                    console.error("Dados do usuário não encontrados.");
                    setError("Usuário não encontrado.");
                    return;
                }

                console.log("Dados do usuário:", userData);

                // Se o usuário tiver uma empresa associada, busca os dados da empresa
                if (userData.id_enterprise) {
                    const enterpriseData = await fetchEnterpriseById(userData.id_enterprise);
                    if (enterpriseData) {
                        console.log("Dados da empresa:", enterpriseData);
                        setEnterprise(enterpriseData);
                    } else {
                        console.warn("Dados da empresa não encontrados.");
                    }
                } else {
                    console.warn("Usuário não tem uma empresa associada.");
                }

                // Busca os pontos do usuário
                const userPoints = await fetchUserPoints(userId);
                // Obtendo o id_user_registered a partir dos dados do usuário
                const userRegisteredId = userData.id_user_registered;
                // Filtra os pontos para visualizar apenas os do usuário específico, excluindo os resgatados e expirados
                const filteredPoints = userPoints.filter(point => point.id_user_registered === userData.id_user_registered && !point.are_expired && !point.were_rescued);
                // Filtra os pontos para visualizar apenas os do usuário específico
                
                if (filteredPoints && Array.isArray(filteredPoints)) {
                    const totalPoints = filteredPoints.reduce((acc, item) => acc + item.points, 0);
                    setPoints(totalPoints);
                    console.log("Dados de pontos do usuário:", userPoints);
                } else {
                    console.warn("Nenhum ponto encontrado para o usuário.");
                }

                setUser(userData);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
                setError("Falha ao carregar dados do usuário");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const handleAddPoints = async (operation) => {
        if (!newPoints) return;
        try {
            const updatedPoints = operation === 'add' ? points + parseInt(newPoints, 10) : points - parseInt(newPoints, 10);
            setPoints(updatedPoints);
            setNewPoints("");

            // Chama o handleSavePoints para salvar os pontos no backend
            await handleSavePoints(updatedPoints);
        } catch (error) {
            console.error("Erro ao adicionar pontos:", error);
        }
    };

    const handleSavePoints = async (updatedPoints) => {
        try {
            // Atualiza os pontos no servidor
            const response = await axios.put(`/api/points/${userId}`, { points: updatedPoints }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            console.log("Resposta do backend ao salvar pontos:", response);
            alert("Pontos salvos com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar pontos:", error);
            alert("Erro ao salvar pontos.");
        }
    };

    return (
        <div className="h-full flex p-8 bg-[var(--color-bg-preto)] rounded-[32px] divide-x divide-[var()] gap-4 text-[var(--color-primaria)]">
          
          {/* Column 1 */}
          <div className="w-1/2 flex md:flex-row flex-col gap-2">
            <div className="w-2/3 flex items-center justify-start gap-2">
                <img src="../midia/avatar.webp" className="w-16" alt="avatar de parceiros" /> 
                <h5>{user ? user.name : 'Carregando...'}</h5>
            </div>

            <div className="md:w-1/3 md:flex-col justify-center items-center gap-3 inline-flex">
                <h5 className="text-[var(--color-secundaria)]">Código</h5>
                <p>{user ? user.id : 'Carregando...'}</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="w-1/2 px-4 flex-col justify-center items-center inline-flex">
            <h5>Pontos: {points}</h5>

            <div className='flex justify-center items-end gap-1 inline-flex'>
              <div className="w-full pt-4">
              <input 
                label="adicione pontos" 
                placeholder="adicionar" 
                type="number" 
                value={newPoints}
                onChange={(e) => setNewPoints(e.target.value)}
                className="w-full bg-[var(--color-primaria)] h-[52px] rounded-full transition-colors duration-300 px-4 text-black"
              />
              </div>
              <button 
              className='bt-icon h-[52px] w-[52px]'
              onClick={() => handleAddPoints('add')}><Icon name="plus" /></button>
              <button 
              className='bt-icon h-[52px] w-[52px]'
              onClick={() => handleAddPoints('subtract')}><Icon name="minus" /></button>
            </div>
          </div>

        </div>
    );
}
