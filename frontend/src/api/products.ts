import type { Product } from '../types';

type createProductProps = Pick<
    Product,
    | 'category_id'
    | 'brand_id'
    | 'name'
    | 'description'
    | 'stock'
    | 'unit_cost'
    | 'sale_price'
    | 'units_per_box'
>;

export const createProduct = async ({
    category_id,
    brand_id,
    name,
    description,
    stock,
    unit_cost,
    sale_price,
    units_per_box,
}: createProductProps) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            category_id: category_id,
            brand_id: brand_id,
            name: name,
            description: description,
            stock: stock,
            unit_cost: unit_cost,
            sale_price: sale_price,
            units_per_box: units_per_box,
        }),
    });
    const data = await res.json();
    return data;
};

export const getAllProducts = async () => {
    const token = sessionStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener los productos');
    }
    const data = await res.json();
    return data.map((product: Product) => ({
        ...product,
        created_at: new Date(product.created_at),
        updated_at: product.updated_at ? new Date(product.updated_at) : null,
    }));
};

export const getPaginatedProducts = async (page: number = 1, pageSize: number = 20) => {
    const token = sessionStorage.getItem('token');
    const res = await fetch(
        `http://localhost:3000/api/products?page=${page}&pageSize=${pageSize}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        throw new Error('Error al obtener los productos');
    }
    const data = await res.json();
    return {
        ...data,
        products: data.products.map((product: Product) => ({
            ...product,
            created_at: new Date(product.created_at),
            updated_at: product.updated_at
                ? new Date(product.updated_at)
                : null,
        })),
    };
};

export const updateProduct = async (product: Product) => {
    const token = sessionStorage.getItem('token');
    const rawUser = sessionStorage.getItem('user');
    if (!rawUser) return;
    const user = JSON.parse(rawUser);

    const res = await fetch(
        `
        http://localhost:3000/api/products/${product.product_id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                category_id: product.category_id,
                brand_id: product.brand_id,
                name: product.name,
                description: product.description,
                stock: product.stock,
                unit_cost: product.unit_cost,
                sale_price: product.sale_price,
                units_per_box: product.units_per_box,
                updated_by: user.user_id,
            }),
        }
    );
    const data = await res.json();
    return data;
};

export const deleteProduct = async (product: Product) => {
    const token = sessionStorage.getItem('token');
    const res = await fetch(
        `
        http://localhost:3000/api/products/${product.product_id}`,
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
