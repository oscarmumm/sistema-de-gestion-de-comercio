import pool from '../db.js';

export const seedPaymentMethods = async () => {
    try {
        await pool.query(
            `INSERT INTO payment_methods (name)
            VALUES ('Visa'), ('Mastercard'), ('American Express'), ('Mercado Pago'), ('MODO'), ('Naranja X'), ('Ualá'), ('Prex'), ('PayPal'), ('Google Pay'), ('Apple Pay'), ('Débito Maestro'), ('Tarjeta Alimentar'), ('Cuenta DNI'), ('Transferencia Bancaria')`
        );
    } catch (error) {
        console.log(error);
    }
};
