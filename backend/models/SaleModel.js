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

export const getSalesByDay = async (from, to) => {
    try {
        const result = await pool.query(
            `SELECT DATE(created_at) AS fecha, SUM(total) AS total FROM sales WHERE created_at BETWEEN $1 AND $2 GROUP BY fecha ORDER BY fecha ASC`,
            [from, to]
        );
        return result.rows;
    } catch (error) {
        console.error('Error en saleModel.', error);
        throw error;
    }
};

export const getProductsSoldByDate = async (from, until) => {
    try {
        const result = await pool.query(
            `
            SELECT 
            p.name,
            SUM(si.quantity) AS total_sold
            FROM sale_items si
            JOIN products p ON si.product_id = p.product_id
            JOIN sales s ON si.sale_id = s.sale_id
            WHERE s.created_at BETWEEN $1 AND $2
            GROUP BY p.name
            ORDER BY total_sold DESC;
        `,
            [from, until]
        );
        return result.rows;
    } catch (error) {
        console.error('Error en saleModel ', error);
        throw error;
    }
};
