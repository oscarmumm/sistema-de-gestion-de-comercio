import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import { AnimatePresence, motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import { Input } from '../Input';
import { MdSearch, MdClose } from 'react-icons/md';
import { getPaginatedProducts } from '../../api/products';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

interface SearchProductModalProps {
    closeModal: () => void;
    selectProduct: (product: Product) => void;
}

export const SearchProductModal = ({
    closeModal,
    selectProduct,
}: SearchProductModalProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState();

    const searchAction = () => {
        fetchPaginatedProducts(1);
    };

    useEffect(() => {
        fetchPaginatedProducts(page)
    }, [page])

    const chooseProduct = (product: Product) => {
        selectProduct(product);
    };

    const fetchPaginatedProducts = async (currentPage: number) => {
        try {
            const data = await getPaginatedProducts(
                searchValue,
                currentPage,
                10
            );
            setProducts(data.products);
            setPage(data.page);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        }
    };
    const clickOnBackButton = () => {
        if (page === 1) {
            return;
        } else {
            setPage((prev) => prev - 1);
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
        <motion.div
            className="modal"
            variants={modalBackgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}>
            <motion.div
                className="p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100"
                variants={modalFormVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}>
                <div className="flex justify-between mb-5">
                    <h2 className="text-lg font-semibold">
                        Búsqueda de producto
                    </h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
                <div className="flex">
                    <Input
                        label=""
                        placeholder="Buscar Producto"
                        type="text"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    <button
                        className="p-3 my-3 ml-3 text-xl shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                        onClick={searchAction}>
                        <MdSearch />
                    </button>
                </div>

                <ul className="rounded-lg bg-slate-50 shadow-lg">
                    <AnimatePresence>
                        {products.length && (
                            <motion.table
                                className="text-center w-full shadow-lg overflow-hidden bg-slate-50 rounded-lg"
                                variants={modalFormVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit">
                                <thead className="border border-indigo-600 bg-indigo-600 text-slate-50">
                                    <tr>
                                        <th className="p-3">Nombre</th>
                                        <th className="p-3">
                                            Stock disponible
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr
                                            key={product.product_id}
                                            onClick={() => {
                                                chooseProduct(product);
                                                closeModal();
                                            }}
                                            className="cursor-pointer text-center p-3 hover:bg-indigo-200">
                                            <td className="p-3">
                                                {product.name}
                                            </td>
                                            <td className="p-3">
                                                {product.stock}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </motion.table>
                        )}
                    </AnimatePresence>
                </ul>
            {totalPages && totalPages > 1 && (
                <div className="w-full flex justify-center items-center my-3">
                    {page !== 1 && (
                        <button
                            className="p-3 bg-slate-50 rounded-lg shadow-lg cursor-pointer"
                            onClick={clickOnBackButton}>
                            <MdArrowBackIos />
                        </button>
                    )}
                    <div className="font-semibold">
                        <span className="mr-3 ml-24">{page} </span>
                        <span> . . . </span>
                        <span className="ml-3 mr-24"> {totalPages}</span>
                    </div>
                    {page !== totalPages && (
                        <button
                            className="p-3 bg-slate-50 rounded-lg shadow-lg cursor-pointer"
                            onClick={clickOnForwardButton}>
                            <MdArrowForwardIos />
                        </button>
                    )}
                </div>
            )}
            </motion.div>
        </motion.div>
    );
};
