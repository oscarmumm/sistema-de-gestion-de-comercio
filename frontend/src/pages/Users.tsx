import { useState, useEffect } from 'react';
import { getUsers } from '../api/users';

interface User {
    user_id: number;
    role_id: number;
    name: string;
    surname: string;
    username: string;
    created_at: string;
    updated_at: string;
}

export const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div className='flex flex-col'>
            <h2 className='text-center my-5 font-semibold text-xl'>Usuarios</h2>
            <table className='text-center rounded-lg shadow-lg overflow-hidden bg-slate-50'>
                <thead className='border border-indigo-600 bg-indigo-600 text-slate-50'>
                    <tr>
                        <th className='p-3'>Nombre</th>
                        <th className='p-3'>Apellido</th>
                        <th className='p-3'>Nombre de usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr
                            className='cursor-pointer border-b border-indigo-600 last:border-0 hover:bg-indigo-100'
                            key={user.user_id}
                        >
                            <td className='p-3'>
                                {user.name}
                            </td>
                            <td className='p-3'>
                                {user.surname}
                            </td>
                            <td className='p-3'>
                                {user.username}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
