import { Routes, Route } from 'react-router';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export const AppRouter = () => {
    return (
        <Routes>
            {/* PUBLIC ROUTES */}
            <Route path='/' element={<Home />} />

            {/* PRIVATE ROUTES */}
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};
