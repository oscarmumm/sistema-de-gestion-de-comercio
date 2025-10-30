import * as SaleModel from '../models/SaleModel.js';

export const createSaleController = async (req, res) => {
    try {
        const { user_id, total, customer, payment_method_id } = req.body;
        if (!user_id || !total || !customer || !payment_method_id) {
            return res
                .status(400)
                .json({ message: 'Parámetros faltantes' });
        }
        const newSale = await SaleModel.createSale(
            user_id,
            total,
            customer,
            payment_method_id
        );
        return res.status(200).json({newSale});
    } catch (error) {
        console.error('Error en createSaleController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getSalesByDayController = async (req, res) => {
    try {
        const { from, until } = req.query;
        if (
            !from ||
            !until ||
            isNaN(Date.parse(from)) ||
            isNaN(Date.parse(until))
        ) {
            return res.status(400).json({ message: 'Fechas inválidas' });
        }
        if (new Date(from) > new Date(until)) {
            return res
                .status(400)
                .json({ message: 'El orden desde/hasta es incorrecto' });
        }
        const fromTimestamp = `${from}T00:00:00`;
        const untilTimestamp = `${until}T23:59:59`;
        const sales = await SaleModel.getSalesByDay(
            fromTimestamp,
            untilTimestamp
        );
        if (sales.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron ventas en ese rango de fechas',
                data: [],
            });
        }
        return res.status(200).json({data: sales});
    } catch (error) {
        console.error('Error en getSalesByDateController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getProductsSoldByDateController = async (req, res) => {
    try {
        const { from, until } = req.query;
        if (
            !from ||
            !until ||
            isNaN(Date.parse(from)) ||
            isNaN(Date.parse(until))
        ) {
            return res.status(400).json({ message: 'Fechas inválidas' });
        }
        if (new Date(from) > new Date(until)) {
            return res
                .status(400)
                .json({ message: 'El orden desde/hasta es incorrecto' });
        }
        const fromTimestamp = `${from}T00:00:00`;
        const untilTimestamp = `${until}T23:59:59`;
        const products = await SaleModel.getProductsSoldByDate(
            fromTimestamp,
            untilTimestamp
        );
        if (products.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron ventas en ese rango de fechas',
                data: [],
            });
        }
        return res.status(200).json({data: products});
    } catch (error) {
        console.error('Error en getSalesByDateController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
