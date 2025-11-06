import pool from '../db.js';

export const bulkInsertEntries = async (itemsArray) => {
    try {
        const values = [];
        const placeholders = [];
        itemsArray.forEach((item, index) => {
            let i = index * 3;
            placeholders.push(`($${i + 1}, $${i + 2}, $${i + 3})`);
            values.push(item.entry_id, item.product_id, item.boxes);
        });

        const query = `INSERT INTO stock_entry_items (entry_id, product_id, boxes) VALUES ${placeholders.join(
            ', '
        )} RETURNING *`;

        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

export const createStockEntryItem = async (product_id, entry_id, boxes) => {
    try {
        const result = await pool.query(
            'INSERT INTO product_entries_items (product_id, entry_id, boxes) VALUES ($1, $2, $3) RETURNING *',
            [product_id, entry_id, boxes]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getStockEntriesByEntryId = async (entry_id) => {
    try {
        const result = await pool.query(
            'SELECT products.product_id, name, unit_cost, boxes, units_per_box FROM stock_entry_items JOIN products ON products.product_id = stock_entry_items.product_id WHERE entry_id = $1',
            [entry_id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error en stockEntryItemModel: ', error);
        throw error;
    }
};

export const getTotalBoxesByProduct = async (product_id) => {};

export const getEntriesByProduct = async (product_id) => {};

export const updateItem = async (entry_id, product_id, boxes) => {};

export const deleteItem = async (id) => {};
