import { useEffect, useState } from 'react';
import { getSuppliers } from '../api/suppliers';
import { NewSupplierModal } from '../components/modals/NewSupplierModal';
import { SupplierModal } from '../components/modals/SupplierModal';
import type { Supplier } from '../types';
import { AnimatePresence } from 'motion/react';

export const Suppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier>();

    const openModal = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
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
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col min-w-xl max-w-6xl'>
            <div className='flex justify-between p-3'>
                <h2 className='text-center my-5 font-semibold text-xl'>
                    Proveedores
                </h2>
                <button
                    className='p-3 my-3 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105'
                    onClick={openCreationModal}
                >
                    Nuevo proveedor
                </button>
            </div>
            <ul className='bg-slate-50 rounded-lg shadow-lg'>
                {suppliers?.map((supplier: Supplier) => (
                    <li
                        key={supplier.supplier_id}
                        className='p-3 text-center cursor-pointer hover:bg-indigo-100 border-b border-indigo-600 last:border-0'
                        onClick={() => openModal(supplier)}
                    >
                        {supplier.name}
                    </li>
                ))}
            </ul>
            <AnimatePresence>
                {showEditModal && selectedSupplier && (
                    <SupplierModal
                        supplier={selectedSupplier}
                        closeModal={closeModal}
                        fetchSuppliers={fetchSuppliers}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showCreationModal && (
                    <NewSupplierModal
                        closeCreationModal={closeCreationModal}
                        fetchSuppliers={fetchSuppliers}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
