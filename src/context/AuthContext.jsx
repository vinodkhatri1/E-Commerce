import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Modal State
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // User State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("activeUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Modal Handlers
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const login = (userData) => {
    // If no role exists, default to 'buyer'
    const userWithRole = { ...userData, role: userData.role || "buyer" };
    setUser(userWithRole);
    localStorage.setItem("activeUser", JSON.stringify(userWithRole));
    closeLogin(); // Automatically close modal on successful login
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
