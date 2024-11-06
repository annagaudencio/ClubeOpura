import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserInfoFromToken } from '/services/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userInfo = getUserInfoFromToken(token);
      if (userInfo && userInfo.id) {
        setUserId(userInfo.id);
      }
    };

    fetchUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook para acessar o contexto do usuário
export const useUser = () => {
  return useContext(UserContext);
};