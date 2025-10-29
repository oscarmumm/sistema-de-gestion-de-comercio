import { useState, useEffect } from 'react';
import type { Brand } from '../types';
import { getBrands } from '../api/brands';
import { NewBrandModal } from '../components/modals/NewBrandModal';
import { BrandModal } from '../components/modals/BrandModal';
import { AnimatePresence } from 'motion/react';

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
        <div className='flex flex-col min-w-xl max-w-6xl'>
            <div className='flex justify-between p-3'>
                <h2 className='text-center my-5 font-semibold text-xl'>
                    Marcas
                </h2>
                <button
                    className='p-3 my-3 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105'
                    onClick={openCreationModal}
                >
                    Nueva marca
                </button>
            </div>
            <ul className='bg-slate-50 rounded-lg shadow-lg'>
                {brands?.map((brand: Brand) => (
                    <li
                        key={brand.brand_id}
                        className='p-3 text-center cursor-pointer hover:bg-indigo-100 border-b border-indigo-600 last:border-0'
                        onClick={() => openModal(brand)}
                    >
                        {brand.name}
                    </li>
                ))}
            </ul>
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
