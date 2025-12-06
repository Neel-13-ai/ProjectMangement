import { createContext, useContext, useState } from "react";
import { loginUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (formData) => {
    try {
      const res = await loginUser(formData);

      const userObj = {
        id: res.user.id,
        email: res.user.email,
        name: res.user.name,
        role: res.user.role,
        staus: res.user.status,
      };

      setUser(userObj);
      setToken(res.token);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(userObj));

      return res;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        role: user?.role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
