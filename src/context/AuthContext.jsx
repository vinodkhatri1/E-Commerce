import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 1. User State (null = not logged in, object = logged in)
  const [user, setUser] = useState(null);

  // 2. Modal State (Controls visibility globally)
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Actions
  const login = (userData) => {
    setUser(userData); // Set user data (e.g., { name: "John" })
    setIsLoginOpen(false); // Close modal automatically
  };

  const logout = () => {
    setUser(null);
  };

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user, // boolean helper
        isLoginOpen,
        login,
        logout,
        openLogin,
        closeLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};