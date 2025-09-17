import * as SupplierModel from '../models/SupplierModel.js';

export const createSupplierController = async (req, res) => {
    try {
        let { supplier_name } = req.body;
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getAllSuppliersController = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getSupplierByIdController = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateSupplierController = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteSupplierController = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
