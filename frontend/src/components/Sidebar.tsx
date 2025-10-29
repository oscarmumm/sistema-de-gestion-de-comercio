import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { getUsernameFromSession } from '../utils/utils';
import { MdExitToApp } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import {
    MdOutlineInventory,
    MdAttachMoney,
    MdManageAccounts,
} from 'react-icons/md';

export default function Sidebar() {
    const [username, setUsername] = useState<string>('');
    const auth = useContext(AuthContext);

    useEffect(() => {
        setUsername(getUsernameFromSession);
    }, []);

    const handleClick = async () => {
        try {
            await auth?.logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex-1 h-full p-3 px-5 bg-indigo-700 text-slate-50 shadow-lg overflow-y-auto flex flex-col justify-between'>
            <div>
                <div className='mt-10 mb-2 font-semibold flex items-center'>
                    <MdOutlineInventory className='text-xl' />
                    <span className='ml-3'>Inventario</span>
                </div>
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
                        <NavLink to='/stock-entry'>
                            - Ingreso de Mercadería
                        </NavLink>
                    </li>
                </ul>
                <div className='mt-10 mb-2 font-semibold flex items-center'>
                    <MdAttachMoney className='text-xl' />
                    <span className='ml-3'>Ventas</span>
                </div>
                <ul>
                    <li className='mb-2'>
                        <NavLink to='/dashboard'>- Dashboard</NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink to='/new-sale'>- Registrar Venta</NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink to='/payment-methods'>
                            - Métodos de Pago
                        </NavLink>
                    </li>
                </ul>
                <div className='mt-10 mb-2 font-semibold flex items-center'>
                    <MdManageAccounts className='text-xl' />
                    <span className='ml-3'>Administración</span>
                </div>
                <ul>
                    {/* <li className='mb-2'>
                        <NavLink to='/roles'>- Roles</NavLink>
                    </li> */}
                    <li className='mb-2'>
                        <NavLink to='/users'>- Usuarios</NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex justify-between'>
                <div>
                    <p>Usuario activo:</p>
                    <p>{username}</p>
                </div>
                <button
                    className='bg-slate-50 p-2 text-indigo-600 text-3xl rounded-lg shadow-lg cursor-pointer'
                    onClick={handleClick}
                >
                    <MdExitToApp />
                </button>
            </div>
        </div>
    );
}
