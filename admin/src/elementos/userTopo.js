import { useEffect, useState } from "react";
import fetchUserPoints from "/services/points";
import { fetchUserById, updateUser } from "/services/users";
import Icon from "../elementos/Icons"

export default function UserTopo({ userId }) {
    const [user, setUser] = useState({});
    const [points, setPoints] = useState(0);
    const [newPoints, setNewPoints] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                setIsLoading(true);
                setError(null);
                try {
                    const userData = await fetchUserById(userId);
                    const userPoints = await fetchUserPoints(userId);

                    console.log("Dados do usuário:", userData);
                    console.log("Dados de pontos do usuário:", userPoints);

                    setUser(userData || {});
                    const totalPoints = userPoints.reduce((acc, item) => acc + item.points, 0);
                    setPoints(totalPoints);
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário:", error);
                    setError("Falha ao carregar dados do usuário");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [userId]);

    const handleAddPoints = async () => {
        if (!newPoints) return;
        try {
            const updatedPoints = points + parseInt(newPoints, 10);
            setPoints(updatedPoints);
            setNewPoints("");
        } catch (error) {
            console.error("Erro ao adicionar pontos:", error);
        }
    };

    const handleSavePoints = async () => {
        try {
            const response = await updateUser(userId, { points });
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
              onClick={handleAddPoints}><Icon name="plus" /></button>
            </div>
          </div>

        </div>
    );
}