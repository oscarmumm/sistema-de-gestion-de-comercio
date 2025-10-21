import * as ProductEntryHeaderModel from '../models/ProductEntryHeaderModel.js';

export const createProductEntryHeaderController = async (req, res) => {
    try {
        const { user_id, supplier_id, entry_date } = req.body;
        if(!user_id || !supplier_id|| !entry_date){
            return res.status(400).json({message: 'Parámetros faltantes'})
        }
    } catch (error) {
        console.error('Error en createProductEntryController', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
