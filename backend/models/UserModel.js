import pool from '../db';
import bcrypt from 'bcrypt';

export const createUser = async (
    role_id,
    name,
    surname,
    username,
    password,
    updated_by = null
) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (role_id, name, surname, username, password, updated_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [role_id, name, surname, username, hashedPassword, updated_by]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM users ORDER BY username ASC'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (
    user_id,
    role_id,
    name,
    surname,
    username,
    password,
    updated_by
) => {
    try {
        let query = '';
        let params = [];
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query =
                'UPDATE users SET role_id = $1, name = $2, surname = $3, username = $4, password = $5, updated_by = $6 WHERE user_id = $7 RETURNING *';
            params = [
                role_id,
                name,
                surname,
                username,
                hashedPassword,
                updated_by,
                user_id,
            ];
        } else {
            query =
                'UPDATE users SET role_id = $1, name = $2, surname = $3, username = $4, updated_by = $5 WHERE user_id = $6 RETURNING *';
            params = [role_id, name, surname, username, updated_by, user_id];
        }
        const result = await pool.query(query, params);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (user_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM users WHERE user_id = $1 RETURNING *',
            [user_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
