import pool from '../db.js';

export const createProductEntryHeader = async (user_id, supplier_id) => {
    try {
        const result = await pool.query(
            'INSERT INTO product_entries_header (user_id, supplier_id) VALUES ($1, $2) RETURNING *',
            [user_id, supplier_id]
        );
        return result.rows[0];
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

export const updateProductEntryHeader = async (
    id,
    user_id,
    supplier_id,
    entry_date,
    updated_by
) => {
    try {
        const result = await pool.query(
            'UPDATE product_entries_header SET user_id = $1, supplier_id = $2, entry_date = $3, updated_by = $4, WHERE entry_id = $5 RETURNING *',
            [user_id, supplier_id, entry_date, updated_by, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

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