import api from "./api";

export const getUserPoints = async () => {
  try {
    const response = await api.get("/points");
    const userPoints = response.data.reduce((total, point) => total + point.points, 0);
    return userPoints;
  } catch (error) {
    console.error("Erro ao obter pontos do usuário:", error);
    throw error;
  }
};

export const getTotalPoints = async () => {
  try {
    const response = await api.get("/points");
    const totalPoints = response.data.reduce((acc, point) => acc + point.points, 0);
    return totalPoints;
  } catch (error) {
    console.error("Erro ao obter pontos totais:", error);
    throw error;
  }
};