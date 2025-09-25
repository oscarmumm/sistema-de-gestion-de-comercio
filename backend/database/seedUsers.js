import pool from '../db.js';
import bcrypt from 'bcrypt';

(async () => {
    try {
        const passwordAdmin = await bcrypt.hash('admin1234', 10);
        const passwordEncargado = await bcrypt.hash('encargado1234', 10);
        const passwordVendedor = await bcrypt.hash('vendedor1234', 10);

        const insertUserQuery =
            'INSERT INTO users (role_id, name, surname, username, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())';

        await pool.query(insertUserQuery, [
            1,
            'Nick',
            'Valentine',
            'nickvalentine',
            passwordAdmin,
        ]);
        console.log('Usuario Nick insertado')
        
        await pool.query(insertUserQuery, [
            2,
            'Piper',
            'Wright',
            'piperwright',
            passwordEncargado,
        ]);
        console.log('Usuario Piper insertado')
        
        await pool.query(insertUserQuery, [
            3,
            'Preston',
            'Garvey',
            'prestongarvey',
            passwordVendedor,
        ]);
        console.log('Usuario preston insertado')
        
    } catch (error) {
        console.log(error);
    } finally {
        await pool.end();
    }
})();
