import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import { MdClose } from 'react-icons/md';
import type {
    StockEntryItemView,
    Supplier,
    StockEntryItem,
    GoodsReceipt,
} from '../../types';
import { useEffect, useState } from 'react';
import { getUserIdFromSession } from '../../utils/utils';
import { createStockEntry, getStockEntryById } from '../../api/stockEntry';
import {
    getStockEntryItemsByEntryId,
    insertStockEntryItems,
} from '../../api/stockEntryItems';
import { GoodsReceiptPDF } from '../GoodsReceiptPDF';
import { pdf } from '@react-pdf/renderer';

interface ConfirmStockEntryModalProps {
    total: number;
    closeModal: () => void;
    stockEntryItemsView: StockEntryItemView[];
    stockEntryItems: StockEntryItem[];
    clearStockEntryItems: () => void;
    successfulEntry: () => void;
    selectedSupplier: Pick<Supplier, 'supplier_id' | 'name'>;
    goodsReceipt: string;
}

export const ConfirmStockEntryModal = ({
    total,
    closeModal,
    stockEntryItemsView,
    stockEntryItems,
    clearStockEntryItems,
    successfulEntry,
    selectedSupplier,
    goodsReceipt,
}: ConfirmStockEntryModalProps) => {
    const [user, setUser] = useState<number>(0);
    const [receitpData, setReceiptData] = useState<GoodsReceipt>();

    useEffect(() => {
        setUser(getUserIdFromSession);
    }, []);

    const openReceipt = async (receitpData: GoodsReceipt) => {
        const blob = await pdf(
            <GoodsReceiptPDF receipt={receitpData} />
        ).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    const generateReceiptData = async (id: number) => {
        const entry = await fetchStockEntry(id);
        const entryItems = await fetchStockEntryItems(id);
        const data = { ...entry, products: entryItems };
        setReceiptData(data);
        openReceipt(data);
    };

    const fetchStockEntry = async (id: number) => {
        try {
            const entry = await getStockEntryById(id);
            return entry;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStockEntryItems = async (id: number) => {
        try {
            const entryItems = await getStockEntryItemsByEntryId(id);
            return entryItems;
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
                    <h2 className="text-xl font-semibold">Procesar Ingreso</h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
                <div className="mb-5">
                    <span className="font-semibold">Proveedor: </span>
                    <span>{selectedSupplier.name}</span>
                </div>
                <div className="mb-5">
                    <span className="font-semibold">
                        Número de comprobante:{' '}
                    </span>
                    <span>{goodsReceipt}</span>
                </div>
                <table className="text-center w-full shadow-lg overflow-hidden bg-slate-50 rounded-lg">
                    <thead className="border border-indigo-600 bg-indigo-600 text-slate-50">
                        <tr>
                            <th className="p-3">Cajas</th>
                            <th className="p-3">Producto</th>
                            <th className="p-3">Precio p/caja</th>
                            <th className="p-3">Total Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockEntryItemsView.map((item) => (
                            <tr
                                key={item.product_id}
                                className="border border-indigo-600">
                                <td className="p-3">{item.boxes}</td>
                                <td className="p-3">{item.product_name}</td>
                                <td className="p-3">${item.box_price}</td>
                                <td className="p-3">
                                    ${item.boxes * item.box_price}
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
                <button
                    className="p-3 my-3 mt-5 flex-1 max-h-12 self-end w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105"
                    onClick={async (e) => {
                        e.preventDefault();
                        const newEntry = {
                            total: total,
                            user_id: user,
                            supplier_id: selectedSupplier.supplier_id,
                            goods_receipt: goodsReceipt,
                        };
                        try {
                            const response = await createStockEntry(newEntry);
                            const entryId = response.newEntry.entry_id;
                            const saleItemsPayload = stockEntryItems.map(
                                (item: StockEntryItem) => ({
                                    entry_id: entryId,
                                    product_id: item.product_id,
                                    boxes: item.boxes,
                                })
                            );
                            await insertStockEntryItems({
                                entryId,
                                itemsArray: saleItemsPayload,
                            });
                            generateReceiptData(entryId);
                            clearStockEntryItems();
                            closeModal();
                            successfulEntry();
                        } catch (error) {
                            console.error(error);
                        }
                    }}>
                    Confirmar
                </button>
            </motion.div>
        </motion.div>
    );
};
