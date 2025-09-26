import {Routes, Route, BrowserRouter} from 'react-router';
import {Home} from '../pages/Home';
import {Login} from '../pages/Login';
import {ProtectedRoute} from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import { Categories } from '../pages/Categories';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
