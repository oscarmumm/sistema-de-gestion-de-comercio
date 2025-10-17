import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import {
    loginRequest,
    logoutRequest,
    verifyTokenservice,
} from '../services/authService';
import type { LoginResponse } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    user: LoginResponse['user'] | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<LoginResponse['user'] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const verify = async () => {
            const valid = await verifyTokenservice();

            if (valid) {
                setIsAuthenticated(true);
                const userData = sessionStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } else {
                logoutRequest();
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        };
        verify();
    }, []);

    const login = async (username: string, password: string) => {
        const data = await loginRequest(username, password);
        sessionStorage.setItem('token', data.token);
        if (data.user) {
            sessionStorage.setItem('user', JSON.stringify(data.user));
        }
        setUser(data.user || null);
        setIsAuthenticated(true);
    };

    const logout = () => {
        logoutRequest();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
};
