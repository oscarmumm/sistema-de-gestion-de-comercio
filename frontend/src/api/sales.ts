import type { Sale } from '../types';

export const createSale = async () => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost/api/sales`)
};
