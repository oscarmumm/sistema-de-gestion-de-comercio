import * as BrandModel from '../models/BrandModel.js';

export const createBrandController = async (req, res) => {
    try {
        let {name} = req.body;
        if (!name) {
            return res
                .status(400)
                .json({message: 'El nombre de la marca es obligatoria'});
        }
        if (typeof name === 'string') {
            name = name.trim();
        }
        if (name.length > 30) {
            return res.status(400).json({
                message:
                    'El nombre de la marca no puede contener mas de 30 caracteres',
            });
        }
        const newBrand = await BrandModel.createBrand(name);
        return res.status(201).json(newBrand);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getAllBrandsController = async (req, res) => {
    try {
        const brands = await BrandModel.getAllBrands();
        return res.json(brands);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const getBrandByIdController = async (req, res) => {
    try {
        const {id} = req.params;
        const brand = await BrandModel.getBrandById(id);
        return res.json(brand);
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const updateBrandController = async (req, res) => {
    try {
        const {id} = req.params;
        let {name, updated_by} = req.body;
        if (!name) {
            return res
                .status(400)
                .json({message: 'El nombre de la marca es obligatoria'});
        }
        if (typeof name === 'string') {
            name = name.trim();
        }
        if (name.length > 30) {
            return res.status(400).json({
                message:
                    'El nombre de la marca no puede contener mas de 30 caracteres',
            });
        }
        const updatedBrand = await BrandModel.updateBrand(id, name, updated_by);
        if (!updatedBrand) {
            return res.status(404).json({message: 'Marca no encontrada'});
        }
        return res
            .status(200)
            .json({message: 'Marca actualizada correctamente', updatedBrand});
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};

export const deleteBrandController = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBrand = await BrandModel.deleteBrand(id);
        if (!deletedBrand) {
            res.status(404).json({message: 'Marca no encontrada'});
        }
        return res.status(200).json({
            message: 'Marca eliminada',
            brand: deletedBrand,
        });
    } catch (error) {
        return res.status(500).json({message: 'Error interno del servidor'});
    }
};
