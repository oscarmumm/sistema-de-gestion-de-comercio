import { NavLink } from 'react-router';
import { MdArrowBack } from 'react-icons/md';

interface SideBarProps {
    onToggleSidebar: () => void;
}

export default function Sidebar({ onToggleSidebar }: SideBarProps) {
    return (
        <div className='h-screen p-3 px-5 bg-indigo-700 text-slate-50 shadow-lg'>
            <button onClick={onToggleSidebar} className='text-3xl cursor-pointer'>
                <MdArrowBack />
            </button>
            <h3 className='mt-10 mb-2 font-semibold'>Inventario</h3>
            <ul>
                <li className='mb-2'>
                    <NavLink to='/categories'>- Categorías</NavLink>
                </li>

                <li className='mb-2'>
                    <NavLink to='/suppliers'>- Proveedores</NavLink>
                </li>
                <li className='mb-2'>
                    <NavLink to='/brands'>- Marcas</NavLink>
                </li>
                <li className='mb-2'>
                    <NavLink to='/products'>- Productos</NavLink>
                </li>
                <li className='mb-2'>
                    <NavLink to='/stock-entry'>- Ingreso de Mercadería</NavLink>
                </li>
            </ul>
            <h3 className='mt-10 mb-2 font-semibold'>Ventas</h3>
            <ul>
                <li className='mb-2'>
                    <NavLink to='/dashboard'>- Dashboard</NavLink>
                </li>
                <li className='mb-2'>
                    <NavLink to='/new-sale'>- Registrar Venta</NavLink>
                </li>
                <li className='mb-2'>
                    <NavLink to='/payment-methods'>- Métodos de Pago</NavLink>
                </li>
            </ul>
            <h3 className='mt-10 mb-2 font-semibold'>Administración</h3>
            <ul>
                <li className='mb-2'>
                    <NavLink to='/roles'>- Roles</NavLink>
                </li>
                <li className='mb-2'>
                    <NavLink to='/users'>- Usuarios</NavLink>
                </li>
            </ul>
        </div>
    );
}
