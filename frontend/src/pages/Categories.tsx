import { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';
import { NewCategoryModal } from '../components/modals/NewCategoryModal';
import { CategoryModal } from '../components/modals/CategoryModal';
import type { Category } from '../types';
import { AnimatePresence } from 'motion/react';

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    const openModal = (category: Category) => {
        setSelectedCategory(category);
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
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col min-w-xl max-w-6xl'>
            <div className='flex justify-between p-3'>
                <h2 className='text-center my-5 font-semibold text-xl'>
                    Categorías
                </h2>
                <button
                    className='p-3 my-3 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105'
                    onClick={openCreationModal}
                >
                    Nueva categoría
                </button>
            </div>
            <ul className='bg-slate-50 rounded-lg shadow-lg'>
                {categories?.map((category: Category) => (
                    <li
                        key={category.category_id}
                        className='p-3 text-center cursor-pointer hover:bg-indigo-100 border-b border-indigo-600 last:border-0'
                        onClick={() => openModal(category)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
            <AnimatePresence>
                {showEditModal && selectedCategory && (
                    <CategoryModal
                        category={selectedCategory}
                        closeModal={closeModal}
                        fetchCategories={fetchCategories}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showCreationModal && (
                    <NewCategoryModal
                        closeCreationModal={closeCreationModal}
                        fetchCategories={fetchCategories}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
