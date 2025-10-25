import * as StockEntriesModel from '../models/StockEntryModel.js';

export const createStockEntriesController = async (req, res) => {
    try {
        const { user_id, supplier_id, entry_date } = req.body;
        if (!user_id || !supplier_id || !entry_date) {
            return res.status(400).json({ message: 'Parámetros faltantes' });
        }
        const newEntry = await StockEntriesModel.createStockEntry(
            user_id,
            supplier_id,
            entry_date
        );
        return res.stauts(200).json({ newEntry });
    } catch (error) {
        console.error('Error en createProductEntryController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
