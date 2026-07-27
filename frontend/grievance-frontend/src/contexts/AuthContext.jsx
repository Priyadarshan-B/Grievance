import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [mode, setMode] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedMode = localStorage.getItem("mode");

        if (storedToken) {

            setToken(storedToken);

            setMode(storedMode);

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

        }

        setLoading(false);

    }, []);

    const login = ({ token, user, mode }) => {

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("mode", mode);

        setToken(token);
        setUser(user);
        setMode(mode);

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
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export const useAuth = () => useContext(AuthContext);