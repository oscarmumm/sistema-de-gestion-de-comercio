import pool from '../db.js';

(async () => {
    try {
        await pool.query(
            `INSERT INTO categories (name)
            VALUES ('lapiceras'), ('lápices'), ('mapas')`
        );
    } catch (error) {
        console.log(error);
    }
})();
