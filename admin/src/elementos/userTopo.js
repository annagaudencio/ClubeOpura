import { useEffect, useState } from "react";
import { fetchUserPoints, updateUserPoints } from "/services/points"; 
import { fetchUserById, fetchEnterpriseById } from "/services/users";
import Icon from "../elementos/Icons";

export default function UserTopo({ userId }) {
    const [user, setUser] = useState({});
    const [points, setPoints] = useState(0);
    const [newPoints, setNewPoints] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enterprise, setEnterprise] = useState(null);
    const [pointId, setPointId] = useState(null);  

    
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
  
              // Busca os pontos do usuário
              const userPoints = await fetchUserPoints(userId);
              const userRegisteredId = userData.id_user_registered;
              const filteredPoints = userPoints.filter(point => point.id_user_registered === userRegisteredId && !point.are_expired && !point.were_rescued);
  
              if (filteredPoints && Array.isArray(filteredPoints)) {
                  const totalPoints = filteredPoints.reduce((acc, item) => acc + item.points, 0);
                  setPoints(totalPoints);
  
                  // Aqui atribuímos o pointId corretamente ao primeiro ponto da lista
                  setPointId(filteredPoints[0]?.id);  // Certifique-se de que o pointId seja definido
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

        // Calcula os pontos atualizados localmente
        const updatedPoints = operation === 'add' ? points + parseInt(newPoints, 10) : Math.max(0, points - parseInt(newPoints, 10));
        setPoints(updatedPoints);
        setNewPoints("");

        console.log("Pontos atualizados localmente:", updatedPoints);

        try {
            // Prepara o payload com os dados do usuário e pontos
            const updatedPointPayload = {
                points: updatedPoints,
                are_expired: false,
                were_rescued: false,
                rescued_date: null,
                id_user_registered: user.id_user_registered
            };
            

            console.log("Payload enviado para atualizar pontos:", updatedPointPayload);
            console.log("ID do ponto sendo atualizado:", pointId);

            // Chama a função de atualização de pontos
            const response = await updateUserPoints(pointId, updatedPointPayload);
            
            console.log("Resposta do servidor ao atualizar pontos:", response);

            // Verifica o status da resposta
            if (response?.status === 200) {
                alert("Pontos atualizados com sucesso!");
            } else {
                alert(`Erro ao atualizar pontos: ${response?.statusText || 'Erro desconhecido'}`);
            }
        } catch (error) {
            console.error("Erro ao atualizar pontos:", error);
            alert("Erro ao atualizar pontos. Verifique o console para mais detalhes.");
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
                onClick={() => handleAddPoints('subtract')}>-</button>
            </div>
          </div>
        </div>
    );
}

