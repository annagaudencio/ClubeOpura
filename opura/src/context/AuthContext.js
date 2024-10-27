// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Lógica para pegar a ID do usuário logado
    // Por exemplo, buscar da API ou localStorage
    const loggedInUserId = localStorage.getItem('userId'); 
    setUserId(loggedInUserId);
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
