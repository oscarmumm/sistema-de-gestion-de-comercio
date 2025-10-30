import type { Sale } from '../types';

type createSaleProps = Pick<
    Sale,
    'user_id' | 'total' | 'customer' | 'payment_method_id'
>;

type getSalesByDayProps = {
    from: string;
    until: string;
};

export const createSale = async ({
    user_id,
    total,
    customer,
    payment_method_id,
}: createSaleProps) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/sales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            user_id: user_id,
            total: total,
            customer: customer,
            payment_method_id: payment_method_id,
        }),
    });
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error al crear venta ${errorMsg}`);
    }
    const data = await res.json();
    return data;
};

export const getSalesByDay = async ({ from, until }: getSalesByDayProps) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(
        `http://localhost:3000/api/sales/daily?from=${from}&until=${until}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error al obtener los datos de ventas: ${errorMsg}`);
    }
    const data = await res.json();
    return data;
};

export const getPaymentMethodsByDate = async ({ from, until }: getSalesByDayProps) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(
        `http://localhost:3000/api/sales/daily/payment-methods?from=${from}&until=${until}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error al obtener los datos de ventas: ${errorMsg}`);
    }
    const data = await res.json();
    return data;
};

export const getProductsSoldByDate = async ({ from, until }: getSalesByDayProps) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(
        `http://localhost:3000/api/sales/daily/products?from=${from}&until=${until}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error al obtener los datos de ventas: ${errorMsg}`);
    }
    const data = await res.json();
    return data;
};
