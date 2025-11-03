import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getAllProducts } from '../api/products';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Error desconocido';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error };
};
