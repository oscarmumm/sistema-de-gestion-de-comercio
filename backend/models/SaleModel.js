import pool from '../db.js';

export const createSale = async (
    user_id,
    total,
    customer,
    payment_method_id
) => {
    try {
        const result = await pool.query(
            'INSERT INTO sales (user_id, total, customer, payment_method_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, total, customer, payment_method_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getSalesByDate = async (from, until) => {
    try {
        const result = await pool.query(
            `SELECT * FROM sales WHERE created_at BETWEEN $1 AND $2`,
            [from, until]
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};
