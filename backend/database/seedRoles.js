import pool from '../db.js';

export const seedRoles = async () => {
    try {
        await pool.query(
            `INSERT INTO roles (name)
            VALUES ('admin'), ('encargado'), ('vendedor')`
        );
    } catch (error) {
        console.log(error);
    }
};
