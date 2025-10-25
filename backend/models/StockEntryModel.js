import pool from '../db.js';

export const createStockEntry = async (
    user_id,
    supplier_id,
    entry_date
) => {
    try {
        const result = await pool.query(
            'INSERT INTO stock_entries (user_id, supplier_id, entry_date) VALUES ($1, $2 , $3) RETURNING *',
            [user_id, supplier_id, entry_date]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllStockEntries = async () => {
    try {
        const result = await pool.query('SELECT * FROM stock_entries');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getStockEntryById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM stock_entries WHERE entry_id = $1',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const updateStockEntry = async (
    id,
    user_id,
    supplier_id,
    entry_date,
    updated_by
) => {
    try {
        const result = await pool.query(
            'UPDATE stock_entries SET user_id = $1, supplier_id = $2, entry_date = $3, updated_by = $4, WHERE entry_id = $5 RETURNING *',
            [user_id, supplier_id, entry_date, updated_by, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const deleteStockEntry = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM stock_entries WHERE entry_id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
