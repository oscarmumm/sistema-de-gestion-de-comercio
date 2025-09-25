import {Routes, Route, BrowserRouter} from 'react-router';
import {Home} from '../pages/Home';
import {Login} from '../pages/Login';
import {ProtectedRoute} from './ProtectedRoute';

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
            </Routes>
        </BrowserRouter>
    );
};
