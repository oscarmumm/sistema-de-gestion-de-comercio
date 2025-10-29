import * as StockEntriesModel from '../models/StockEntryModel.js';

export const createStockEntriesController = async (req, res) => {
    try {
        const { user_id, supplier_id, goods_receipt } = req.body;
        console.log(user_id, supplier_id, goods_receipt)
        if (!user_id || !supplier_id || !goods_receipt) {
            return res.status(400).json({ message: 'Parámetros faltantes' });
        }
        const newEntry = await StockEntriesModel.createStockEntry(
            user_id,
            supplier_id,
            goods_receipt
        );
        return res.status(200).json({ newEntry });
    } catch (error) {
        console.error('Error en stockEntriesController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
