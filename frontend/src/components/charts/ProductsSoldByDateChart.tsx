import { useEffect, useState } from 'react';
import { getProductsSoldByDate } from '../../api/sales';
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

type ProductsSoldByDateChartProps = {
    from: string;
    until: string;
    title: string;
};

export const ProductsSoldByDateChart = ({
    from,
    until,
    title,
}: ProductsSoldByDateChartProps) => {
    const [periodSales, setPeriodSales] = useState([]);

    type fetchSaleByDayProps = {
        from: string;
        until: string;
    };

    useEffect(() => {
        fetchLastWeekSales({ from, until });
    }, []);

    const fetchLastWeekSales = async ({ from, until }: fetchSaleByDayProps) => {
        try {
            const res = await getProductsSoldByDate({ from, until });
            setPeriodSales(res.data.slice(0, 10));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='text-sm bg-slate-50 rounded-lg shadow-lg p-5 w-full mb-5'>
            <h3 className='font-semibold mb-3'>{title}</h3>
            <ResponsiveContainer width='100%' aspect={3}>
                <BarChart layout='vertical' data={periodSales}>
                    <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
                    <XAxis type='number' stroke='#000' />
                    <YAxis
                        type='category'
                        stroke='#000'
                        dataKey='name'
                        tick={{ fontSize: 12 }}
                        width={140}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='total_sold' fill='#8884d8' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
