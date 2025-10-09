import { useState } from 'react';
import { Input } from '../Input';
import { MdClose } from 'react-icons/md';
import { createCategory } from '../../api/categories';
import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';

interface NewCategoryModalProps {
    closeCreationModal: () => void;
    fetchCategories: () => void;
}

export const NewCategoryModal = ({
    closeCreationModal,
    fetchCategories,
}: NewCategoryModalProps) => {
    const [name, setName] = useState<string>('');

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
                    <h2 className="text-xl font-semibold">Nueva categoría</h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeCreationModal} />
                    </button>
                </div>
                <form>
                    <Input
                        label="Nombre"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex justify-end mt-10">
                        <button
                            className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                            onClick={async (e) => {
                                e.preventDefault();
                                await createCategory(name);
                                await fetchCategories();
                                closeCreationModal();
                            }}>
                            Guardar
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
