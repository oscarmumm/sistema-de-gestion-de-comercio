import pool from '../db';

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
