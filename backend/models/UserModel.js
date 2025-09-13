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

export const updateUser = async (user_id, fields) => {
    try {
        if (fields.password) {
            fields.password = await bcrypt.hash(fields.password, 10);
        }
        // estas variables las uso para hacer la query dinámicamente, por si solo se desean cambiar algunos campos
        const setClauses = [];
        const values = [];
        let index = 1;
        // para eso uso un ciclo for
        for (const [key, value] of Object.entries(fields)) {
            setClauses.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }
        // si no hay campos a modificar devolvemos null
        if (setClauses.length === 0) {
            return null;
        }
        // acá formamos la query dinámicamente
        const query = `UPDATE users SET ${setClauses.join(
            ', '
        )} WHERE user_id = $${index} RETURNING *`;
        values.push(user_id);
        const result = await pool.query(query, values);
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
