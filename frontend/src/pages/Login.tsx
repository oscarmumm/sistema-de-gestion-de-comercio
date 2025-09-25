import { useState } from 'react';
import { Input } from '../src/components/Input';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login: ', { username, password });
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-slate-500'>
            <form
                className=' p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100'
                onSubmit={handleSubmit}
            >
                <h2 className='text-3xl mb-5 text-center'>Iniciar sesión</h2>
                <Input
                    label='Usuario'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label='Contraseña'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className='p-3 my-3 shadow-lg rounded-lg bg-indigo-600 text-white'
                    type='submit'
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};
