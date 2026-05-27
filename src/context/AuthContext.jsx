import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);

    }, []);

    // LOGIN

    const login = async (email, password) => {

        try {

            const res = await API.post("/auth/login", {
                email,
                password,
            });

            const data = res.data;

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);

            return {
                success: true,
            };

        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed",
            };
        }
    };

    // SIGNUP

    const signup = async (name, email, password) => {

        try {

            const res = await API.post("/auth/register", {
                name,
                email,
                password,
            });

            return {
                success: true,
                message: res.data.message,
            };

        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Signup failed",
            };
        }
    };

    // LOGOUT

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}