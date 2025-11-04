import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
    modalFormVariants,
    modalBackgroundVariants,
} from '../animations/animations';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

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

    const toggleShowPassword = () => {
        setPasswordVisible(!passwordVisible);
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
                    <div className="flex flex-col w-full">
                        <label className="px-1">Usuario</label>
                        <input
                            className="p-3 my-3 outline-none shadow-lg rounded-lg bg-white"
                            type="text"
                            value={username}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="px-1">Contraseña</label>
                        <div className="flex p-3 my-3 outline-none shadow-lg rounded-lg bg-white text-center">
                            <input
                                className="outline-none w-full"
                                type={passwordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setPassword(e.target.value)}
                            />
                            <button
                                className="text-2xl cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleShowPassword();
                                }}>
                                {passwordVisible ? <IoMdEye /> : <IoMdEyeOff />}
                            </button>
                        </div>
                    </div>
                    <p className='text-red-500 font-semibold text-center'>{error}</p>
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
