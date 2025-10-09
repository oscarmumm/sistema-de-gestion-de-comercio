import type { Brand } from '../types';

export const createBrand = async (name: string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/brands`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
        }),
    });
    const data = await res.json();
    return data;
};

export const getBrands = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/brands`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener las marcas');
    }
    const data = await res.json();
    return data.map((brand: Brand) => ({
        ...brand,
        created_at: new Date(brand.created_at),
        updated_at: brand.updated_at ? new Date(brand.updated_at) : null,
    }));
};

export const editBrand = async (brand: Brand) => {
    const token = sessionStorage.getItem('token');
    const rawUser = sessionStorage.getItem('user');
    if (!rawUser) return;
    const user = JSON.parse(rawUser);

    console.log(brand)
    const res = await fetch(
        `http://localhost:3000/api/brands/${brand.brand_id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: brand.name,
                updated_by: user.user_id,
            }),
        }
    );
    const data = await res.json();
    return data;
};

export const deleteBrand = async (brand: Brand) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(
        `http://localhost:3000/api/brands/${brand.brand_id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await res.json();
    return data;
};
