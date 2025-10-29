import * as StockEntryItemModel from '../models/StockEntryItemModel.js';

export const createStockEntryItemController = async (req, res) => {
    try {
        const { entryId } = req.params;
        const items = req.body.items;

        const formattedItems = items.map((item) => ({
            entry_id: parseInt(entryId),
            product_id: item.product_id,
            boxes: item.boxes,
        }));

        await StockEntryItemModel.bulkInsertEntries(formattedItems);
        return res
            .status(200)
            .json({ message: 'Ítems agregados correctamente' });
    } catch (error) {
        console.error('Error en createStockEntryItemController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
