import pool from './db.js';

async function testUsers() {
    const result = await pool.query('SELECT * FROM users');
    console.log(result.rows);
}

testUsers();
