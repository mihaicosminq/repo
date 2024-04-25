"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Utente } from "@/types";

interface ContextType {
    currentUser: Utente | null;
    login: (inputs: any) => Promise<void>;
    logout: () => Promise<void>;
}

const defaultAuthContext: ContextType = {
    currentUser: null,
    login: async () => {},
    logout: async () => {},
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext(defaultAuthContext);



export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    // Check if window.localStorage is defined to avoid ReferenceError
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem("utente") : null;
    const initialUser = storedUser ? JSON.parse(storedUser) : null;

    const [currentUser, setCurrentUser] = useState<Utente | null>(initialUser);

    const login = async (inputs: any) => {
        const res = await axios.post("http://localhost:3000/login", inputs, {
            withCredentials: true,
        });
        console.log(res.data);
        const { token, username } = res.data;
        const user = { token, username };
        if (typeof window !== 'undefined') {
            localStorage.setItem("utente", JSON.stringify(user));
        }
        setCurrentUser({ ...initialUser, username, password: null });
    };

    const logout = async () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("utente");
        }

        try {
            const response = await axios.delete("http://localhost:3000/logout", {
                withCredentials: true,
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const username = localStorage.getItem("username");
            if (username && currentUser) {
                setCurrentUser({ ...currentUser, username});
            }
        }
    }, []);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const username = localStorage.getItem("username");
            if (username && currentUser) {
                setCurrentUser({ ...currentUser, username });
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login , logout}}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};
