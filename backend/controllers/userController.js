import * as UserModel from '../models/UserModel.js';

export const createUserController = async (req, res) => {
    try {
        const {role_id, name, surname, username, password, updated_by} =
            req.body;
        if (
            !role_id ||
            !name ||
            !surname ||
            !username ||
            !password ||
            !updated_by
        ) {
            return res
                .status(400)
                .json({message: 'Todos los campos son obligatorios'});
        }
        const newUser = await UserModel.createUser(
            role_id,
            name,
            surname,
            username,
            password,
            updated_by
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getUserController = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        return res.json(users);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener usuarios', error});
    }
};

export const getUserByIdController = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await UserModel.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Error interno del servidor'})
    }
}

export const updateUserController = async (req, res) => {
    try {
        const {id} = req.params;
        const fields = req.body;
        console.log('id:', id);
        console.log('fields:', fields);
        const updateData = Object.fromEntries(
            Object.entries(fields).filter(([_, value]) => value !== undefined)
        );
        if (Object.keys(updateData).length === 0) {
            return res
                .status(400)
                .json({message: 'No se enviaron campos para actualizar'});
        }
        const updatedUser = await UserModel.updateUser(id, updateData);
        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({message: 'Error interno del servidor'});
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
        res.status(500).json({message: 'Error interno del servidor'});
    }
};
