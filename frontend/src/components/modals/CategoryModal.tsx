import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import type { Category } from '../../types';
import { MdClose } from 'react-icons/md';
import { editCategory } from '../../api/categories';

interface CategoryModalProps {
    closeModal: () => void;
    category?: Category;
}

export const CategoryModal = ({ closeModal, category }: CategoryModalProps) => {
    const [name, setName] = useState<string>('');
    const [editModeOn, setEditModeOn] = useState<boolean>(true);

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

    return (
        <div className="modal">
            <div className="p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100">
                <button className="text-3xl cursor-pointer self-end">
                    <MdClose onClick={closeModal} />
                </button>
                <form>
                    <Input
                        label="nombre"
                        type="text"
                        disabled={editModeOn}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
                    <div className="flex justify-evenly mt-10">
                        {editModeOn ? (
                            <button
                                className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEditModeOn(false);
                                }}>
                                Editar
                            </button>
                        ) : null}
                        {editModeOn ? null : (
                            <button
                                className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    category &&
                                        editCategory({
                                            ...category,
                                            name: name,
                                        });
                                }}>
                                Guardar
                            </button>
                        )}
                        <button
                            className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                closeModal();
                            }}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
