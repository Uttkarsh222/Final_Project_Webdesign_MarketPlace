import React, { createContext, useState, useEffect } from 'react';

export const UserSessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Attempt to get user from local storage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };


  const contextValue = { user, login, logout };

  return (
    <UserSessionContext.Provider value={contextValue}>
      {children}
    </UserSessionContext.Provider>
  );
};
