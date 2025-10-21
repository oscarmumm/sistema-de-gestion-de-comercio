import pool from '../db.js';

export const bulkInsert = async (itemsArray) => {
    try {
        const values = [];
        const placeholders = [];
        itemsArray.forEach((item, index) => {
            let i = index * 5;
            placeholders.push(
                `($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5})`
            );
            values.push(
                item.sale_id,
                item.product_id,
                item.quantity,
                item.discount,
                item.price_type
            );
        });

        const query = `INSERT INTO sale_items (sale_id, product_id, quantity, discount, price_type) VALUES ${placeholders.join(', ')} RETURNING *`

        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw error;
    }
};
