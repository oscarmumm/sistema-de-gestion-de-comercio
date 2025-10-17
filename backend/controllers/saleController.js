import * as SaleModel from '../models/SaleModel.js';

export const createSaleController = async (req, res) => {
    try {
        const { user_id, total, customer, payment_method_id } = req.body;
        if (!user_id || !total || !customer || !payment_method_id) {
            return res
                .status(400)
                .json({ message: 'Todos los campos son obligatorios' });
        }
        const newSale = await SaleModel.createSale(
            user_id,
            total,
            customer,
            payment_method_id
        );
        return res.status(200).json(newSale);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
