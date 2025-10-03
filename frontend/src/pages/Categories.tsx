import { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';
import { BsPencilSquare } from 'react-icons/bs';
import { BsFillTrash3Fill } from 'react-icons/bs';

interface Category {
    category_id: number;
    name: string;
    created_at: string;
}

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className='flex flex-col'>
            <h2 className='text-center my-5 font-semibold text-xl'>
                Categorías
            </h2>
            <table className='text-center shadow-lg overflow-hidden'>
                <thead className='border border-indigo-400 bg-indigo-400 text-slate-50'>
                    <tr>
                        <th className='p-3'>Nombre</th>
                        <th className='p-3'>Creada</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((category) => (
                        <tr
                            className='cursor-pointer hover:bg-indigo-100'
                            key={category.category_id}
                        >
                            <td className='p-3 border border-indigo-400'>
                                {category.name}
                            </td>
                            <td className='p-3 border border-indigo-400'>
                                {category.created_at}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
