import pool from '../db.js';

(async () => {
    try {
        await pool.query("SET client_encoding TO 'UTF8'");
        await pool.query('INSERT INTO suppliers (name) VALUES ($1)', [
            'Papelería Sur',
        ]);
        const res = await pool.query(
            'SELECT name FROM suppliers ORDER BY id DESC LIMIT 1'
        );
        console.log('Último proveedor:', res.rows[0].name);
    } catch (err) {
        console.error('Error:', err);
    }
})();
