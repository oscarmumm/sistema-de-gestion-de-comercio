import * as SaleItemModel from '../models/SaleItemModel.js';

export const createSaleItemsController = async (req, res) => {
    try {
        const { saleId } = req.params;
        const items = req.body.items;

        const formattedItems = items.map((item) => ({
            sale_id: parseInt(saleId),
            product_id: item.product_id,
            quantity: item.quantity,
            discount: item.dicount || 0,
            price_type: item.price_type || null,
        }));

        await SaleItemModel.bulkInsert(formattedItems);
        return res
            .status(200)
            .json({ message: 'Ítems agregados correctamente' });
    } catch (error) {
        console.error('Error en saleItemController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getItemsBySaleIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const items = await SaleItemModel.getItemsBySaleId(id);
        return res.json(items);
    } catch (error) {
        console.error('Error en saleItemController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
