import * as SupplierModel from '../models/SupplierModel.js';

export const createSupplierController = async (req, res) => {
    try {
        let {name} = req.body;
        if (!name) {
            return res
                .status(400)
                .json({message: 'El nombre del proveedor es obligatorio'});
        }
        if (typeof name === 'string') {
            name = name.trim();
        }

        if (name.length > 50) {
            return res.status(400).json({
                message:
                    'El nombre del rol no puede contener mas de 50 caracteres',
            });
        }
        const newSupplier = await SupplierModel.createSupplier(name);
        return res.status(201).json(newSupplier);
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getAllSuppliersController = async (req, res) => {
    try {
        const suppliers = await SupplierModel.getAllSuppliers();
        return res.json(suppliers);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getSupplierByIdController = async (req, res) => {
    try {
        const {id} = req.params;
        const supplier = await SupplierModel.getSupplierById(id);
        return res.json(supplier);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const updateSupplierController = async (req, res) => {
    try {
        const {id} = req.params;
        let {name, updated_by} = req.body;
        if (!name) {
            return res
                .status(400)
                .json({message: 'El nombre del proveedor es obligatorio'});
        }
        if (typeof name === 'string') {
            name = name.trim();
        }
        if (name.length > 50) {
            return res.status(400).json({
                message:
                    'El nombre del rol no puede contener mas de 50 caracteres',
            });
        }
        const updatedSupplier = await SupplierModel.updateSupplier(
            id,
            name,
            updated_by
        );
        if (!updatedSupplier) {
            return res.status(404).json({message: 'Proveedor no encontrado'});
        }
        return res.status(200).json({
            message: 'Proveedor actualizado correctamente',
            updatedSupplier,
        });
    } catch (error) {
        return res
            .status(500)
            .json({message: 'Error al actualizar el proveedor'});
    }
};

export const deleteSupplierController = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedSupplier = await SupplierModel.deleteSupplier(id);
        if (!deletedSupplier) {
            return res.status(404).json({message: 'Proveedor no encontrado'});
        }
        return res.status(200).json({
            message: 'Proveedor eliminado correctamente',
            supplier: deletedSupplier,
        });
    } catch (error) {
        return res
            .status(500)
            .json({message: 'Error al eliminar el proveedor'});
    }
};
