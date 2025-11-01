import type { SaleItemView } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import { Input } from '../Input';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useNotificationModal } from '../../hooks/useNotification';
import { NotificationModal } from './NotificationModal';

interface EditItemOnSaleModalProps {
    item: SaleItemView | undefined;
    closeModal: () => void;
    editItem: (item: SaleItemView, itemQuantity: number) => void;
}

export const EditItemOnSaleModal = ({
    item,
    closeModal,
    editItem,
}: EditItemOnSaleModalProps) => {
    const [itemQuantity, setItemQuantity] = useState<number | undefined>(
        item && item.quantity
    );

    const {
        notificationModalMsg,
        notificationModalType,
        notificationModalActive,
        showNotification,
    } = useNotificationModal();

    if (itemQuantity && item && itemQuantity > item.current_stock) {
        setItemQuantity(item.current_stock);
        showNotification(
            `Stock insuficiente. Stock disponible: ${item.current_stock}`,
            'error'
        );
    }

    return (
        <motion.div
            className="modal"
            variants={modalBackgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}>
            <motion.div
                className="p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100"
                variants={modalFormVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}>
                <div className="flex justify-between mb-12">
                    <h2 className="text-xl font-semibold">
                        {item && item.product_name}
                    </h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
                <Input
                    label="Editar cantidad"
                    type="number"
                    min={0}
                    value={itemQuantity ?? ''}
                    onChange={(e) => {
                        e.target.value === ''
                            ? setItemQuantity(undefined)
                            : setItemQuantity(parseInt(e.target.value));
                    }}
                />
                <button
                    className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                    onClick={() => {
                        item && itemQuantity && editItem(item, itemQuantity);
                        closeModal();
                    }}>
                    Guardar
                </button>
            </motion.div>
            <AnimatePresence>
                {notificationModalActive && (
                    <NotificationModal
                        message={notificationModalMsg}
                        notificationType={notificationModalType}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
