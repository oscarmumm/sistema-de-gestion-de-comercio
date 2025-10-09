import pool from '../db.js';

(async () => {
    try {
        await pool.query(
            `INSERT INTO brands (name)
            VALUES ('Maped'), ('Trabi'), ('Mooving'), ('Pelikan'), ('Faber-Castell'), ('Staedtler'), ('Bic'), ('Pilot'), ('Stabilo'), ('Lyra'), ('Crayola'), ('Pritt'), ('UHU'), ('Paper Mate'), ('Sharpie'), ('Post-it'), ('Tombow'), ('Derwent'), ('Cresko'), ('Capybara')`
        );
    } catch (error) {
        console.log(error);
    }
})();
