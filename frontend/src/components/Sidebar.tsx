import { NavLink } from 'react-router';

export default function Sidebar() {
    return (
        <div className="p-3">
            <ul>
                <li>
                    <NavLink to="/categories">Categorías</NavLink>
                </li>
                <li>
                    <NavLink to="/suppliers">Proveedores</NavLink>
                </li>
                <li>
                    <NavLink to="/brands">Marcas</NavLink>
                </li>
                <li>
                    <NavLink to="/products">Productos</NavLink>
                </li>
                <li>
                    <NavLink to="/payment-methods">Métodos de Pago</NavLink>
                </li>
                <li>
                    <NavLink to="/new-sale">Registrar Venta</NavLink>
                </li>
                <li>
                    <NavLink to="/stock-entry">Ingreso de Mercadería</NavLink>
                </li>
                <li>
                    <NavLink to="/roles">Roles</NavLink>
                </li>
                <li>
                    <NavLink to="/users">Usuarios</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
            </ul>
        </div>
    );
}
