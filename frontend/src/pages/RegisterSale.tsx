import { useEffect, useState } from 'react';
import { Input } from '../components/Input';
import type { Product, Sale, SaleItem, SaleItemView } from '../types';
import { SaleSearchProductModal } from '../components/modals/SaleSearchProductModal';
import { AnimatePresence } from 'motion/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { EditItemOnSaleModal } from '../components/modals/EditItemOnSaleModal';

export const RegisterSale = () => {
    const [searchProductModalActive, setSearchModalProductActive] =
        useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [selectedQuantity, setSelectedQuantity] = useState<
        number | undefined
    >();
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const [saleItemsView, setSaleItemsView] = useState<SaleItemView[]>([]);
    const [totalOfSale, setTotalOfSale] = useState<number | undefined>(
        undefined
    );
    const [itemToEdit, setItemToEdit] = useState<SaleItemView | undefined>(
        undefined
    );
    const [editProductModalActive, setEditProductModalActive] =
        useState<boolean>(false);

    useEffect(() => {
        setTotalOfSale(calcTotal(saleItemsView));
    }, [saleItemsView]);

    const closeModal = () => {
        setSearchModalProductActive(false);
    };

    const openModal = () => {
        setSearchModalProductActive(true);
    };

    const selectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const openEditItemModal = (item: SaleItemView) => {
        setItemToEdit(item);
        setEditProductModalActive(true);
    };

    const closeEditItemModal = () => {
        setEditProductModalActive(false);
    };

    const calcTotal = (products: SaleItemView[]) => {
        return products.reduce((total, product) => {
            return total + product.unit_price * product.quantity;
        }, 0);
    };

    const deleteItemFromSale = (item: SaleItemView) => {
        const temp = saleItemsView.filter(
            (product) => product.product_id !== item.product_id
        );
        setSaleItemsView(temp);
    };

    const editItemFromSale = (item: SaleItemView, newQuantity: number) => {
        saleItemsView.map((itemView) =>
            itemView.product_id === item.product_id
                ? { ...item, quantity: newQuantity }
                : itemView
        );
    };

    const addProductToSale = () => {
        if (selectedProduct && selectedQuantity) {
            setSaleItems([
                ...saleItems,
                {
                    sale_id: 2,
                    product_id: selectedProduct.product_id,
                    quantity: selectedQuantity,
                    discount: 0,
                    price_type: '',
                },
            ]);
            setSaleItemsView([
                ...saleItemsView,
                {
                    sale_id: 2,
                    product_id: selectedProduct.product_id,
                    quantity: selectedQuantity,
                    discount: 0,
                    price_type: '',
                    product_name: selectedProduct.name,
                    unit_price: selectedProduct.sale_price,
                },
            ]);
            setSelectedProduct(undefined);
            setSelectedQuantity(undefined);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center my-5 font-semibold text-xl">
                Registrar Venta
            </h2>
            <div className="grid grid-cols-2">
                <form className="p-5 mb-10 flex flex-col w-md shadow-lg rounded-lg bg-slate-100">
                    <div className="flex items-center mb-5">
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
                        <div className="p-3 my-3 min-h-12 outline-none shadow-lg rounded-lg bg-white text-center">
                            {selectedProduct?.name}
                        </div>
                    </div>
                    <Input
                        label="Cantidad"
                        type="number"
                        min={0}
                        value={selectedQuantity ?? ''}
                        onChange={(e) => {
                            e.target.value === ''
                                ? setSelectedQuantity(undefined)
                                : setSelectedQuantity(parseInt(e.target.value));
                        }}
                    />
                    <button
                        className="p-3 my-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                        onClick={(e) => {
                            e.preventDefault();
                            addProductToSale();
                        }}>
                        Agregar
                    </button>
                </form>
                <div className="min-w-2xl">
                    <h3 className="text-center my-5 font-semibold text-lg">
                        Detalle de la venta
                    </h3>
                    <table className="text-center w-full shadow-lg overflow-hidden bg-slate-50 rounded-lg">
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
                            {saleItemsView.map((item: SaleItemView) => (
                                <tr
                                    key={item.product_id}
                                    className="border border-indigo-600">
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">{item.product_name}</td>
                                    <td className="p-3">${item.unit_price}</td>
                                    <td className="p-3">
                                        ${item.unit_price * item.quantity}
                                    </td>
                                    <td>
                                        <button
                                            className="p-3 mx-3 bg-indigo-600 text-slate-50 text-xl rounded-lg shadow-lg cursor-pointer"
                                            onClick={() =>
                                                openEditItemModal(item)
                                            }>
                                            <MdEdit />
                                        </button>
                                        <button
                                            className="p-3 mr-3 bg-indigo-600 text-slate-50 text-xl rounded-lg shadow-lg cursor-pointer"
                                            onClick={() =>
                                                deleteItemFromSale(item)
                                            }>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="border border-t-slate-50 border-indigo-600 bg-indigo-600 text-slate-50 font-bold">
                                <td colSpan={3} className="p-3">
                                    Total
                                </td>
                                <td className="p-3">${totalOfSale}</td>
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
            <AnimatePresence>
                {editProductModalActive && (
                    <EditItemOnSaleModal
                        item={itemToEdit}
                        closeModal={closeEditItemModal}
                        editItem={editItemFromSale}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
