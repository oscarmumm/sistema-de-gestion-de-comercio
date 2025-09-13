import * as RoleModel from '../models/RoleModel';

export const createRoleController = async (req, res) => {
    try {
        let {role_name} = req.body;
        if (!role_name) {
            return res
                .status(400)
                .json({message: 'El nombre del rol es obligatorio'});
        }
        if (typeof role_name === 'string') {
            role_name = role_name.trim();
        }
        if (role_name.length > 30) {
            return res.status(400).json({
                message:
                    'El nombre del rol no puede contener mas de 30 caracteres',
            });
        }
        const newRole = await RoleModel.createRole({role_name});
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getRoleController = async (req, res) => {
    try {
        const roles = RoleModel.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener roles', error});
    }
};

export const updateRoleController = async (req, res) => {
    // update_by viene del front. ver de cambiarlo mas adelante para que sea el backend quien gestione esa información
    try {
        const {id} = req.params;
        let {role_name, updated_by} = req.body;
        if (!role_name) {
            return res
                .status(400)
                .json({message: 'El nombre del rol es obligatorio'});
        }
        if (typeof role_name === 'string') {
            role_name = role_name.trim();
        }
        if (role_name.length > 30) {
            return res.status(400).json({
                message:
                    'El nombre del rol no puede contener mas de 30 caracteres',
            });
        }
        const updatedRole = await RoleModel.updateRole(
            id,
            role_name,
            updated_by
        );
        if (!updatedRole) {
            return res.status(404).json({message: 'Rol no encontrado'});
        }
        res.status(200).json({
            message: 'Rol actualizado correctamente',
            updatedRole,
        });
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el rol'});
    }
};

export const deleteRoleController = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedRole = await RoleModel.deleteRole(id);
        if (!deletedRole) {
            res.status(404).json({message: 'Rol no encontrado'});
        }
    } catch (error) {
        res.status(500).json({messade: 'Error al eliminar el rol'});
    }
};
