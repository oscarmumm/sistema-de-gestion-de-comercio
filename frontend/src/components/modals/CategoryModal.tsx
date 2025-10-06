import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import type { Category } from '../../types';
import { MdClose } from 'react-icons/md';

interface CategoryModalProps {
    closeModal: () => void;
    category?: Category;
}

export const CategoryModal = ({
    closeModal,
    category,
}: CategoryModalProps) => {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);
    
    return (
        <div className="modal">
            <div className='p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100'>
                <button className='text-3xl cursor-pointer self-end'>
                    <MdClose onClick={closeModal} />
                </button>
                <form>
                    <Input
                        label="nombre"
                        type="text"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
                </form>
            </div>
        </div>
    );
};
