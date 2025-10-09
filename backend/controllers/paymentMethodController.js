import * as PaymentMethodModel from '../models/PaymentMethodModel.js';

export const createPaymentMethodController = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'El nombre del método de pago es obligatorio',
            });
        }
        if (typeof name === 'string') {
            name = name.trim();
        }

        if (name.length > 50) {
            return res.status(400).json({
                message:
                    'El nombre del método de pago no puede contener mas de 50 caracteres',
            });
        }
        const newPaymentMethod = await PaymentMethodModel.createPaymentMethod(
            name
        );
        return res.status(201).json(newPaymentMethod);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getAllPaymentMethodsController = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethodModel.getAllPaymentMethods();
        return res.json(paymentMethods);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getPaymentMethodByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentMethod = await PaymentMethodModel.getPaymentMethodById(id);
        return res.json(paymentMethod);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updatePaymentMethodController = async (req, res) => {
    console.log('ID recibido:', req.params.id);
    console.log('Body recibido:', req.body);
    try {
        const { id } = req.params;
        let { name, updated_by } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'El nombre del método de pago es obligatorio',
            });
        }
        if (typeof name === 'string') {
            name = name.trim();
        }
        if (name.length > 30) {
            return res.status(400).json({
                message:
                    'El nombre del método de pago no puede contener mas de 30 caracteres',
            });
        }
        const updatedPaymentMethod =
            await PaymentMethodModel.updatePaymentMethod(id, name, updated_by);
        if (!updatedPaymentMethod) {
            return res
                .status(404)
                .json({ message: 'Método de pago no encontrado' });
        }
        return res.status(200).json({
            message: 'Método de pago actualizado correctamente',
            updatedPaymentMethod,
        });
    } catch (error) {
        console.error('error en el catch', error);
        return res
            .status(500)
            .json({ message: 'Error al actualizar el método de pago' });
    }
};

export const deletePaymentMethodController = async (req, res) => {
    console.log('ID recibido:', req.params.id);
    console.log('Body recibido:', req.body);
    try {
        const { id } = req.params;
        const deletedPaymentMethod =
            await PaymentMethodModel.deletePaymentMethod(id);
        if (!deletedPaymentMethod) {
            return res
                .status(404)
                .json({ message: 'Método de pago no encontrado' });
        }
        return res.status(200).json({
            message: 'Método de pago eliminado correctamente',
            paymentMethod: deletedPaymentMethod,
        });
    } catch (error) {
        console.error('error en el catch', error);

        return res
            .status(500)
            .json({ message: 'Error al eliminar el método de pago' });
    }
};
