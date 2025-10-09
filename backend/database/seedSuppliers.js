import pool from '../db.js';

(async () => {
    try {
        await pool.query("SET client_encoding TO 'UTF8'");

        await pool.query(
            `INSERT INTO suppliers (name)
            VALUES ('Papelería Sur'), ('Distribuidora Águila'), ('Grupo Librarte'), ('Soluciones Escolares'), ('Proveedora Delta'), ('Central de Útiles'), ('Librería Mayorista Norte'), ('Comercial Prisma'), ('Distribuciones Andina'), ('Papelería Express')`
        );
    } catch (error) {
        console.log(error);
    }
})();
