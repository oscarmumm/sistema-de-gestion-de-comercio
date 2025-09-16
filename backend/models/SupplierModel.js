import pool from '../db.js';

export const createSupplier = async (name) => {
    try {
        const result = await pool.query(
            'INSERT INTO suppliers (name) VALUES ($1)',
            [name]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllSuppliers = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM suppliers ORDER BY name'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getSupplierById = async (supplier_id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM suppliers WHERE supplier_id = $1',
            [supplier_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const updateSupplier = async () => {};

export const deleteSupplier = async (supplier_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM suppliers WHERE supplier_id = $1 RETURNING *',
            [supplier_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
