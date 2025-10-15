import { useState } from 'react';
import { Input } from '../components/Input';
import type { Product } from '../types';
import { SaleSearchProductModal } from '../components/modals/SaleSearchProductModal';
import { AnimatePresence } from 'motion/react';

export const RegisterSale = () => {
    const [searchProductModalActive, setSearchModalProductActive] =
        useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();

    const closeModal = () => {
        setSearchModalProductActive(false);
    };

    const openModal = () => {
        setSearchModalProductActive(true);
    };

    const selectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center my-5 font-semibold text-xl">
                Registrar Venta
            </h2>
            <div className="grid grid-cols-2">
                <form className="p-5 mb-10 flex flex-col w-md shadow-lg rounded-lg bg-slate-100">
                    <div className="flex items-center">
                        <label>Agregar Producto</label>
                        <button
                            className="p-3 my-3 flex-1 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }}>
                            Buscar Producto
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <label className="px-1">Producto seleccionado</label>
                        <div className="p-3 my-3 min-h-12 outline-none shadow-lg rounded-lg bg-white">
                            {selectedProduct?.name}
                        </div>
                    </div>
                    <Input label="Cantidad" type="number" min={0} />
                    <button className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105">
                        Agregar
                    </button>
                </form>
                <div>
                    <h3 className="text-center my-5 font-semibold text-lg">
                        Detalle de la venta
                    </h3>
                    <table className="text-center shadow-lg overflow-hidden bg-slate-50">
                        <thead className="border border-indigo-600 bg-indigo-600 text-slate-50">
                            <tr>
                                <th className="p-3">Cantidad</th>
                                <th className="p-3">Descripción</th>
                                <th className="p-3">Precio unitario</th>
                                <th className="p-3">Importe</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border border-t-slate-50 border-indigo-600 bg-indigo-600 text-slate-50">
                                <td className="p-3">Total</td>
                                <td className="p-3"></td>
                                <td className="p-3"></td>
                                <td className="p-3"></td>
                                <td className="p-3"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <AnimatePresence>
                {searchProductModalActive && (
                    <SaleSearchProductModal
                        selectProduct={selectProduct}
                        closeModal={closeModal}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
