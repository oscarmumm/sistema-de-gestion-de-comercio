import { useEffect, useMemo, useState } from 'react';
import { Input } from '../components/Input';
import type { Product, SaleItem, SaleItemView } from '../types';
import { SearchProductModal } from '../components/modals/SearchProductModal';
import { AnimatePresence } from 'motion/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { EditItemOnSaleModal } from '../components/modals/EditItemOnSaleModal';
import { NotificationModal } from '../components/modals/NotificationModal';
import { PaymentModal } from '../components/modals/PaymentModal';
import { useNotificationModal } from '../hooks/useNotification';

export const RegisterSale = () => {
    const tempSaleId = useMemo(() => Date.now(), []);
    const [searchProductModalActive, setSearchModalProductActive] =
        useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [selectedQuantity, setSelectedQuantity] = useState<
        number | undefined
    >();
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const [saleItemsView, setSaleItemsView] = useState<SaleItemView[]>([]);
    const [totalOfSale, setTotalOfSale] = useState<number>(0);
    const [itemToEdit, setItemToEdit] = useState<SaleItemView | undefined>(
        undefined
    );
    const [editProductModalActive, setEditProductModalActive] =
        useState<boolean>(false);
    const [paymentModalActive, setPaymentModalActive] =
        useState<boolean>(false);
    const {
        notificationModalMsg,
        notificationModalType,
        notificationModalActive,
        showNotification,
    } = useNotificationModal();

    useEffect(() => {
        setTotalOfSale(calcTotal(saleItemsView));
    }, [saleItemsView]);

    const closeModal = () => {
        setSearchModalProductActive(false);
    };

    const openModal = () => {
        setSearchModalProductActive(true);
    };

    if (
        selectedQuantity &&
        selectedProduct &&
        selectedQuantity > selectedProduct.stock
    ) {
        setSelectedQuantity(0);
        showNotification(
            `Stock insuficiente. Stock disponible: ${selectedProduct.stock}`,
            'error'
        );
    }

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
        const updatedSaleItemsView = saleItemsView.filter(
            (product) => product.product_id !== item.product_id
        );
        const updatedSaleItems = saleItems.filter(
            (product) => product.product_id !== item.product_id
        );
        setSaleItemsView(updatedSaleItemsView);
        setSaleItems(updatedSaleItems);
    };

    const editItemFromSale = (item: SaleItemView, newQuantity: number) => {
        const updatedSaleItemsView = saleItemsView.map((itemView) =>
            itemView.product_id === item.product_id
                ? { ...item, quantity: newQuantity }
                : itemView
        );
        const updatedSaleItems = saleItems.map((saleItem) =>
            saleItem.product_id === item.product_id
                ? { ...item, quantity: newQuantity }
                : saleItem
        );
        setSaleItemsView(updatedSaleItemsView);
        setSaleItems(updatedSaleItems);
    };

    const addProductToSale = () => {
        if (saleItems.find(
                (item) => item.product_id === selectedProduct?.product_id
            )) {
                showNotification('El producto ya se encuentra en la compra', 'error');
                return;
            };
        if (selectedProduct && selectedQuantity) {
            setSaleItems([
                ...saleItems,
                {
                    sale_id: tempSaleId,
                    product_id: selectedProduct.product_id,
                    quantity: selectedQuantity,
                    discount: 0,
                    price_type: '',
                },
            ]);
            setSaleItemsView([
                ...saleItemsView,
                {
                    sale_id: tempSaleId,
                    product_id: selectedProduct.product_id,
                    quantity: selectedQuantity,
                    discount: 0,
                    price_type: '',
                    product_name: selectedProduct.name,
                    unit_price: selectedProduct.sale_price,
                    current_stock: selectedProduct.stock,
                },
            ]);
            setSelectedProduct(undefined);
            setSelectedQuantity(undefined);
        }
    };

    const openPaymentModal = () => {
        if (totalOfSale) {
            setPaymentModalActive(true);
        } else {
            showNotification(
                'Debe agregar al menos un producto para realizar la venta',
                'error'
            );
        }
    };

    const clearSaleItems = () => {
        setSaleItems([]);
        setSaleItemsView([]);
    };

    const successfulSale = () => {
        showNotification('Venta registrada con éxito', 'success');
    };

    const closePaymentModal = () => {
        setPaymentModalActive(false);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="w-full my-5 font-bold text-2xl">
                Registrar Venta
            </h2>
            <div className="flex min-w-4xl">
                <div className="flex flex-col">
                    <form className="p-5 mb-10 flex flex-col w-sm shadow-lg rounded-lg bg-slate-100">
                        <h3 className="text-center mb-5 font-semibold text-lg">
                            Agregar Productos
                        </h3>
                        <button
                            className="font-bold p-3 my-3 flex-1 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }}>
                            Buscar Producto
                        </button>
                        <div className="flex flex-col">
                            <label className="px-1">
                                Producto seleccionado
                            </label>
                            <div className="p-3 my-3 min-h-12 outline-none shadow-lg rounded-lg bg-white text-center">
                                {selectedProduct?.name}
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <Input
                                label="Cantidad"
                                type="number"
                                min={0}
                                max={selectedProduct?.stock}
                                value={selectedQuantity ?? ''}
                                onChange={(e) => {
                                    e.target.value === ''
                                        ? setSelectedQuantity(undefined)
                                        : setSelectedQuantity(
                                              parseInt(e.target.value)
                                          );
                                }}
                            />
                            <button
                                className="font-bold h-12 p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (selectedProduct && selectedQuantity) {
                                        addProductToSale();
                                    } else if (
                                        selectedProduct &&
                                        !selectedQuantity
                                    ) {
                                        showNotification(
                                            'Debe especificar una cantidad',
                                            'warning'
                                        );
                                    } else if (
                                        !selectedProduct &&
                                        selectedQuantity
                                    ) {
                                        showNotification(
                                            'Debe especificar el producto',
                                            'warning'
                                        );
                                    } else {
                                        showNotification(
                                            'No ha ingresado ningún dato',
                                            'warning'
                                        );
                                    }
                                }}>
                                Agregar
                            </button>
                        </div>
                    </form>
                    <button
                        className="font-bold p-3 my-3 flex-1 max-h-12 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105"
                        onClick={openPaymentModal}>
                        Registrar Venta
                    </button>
                </div>
                <div className="ml-5 w-xl">
                    <div className="bg-slate-50 rounded-lg shadox-lg p-5">
                        <h3 className="text-center mb-5 font-semibold text-lg">
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
                                        <td className="p-3">
                                            {item.product_name}
                                        </td>
                                        <td className="p-3">
                                            ${item.unit_price}
                                        </td>
                                        <td className="p-3">
                                            ${item.unit_price * item.quantity}
                                        </td>
                                        <td>
                                            <button
                                                className="p-2 mx-1 bg-yellow-400 text-slate-50 text-xl rounded-lg shadow-lg cursor-pointer"
                                                onClick={() =>
                                                    openEditItemModal(item)
                                                }>
                                                <MdEdit />
                                            </button>
                                            <button
                                                className="p-2 mx-1 bg-red-600 text-slate-50 text-xl rounded-lg shadow-lg cursor-pointer"
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
            </div>
            <AnimatePresence>
                {searchProductModalActive && (
                    <SearchProductModal
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
            <AnimatePresence>
                {notificationModalActive && (
                    <NotificationModal
                        message={notificationModalMsg}
                        notificationType={notificationModalType}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {paymentModalActive && (
                    <PaymentModal
                        total={totalOfSale}
                        closeModal={closePaymentModal}
                        saleItemsView={saleItemsView}
                        saleItems={saleItems}
                        clearSaleItems={clearSaleItems}
                        successfulSale={successfulSale}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
