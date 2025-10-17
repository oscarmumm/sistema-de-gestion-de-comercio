import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import { MdClose } from 'react-icons/md';

interface PaymentModalProps {
    total: number;
    closeModal: () => void;
}

export const PaymentModal = ({ total, closeModal }: PaymentModalProps) => {
    return (
        <motion.div
            className='modal'
            variants={modalBackgroundVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className='p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100'
                variants={modalFormVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ duration: 0.2 }}
            >
                <div className='flex justify-between mb-12'>
                    <h2 className='text-xl font-semibold'>Editar marca</h2>
                    <button className='text-3xl cursor-pointer self-end'>
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};
