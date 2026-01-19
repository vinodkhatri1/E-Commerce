import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Initialize user from LocalStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("activeUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("activeUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("activeUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoginOpen,
        openLogin,
        closeLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
