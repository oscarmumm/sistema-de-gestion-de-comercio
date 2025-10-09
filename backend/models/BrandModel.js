import pool from '../db.js';

export const createBrand = async (name) => {
    try {
        const result = await pool.query(
            'INSERT INTO brands (name) VALUES ($1) RETURNING *',
            [name]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getAllBrands = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM brands ORDER BY name ASC'
        );
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const getBrandById = async (brand_id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM brands WHERE brand_id = $1',
            [brand_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const updateBrand = async (brand_id, name, updated_by) => {
    try {
        const result = await pool.query(
            'UPDATE brands SET name = $1, updated_at = NOW(), updated_by = $2 WHERE brand_id = $3 RETURNING *',
            [name, updated_by, brand_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const deleteBrand = async (brand_id) => {
    try {
        const result = await pool.query(
            'DELETE FROM brands WHERE brand_id = $1 RETURNING *',
            [brand_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};
