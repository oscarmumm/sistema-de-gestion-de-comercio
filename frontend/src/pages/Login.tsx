import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
    modalFormVariants,
    modalBackgroundVariants,
} from '../animations/animations';

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
        <motion.div
            className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-500"
            variants={modalBackgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}>
            <div>
                <h1 className="text-3xl text-slate-50 font-semibold text-center mb-10">
                    Sistema de Gestión de Comercio
                </h1>
                <motion.form
                    className="p-5 mb-10 flex flex-col w-md shadow-lg rounded-lg bg-slate-100"
                    onSubmit={handleSubmit}
                    variants={modalFormVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5 }}>
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
                </motion.form>
            </div>
        </motion.div>
    );
};
