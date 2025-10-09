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
        <div className="flex flex-col">
            <div className="flex justify-between p-3">
                <h2 className="text-center my-5 font-semibold text-xl">
                    Categorías
                </h2>
                <button
                    className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105"
                    onClick={openCreationModal}>
                    Nueva categoría
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
                    {categories?.map((category) => (
                        <tr
                            className="cursor-pointer hover:bg-indigo-100"
                            key={category.category_id}
                            onClick={() => openModal(category)}>
                            <td className="p-3 border border-indigo-400">
                                {category.name}
                            </td>
                            <td className="p-3 border border-indigo-400">
                                {category.created_at.toDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
