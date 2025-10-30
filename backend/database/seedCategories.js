import pool from '../db.js';

export const seedCategories = async () => {
    try {
        await pool.query(
            `INSERT INTO categories (name)
            VALUES 
            ('Lápices'),
            ('Cuadernos'),
            ('Gomas'),
            ('Marcadores'),
            ('Carpetas'),
            ('Adhesivos'),
            ('Tijeras'),
            ('Reglas'),
            ('Mochilas');`
        );
    } catch (error) {
        console.log(error);
    }
};
