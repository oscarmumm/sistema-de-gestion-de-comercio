import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import type { Category } from '../../types';
import { MdClose } from 'react-icons/md';
import { editCategory, deleteCategory } from '../../api/categories';
import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';

interface CategoryModalProps {
    closeModal: () => void;
    category: Category;
    fetchCategories: () => void;
}

export const CategoryModal = ({
    closeModal,
    category,
    fetchCategories,
}: CategoryModalProps) => {
    const [name, setName] = useState<string>('');
    const [editModeOn, setEditModeOn] = useState<boolean>(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

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
                    <h2 className='text-xl font-semibold'>Editar categoría</h2>
                    <button className='text-3xl cursor-pointer self-end'>
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
                <div className='mb-10'>
                    <span className='font-semibold'>Fecha de creación: </span>
                    <span>{category.created_at.toDateString()}</span>
                    {category.updated_at && (
                        <div>
                            <span className='font-semibold'>Última edición: </span>
                            <span>{category.updated_at.toDateString()}</span>
                        </div>
                    )}
                </div>
                <form>
                    <Input
                        label='Nombre'
                        type='text'
                        disabled={!editModeOn}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
                    <div className='flex justify-end mt-10'>
                        {editModeOn ? null : (
                            <button
                                className='p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEditModeOn(true);
                                }}
                            >
                                Editar
                            </button>
                        )}
                        {editModeOn ? (
                            <button
                                className='p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105'
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if (category) {
                                        await editCategory({
                                            ...category,
                                            name: name,
                                        });
                                        await fetchCategories();
                                    }
                                    closeModal();
                                }}
                            >
                                Guardar
                            </button>
                        ) : null}
                        {editModeOn ? null : (
                            <button
                                className='p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105'
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if (category) {
                                        await deleteCategory(category);
                                        await fetchCategories();
                                    }
                                    closeModal();
                                }}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
