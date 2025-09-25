import pool from '../db.js';

(async () => {
    try {
        await pool.query(
            `INSERT INTO roles (name)
            VALUES ('admin'), ('encargado'), ('vendedor')`
        );
    } catch (error) {
        console.log(error);
    }
})();
