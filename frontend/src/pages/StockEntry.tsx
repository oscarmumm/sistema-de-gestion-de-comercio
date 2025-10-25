import { Input } from '../components/Input';
import { getSuppliers } from '../api/suppliers';
import { useEffect, useState } from 'react';
import type { Supplier } from '../types';

export const StockEntry = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

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

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center my-5 font-semibold text-lg">
                Ingreso de mercadería
            </h2>
            <form className="p-5 mb-10 flex flex-col w-xl shadow-lg rounded-lg bg-slate-100">
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col'>
                        <label className="px-1">Proveedor</label>
                        <select className="p-3 my-3 outline-none shadow-lg rounded-lg bg-white">
                            <option>Seleccione el proveedor</option>
                            {suppliers?.map((supplier) => (
                                <option>{supplier.name}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="Número de comprobante" type="text" />
                </div>
                <div></div>
            </form>
        </div>
    );
};
