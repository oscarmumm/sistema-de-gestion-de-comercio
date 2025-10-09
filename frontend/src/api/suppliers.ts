import type { Supplier } from '../types';

export const createSupplier = async (name: string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/suppliers`, {
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

export const getSuppliers = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/suppliers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener los proveedores');
    }
    const data = await res.json();
    return data.map((supplier : Supplier) => ({
        ...supplier,
        created_at: new Date(supplier.created_at),
        updated_at: supplier.updated_at ? new Date(supplier.updated_at) : null,
    }));
};

export const editSupplier = async (supplier : Supplier) => {
    const token = sessionStorage.getItem('token');
    const rawUser = sessionStorage.getItem('user');
    if (!rawUser) return;
    const user = JSON.parse(rawUser);

    const res = await fetch(
        `http://localhost:3000/api/suppliers/${supplier.supplier_id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: supplier.name,
                updated_by: user.user_id,
            }),
        }
    );
    const data = await res.json();
    return data;
};

export const deleteSupplier = async (supplier : Supplier) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(
        `http://localhost:3000/api/suppliers/${supplier.supplier_id}`,
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
