import * as UserModel from '../models/UserModel.js';

export const createUserController = async (req, res) => {
    try {
        const {role_id, name, surname, username, password} = req.body;
        if (!role_id || !name || !surname || !username || !password) {
            return res
                .status(400)
                .json({message: 'Todos los campos son obligatorios'});
        }
        const newUser = await UserModel.createUser(
            role_id,
            name,
            surname,
            username,
            password
        );
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getUserController = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: 'Error al obtener usuarios', error});
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserModel.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getUserByUsernameController = async (req, res) => {
    try {
        const {username} = req.body;
        const user = await UserModel.getUserByUsername(username);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const updateUserController = async (req, res) => {
    try {
        const {id} = req.params;
        const fields = req.body;
        const updateData = Object.fromEntries(
            Object.entries(fields).filter(([_, value]) => value !== undefined)
        );
        if (Object.keys(updateData).length === 0) {
            return res
                .status(400)
                .json({message: 'No se enviaron campos para actualizar'});
        }
        const updatedUser = await UserModel.updateUser(id, updateData);
        return res.status(200).json({
            message: 'Usuario actualizado correctamente',
            updatedUser,
        });
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await UserModel.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        return res.status(200).json({
            message: 'Usuario eliminado correctamente',
            user: deletedUser,
        });
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};
