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

export const CurrentWeekSales = () => {
    const [weekSales, setWeekSales] = useState([]);
    const [totalWeekSales, setTotalWeekSales] = useState<number>();

    const from = '2025-10-27';
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
                (acc: number, cur: { fecha: string; total: string }) =>
                    acc + parseInt(cur.total),
                0
            );
            setTotalWeekSales(total);
            setWeekSales(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="text-sm bg-slate-50 rounded-lg shadow-lg p-5 w-2xl mb-5">
            <h3 className="font-semibold mb-3">Ventas Semana Actual</h3>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={weekSales}>
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
                <span>${totalWeekSales}</span>
            </div>
        </div>
    );
};
