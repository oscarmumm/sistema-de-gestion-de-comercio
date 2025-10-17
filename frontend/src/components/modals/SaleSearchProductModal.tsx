import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import { AnimatePresence, motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import { Input } from '../Input';
import { MdSearch, MdClose } from 'react-icons/md';
import { useProducts } from '../../hooks/useProducts';

interface SaleSearchProductModalProps {
    closeModal: () => void;
    selectProduct: (product: Product) => void;
}

export const SaleSearchProductModal = ({
    closeModal,
    selectProduct,
}: SaleSearchProductModalProps) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const chooseProduct = (product: Product) => {
        selectProduct(product);
    };

    const { products, loading, error } = useProducts();

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(filteredProducts);
    }, [products, searchValue]);

    return (
        <motion.div
            className='modal'
            variants={modalBackgroundVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className='p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100'
                variants={modalFormVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ duration: 0.2 }}
            >
                <div className='flex justify-between mb-5'>
                    <h2 className='text-lg font-semibold'>
                        Búsqueda de producto
                    </h2>
                    <button className='text-3xl cursor-pointer self-end'>
                        <MdClose onClick={closeModal} />
                    </button>
                </div>
                <div className='flex'>
                    <Input
                        label=''
                        placeholder='Buscar Producto'
                        type='text'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        className='p-3 my-3 ml-3 text-xl shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105'
                        onClick={() => {
                            const filteredProducts = products.filter(
                                (product) =>
                                    product.name
                                        .toLowerCase()
                                        .includes(searchValue.toLowerCase())
                            );
                            setSearchResults(filteredProducts);
                        }}
                    >
                        <MdSearch />
                    </button>
                </div>

                <ul className='rounded-lg bg-slate-50 shadow-lg'>
                    <AnimatePresence>
                        {searchValue.length > 2 &&
                            searchResults.map((product) => (
                                <motion.li
                                    variants={modalFormVariants}
                                    initial='hidden'
                                    animate='visible'
                                    exit='exit'
                                    key={product.product_id}
                                    onClick={() => {
                                        chooseProduct(product);
                                        closeModal();
                                    }}
                                    className='cursor-pointer text-center p-3 hover:bg-indigo-200'
                                >
                                    {product.name}
                                </motion.li>
                            ))}
                    </AnimatePresence>
                </ul>
            </motion.div>
        </motion.div>
    );
};
