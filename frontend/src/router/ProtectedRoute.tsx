import {Navigate} from 'react-router';
import {useAuth} from '../context/AuthContext';
import type {ReactNode} from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
