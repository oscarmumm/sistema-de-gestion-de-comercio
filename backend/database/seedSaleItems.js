// seeds/seedSaleItems.js
import pool from '../db.js';

export const seedSaleItems = async () => {
    try {
        const sales = (await pool.query('SELECT sale_id FROM sales')).rows;
        const products = (await pool.query('SELECT product_id FROM products'))
            .rows;

        let totalItems = 0;

        for (const sale of sales) {
            const numItems = Math.floor(Math.random() * 4) + 1;
            for (let i = 0; i < numItems; i++) {
                const product_id =
                    products[Math.floor(Math.random() * products.length)]
                        .product_id;
                const quantity = Math.floor(Math.random() * 5) + 1;
                const discount = (Math.random() * 200).toFixed(2);
                const price_type = Math.random() > 0.5 ? 'normal' : 'promo';

                await pool.query(
                    `INSERT INTO sale_items (sale_id, product_id, quantity, discount, price_type)
                            VALUES ($1, $2, $3, $4, $5)`,
                    [sale.sale_id, product_id, quantity, discount, price_type]
                );
                totalItems++;
            }
        }
    } catch (error) {
        console.error('Error en seedSaleItems:', error);
    }
};
