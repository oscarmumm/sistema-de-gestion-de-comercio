import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getAllProducts, getPaginatedProducts } from '../api/products';
import { AnimatePresence } from 'motion/react';
import { NewProductModal } from '../components/modals/NewProductModal';
import { ProductModal } from '../components/modals/ProductModal';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState();
    const [selectedProduct, setSelectedProduct] = useState<Product>();

    useEffect(() => {
        fetchPaginatedProducts(page);
    }, [page]);

    const fetchPaginatedProducts = async (currentPage: number) => {
        try {
            const data = await getPaginatedProducts(currentPage);
            console.log(data);
            setProducts(data.products);
            setPage(data.page);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
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

    const clickOnBackButton = () => {
        if (page !== totalPages) {
            setPage((prev) => prev - 1);
        } else {
            return;
        }
    };

    const clickOnForwardButton = () => {
        if (page === totalPages) {
            return;
        } else {
            setPage((prev) => prev + 1);
        }
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
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">{product.stock}</td>
                            <td className="p-3">{product.unit_cost}</td>
                            <td className="p-3">{product.sale_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full flex justify-evenly items-center my-3">
                {page !== 1 && (
                    <button
                        className="p-3 bg-slate-50 rounded-lg shadow-lg"
                        onClick={clickOnBackButton}>
                        <MdArrowBackIos />
                    </button>
                )}
                <div>
                    <span className="mr-3">{page} </span>
                    <span> . . . </span>
                    <span className="ml-3"> {totalPages}</span>
                </div>
                {page !== totalPages && (
                    <button
                        className="p-3 bg-slate-50 rounded-lg shadow-lg"
                        onClick={clickOnForwardButton}>
                        <MdArrowForwardIos />
                    </button>
                )}
            </div>
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
