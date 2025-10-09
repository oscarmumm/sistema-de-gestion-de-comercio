import * as CategoryModel from '../models/CategoryModel.js';

export const createCategoryController = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ message: 'El nombre de la categoría es obligatoria' });
        }
        if (typeof name === 'string') {
            name = name.trim();
        }
        if (name.length > 30) {
            return res.status(400).json({
                message:
                    'El nombre de la categoría no puede contener mas de 30 caracteres',
            });
        }
        const newCategory = await CategoryModel.createCategory(name);
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await CategoryModel.getAllCategories();
        return res.json(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.getCategoryById(id);
        return res.json(category);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, updated_by } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ message: 'El nombre de la categoría es obligatoria' });
        }
        if (typeof name === 'string') {
            name = name.trim();
        }
        if (name.length > 30) {
            return res.status(400).json({
                message:
                    'El nombre de la categoría no puede contener mas de 30 caracteres',
            });
        }
        const updatedCategory = await CategoryModel.updateCategory(
            id,
            name,
            updated_by
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res
            .status(200)
            .json({
                message: 'Categoría actualizada correctamente',
                updatedCategory,
            });
    } catch (error) {
        console.error('Error en updateCategoryController:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryModel.deleteCategory(id);
        if (!deletedCategory) {
            res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res.status(200).json({
            message: 'Categoría eliminada',
            category: deletedCategory,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
