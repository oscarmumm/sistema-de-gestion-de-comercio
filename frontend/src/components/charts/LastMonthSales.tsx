import { useEffect, useState } from 'react';
import { getSalesByDay } from '../../api/sales';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export const LastMonthSales = () => {
    const [monthSales, setMonthSales] = useState([]);
    const [totalMonthSales, setTotalMonthSales] = useState<number>();

    const from = '2025-09-29';
    const until = '2025-10-29';
    type fetchSaleByDayProps = {
        from: string;
        until: string;
    };

    useEffect(() => {
        fetchLastWeekSales({ from, until });
    }, []);

    const fetchLastWeekSales = async ({ from, until }: fetchSaleByDayProps) => {
        try {
            const res = await getSalesByDay({ from, until });
            const formattedData = res.data.map(
                (el: { fecha: string; total: number }) => ({
                    ...el,
                    fecha: el.fecha.slice(0, 10),
                })
            );
            const total = formattedData.reduce(
                (acc: number, cur: { fecha: String; total: string }) =>
                    acc + parseInt(cur.total),
                0
            );
            setTotalMonthSales(total);
            setMonthSales(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="text-sm bg-slate-50 rounded-lg shadow-lg p-5 w-2xl mb-5">
            <h3 className="font-semibold mb-3">Ventas Mes Anterior</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={monthSales}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis stroke="#000" dataKey="fecha" />
                    <YAxis stroke="#000" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
            <div>
                <span className='font-semibold'>Total: </span>
                <span>${totalMonthSales}</span>
            </div>
        </div>
    );
};
