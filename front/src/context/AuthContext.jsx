import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        localStorage.setItem("token", JSON.stringify(userData.token));
        setUser(userData);
        console.log(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const tokenFromLS = JSON.parse(localStorage.getItem("token"));
            if (!tokenFromLS) {
                setUser(null);
                return;
            }

            try {
                const res = await axios.get("/api/users/check", {
                    headers: { Authorization: `Bearer ${tokenFromLS}` }
                });
                setUser({ ...res.data, token: tokenFromLS });
            } catch (e) {
                setUser(null);
                localStorage.removeItem("token");
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Création d'un hook personnalisé
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
