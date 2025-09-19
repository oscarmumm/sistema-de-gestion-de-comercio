import pool from '../db';

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

export const updateProduct = async (product_id, fields, updated_by) => {
    try {
        const setClauses = [];
        const values = [];
        let index = 1;

        for (const [key, value] of Object.entries(fields)) {
            setClauses.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }
        setClauses.push('updated_at = NOW()');
        setClauses.push(`updated_by = $${index}`);
        values.push(updated_by);
        index++;
        if (setClauses.length === 0) {
            return null;
        }
        const query = `UPDATE products SET ${setClauses.join(
            ', '
        )} WHERE product_id = ${index} RETURNING *`;
        values.push(product_id);
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
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
