import pool from '../db.js';

export const createCategory = async (name) => {
    try {
        const result = await pool.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY name ASC'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getCategoryById = async (category_id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM categories WHERE category_id = $1',
            [category_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (category_id, name, updated_by) => {
    try {
        const result = await pool.query(
            'UPDATE brands SET name = $1, updated_at = NOW(), updated_by = $2 WHERE category_id = $3 RETURNING *',
            [name, updated_by, category_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (category_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM categories WHERE category_id = $1 RETURNING *',
            [category_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
