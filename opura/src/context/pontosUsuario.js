import { createContext, useContext, useState } from 'react';

const PontosUsuarioContext = createContext();

export const PontosProvider = ({ children }) => {
  const [pontosUsuario, setPontosUsuario] = useState(15); // Valor inicial

  return (
    <PontosUsuarioContext.Provider value={{ pontosUsuario, setPontosUsuario }}>
      {children}
    </PontosUsuarioContext.Provider>
  );
};

export const usePontos = () => useContext(PontosUsuarioContext);