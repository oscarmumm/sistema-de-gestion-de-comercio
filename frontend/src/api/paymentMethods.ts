import type { PaymentMethod } from '../types';

export const createPaymentMethod = async (name: string) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/payment-methods`, {
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

export const getPaymentMethods = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/payment-methods`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Error al obtener los métodos de pago');
    }
    const data = await res.json();
    return data.map((paymentMethod : PaymentMethod) => ({
        ...paymentMethod,
        created_at: new Date(paymentMethod.created_at),
        updated_at: paymentMethod.updated_at ? new Date(paymentMethod.updated_at) : null,
    }));
};

export const editPaymentMethod = async (paymentMethod : PaymentMethod) => {
    const token = sessionStorage.getItem('token');
    const rawUser = sessionStorage.getItem('user');
    if (!rawUser) return;
    const user = JSON.parse(rawUser);

    const res = await fetch(
        `http://localhost:3000/api/payment-methods/${paymentMethod.payment_method_id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: paymentMethod.name,
                updated_by: user.user_id,
            }),
        }
    );
    const data = await res.json();
    return data;
};

export const deletePaymentMethod = async (paymentMethod : PaymentMethod) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(
        `http://localhost:3000/api/payment-methods/${paymentMethod.payment_method_id}`,
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
