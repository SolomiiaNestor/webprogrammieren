import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || 'Account-Manager');

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  const setRoleHandler = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, setRoleHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
