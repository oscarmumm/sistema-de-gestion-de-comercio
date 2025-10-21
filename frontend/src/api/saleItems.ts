import type { SaleItem } from '../types';

type insertSaleItemsProps = {
    saleId: number;
    itemsArray: SaleItem[];
};

export const insertSaleItems = async ({
    saleId,
    itemsArray,
}: insertSaleItemsProps) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/sales/${saleId}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            items: itemsArray,
        }),
    });
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error al insertar los items de la venta ${errorMsg}`);
    }
};
