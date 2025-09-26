import {Navigate} from 'react-router';
import {useAuth} from '../context/AuthContext';
import type {ReactNode} from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated, loading} = useAuth();
    if(loading) {
        return (
            <div>CARGANDO...</div> //CAMBIAR POR SPINNER
        )
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
