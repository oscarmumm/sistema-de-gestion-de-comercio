import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import {
    MdWarning,
    MdInfo,
    MdReport,
    MdCheckCircle,
} from 'react-icons/md';

interface NotificationModalProps {
    message: string;
    closeModal: () => void;
    notificationType: string;
}

export const NotificationModal = ({
    message,
    closeModal,
    notificationType,
}: NotificationModalProps) => {
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
                <div className='flex flex-col items-center justify-center'>
                    <div className='text-6xl'>
                        {notificationType === 'warning' && (
                            <MdWarning className='text-amber-300' />
                        )}
                        {notificationType === 'error' && (
                            <MdReport className='text-red-600' />
                        )}
                        {notificationType === 'success' && (
                            <MdCheckCircle className='text-emerald-600' />
                        )}
                        {notificationType === 'info' && (
                            <MdInfo className='text-sky-600' />
                        )}
                    </div>
                    <h2 className='text-xl font-semibold'>{message}</h2>
                </div>
            </motion.div>
        </motion.div>
    );
};
