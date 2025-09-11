import pool from '../db';

export const createRole = async (role_name, updated_by = null) => {
    try {
        const result = await pool.query(
            'INSERT INTO roles (role_id, role_name, updated_by) VALUES ($1, NOW(), $2) RETURNING *',
            [role_name, updated_by]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllRoles = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM roles ORDER BY role_id ASC'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (role_id, role_name, updated_by) => {
    try {
        const result = await pool.query(
            'UPDATE roles SET role_name = $1, updated_at = NOW(), updated_by = $2 WHERE role_id = $3 RETURNING *',
            [role_name, updated_by, role_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (role_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM roles WHERE role_id = $1 RETURNING *',
            [role_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
