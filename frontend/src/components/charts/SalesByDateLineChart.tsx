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
import { formatMoney } from '../../utils/utils';

type SalesByDateLineChartProps = {
    from: string;
    until: string;
    period: string;
};

export const SalesByDateLineChart = ({
    from,
    until,
    period,
}: SalesByDateLineChartProps) => {
    const [periodSales, setPeriodSales] = useState([]);
    const [totalSales, setTotalSales] = useState<string>();

    type fetchSalesProps = {
        from: string;
        until: string;
    };

    useEffect(() => {
        fetchSales({ from, until });
    }, []);

    const fetchSales = async ({ from, until }: fetchSalesProps) => {
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
            setTotalSales(formatMoney(total));
            setPeriodSales(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='text-sm bg-slate-50 rounded-lg shadow-lg p-5 w-xl mb-5'>
            <h3 className='font-semibold mb-3'>Ventas {period}</h3>
            <ResponsiveContainer width='100%' aspect={3}>
                <LineChart data={periodSales}>
                    <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
                    <XAxis stroke='#000' dataKey='fecha' />
                    <YAxis stroke='#000' />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='total' stroke='#8884d8' />
                </LineChart>
            </ResponsiveContainer>
            <div>
                <span className='font-semibold'>Total: </span>
                <span>{totalSales}</span>
            </div>
        </div>
    );
};
