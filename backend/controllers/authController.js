import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {getUserByUsername} from '../models/UserModel';

export const LoginController = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({message: 'Nombre de usuario y contraseña son obligatorios'});
    }

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(401).json({message: 'Credenciales inválidas'});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({message: 'Credenciales inválidas'});
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        });
        
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};
