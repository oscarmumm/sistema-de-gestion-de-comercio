import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
import { getLowestStockProducts } from '../../api/products';
import { useEffect, useState } from 'react';

export const LowestStockProductsChart = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchLowestStockProducts();
    }, []);
    
    const fetchLowestStockProducts = async () => {
        const data = await getLowestStockProducts();
        console.log(data);
        setProducts(data);
    };
    return (
        <div className="text-sm bg-slate-50 rounded-lg shadow-lg p-5 w-full mb-5">
            <h3 className="font-semibold mb-3">Productos con Stock mas bajo</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <BarChart layout="vertical" data={products}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis type="number" stroke="#000" />
                    <YAxis
                        type="category"
                        stroke="#000"
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        width={140}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="stock" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
