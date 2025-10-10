import pool from '../db.js';

export const createProduct = async (
    category_id,
    brand_id,
    name,
    description,
    stock,
    unit_cost,
    sale_price,
    units_per_box
) => {
    try {
        const result = await pool.query(
            'INSERT INTO products (category_id, brand_id, name, description, stock, unit_cost, sale_price, units_per_box) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ',
            [
                category_id,
                brand_id,
                name,
                description,
                stock,
                unit_cost,
                sale_price,
                units_per_box,
            ]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllProdcuts = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM products ORDER BY name ASC'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (product_id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE product_id = $1',
            [product_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (product_id, product) => {
    console.log(product_id)
    console.log(product)
    const {
        category_id,
        brand_id,
        name,
        description,
        stock,
        unit_cost,
        sale_price,
        units_per_box,
        updated_by,
    } = product;
    try {
        const result = await pool.query(
            `
            UPDATE products SET
                category_id = $1, brand_id = $2, name = $3, description = $4, stock = $5, unit_cost = $6, sale_price = $7, units_per_box = $8, updated_by = $9
                WHERE product_id = $10 RETURNING *
            `,
            [
                category_id,
                brand_id,
                name,
                description,
                stock,
                unit_cost,
                sale_price,
                units_per_box,
                updated_by,
                product_id,
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteProduct = async (product_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM products WHERE product_id = $1 RETURNING *',
            [product_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
