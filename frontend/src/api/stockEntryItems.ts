import type { StockEntryItem } from '../types';

type insertStockEntryItemsProps = {
    entryId: number;
    itemsArray: StockEntryItem[];
};

export const insertStockEntryItems = async ({
    entryId,
    itemsArray,
}: insertStockEntryItemsProps) => {
    const token = sessionStorage.getItem('token');

    const res = await fetch(
        `http://localhost:3000/api/product-entry/${entryId}/items`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                items: itemsArray,
            }),
        }
    );
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(
            `Error al ingresar los items del proveedor ${errorMsg}`
        );
    }
};

export const getStockEntryItemsByEntryId = async (id: number) => {
    const token = sessionStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/product-entry/items/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(`Error al obtener el registro ${errorMsg}`);
    }
    const data = await res.json();
    return data;
};