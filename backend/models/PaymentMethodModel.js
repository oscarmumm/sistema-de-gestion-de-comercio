import pool from '../db.js';

export const createPaymentMethod = async (name) => {
    try {
        const result = await pool.query(
            'INSERT INTO payment_methods (name) VALUES ($1) RETURNING *',
            [name]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllPaymentMethods = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM payment_methods ORDER BY name ASC'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getPaymentMethodById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM payment_methods WHERE payment_method_id = $1',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const updatePaymentMethod = async (id, name, updated_by) => {
    try {
        const result = await pool.query(
            'UPDATE payment_methods SET name = $1, updated_at = NOW(), updated_by = $2 WHERE payment_method_id = $3 RETURNING *',
            [name, updated_by, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const deletePaymentMethod = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM payment_methods WHERE payment_method_id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
