import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (authToken = token) => {
    if (!authToken) return;

    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const profile = res.data.data;

      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to fetch profile:", error);

      logout();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedMode = localStorage.getItem("mode");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      setMode(storedMode);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      fetchProfile(storedToken).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async ({ token, user, mode }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("mode", mode);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }

    setToken(token);
    setMode(mode);

    await fetchProfile(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("mode");

    setToken(null);
    setUser(null);
    setMode(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        mode,
        loading,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
