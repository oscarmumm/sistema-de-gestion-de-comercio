import pool from '../db.js';

export const createProductEntryHeader = async (user_id, supplier) => {
    try {
        const result = await pool.query(
            'INSERT INTO product_entries_header'
        )
    } catch (error) {
        throw error;
    }
};

export const getAllProductEntryHeaders = async () => {
    try {
        const result = await pool.query('SELECT * FROM product_entries_header');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getProductEntryHeaderById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM product_entries_header WHERE entry_id = $1',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const updateProductEntryHeader = async () => {};

export const deleteProductEntryHeader = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM product_entries_header WHERE entry_id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};