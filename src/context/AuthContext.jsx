import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("activeUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const login = (userData) => {
    const ADMIN_EMAIL = "admin@shop.com";
    const ADMIN_PASSWORD = "admin123";

    let userWithRole;

    if (
      userData.email === ADMIN_EMAIL &&
      userData.password === ADMIN_PASSWORD
    ) {
      userWithRole = {
        name: "Global Admin",
        email: userData.email,
        role: "admin",
      };
    } else {
      userWithRole = {
        ...userData,
        name:
          userData.name || `${userData.firstName} ${userData.lastName}`.trim(),
        role: userData.role || "buyer",
      };
    }

    setUser(userWithRole);
    localStorage.setItem("activeUser", JSON.stringify(userWithRole));
    closeLogin();

    window.location.reload();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("activeUser");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoginOpen, openLogin, closeLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
