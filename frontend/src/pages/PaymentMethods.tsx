import { useEffect, useState } from 'react';
import { getPaymentMethods } from '../api/paymentMethods';
import { NewPaymentMethodModal } from '../components/modals/NewPaymentMethodModal';
import { PaymentMethodModal } from '../components/modals/PaymentMethodModal';
import type { PaymentMethod } from '../types';
import { AnimatePresence } from 'motion/react';

export const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<PaymentMethod>();

    const openModal = (paymentMethod: PaymentMethod) => {
        setSelectedPaymentMethod(paymentMethod);
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowEditModal(false);
    };

    const openCreationModal = () => {
        setShowCreationModal(true);
    };

    const closeCreationModal = () => {
        setShowCreationModal(false);
    };

    useEffect(() => {
        fetchPaymentMethods();
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
        <div className='flex flex-col min-w-xl max-w-6xl'>
            <div className='flex justify-between p-3'>
                <h2 className='text-center my-5 font-bold text-2xl'>
                    Métodos de pago
                </h2>
                <button
                    className='p-3 my-3 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105'
                    onClick={openCreationModal}
                >
                    Nuevo método de pago
                </button>
            </div>
            <ul className='bg-slate-50 rounded-lg shadow-lg'>
                {paymentMethods?.map((paymentMethod: PaymentMethod) => (
                    <li
                        key={paymentMethod.payment_method_id}
                        className='p-3 text-center cursor-pointer hover:bg-indigo-100 border-b border-indigo-600 last:border-0'
                        onClick={() => openModal(paymentMethod)}
                    >
                        {paymentMethod.name}
                    </li>
                ))}
            </ul>
            <AnimatePresence>
                {showEditModal && selectedPaymentMethod && (
                    <PaymentMethodModal
                        paymentMethod={selectedPaymentMethod}
                        closeModal={closeModal}
                        fetchPaymentMethods={fetchPaymentMethods}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showCreationModal && (
                    <NewPaymentMethodModal
                        closeCreationModal={closeCreationModal}
                        fetchPaymentMethods={fetchPaymentMethods}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
