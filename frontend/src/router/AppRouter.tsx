import { Routes, Route, BrowserRouter } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { Categories } from '../pages/Categories';
import { Users } from '../pages/Users';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/users' element={<Users />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
