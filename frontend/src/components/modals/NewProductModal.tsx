import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import { MdClose } from 'react-icons/md';
import { createProduct } from '../../api/products';
import { getCategories } from '../../api/categories';
import { getBrands } from '../../api/brands';
import { motion } from 'motion/react';
import {
    modalBackgroundVariants,
    modalFormVariants,
} from '../../animations/animations';
import type { Category } from '../../types';
import type { Brand } from '../../types';

interface NewProductModalProps {
    closeCreationModal: () => void;
    fetchProducts: () => void;
}

const newProductFormat = {
    category_id: 0,
    brand_id: 0,
    name: '',
    description: '',
    stock: 0,
    unit_cost: 0,
    sale_price: 0,
    units_per_box: 0,
};

export const NewProductModal = ({
    closeCreationModal,
    fetchProducts,
}: NewProductModalProps) => {
    const [newProduct, setNewProduct] = useState(newProductFormat);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchBrands = async () => {
        try {
            const data = await getBrands();
            setBrands(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const numericFields = [
            'category_id',
            'brand_id',
            'stock',
            'units_per_box',
            'sale_price',
            'unit_cost',
        ];
        setNewProduct({
            ...newProduct,
            [name]: numericFields.includes(name) ? Number(value) : value,
        });
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
                className="p-5 flex flex-col w-md shadow-lg rounded-lg bg-slate-100 min-w-3xl"
                variants={modalFormVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}>
                <div className="flex justify-between mb-12">
                    <h2 className="text-xl font-semibold">Nuevo producto</h2>
                    <button className="text-3xl cursor-pointer self-end">
                        <MdClose onClick={closeCreationModal} />
                    </button>
                </div>
                <form className="flex flex-col" autoComplete="off">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <label className="px-1">Categoría</label>
                            <select
                                className="p-3 my-3 outline-none shadow-lg rounded-lg bg-white"
                                name="category_id"
                                value={newProduct.category_id}
                                onChange={handleChange}>
                                <option>Seleccionar categoría</option>
                                {categories?.map((category) => (
                                    <option
                                        key={category.category_id}
                                        value={category.category_id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="px-1">Marca</label>
                            <select
                                className="p-3 my-3 outline-none shadow-lg rounded-lg bg-white"
                                name="brand_id"
                                value={newProduct.brand_id}
                                onChange={handleChange}>
                                <option>Seleccionar marca</option>
                                {brands?.map((brand) => (
                                    <option
                                        key={brand.brand_id}
                                        value={brand.brand_id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Input
                            label="Nombre"
                            name="name"
                            type="text"
                            value={newProduct.name}
                            onChange={handleChange}
                        />
                        <Input
                            label="Descripción"
                            name="description"
                            type="text"
                            value={newProduct.description}
                            onChange={handleChange}
                        />
                        <Input
                            label="Stock"
                            name="stock"
                            type="number"
                            min={0}
                            value={newProduct.stock}
                            onChange={handleChange}
                        />
                        <Input
                            label="Costo unitario"
                            name="unit_cost"
                            type="number"
                            min={0}
                            value={newProduct.unit_cost}
                            onChange={handleChange}
                        />
                        <Input
                            label="Precio de venta"
                            name="sale_price"
                            type="number"
                            min={0}
                            value={newProduct.sale_price}
                            onChange={handleChange}
                        />
                        <Input
                            label="Unidades por caja"
                            name="units_per_box"
                            type="number"
                            min={0}
                            value={newProduct.units_per_box}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-end mt-10">
                        <button
                            className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                            onClick={async (e) => {
                                e.preventDefault();
                                console.log(newProduct)
                                await createProduct(newProduct);
                                await fetchProducts();
                                closeCreationModal();
                            }}>
                            Guardar
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
