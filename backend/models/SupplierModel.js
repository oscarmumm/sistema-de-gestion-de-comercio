import pool from '../db.js';

export const createSupplier = async (name) => {
    try {
        const result = await pool.query(
            'INSERT INTO suppliers (name) VALUES ($1) RETURNING *',
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
            'SELECT * FROM suppliers ORDER BY name ASC'
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

export const updateSupplier = async (supplier_id, name, updated_by) => {
    try {
        const result = await pool.query(
            'UPDATE suppliers SET name = $1, updated_at = NOW(), updated_by = $2 WHERE supplier_id = $3 RETURNING *',
            [name, updated_by, supplier_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

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
