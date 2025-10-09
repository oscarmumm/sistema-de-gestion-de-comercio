import { Routes, Route, BrowserRouter } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { Categories } from '../pages/Categories';
import { Users } from '../pages/Users';
import { Suppliers } from '../pages/Suppliers';
import { Brands } from '../pages/Brands';
import { PaymentMethods } from '../pages/PaymentMethods';
import { Products } from '../pages/Products';
import { Roles } from '../pages/Roles';
import { StockEntry } from '../pages/StockEntry';
import { RegisterSale } from '../pages/RegisterSale';


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
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/suppliers' element={<Suppliers />} />
                    <Route path='/brands' element={<Brands />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/payment-methods' element={<PaymentMethods />} />
                    <Route path='/roles' element={<Roles />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/payment-methods' element={<PaymentMethods />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/stock-entry' element={<StockEntry />} />
                    <Route path='/new-sale' element={<RegisterSale />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
