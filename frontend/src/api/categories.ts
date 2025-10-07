import type { Category, LoggedUser } from '../types';

export const getCategories = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch('http://localhost:3000/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener categorías');
    }
    const data = await res.json();
    return data.map((category: Category) => ({
        ...category,
        created_at: new Date(category.created_at),
        updated_at: category.updated_at ? new Date(category.updated_at) : null,
    }));
};

export const editCategory = async (category: Category) => {
    const token = sessionStorage.getItem('token');
    const rawUser = sessionStorage.getItem('user');
    if (!rawUser) return;
    const user = JSON.parse(rawUser);

    const res = await fetch(
        `http://localhost:3000/api/categories/${category.category_id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: category.name,
                updated_by: user.username,
            }),
        }
    );
    const data = await res.json();
    return data;
};
