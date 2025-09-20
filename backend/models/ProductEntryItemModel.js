import pool from '../db.js';

export const createProductEntryItem = async (product_id, entry_id, boxes) => {
    try {
        const result = await pool.query(
            'INSERT INTO product_entries_items (product_id, entry_id, boxes) VALUES ($1, $2, $3) RETURNING *',
            [product_id, entry_id, boxes]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getItemsByEntryId = async (entry_id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM product_entries_items WHERE entry_id = $1',
            [entry_id]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getTotalBoxesByProduct = async (product_id) => {};

export const getEntriesByProduct = async (product_id) => {};

export const updateItem = async (entry_id, product_id, boxes) => {};

export const deleteItem = async (id) => {};
