import pool from '../db.js';

(async () => {
    try {
        await pool.query(
            `INSERT INTO categories (name)
            VALUES ('Lápices'), ('Bolígrafos'), ('Marcadores'), ('Resaltadores'), ('Cuadernos'), ('Carpetas'), ('Hojas y repuestos'), ('Adhesivos'), ('Tijeras'), ('Reglas'), ('Correctores'), ('Mochilas'), ('Estuches'), ('Pinturas y témperas'), ('Crayones'), ('Papel de colores'), ('Notas adhesivas'), ('Calculadoras'), ('Portaminas'), ('Plastilina')`
        );
    } catch (error) {
        console.log(error);
    }
})();
