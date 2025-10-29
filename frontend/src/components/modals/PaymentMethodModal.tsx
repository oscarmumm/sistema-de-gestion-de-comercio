import { useEffect, useState } from 'react';
import { Input } from '../Input';
import type { PaymentMethod } from '../../types';
import { MdClose } from 'react-icons/md';
import {
    editPaymentMethod,
    deletePaymentMethod,
} from '../../api/paymentMethods';
import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';

interface PaymentMethodModalProps {
    closeModal: () => void;
    paymentMethod: PaymentMethod;
    fetchPaymentMethods: () => void;
}

export const PaymentMethodModal = ({
    closeModal,
    paymentMethod,
    fetchPaymentMethods,
}: PaymentMethodModalProps) => {
    const [name, setName] = useState<string>('');
    const [editModeOn, setEditModeOn] = useState<boolean>(false);
    

    useEffect(() => {
        if (paymentMethod) {
            setName(paymentMethod.name);
        }
    }, [paymentMethod]);

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
                        Editar métodos de pago
                    </h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
                <div className='mb-10'>
                    <span className='font-semibold'>Fecha de creación: </span>
                    <span>{paymentMethod.created_at.toDateString()}</span>
                    {paymentMethod.updated_at && (
                        <div>
                            <span className='font-semibold'>Última edición: </span>
                            <span>{paymentMethod.updated_at.toDateString()}</span>
                        </div>
                    )}
                </div>
                <form>
                    <Input
                        label="Nombre"
                        type="text"
                        disabled={!editModeOn}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
                    <div className="flex justify-end mt-10">
                        {editModeOn ? null : (
                            <button
                                className="p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEditModeOn(true);
                                }}>
                                Editar
                            </button>
                        )}
                        {editModeOn ? (
                            <button
                                className="p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if (paymentMethod) {
                                        await editPaymentMethod({
                                            ...paymentMethod,
                                            name: name,
                                        });
                                        await fetchPaymentMethods();
                                    }
                                    closeModal();
                                }}>
                                Guardar
                            </button>
                        ) : null}
                        {editModeOn ? null : (
                            <button
                                className="p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if (paymentMethod) {
                                        await deletePaymentMethod(
                                            paymentMethod
                                        );
                                        await fetchPaymentMethods();
                                    }
                                    closeModal();
                                }}>
                                Eliminar
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
