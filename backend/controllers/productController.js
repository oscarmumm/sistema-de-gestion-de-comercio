import * as ProductModel from '../models/ProductModel.js';

export const createProductController = async (req, res) => {
    try {
        const {
            category_id,
            brand_id,
            name,
            description,
            stock,
            unit_cost,
            sale_price,
            units_per_box,
        } = req.body;
        if (
            !category_id ||
            !brand_id ||
            !name ||
            !description ||
            !stock ||
            !unit_cost ||
            !sale_price ||
            !units_per_box
        ) {
            return res
                .status(400)
                .json({ message: 'Todos los campos son obligatorios' });
        }
        const newProduct = await ProductModel.createProduct(
            category_id,
            brand_id,
            name,
            description,
            stock,
            unit_cost,
            sale_price,
            units_per_box
        );
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getAllProdcutsController = async (req, res) => {
    try {
        const products = await ProductModel.getAllProdcuts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener productos' });
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.getProductById(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener producto' });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        const updatedProduct = await ProductModel.updateProduct(id, product);
        if(!updatedProduct) {
            return res.status(404).json({message: 'Producto no encontrado'})
        }
        return res
            .status(200)
            .json({
                message: 'Producto actualizado correctamente',
                updatedProduct,
            });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json('Producto no encontrado');
        }
        return res.status(200).json({
            message: 'Producto eliminado correctamente',
            product: deletedProduct,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
