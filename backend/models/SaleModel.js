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

export const getSalesByPaymentMethod = async (from, until) => {
    try {
        const result = await pool.query(
            `
                SELECT 
                pm.name,
                SUM(s.total) AS total
                FROM sales s
                JOIN payment_methods pm ON s.payment_method_id = pm.payment_method_id
                WHERE s.created_at BETWEEN $1 AND $2
                GROUP BY pm.name;
            `,
            [from, until]
        );
        return result.rows;
    } catch (error) {
        console.error('Error en saleModel.', error);
        throw error;
    }
};

export const getSalesByCategory = async (from, until) => {
    try {
        const result = await pool.query(
            `
                SELECT categories.name, SUM(total) AS total
                FROM sales
                JOIN sale_items ON sales.sale_id = sale_items.sale_id
                JOIN products ON sale_items.product_id = products.product_id
                JOIN categories ON categories.category_id = products.category_id
                WHERE sales.created_at BETWEEN $1 AND $2
                GROUP BY categories.name;
            `,
            [from, until]
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

export const getSaleById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT total, sales.user_id AS username, payment_methods.name AS payment_method, sales.created_at AS date FROM sales JOIN payment_methods ON payment_methods.payment_method_id = sales.payment_method_id JOIN users ON users.user_id = sales.user_id WHERE sale_id = $1',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error en saleModel ', error);
        throw error;
    }
};
