import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import { MdClose } from 'react-icons/md';
import type { SaleItemView, SaleItem, PaymentMethod } from '../../types';
import { useEffect, useState } from 'react';
import { getPaymentMethods } from '../../api/paymentMethods';
import { getUserIdFromSession } from '../../utils/utils';
import { createSale } from '../../api/sales';
import { insertSaleItems } from '../../api/saleItems';
import { Input } from '../Input';

interface PaymentModalProps {
    total: number;
    closeModal: () => void;
    saleItemsView: SaleItemView[];
    saleItems: SaleItem[];
    clearSaleItems: () => void;
    successfulSale: () => void;
}

type PaymentMethodSelection = Pick<PaymentMethod, 'name' | 'payment_method_id'>;

export const PaymentModal = ({
    total,
    closeModal,
    saleItemsView,
    saleItems,
    clearSaleItems,
    successfulSale
}: PaymentModalProps) => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [user, setUser] = useState<number>(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<PaymentMethodSelection>({
            payment_method_id: 0,
            name: 'Sin método seleccionado',
        });
    const [customer, setCustomer] = useState<string>('');

    useEffect(() => {
        fetchPaymentMethods();
        setUser(getUserIdFromSession);
    }, []);

    const fetchPaymentMethods = async () => {
        try {
            const data = await getPaymentMethods();
            setPaymentMethods(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div
            className="modal"
            variants={modalBackgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}>
            <motion.div
                className="p-5 flex flex-col w-3xl shadow-lg rounded-lg bg-slate-100"
                variants={modalFormVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}>
                <div className="flex justify-between mb-12">
                    <h2 className="text-xl font-semibold">Procesar Compra</h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
                <div className="flex">
                    <table className="text-center w-full shadow-lg overflow-hidden bg-slate-50 rounded-lg">
                        <thead className="border border-indigo-600 bg-indigo-600 text-slate-50">
                            <tr>
                                <th className="p-3">Cantidad</th>
                                <th className="p-3">Producto</th>
                                <th className="p-3">Precio Unitario</th>
                                <th className="p-3">Total Producto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleItemsView.map((item) => (
                                <tr
                                    key={item.product_id}
                                    className="border border-indigo-600">
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">{item.product_name}</td>
                                    <td className="p-3">${item.unit_price}</td>
                                    <td className="p-3">
                                        ${item.quantity * item.unit_price}
                                    </td>
                                </tr>
                            ))}
                            <tr className="border border-t-slate-50 border-indigo-600 bg-indigo-600 text-slate-50 font-bold">
                                <td className="p-3" colSpan={3}>
                                    Total
                                </td>
                                <td className="p-3">${total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <form className="ml-10 flex flex-col p-3">
                        <label className="px-1">Método de pago</label>
                        <select
                            className="p-3 my-3 outline-none shadow-lg rounded-lg bg-white"
                            name="payment_method_id"
                            value={selectedPaymentMethod?.payment_method_id}
                            onChange={(e) => {
                                const selectedId = Number(e.target.value);
                                const method = paymentMethods.find(
                                    (m) => m.payment_method_id === selectedId
                                );
                                if (method) setSelectedPaymentMethod(method);
                            }}>
                            <option>Seleccionar método de pago</option>
                            {paymentMethods?.map((method) => (
                                <option
                                    key={method.payment_method_id}
                                    value={method.payment_method_id}>
                                    {method.name}
                                </option>
                            ))}
                        </select>
                        <Input
                            label="Cliente"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                        />
                        <button
                            className="p-3 my-3 flex-1 max-h-12 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105"
                            onClick={async (e) => {
                                e.preventDefault();
                                const newSale = {
                                    total: total,
                                    customer: customer || 'Consumidor Final',
                                    payment_method_id:
                                        selectedPaymentMethod.payment_method_id,
                                    user_id: user,
                                };
                                try {
                                    const response = await createSale(newSale);
                                    const saleId = response.newSale.sale_id;
                                    const saleItemsPayload = saleItems.map(
                                        (item) => ({
                                            sale_id: saleId,
                                            product_id: item.product_id,
                                            quantity: item.quantity,
                                            discount: item.discount || 0,
                                            price_type: item.price_type || '',
                                        })
                                    );
                                    await insertSaleItems({
                                        saleId,
                                        itemsArray: saleItemsPayload,
                                    });
                                    setSelectedPaymentMethod({
                                        payment_method_id: 0,
                                        name: 'Sin método seleccionado',
                                    });
                                    setCustomer('');
                                    clearSaleItems();
                                    closeModal();
                                    successfulSale();
                                } catch (error) {
                                    console.error(error);
                                }
                            }}>
                            Confirmar Pago
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};
