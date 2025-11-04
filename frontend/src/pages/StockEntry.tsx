import { useEffect, useMemo, useState } from 'react';
import { Input } from '../components/Input';
import type {
    Supplier,
    Product,
    StockEntryItem,
    StockEntryItemView,
} from '../types';
import { SearchProductModal } from '../components/modals/SearchProductModal';
import { AnimatePresence } from 'motion/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { NotificationModal } from '../components/modals/NotificationModal';
import { useNotificationModal } from '../hooks/useNotification';
import { ConfirmStockEntryModal } from '../components/modals/ConfirmStockEntryModal';
import { getSuppliers } from '../api/suppliers';
import { EditItemOnEntryModal } from '../components/modals/EditItemOnEntryModal';

type SupplierSelection = Pick<Supplier, 'name' | 'supplier_id'>;

export const StockEntry = () => {
    const tempSaleId = useMemo(() => Date.now(), []);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [goodsReceipt, setGoodsReceipt] = useState<string>('');
    const [searchProductModalActive, setSearchModalProductActive] =
        useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierSelection>(
        {
            supplier_id: 0,
            name: 'Sin proveedor seleccionado',
        }
    );
    const [selectedQuantity, setSelectedQuantity] = useState<
        number | undefined
    >();
    const [stockEntryItems, setStockEntryItems] = useState<StockEntryItem[]>(
        []
    );
    const [stockEntryItemsView, setStockEntryItemsView] = useState<
        StockEntryItemView[]
    >([]);
    const [totalOfSale, setTotalOfSale] = useState<number>(0);
    const [itemToEdit, setItemToEdit] = useState<
        StockEntryItemView | undefined
    >(undefined);
    const [editProductModalActive, setEditProductModalActive] =
        useState<boolean>(false);
    const [confirmStockEntryModalActive, setConfirmStockEntryModalActive] =
        useState<boolean>(false);
    const {
        notificationModalMsg,
        notificationModalType,
        notificationModalActive,
        showNotification,
    } = useNotificationModal();

    useEffect(() => {
        setTotalOfSale(calcTotal(stockEntryItemsView));
    }, [stockEntryItemsView]);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error(error);
        }
    };
    const closeModal = () => {
        setSearchModalProductActive(false);
    };

    const openModal = () => {
        setSearchModalProductActive(true);
    };

    const selectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const openEditItemModal = (item: StockEntryItemView) => {
        setItemToEdit(item);
        setEditProductModalActive(true);
    };

    const closeEditItemModal = () => {
        setEditProductModalActive(false);
    };

    const calcTotal = (products: StockEntryItemView[]) => {
        return products.reduce((total, product) => {
            return total + product.box_price * product.boxes;
        }, 0);
    };

    const deleteItemFromEntries = (item: StockEntryItemView) => {
        const temp = stockEntryItemsView.filter(
            (product) => product.product_id !== item.product_id
        );
        setStockEntryItemsView(temp);
    };

    const editItem = (item: StockEntryItemView, newQuantity: number) => {
        const updatedStockEntryItemsView = stockEntryItemsView.map((itemView) =>
            itemView.product_id === item.product_id
                ? { ...item, boxes: newQuantity }
                : itemView
        );
        const updatedStockEntryItems = stockEntryItems.map((entryItem) =>
            entryItem.product_id === item.product_id
                ? { ...item, boxes: newQuantity }
                : entryItem
        );
        setStockEntryItemsView(updatedStockEntryItemsView);
        setStockEntryItems(updatedStockEntryItems);
    };

    const addProductToSale = () => {
        if (selectedProduct && selectedQuantity) {
            setStockEntryItems([
                ...stockEntryItems,
                {
                    entry_id: tempSaleId,
                    product_id: selectedProduct.product_id,
                    boxes: selectedQuantity,
                },
            ]);
            setStockEntryItemsView([
                ...stockEntryItemsView,
                {
                    entry_id: tempSaleId,
                    product_id: selectedProduct.product_id,
                    boxes: selectedQuantity,
                    product_name: selectedProduct.name,
                    box_price:
                        selectedProduct.unit_cost *
                        selectedProduct.units_per_box,
                },
            ]);
            setSelectedProduct(undefined);
            setSelectedQuantity(undefined);
        }
    };

    const openConfirmStockEntryModal = () => {
        if (!totalOfSale) {
            return showNotification(
                'Debe agregar al menos un producto para realizar la venta',
                'error'
            );
        }
        if (selectedSupplier.supplier_id === 0) {
            return showNotification(
                'No ha seleccionado el proveedor',
                'warning'
            );
        }
        if (goodsReceipt.length < 1) {
            return showNotification(
                'Debe ingresar el número de comprobante',
                'warning'
            );
        }
        setConfirmStockEntryModalActive(true);
    };

    const clearStockEntry = () => {
        setStockEntryItems([]);
        setStockEntryItemsView([]);
        setGoodsReceipt('');
        setSelectedSupplier({
            supplier_id: 0,
            name: 'Sin proveedor seleccionado',
        });
    };

    const successfulEntry = () => {
        showNotification('Ingreso registrado con éxito', 'success');
    };

    const closePaymentModal = () => {
        setConfirmStockEntryModalActive(false);
    };

    return (
        <div className='flex flex-col items-center'>
            <h2 className='w-full my-5 font-bold text-2xl'>
                Registrar Ingreso de Mercadería
            </h2>
            <div className='flex min-w-4xl'>
                <div className='flex flex-col'>
                    <form className='p-5 mb-10 flex flex-col w-sm shadow-lg rounded-lg bg-slate-100'>
                        <h2 className='text-center mb-5 font-semibold text-lg'>
                            Agregar Productos
                        </h2>
                        <button
                            className='font-bold p-3 my-3 flex-1 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105'
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }}
                        >
                            Buscar Producto
                        </button>
                        <div className='flex flex-col'>
                            <label className='px-1'>
                                Producto seleccionado
                            </label>
                            <div className='p-3 my-3 min-h-12 outline-none shadow-lg rounded-lg bg-white text-center'>
                                {selectedProduct?.name}
                            </div>
                        </div>
                        <div className='flex items-end justify-between'>
                            <Input
                                label='Cantidad'
                                type='number'
                                min={0}
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
                                className='font-bold h-12 p-3 my-3 ml-3 min-w-24 shadow-lg rounded-lg bg-indigo-600 text-white cursor-pointer hover:scale-105'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!selectedProduct && !selectedQuantity) {
                                        return showNotification(
                                            'No ha ingresado ningún dato',
                                            'warning'
                                        );
                                    }
                                    if (!selectedProduct) {
                                        return showNotification(
                                            'Debe especificar el producto',
                                            'warning'
                                        );
                                    }
                                    if (!selectedQuantity) {
                                        return showNotification(
                                            'Debe especificar la cantidad',
                                            'warning'
                                        );
                                    }
                                    addProductToSale();
                                }}
                            >
                                Agregar
                            </button>
                        </div>
                    </form>
                    <button
                        className='font-bold p-3 my-3 flex-1 max-h-12 min-w-24 shadow-lg rounded-lg bg-emerald-600 text-white cursor-pointer hover:scale-105'
                        onClick={openConfirmStockEntryModal}
                    >
                        Registrar Ingreso
                    </button>
                </div>
                <div className='ml-5 w-xl'>
                    <div className='bg-slate-50 rounded-lg shadox-lg p-5'>
                        <h3 className='text-center mb-5 font-semibold text-lg'>
                            Detalle del Ingreso
                        </h3>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='flex flex-col'>
                                <label className='px-1'>Proveedor</label>
                                <select
                                    className='p-3 my-3 outline-none shadow-lg rounded-lg bg-white'
                                    value={selectedSupplier.supplier_id}
                                    onChange={(e) => {
                                        const selectedId = Number(
                                            e.target.value
                                        );
                                        const supplier = suppliers.find(
                                            (s) => s.supplier_id === selectedId
                                        );
                                        if (supplier)
                                            setSelectedSupplier(supplier);
                                    }}
                                >
                                    <option>Seleccione el proveedor</option>
                                    {suppliers?.map((supplier) => (
                                        <option
                                            key={supplier.supplier_id}
                                            value={supplier.supplier_id}
                                        >
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Input
                                label='Número de comprobante'
                                type='text'
                                value={goodsReceipt}
                                onChange={(e) =>
                                    setGoodsReceipt(e.target.value)
                                }
                            />
                        </div>
                        <table className='text-center w-full shadow-lg overflow-hidden bg-slate-50 rounded-lg'>
                            <thead className='border border-indigo-600 bg-indigo-600 text-slate-50'>
                                <tr>
                                    <th className='p-3'>Cajas</th>
                                    <th className='p-3'>Descripción</th>
                                    <th className='p-3'>Precio p/caja</th>
                                    <th className='p-3'>Importe</th>
                                    <th className='p-3'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockEntryItemsView.map(
                                    (item: StockEntryItemView) => (
                                        <tr
                                            key={item.product_id}
                                            className='border border-indigo-600'
                                        >
                                            <td className='p-3'>
                                                {item.boxes}
                                            </td>
                                            <td className='p-3'>
                                                {item.product_name}
                                            </td>
                                            <td className='p-3'>
                                                ${item.box_price}
                                            </td>
                                            <td className='p-3'>
                                                ${item.box_price * item.boxes}
                                            </td>
                                            <td>
                                                <button
                                                    className='p-2 mx-1 bg-yellow-400 text-slate-50 text-xl rounded-lg shadow-lg cursor-pointer'
                                                    onClick={() =>
                                                        openEditItemModal(item)
                                                    }
                                                >
                                                    <MdEdit />
                                                </button>
                                                <button
                                                    className='p-2 mx-1 bg-red-600 text-slate-50 text-xl rounded-lg shadow-lg cursor-pointer'
                                                    onClick={() =>
                                                        deleteItemFromEntries(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                                <tr className='border border-t-slate-50 border-indigo-600 bg-indigo-600 text-slate-50 font-bold'>
                                    <td colSpan={3} className='p-3'>
                                        Total
                                    </td>
                                    <td className='p-3'>${totalOfSale}</td>
                                    <td className='p-3'></td>
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
                    <EditItemOnEntryModal
                        item={itemToEdit}
                        closeModal={closeEditItemModal}
                        editItem={editItem}
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
                {confirmStockEntryModalActive && (
                    <ConfirmStockEntryModal
                        total={totalOfSale}
                        closeModal={closePaymentModal}
                        stockEntryItemsView={stockEntryItemsView}
                        stockEntryItems={stockEntryItems}
                        clearStockEntryItems={clearStockEntry}
                        successfulEntry={successfulEntry}
                        selectedSupplier={selectedSupplier}
                        goodsReceipt={goodsReceipt}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
