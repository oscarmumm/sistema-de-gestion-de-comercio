import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router';

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await auth?.login(username, password);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-900">
            <div>
                <h1 className='text-3xl text-slate-50 font-semibold text-center mb-10'>Sistema de Gestión de Comercio</h1>
                <form
                    className=" p-5 mb-10 flex flex-col w-md shadow-lg rounded-lg bg-slate-100"
                    onSubmit={handleSubmit}>
                    <h2 className="text-3xl mb-5 text-center">
                        Iniciar sesión
                    </h2>
                    <Input
                        label="Usuario"
                        type="text"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(e.target.value)
                        }
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                    <button
                        className="p-3 my-3 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer"
                        type="submit">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};
