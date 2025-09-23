import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};
