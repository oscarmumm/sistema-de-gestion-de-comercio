import { useEffect, useState } from 'react';
import { Input } from '../Input';
import type { Supplier } from '../../types';
import { MdClose } from 'react-icons/md';
import { editSupplier, deleteSupplier } from '../../api/suppliers';
import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';

interface SupplierModalProps {
    closeModal: () => void;
    supplier?: Supplier;
    fetchSuppliers: () => void;
}

export const SupplierModal = ({
    closeModal,
    supplier,
    fetchSuppliers,
}: SupplierModalProps) => {
    const [name, setName] = useState<string>('');
    const [editModeOn, setEditModeOn] = useState<boolean>(false);

    useEffect(() => {
        if (supplier) {
            setName(supplier.name);
        }
    }, [supplier]);

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
                    <h2 className="text-xl font-semibold">Editar proveedor</h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeModal} />
                    </button>
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
                                    if (supplier) {
                                        await editSupplier({
                                            ...supplier,
                                            name: name,
                                        });
                                        await fetchSuppliers();
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
                                    if (supplier) {
                                        await deleteSupplier(supplier);
                                        await fetchSuppliers();
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
