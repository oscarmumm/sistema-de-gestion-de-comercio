import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getProducts } from '../api/products';
import { AnimatePresence } from 'motion/react';
import { NewProductModal } from '../components/modals/NewProductModal';
import { ProductModal } from '../components/modals/ProductModal';

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const openCreationModal = () => {
        setShowCreationModal(true);
    };

    const closeCreationModal = () => {
        setShowCreationModal(false);
    };

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowEditModal(false);
    };

    return (
        <div className="flex flex-col min-w-3xl max-w-6xl">
            <div className="flex justify-between p-3">
                <h2 className="text-center my-5 font-bold text-2xl">
                    Productos
                </h2>
                <button
                    className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105"
                    onClick={openCreationModal}>
                    Nuevo producto
                </button>
            </div>
            <table className="text-center rounded-lg shadow-lg overflow-hidden bg-slate-50">
                <thead className="border border-indigo-600 bg-indigo-600 text-slate-50">
                    <tr>
                        <th className="p-3">Nombre</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Costo unitario</th>
                        <th className="p-3">Precio de venta</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr
                            className="cursor-pointer border-b border-indigo-600 last:border-0 hover:bg-indigo-100"
                            key={product.product_id}
                            onClick={() => openModal(product)}>
                            <td className="p-3">
                                {product.name}
                            </td>
                            <td className="p-3">
                                {product.stock}
                            </td>
                            <td className="p-3">
                                {product.unit_cost}
                            </td>
                            <td className="p-3">
                                {product.sale_price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AnimatePresence>
                {showCreationModal && (
                    <NewProductModal
                        closeCreationModal={closeCreationModal}
                        fetchProducts={fetchProducts}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showEditModal && (
                    <ProductModal
                        closeModal={closeModal}
                        product={selectedProduct}
                        fetchProducts={fetchProducts}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
