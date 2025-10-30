import pool from '../db.js';

const NUM_SALES = 30;

(async () => {
    try {
        const users = (await pool.query('SELECT user_id FROM users')).rows;
        const methods = (
            await pool.query('SELECT payment_method_id FROM payment_methods')
        ).rows;

        for (let i = 0; i < NUM_SALES; i++) {
            const user_id =
                users[Math.floor(Math.random() * users.length)].user_id;
            const payment_method_id =
                methods[Math.floor(Math.random() * methods.length)]
                    .payment_method_id;
            const customer = `Cliente_${i + 1}`;
            const total = (Math.random() * 5000 + 1000).toFixed(2);
            const daysAgo = Math.floor(Math.random() * 30);
            const created_at = new Date(Date.now() - daysAgo * 86400000);

            await pool.query(
                `INSERT INTO sales (user_id, total, customer, payment_method_id, created_at)
                        VALUES ($1, $2, $3, $4, $5)`,
                [user_id, total, customer, payment_method_id, created_at]
            );
        }
    } catch (error) {
        console.error('Error en seedSales:', error);
    }
})();
