import { useState, useEffect } from 'react';
import type { Brand } from '../types';
import { getBrands } from '../api/brands';
import { NewBrandModal } from '../components/modals/NewBrandModal';
import { BrandModal } from '../components/modals/BrandModal';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';

export const Brands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand>();

    const openModal = (brand: Brand) => {
        setSelectedBrand(brand);
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
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const data = await getBrands();
            setBrands(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between p-3">
                <h2 className="text-center my-5 font-semibold text-xl">
                    Marcas
                </h2>
                <button
                    className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105"
                    onClick={openCreationModal}>
                    Nueva marca
                </button>
            </div>
            <table className="text-center shadow-lg overflow-hidden">
                <thead className="border border-indigo-400 bg-indigo-400 text-slate-50">
                    <tr>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Creada</th>
                    </tr>
                </thead>
                <tbody>
                    {brands?.map((brand) => (
                        <tr
                            className="cursor-pointer hover:bg-indigo-100"
                            key={brand.brand_id}
                            onClick={() => openModal(brand)}>
                            <td className="p-3 border border-indigo-400">
                                {brand.name}
                            </td>
                            <td className="p-3 border border-indigo-400">
                                {brand.created_at.toDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AnimatePresence>
                {showEditModal && selectedBrand && (
                    <BrandModal
                        brand={selectedBrand}
                        closeModal={closeModal}
                        fetchBrands={fetchBrands}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showCreationModal && (
                    <NewBrandModal
                        closeCreationModal={closeCreationModal}
                        fetchBrands={fetchBrands}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
