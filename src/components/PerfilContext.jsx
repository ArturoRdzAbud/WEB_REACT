import React, { createContext, useState } from 'react';

// Crear el contexto
export const PerfilContext = createContext();

// Proveedor del contexto
export const PerfilProvider = ({ children }) => {
  const [perfil, setPerfil] = useState(1);
  const [esConLicencia, setEsConLicencia] = useState(0);
  const [nombreUsuario, setNombreUsuario] = useState('');

  return (
    <PerfilContext.Provider value={{ 
             perfil, setPerfil
            ,esConLicencia, setEsConLicencia
            ,nombreUsuario,setNombreUsuario
            }}>
      {children}
    </PerfilContext.Provider>
  );
};
