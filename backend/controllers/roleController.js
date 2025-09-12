import * as RoleModel from '../models/RoleModel';

export const createRoleController = async (req, res) => {
    try {
        let {role_name} = req.body;
        // VALIDATIONS
        if (!role_name) {
            return res
                .status(400)
                .json({message: 'El nombre del rol es obligatorio'});
        }
        if (typeof role_name === 'string') {
            role_name = role_name.trim();
        }
        if (role_name.lenth() > 30) {
            return res.status(400).json({
                message:
                    'El nombre del rol no puede contener mas de 30 caracteres',
            });
        }
        // ROLE CREATION
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

export const updateRoleController = async (req, res) => {}

export const deleteRoleController = async (req, res) => {}