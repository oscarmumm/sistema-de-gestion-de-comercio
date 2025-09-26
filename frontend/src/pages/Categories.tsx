import { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';

interface Category {
    id: number;
    name: string;
}

export const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchCategories()
    }, []);

    return <div>
        <h2>Categories</h2>
        <ul>
            {
                categories?.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))
            }
        </ul>
    </div>;
};
