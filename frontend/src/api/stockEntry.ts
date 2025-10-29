import type { StockEntry } from '../types';

type createStockEntryProps = Pick<
    StockEntry,
    'user_id' | 'supplier_id'
>;

export const createStockEntry = async ({
    user_id,
    supplier_id,
}: createStockEntryProps) => {
    const token = sessionStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/product-entry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            user_id: user_id,
            supplier_id: supplier_id,
        }),
    });
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error al crear la entrada ${errorMsg}`);
    }
    const data = await res.json();
    return data;
};
