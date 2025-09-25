import {createContext, useState, useEffect, useContext} from 'react';
import type {ReactNode} from 'react';
import {loginRequest, logoutRequest} from '../services/authService';
import type {LoginResponse} from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    user: LoginResponse['user'] | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<LoginResponse['user'] | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token) {
            setIsAuthenticated(true);
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
    }, []);

    const login = async (username: string, password: string) => {
        const data = await loginRequest(username, password);
        localStorage.setItem('token', data.token);
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
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
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
};
